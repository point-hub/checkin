process.env.VUE_APP_VERSION = require("./package.json").version;

module.exports = {
  devServer: {
    disableHostCheck: true,
    port: 8080,
    overlay: {
      warnings: true,
      errors: true
    }
  },
  configureWebpack: {
    resolve: { symlinks: false }
  },
  pwa: {
    name: "Point Checkin",
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "src/service-worker.js"
    }
  }
};
