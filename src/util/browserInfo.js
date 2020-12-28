const browser = {
  versions: (function () {
    const u = navigator.userAgent.toLowerCase();
    return {
      //移动终端浏览器版本信息
      trident: u.indexOf('Trident') > -1, //IE内核
      presto: u.indexOf('Presto') > -1, //opera内核
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
      mobile: /Android|webOS|iPhone|iPod|BlackBerry/i.test(u), //是否为移动终端
      pc: !(/Android|webOS|iPhone|iPod|BlackBerry/i.test(u)),
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端
      iPhone: u.indexOf('iPhone') > -1, //是否为iPhone
      iPhoneX: u.indexOf('iPhone') > -1 && screen.height == 812 && screen.width == 375,
      iPad: u.indexOf('iPad') > -1, //是否iPad
      webApp: u.indexOf('Safari') == -1,
      weixin: u.match(/MicroMessenger/i), //是否是微信环境
      weibo: u.match(/WeiBo/i),
      mate20: u.match(/HUAWEILYA/i) == 'HUAWEILYA',
      mqqbrowse: u.indexOf('mqqbrowse') > -1
    }
  })(),
  language: (navigator.browserLanguage || navigator.language).toLowerCase(),
  width: window.innerWidth,
  height: window.innerHeight,
  h5Browsers: ['weibo', 'weixin', 'facebook']
};
const isMate20 = browser.versions.mate20
const isWeixin = browser.versions.weixin
const iPhoneX = browser.versions.iPhoneX
const isWeibo = browser.versions.weibo
const isPc = browser.versions.pc

export {
	browser,
	isMate20,
  isWeixin,
  isWeibo,
  iPhoneX,
	isPc
}