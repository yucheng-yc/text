<template>
	<cover-view  v-if="isShow" catchtouchmove=true class="container" :style="{backgroundColor:bgcolor, width:screenInfo.width+'px', height:screenInfo.height+'px'}">
		<!-- 阴影块 -->
		<cover-view class="shadow" v-for="(s,sIndex) in shadowList" :key='sIndex' :style="{top:s.top+'px', left:s.left+'px', width:s.width+'px', height:s.height+'px'}"></cover-view >
		<!-- 矩形 -->
		<cover-view  class="rect" v-for="(r,rIndex) in rectList" :key='rIndex' :style="{top:r.top+'px', left:r.left+'px', width:r.width+'px', height:r.height+'px'}"></cover-view >
		<!-- 圆角矩形 -->
		<cover-view  class="rect radius" v-for="(rr,rrIndex) in rectRadiusList" :key='rrIndex' :style="{top:rr.top+'px', left:rr.left+'px', width:rr.width+'px', height:rr.height+'px'}"></cover-view >
		<!-- 圆形 -->
		<cover-view  class="round" v-for="(rd,rdIndex) in roundList" :key='rdIndex' :style="{top:rd.top+'px', left:rd.left+'px', width:rd.width+'px', height:rd.height+'px'}"></cover-view >
	</cover-view >
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			},
			bgcolor: {
				type: String,
				default: '#fff'
			},
		},
		data() {
			return {
				isShow: false,
        screenInfo: {},
        shadowList: [],
        rectList: [],
        rectRadiusList: [],
        roundList: []   
			}
		},
		watch: {
			show: {
				handler(flag) {
					this.isShow = flag
					if (flag) {
						this.getScreenInfo()
						// this.draws()
					}
				},
				immediate: true,
			},
		},
		methods: {
      clearAll() {
        const filterList = (list) => {
          return list.filter(item => item.noDel)
        }
        this.shadowList = filterList(this.shadowList)
        this.rectList = filterList(this.rectList)
        this.rectRadiusList = filterList(this.rectRadiusList)
        this.roundList = filterList(this.roundList)
      },
			getScreenInfo() {
				const info = uni.getSystemInfoSync()
				this.screenInfo = {
					width: info.windowWidth,
					height: info.windowHeight
				}
      },
      update(key, value) {
        this[key].push(...value)
      },
			draws() {
				let _this = this
				this.$nextTick(function() {
					_this.drawShadow()
          _this.drawRect()
					_this.drawRectRadius()
					_this.drawRound()

				})
			},
			// 绘制矩形
			drawRect() {
				uni.createSelectorQuery().in(this.$parent).selectAll('.skeleton-rect').boundingClientRect().exec(rects => {
          this.rectList = rects[0]
				})
			},
			// 绘制圆角矩形
			drawRectRadius() {
				uni.createSelectorQuery().in(this.$parent).selectAll('.skeleton-rect-radius').boundingClientRect().exec(rects => {
					this.rectRadiusList = rects[0]
				})
			},
			// 绘制圆形
			drawRound() {
				uni.createSelectorQuery().in(this.$parent).selectAll('.skeleton-round').boundingClientRect().exec(rects => {
					this.roundList = rects[0]
				})
			},
			// 绘制阴影块
			drawShadow() {
				uni.createSelectorQuery().in(this.$parent).selectAll('.skeleton-shadow').boundingClientRect().exec(rects => {
					this.shadowList = rects[0]
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 999;
		overflow: hidden;

		.shadow {
			position: absolute;
			background: #F2F3F5;
		}

		.rect {
			position: absolute;
			background: #F8F9FB;
		}

		.round {
			position: absolute;
			background: #F8F9FB;
			border-radius: 50%;
		}

		.radius {
			border-radius: 14rpx;
		}

	}
</style>
