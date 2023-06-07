const { defineConfig } = require("@vue/cli-service");
// const BundleAnalyzerPlugin =
//   require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = defineConfig({
  // webpack 분석용
  // configureWebpack: {
  //   plugins: [new BundleAnalyzerPlugin()],
  // },

  //webpack 사이즈 최적화
  chainWebpack: (config) => {
    config.plugins.delete("prefetch");
    config.plugins.delete("preload");
  },
  //babel 관련 설정
  transpileDependencies: true,
  //cors 해결
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000/api",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
  assetsDir: "users",
  //배포파일 경로 지정
  outputDir: "../back/public/",
});
