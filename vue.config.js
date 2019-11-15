const path = require('path')
const webpack = require('webpack')

function resolve(dir) {
    return path.join(__dirname, dir)
}

// vue.config.js
module.exports = {
    publicPath: '/pcg/',
    /*
      Vue-cli3:
      Crashed when using Webpack `import()` #2463
      https://github.com/vuejs/vue-cli/issues/2463

     */
    /*
    pages: {
      index: {
        entry: 'src/main.js',
        chunks: ['chunk-vendors', 'chunk-common', 'index']
      }
    },
    */
    configureWebpack: {
        plugins: [
            // Ignore all locale files of moment.js
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
        ]
    },

    chainWebpack: (config) => {
        config.resolve.alias
            .set('@$', resolve('src'))
            .set('@api', resolve('src/api'))
            .set('@assets', resolve('src/assets'))
            .set('@comp', resolve('src/components'))
            .set('@views', resolve('src/views'))
            .set('@layout', resolve('src/layout'))
            .set('@static', resolve('src/static'))

        const svgRule = config.module.rule('svg')
        svgRule.uses.clear()
        svgRule
            .oneOf('inline')
            .resourceQuery(/inline/)
            .use('vue-svg-icon-loader')
            .loader('vue-svg-icon-loader')
            .end()
            .end()
            .oneOf('external')
            .use('file-loader')
            .loader('file-loader')
            .options({
                name: 'assets/[name].[hash:8].[ext]'
            })
        /* svgRule.oneOf('inline')
          .resourceQuery(/inline/)
          .use('vue-svg-loader')
          .loader('vue-svg-loader')
          .end()
          .end()
          .oneOf('external')
          .use('file-loader')
          .loader('file-loader')
          .options({
            name: 'assets/[name].[hash:8].[ext]'
          })
        */
    },

    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    /* less 变量覆盖，用于自定义 ant design 主题 */

                    /*
                    'primary-color': '#F5222D',
                    'link-color': '#F5222D',
                    'border-radius-base': '4px',
                    */
                },
                javascriptEnabled: true
            }
        }
    },

    devServer: {
        // development server port 8000
        port: 8000,
        proxy: {
            '/pcg/socket/*': {
                // target: 'ws://127.0.0.1:8180',
                target: 'http://10.112.28.146:8180', //guagndong
                ws: true,
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/pcg/socket': ''
                }
            },
            '/pcg/api': {
                // target: 'http://cfe-tst.lenovo.com/pcg/api',
                target: 'http://10.122.48.110:8180',
                //target: 'http://10.112.28.146:8180', //guagndong
                // target: 'http://10.112.9.67:8180', //tongpan
                //  target: 'http://10.112.75.116:8180', //xiufang
                // target: 'http://10.112.53.192:8180',//xiangyue
                // target: 'http://10.112.65.147:8180',//zhenpu
                // target: 'http://127.0.0.1:8180',
                ws: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/pcg/api': ''
                }
            },
            /*'/pcg/api': {
              // target: 'https://mock.ihx.me/mock/5baf3052f7da7e07e04a5116/antd-pro',//
              target: 'https://mock.ihx.me/mock/5baf3052f7da7e07e04a5116/antd-pro',
              ws: false,
              changeOrigin: true
            }*/
        }
    },

    lintOnSave: undefined,
    // babel-loader no-ignore node_modules/*
    transpileDependencies: []
}
