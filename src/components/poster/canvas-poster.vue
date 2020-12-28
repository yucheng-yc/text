<template>
  <div>
    <canvas ref="canvasPoster" :style="{'width': width + 'px', 'height': height + 'px'}" class="canvas" canvas-id="poster-canvas"></canvas>
  </div>
</template>
<script>
export default {
  name: 'CanvasPoster',
  components: {},
  props: {
    painting: {
      type: Object,
      value: {}
    }
  },
  computed: {
  },
  watch: {
    painting: {
      handler: 'handlePaint',
      deep: true,
      immediate: true
    },
  },
  data() {
    return {
      showCanvas: false,
      width: 0,
      height: 0,
      imageList: [],
      isPainting: false,
      canvas: null,
      ctx: null
    }
  },

  mounted() {
  },
  methods: {
    // 开始绘图
    handlePaint(newVal, oldVal) {
      if (newVal.views && newVal !== oldVal) {
        const { width, height, views } = this.painting
        this.width = width
        this.height = height
        this.ctx = uni.createCanvasContext('poster-canvas', this)
        this.canvas = this.ctx;
        this.ctx.clearRect(0, 0, this.width, this.height)
        this.ctx.save()
        this.getImages(views)
      }
    },
    //加载图片
    loadImage(url) {
      // return new Promise((resolve, reject) => {
      //   const img = new Image()
      //   img.setAttribute('crossorigin', 'anonymous');
      //   img.onload = () => resolve(img)
      //   img.onerror = () => reject(`下载图片失败 ${url}`)
      //   img.src = url
      // })

      return new Promise((resolve, reject) => {
        uni.getImageInfo({
          src: url,
          success: res => {
            resolve(res)
          },
          fail: (e) => {
            console.log('loadImage fail', url, e)
            reject(`下载图片失败 ${url}`)
          }
        })
      })
    },
    // 加载图片
    getImages(views) {
      const imageList = []
      for (let i = 0; i < views.length; i++) {
        if (views[i].type === 'image') {
          imageList.push(this.loadImage(views[i].url))
        }
      }
      Promise.all(imageList).then(res => {
        this.imageList = res
        this.startPainting()
      }).catch((err) => {
        this.$emit('fail', err)
      })
      if (imageList.length === 0) {
        this.startPainting();
      }
    },
    startPainting() {
      const { views } = this.painting
      for (let i = 0, imageIndex = 0; i < views.length; i++) {
        if (views[i].type === 'image') {
          this.drawImage({
            ...views[i],
            img: this.imageList[imageIndex].path,
						// 传入图片实际宽高
						imgWidth: this.imageList[imageIndex].width,
						imgHeight: this.imageList[imageIndex].height,
          })
          imageIndex++
        } else if (views[i].type === 'text') {
          this.drawText(views[i])
        } else if (views[i].type === 'rect') {
          this.drawRect(views[i])
        }
        // else if (views[i].type === 'qrcode') {
        //   this.drawQRCode(views[i])
        // }
      }
      this.ctx.draw(true, () => {
				 setTimeout(() =>{
					uni.canvasToTempFilePath({
					  // x: 0,
					  // y: 0,
					  // width: this.width,
					  // height: this.height,
					  // destWidth: this.width,
					  // destHeight: this.height,
					  canvasId: 'poster-canvas',
					  success: (res) => {
					    console.log('canvasToTempFilePath', res.tempFilePath);
					    this.$emit('success', res.tempFilePath)
					  },
					  fail: (e) => {
					    console.log('canvasToTempFilePath fail', e);
					  }
					}, this);
				},500)
      });
    },
    /**
      * 根据 radius 进行裁减
     */
		 _doClip(left, top, width, height, radius) {
		  this.ctx.beginPath()

		  // 左上角
			this.ctx.arc(left + radius, top + radius, radius, Math.PI, Math.PI * 1.5)
			// border-top-left
			this.ctx.moveTo(left + radius, top)
			this.ctx.lineTo(left + width - radius, top)
			this.ctx.lineTo(left + width, top + radius)
			
		  // 右上角
			this.ctx.arc(left + width - radius, top + radius, radius, Math.PI * 1.5, Math.PI * 2)
			// border-top-right
			this.ctx.lineTo(left + width, top + height - radius)
			this.ctx.lineTo(left + width - radius, top + height)
			
		  // 右下角
			this.ctx.arc(left + width - radius, top + height - radius, radius, 0, Math.PI * 0.5)
			// border-bottom-right
			this.ctx.lineTo(left + radius, top + height); this.ctx.lineTo(left, top + height - radius)
		  // 左下角
			this.ctx.arc(left + radius, top + height - radius, radius, Math.PI * 0.5, Math.PI)
			// border-bottom-left
			this.ctx.lineTo(left, top + radius);
			this.ctx.lineTo(left + radius, top)
			
		  // 这里是使用 fill 还是 stroke都可以，二选一即可，但是需要与上面对应
		  this.ctx.fill()
		  this.ctx.closePath()
		},
    _doRoate(left, top, height, width, deg) {
      this.ctx.translate(left + width / 2, top + height / 2)
      this.ctx.rotate(deg * Math.PI / 180)
    },
    drawImage(params) {
      this.ctx.save()
      const { img, cutImg = false, imgWidth, imgHeight, top = 0, left = 0, width = 0, height = 0, radius = 0, deg = 0 } = params
      if (radius) {
        this._doClip(left, top, width, height, radius)
        this.ctx.clip()
				if(cutImg){
					// 裁剪图片>图片宽高大于海报内容发生变形会用到裁剪
					let cutObj = this.cutImage(imgWidth,imgHeight,width,height);
					this.ctx.drawImage(img,cutObj.x,cutObj.y,cutObj.width,cutObj.height,left,top,width,height);
				}else{
					this.ctx.drawImage(img, left, top, width, height)
				}
      } else {
        if (deg !== 0) {
          this._doRoate(left, top, height, width, deg)
          this.ctx.drawImage(img, -width / 2, -height / 2, width, height)
        } else {
          this.ctx.drawImage(img, left, top, width, height)
        }
      }
      this.ctx.restore()
    },
		cutImage(imgWidth,imgHeight,clipWidth,clipHeight){
			// 根据图片信息，返回不影响图片比例情况下的裁剪尺寸，这里采用短边铺满，长边截取
			let width = null, height = null,x = null, y = null;
			if(imgWidth>=imgHeight){
					let scaleWidth = clipHeight/imgHeight*imgWidth
					width = clipWidth/scaleWidth*imgWidth
					height = imgHeight
					x = (scaleWidth - clipWidth)/2/scaleWidth*imgWidth
					y = 0
			}else{
				let scaleHeight = clipWidth/imgWidth*imgHeight
				width = imgWidth
				height = clipHeight/scaleHeight*imgHeight
				x = 0,
				y = (scaleHeight - clipHeight)/2/scaleHeight*imgHeight
			}
			return {
				width,
				height,
				x,
				y
			};
		},
    // drawQRCode(params) {
    //   this.ctx.save()
    //   const { width = 0, height = 0, left = 0, top = 0, content, background, color } = params
    //   QR.api.draw(content, this.ctx, left, top, width, height, background, color)
    //   this.ctx.restore()
    // },

    // 写字
    drawText(params) {
      this.ctx.save()
      const {
        MaxLineNumber = 2,
        breakWord = false,
        color = 'black',
        content = '',
        fontSize = 16,
        top = 0,
        left = 0,
        lineHeight = 20,
        textAlign = 'left',
        width,
        bolder = false,
        textDecoration = 'none',
        baseline = 'bottom',
        fontWeight = 'normal'
      } = params
      this.ctx.beginPath()
      this.ctx.fillStyle = color
      this.ctx.font = `normal ${fontWeight || 'normal'} ${fontSize}px Arial`;
      //  top + fontSize  解决 this.ctx.textBaseline = 'top'问题
			this.ctx.setTextBaseline(baseline || 'bottom') // 垂直居中
      this.ctx.setTextAlign(textAlign)
      const textTop = top + fontSize
      if (!breakWord) {
        this.ctx.fillText(content, left, textTop)
        this.drawTextLine(left, textTop, textDecoration, color, fontSize, content)
      } else {
        let fillText = '';
        let nextFillText = '';
        let fillTop = textTop
        let lineNum = 1
        for (let i = 0; i < content.length; i++) {
          fillText += [content[i]];
          if(i< content.length) {
            nextFillText = fillText + [content[i]];
          } else {
            nextFillText = fillText;
          }
          if (this.ctx.measureText(nextFillText).width > width) {
            if (lineNum === MaxLineNumber) {
              if (i !== content.length) {
                fillText = fillText.substring(0, fillText.length - 1) + '...'
                this.ctx.fillText(fillText, left, fillTop)
                this.drawTextLine(left, fillTop, textDecoration, color, fontSize, fillText)
                fillText = ''
                break
              }
            }
            this.ctx.fillText(fillText, left, fillTop)
            this.drawTextLine(left, fillTop, textDecoration, color, fontSize, fillText)
            fillText = ''
            fillTop += lineHeight
            lineNum++
          }
        }
        this.ctx.fillText(fillText, left, fillTop)
        this.drawTextLine(left, fillTop, textDecoration, color, fontSize, fillText)
      }
      this.ctx.restore()
      if (bolder) {
        this.drawText({
          ...params,
          left: left + 0.3,
          top: top + 0.3,
          bolder: false,
          textDecoration: 'none'
        })
      }
    },
    // 画直线
    drawTextLine(left, top, textDecoration, color, fontSize, content) {
      if (textDecoration === 'underline') {
        this.drawRect({
          background: color,
          top: top,
          left: left - 1,
          width: this.ctx.measureText(content).width + 3,
          height: 1
        })
      } else if (textDecoration === 'line-through') {
        this.drawRect({
          background: color,
          top: top - fontSize / 3,
          left: left - 1,
          width: this.ctx.measureText(content).width + 3,
          height: 1
        })
      }
    },
    _getAngle(angle) {
      return Number(angle) * Math.PI / 180;
    },
    // 画矩形
    drawRect(params) {
      this.ctx.save()
      const { background = 'white', gradient = [], gradientArea = [0,0,0,0], top = 0, left = 0, width = 0, height = 0, radius = 0, deg = 0 } = params
      this.ctx.fillStyle = background
      if (radius) {
        this._doClip(left, top, width, height, radius)
      } else {
				if(gradient.length !== 0){
					// createLinearGradient的参数对应gradientArea
					// 线性渐变 gradient: [{position: 0,color:'rgba(0,0,0,0)'},{position: 1,color:'rgba(17,17,17,0.6)'}]
					let gradientControl = this.ctx.createLinearGradient(gradientArea[0],gradientArea[1],gradientArea[2],gradientArea[3]);
					gradient.forEach(item => {
						gradientControl.addColorStop(item.position || 0,item.color || 'white');
					});
					this.ctx.fillStyle = gradientControl;
					this.ctx.fillRect(left, top, width, height)
				}else if (deg !== 0) {
          this._doRoate(left, top, height, width, deg)
          this.ctx.fillRect(-width / 2, -height / 2, width, height)
        } else {
          this.ctx.fillRect(left, top, width, height)
        }
        // this.ctx.fillRect(left, top, width, height)
      }
      this.ctx.restore()
    },
    measureText(content, fontSize) {
      this.ctx.font=`normal ${fontSize}px Arial`;
      this.ctx.save();
      const info = this.ctx.measureText(content);
      this.ctx.restore();
      return info;
    }
  }
}

</script>
<style  scoped>
.canvas {
  position: fixed;
  top: -999999px;
  width: 750rpx;
  /* height: 1334rpx; */
  height: 9999px;
	/* z-index: 999999; */
	/* left: 0;
top: 0; */
  /*width: 375rpx;*/
  /*height: 667rpx;*/
}
</style>