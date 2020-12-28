<template>
	<view class="content">
    <skeleton ref='skeleton' :show='skeletonLoading'></skeleton>
		<view>
			<text class="title skeleton-rect">{{title}}</text>
			<br>
			<text class="title skeleton-rect">{{name}}</text>
			<br>
			<text class="title skeleton-rect">{{$t('name')}}</text>
		</view>
		<view class="box">
			<view class="content1 skeleton-rect" @click="_navTo('/pages/main/page/index')">
				跳转
		  </view>
<!--  #ifdef   H5  -->
			<view class="skeleton-rect">{{token}}</view>
<!--  #endif    -->
      <view class="skeleton-rect">
        <jyf-parser :html="html"/>
      </view>
		</view>

	</view>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Time from '@/util/time'
	export default {
		data() {
			return {
				title: 'Hello',
				name: '',
        html: '<h3>富文本h3标签</h3>',
        skeletonLoading: true
			}
		},
		computed: {
			...mapGetters({
				token: 'token'
			})
		},
		onLoad() {
			this.name = this.$t('name')
			console.log(this.$store.state);
			this._set('name', 'enchanter')
      console.log(Time.parseTime('1608822305'))
		},
    mounted() {
      setTimeout(() => {
        this.skeletonLoading = false;
      }, 1500)
      this.$refs.skeleton.draws()
    },
    methods: {
			reverse(str) {
				return str.split('').reverse().join('')
			}
		}
	}
</script>

<style lang="scss" scoped>
@import "@/style/variable.scss";
.box {
	.content1 {
		color: $primary-color;
	}
}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin: 200rpx auto 50rpx auto;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
