module.exports = {
    //使打包项目后不包含map文件
    productionSourceMap: false,
    // 关闭 严格模式
    lintOnSave: false,
    // /* 代理跨域 */
    devServer: {
        proxy: {
            // target 目标 服务器地址
            '/api': {target: 'http://gmall-h5-api.atguigu.cn'}
        }
    },

}
