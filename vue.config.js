const path = require('path')
const glob = require('glob') // 用于筛选文件

const base = {
	isProd: process.env.NODE_ENV === 'production',
	// ！！重要！！发布后的项目地址
	href: '',
	// 项目页面title
	name: '兰陵王 - 后台管理系统',
	// 目标接口域名
	target: 'https://lanling.diumx.com'
}
// 工厂函数 - 配置pages实现多页面获取某文件夹下的html与js
function handleEntry(entry) {
	let entries = {}
	let entryBaseName = ''
	let entryPathName = ''
	let entryTemplate = ''
	let applicationName = ''

	glob.sync(entry).forEach(item => {
		entryBaseName = path.basename(item, path.extname(item))
		entryTemplate = item.split('/').splice(-3)
		entryPathName = entryBaseName

		entries[entryPathName] = {
			entry: 'src/' + entryTemplate[0] + '/' + entryTemplate[1] + '/main.js',
			template: 'src/' + entryTemplate[0] + '/' + entryTemplate[1] + '/' + entryTemplate[2],
			filename: entryTemplate[2],
			chuhnks: base.isProd ? ['vue', 'mainfest', 'vant', 'components', entryTemplate[2]] : undefined
		}
	})

	return entries
}

let pages = handleEntry('./src/pages/**?/*.html')
module.exports = {
	pages: {
		index: {
			entry: 'src/main.js',
			filename: 'index.html',
			template: 'src/index.html',
			chunks: base.isProd ? ['vue', 'mainfest', 'vant', 'components', 'index'] : undefined
		},
		...pages
	},
	devServer: {
		host: process.env.HOST,
		port: process.env.PORT && Number(process.env.PORT),
		open: false,
		overlay: {
			warnings: false,
			errors: true
		},
		/*配置首页 入口链接*/
		/* before: app => {
			app.get('/', (req, res, next) => {
				for (let i in pages) {
					res.write(`<a target="_self" href="/${i}">/${i}</a></br>`);
				}
				res.end()
			})
		}, */
		proxy: {
			// 项目接口
			'/api': {
				target: base.target,
				changeOrigin: true, //是否跨域
				pathRewrite: {
					'^/api': '/api' //重写接口
				},
				cookieDomainRewrite: ''
			},
			// 测试环境登录接口用，发布后用不到
			'/sso': {
				target: base.target,
				changeOrigin: true, //是否跨域
				pathRewrite: {
					'^/sso': '/sso' //重写接口
				},
				cookieDomainRewrite: ''
			}
		}
	},
	chainWebpack(config) {
		config.set('name', base.name)
		config.when(base.isProd, config => {
			config.optimization.splitChunks({
				chunks: 'all',
				cacheGroups: {
					vant: {
						name: 'vant',
						test: /[\\/]node_modules[\\/]vant[\\/]/,
						chunks: 'all',
						reuseExistingChunk: false,
						enforce: true,
						priority: 1
					},
					mainfest: {
						name: 'mainfest',
						test: /[\\/]assets[\\/]css[\\/]/,
						chunks: 'all',
						reuseExistingChunk: false,
						enforce: true,
						priority: 1
					},
					vue: {
						name: 'vue',
						test: /[\\/]node_modules[\\/]vue[\\/]/,
						chunks: 'all',
						reuseExistingChunk: false,
						enforce: true,
						priority: 1
					},
					components: {
						name: 'components',
						test: /[\\/]components[\\/]/,
						chunks: 'all',
						reuseExistingChunk: false,
						enforce: true,
						priority: 1
					}
				}
			})
		})
	},
	configureWebpack: {
		resolve: {
			alias: {
				'@$': path.resolve('src'),
				'@assets': path.resolve('src/assets'),
				'@img': path.resolve('src/assets/img'),
				'@views': path.resolve('src/views'),
				'@components': path.resolve('src/components'),
				'@api': path.resolve('src/api'),
				'@configs': path.resolve('src/configs'),
				'@utils': path.resolve('src/utils')
			}
		}
	},
	publicPath: base.isProd ? base.href : '/',
	lintOnSave: false,
	productionSourceMap: !base.isProd,
	css: {
		extract: true
	}
}