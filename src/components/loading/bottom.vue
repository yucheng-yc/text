<template>
	<view class="load-container">
		<template>
			<div class="load-animation">
				<div class="load">
					<div class="load-1"></div>
					<div class="load-2"></div>
					<div class="load-3"></div>
					<div class="load-4"></div>
					<div class="load-5"></div>
					<div class="load-6"></div>
					<div class="load-7"></div>
					<div class="load-8"></div>
				</div>
			 <div class="circlebg"></div>
			</div>
		</template>
		<div class="load-text">{{title}}</div>
	</view>
</template>

<script>
export default {
  props: {
    bgColor: {
      type: String,
      default: '#ffffff'
    },
    title: {
      type: String,
      default: '加载中'
    }
  }
}
</script>

<style lang="scss" scoped>
.load-container{
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
  padding: 30rpx 0 50rpx 0;
  background: rgba($color: #000000, $alpha: 0);
}
.load-text{
	font-size:28rpx;
	font-family:Source Han Sans CN;
	font-weight:400;
	color:#666;
	line-height:48rpx;
	margin-left: 20rpx;
}
.loading{
	width: 32rpx;
	height: 32rpx;
	font-size: 0;
	image{
		width: 100%;
		height: 100%;
	}
}
.load-animation{
	width: 32rpx;
	height: 32rpx;
	position: relative;
	font-size: 0;
	padding: 0;
	margin: 0;
	.circlebg{
		position:absolute;
		left:50%;
		top:50%;
		width:12rpx;
		height:12rpx;
		transform: translate(-50%, -50%);
		background:#F0F0F0;
		border-radius:100%;
	}
	.load{
		width: 100%;
		height: 100%;
		position: relative;
		._div{
			width: 2rpx;
			height: 8rpx;
			background: #333;
			position: absolute;
			margin: 2rpx;
			margin-top: -4rpx;
			margin-left: -1rpx;
			border-radius: 0;
		}
	}
	@keyframes loadAnimation {
		50% {
			opacity: .2
		}

		100% {
			opacity: 1
		}
	}
	.load-1{
		top: 15%;
		left: 50%;
		transform: rotate(0deg);
		animation: loadAnimation 0.8s 0.1s ease infinite;
	}
	.load-2{
		top: 25.2512626585%;
		left: 74.7487373415%;
		transform: rotate(45deg);
		animation: loadAnimation 0.8s 0.2s ease infinite;
	}
	.load-3{
		top: 50%;
		left: 85%;
		transform: rotate(90deg);
		animation: loadAnimation 0.8s 0.3s ease infinite;
	}
	.load-4{
		top: 74.7487373415%;
		left: 74.7487373415%;
		transform: rotate(135deg);
		animation: loadAnimation 0.8s 0.4s ease infinite;
	}
	.load-5{
		top: 84.9999999974%;
		left: 50.0000000004%;
		transform: rotate(180deg);
		animation: loadAnimation 0.8ss 0.5s ease infinite;
	}
	.load-6{
		top: 74.7487369862%;
		left: 25.2512627193%;
		transform: rotate(225deg);
		animation: loadAnimation 0.8s 0.6s ease infinite;
	}
	.load-7{
		top: 49.9999806189%;
		left: 15.0000039834%;
		transform: rotate(270deg);
		animation: loadAnimation 0.8s 0.7s ease infinite;
	}
	.load-8{
		top: 25.2506949798%;
		left: 25.2513989292%;
		transform: rotate(315deg);
		animation: loadAnimation 0.8s 0.8s ease infinite;
	}
}
</style>