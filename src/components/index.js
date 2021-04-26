// 为了节省首次加载资源的损耗，不会造成页面抖动的务必使用懒加载
// 分割线
import header from './header'
export default {
	install: Vue => {
		Vue.component('headers', header)
	}
}