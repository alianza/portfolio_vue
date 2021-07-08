const path = require("path");

const vueSrc = "./src";

module.exports = {
    pwa: {
        name: 'Jan-Willem van Bremen - Portfolio',
        themeColor: '#fff',
        msTileColor: '#fff',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'default',
        manifestPath: 'manifest.json',
        workboxOptions: {
            exclude: [/_redirects/]
        }
    },
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.md$/,
                    use: [
                        {
                            loader: 'html-loader'
                        },
                        {
                            loader: 'markdown-loader',
                            options: { }
                        }
                    ]
                }
            ],
        },
        resolve: {
            alias: {
                "@": path.join(__dirname, vueSrc)
            }
        }
    },
    css: {
        loaderOptions: {
            sass: {
                additionalData: `
          @import "@/css/_variables.scss";
        `
            }
        }
    }
}
