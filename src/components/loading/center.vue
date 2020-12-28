<template>
  <div class="box" :style="{height: height + 'px'}">
    <div class="loader">
      <div class="loader-inner ball-spin-fade-loader">
        <div class="div div1"></div>
        <div class="div div2"></div>
        <div class="div div3"></div>
        <div class="div div4"></div>
        <div class="div div5"></div>
        <div class="div div6"></div>
        <div class="div div7"></div>
        <div class="div div8"></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        height: uni.getSystemInfoSync().windowHeight
      }
    }
  }
</script>
<style lang="scss" scoped>
$rate: 1;
.box {
    width: 750rpx;
    height: 100vh;
    z-index: 9999999999;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0);
    display: flex;
    align-items: center;
    justify-content: center;
}
.loader {
  width:118rpx;
  height:118rpx;
  background:rgba(255,255,255,1);
  box-shadow:0 4rpx 8rpx 0 rgba(195,195,195,0.5);
  border-radius:32rpx;
}
@-webkit-keyframes ball-spin-fade-loader {
  50% {
    opacity: 0.3;
    -webkit-transform: scale(0.4);
            transform: scale(0.4); }
  100% {
    opacity: 1;
    -webkit-transform: scale(1);
            transform: scale(1); } }

@keyframes ball-spin-fade-loader {
  50% {
    opacity: 0.3;
    -webkit-transform: scale(0.4);
            transform: scale(0.4); }
  100% {
    opacity: 1;
    -webkit-transform: scale(1);
            transform: scale(1); } }

.ball-spin-fade-loader {
  top: 45rpx;
  left: 48rpx;
  position: relative;}
  .ball-spin-fade-loader .div1 {
    top: 9.9999999px;
    left: 0;
            animation: ball-spin-fade-loader 1s -0.96s infinite linear; }
  .ball-spin-fade-loader .div2 {
    top: 6.818178px;
    left: 6.818178px;
            animation: ball-spin-fade-loader 1s -0.84s infinite linear; }
  .ball-spin-fade-loader .div3 {
    top: 0;
    left: 9.9999999px;
            animation: ball-spin-fade-loader 1s -0.72s infinite linear; }
  .ball-spin-fade-loader .div4 {
    top: -6.818178px;
    left: 6.818178px;
            animation: ball-spin-fade-loader 1s -0.6s infinite linear; }
  .ball-spin-fade-loader .div5 {
    top: -9.9999999px;
    left: 0;
            animation: ball-spin-fade-loader 1s -0.48s infinite linear; }
  .ball-spin-fade-loader .div6 {
    top: -6.818178px;
    left: -6.818178px;
            animation: ball-spin-fade-loader 1s -0.36s infinite linear; }
  .ball-spin-fade-loader .div7 {
    top: 0;
    left: -9.9999999px;
            animation: ball-spin-fade-loader 1s -0.24s infinite linear; }
  .ball-spin-fade-loader .div8 {
    top: 6.818178px;
    left: -6.818178px;
            animation: ball-spin-fade-loader 1s -0.12s infinite linear; }
  .ball-spin-fade-loader .div {
    background-color: #acacac;
    width: 6px;
    height: 6px;
    border-radius: 100%;
    margin: 2px;
            animation-fill-mode: both;
    position: absolute; }
</style>