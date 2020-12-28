import Storage from '@/util/storage'
export default {
  methods: {
    // 页面标题
    _setTitle (title) {
      console.log(title);
    },
    // 埋点
    _eventTracking({name}) {
    },
    // 分享上报
    _shareReport() {},
    _get(key) {
      return Storage.get(key)
    },
    _set(key, value) {
      Storage.set(key, value)
    },
    _remove(key) {
      Storage.remove(key)
    },
    _clearAll() {
      Storage.clearAll(key)
    },
    _navTo(url) {
      console.log('coming');
      uni.navigateTo({
        url: url
      });
    }
  }
}