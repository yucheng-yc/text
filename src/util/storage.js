import { UNIQUELY_IDENTIFIES } from '@/config'
class Storage {
  static prefix = UNIQUELY_IDENTIFIES
  static get(key) {
		const value = uni.getStorageSync(`${Storage.prefix}_${key}`);
		return value
	}
	static set(key, value) {
		uni.setStorageSync(`${Storage.prefix}_${key}`, value);
	}
  static remove(key) {
		uni.removeStorageSync(`${Storage.prefix}_${key}`);
	}
	static clearAll() {
		uni.clearStorageSync();
	}
}
export default Storage