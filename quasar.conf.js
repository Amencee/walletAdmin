/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli/quasar-conf-js

/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const { configure } = require('quasar/wrappers');
const path = require('path');

module.exports = configure(function (ctx) {
  return {
    // https://v2.quasar.dev/quasar-cli/supporting-ts
    supportTS: {
      tsCheckerConfig: {
        eslint: {
          enabled: true,
          files: './src/**/*.{ts,tsx,js,jsx,vue}',
        },
      }
    },

    // https://v2.quasar.dev/quasar-cli/prefetch-feature
    // preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://v2.quasar.dev/quasar-cli/boot-files
    boot: [
      'i18n',
      'axios',
      'booting-misc',
    ],

    // https://v2.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
    css: [
      'app.scss'
    ],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      // 'mdi-v5',
      // 'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font', // optional, you are not bound to it
      'material-icons', // optional, you are not bound to it
    ],

    // Full list of options: https://v2.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
    build: {
      devtool: 'source-map',
      vueRouterMode: 'history', // available values: 'hash', 'history'

      // transpile: false,

      // Add dependencies for transpiling with Babel (Array of string/regex)
      // (from node_modules, which are by default not transpiled).
      // Applies only if "transpile" is set to true.
      // transpileDependencies: [],

      // rtl: false, // https://v2.quasar.dev/options/rtl-support
      // preloadChunks: true,
      // showProgress: false,
      // gzip: true,
      // analyze: true,

      // Options below are automatically set depending on the env, set them if you want to override
      // extractCSS: false,

      // https://v2.quasar.dev/quasar-cli/handling-webpack
      // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
      chainWebpack(chain) {
        if (ctx.mode.capacitor) {
          chain.resolve.alias.set('net', path.resolve(__dirname, 'node_modules/net-browserify'))
          chain.resolve.alias.set('tls', path.resolve(__dirname, 'node_modules/tls-browserify'))
        }
      },
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
    devServer: {
      // https: true,
      port: 8080,
      open: true // opens browser window automatically
    },

    // https://v2.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
    framework: {
      config: {
        dark: false, // or Boolean true/false
        capacitor: {
          iosStatusBarPadding: true,// Quasar handles app exit on mobile phone back button.
          backButtonExit: true / '*' / ['/login', '/home', '/my-page'],
          // On the other hand, the following completely
          // disables Quasar's back button management.
          backButton: true // add the dynamic top padding on iOS mobile devices
        }
      },

      // iconSet: 'material-icons', // Quasar icon set
      // lang: 'en-US', // Quasar language pack

      // For special cases outside of where the auto-import stategy can have an impact
      // (like functional components as one of the examples),
      // you can manually specify Quasar components/directives to be available everywhere:
      //
      // components: [],
      // directives: [],

      // Quasar plugins
      plugins: [
        'Notify', 'Dialog', 'Loading', 'LoadingBar',
        'LocalStorage', 'SessionStorage'
      ]
    },

    // animations: 'all', // --- includes all animations
    // https://v2.quasar.dev/options/animations
    animations: [],

    // https://v2.quasar.dev/quasar-cli/developing-ssr/configuring-ssr
    ssr: {
      pwa: false,
      // manualStoreHydration: true,
      prodPort: 3000, // The default port that the production server should use
      // (gets superseded if process.env.PORT is specified at runtime)

      maxAge: 1000 * 60 * 60 * 24 * 30,
      // Tell browser when a file from the server should expire from cache (in ms)

      chainWebpackWebserver(/* chain */) {
        //
      },

      middlewares: [
        ctx.prod ? 'compression' : '',
        'render' // keep this as last one
      ]
    },

    // https://v2.quasar.dev/quasar-cli/developing-pwa/configuring-pwa
    pwa: {
      workboxPluginMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
      workboxOptions: {}, // only for GenerateSW

      // for the custom service worker ONLY (/src-pwa/custom-service-worker.[js|ts])
      // if using workbox in InjectManifest mode
      chainWebpackCustomSW(/* chain */) {
        //
      },

      manifest: {
        name: 'ChainbowAdmin',
        short_name: 'ChainbowAdmin',
        description: 'ChainbowAdmin',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            src: 'icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: 'icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true,
      iosStatusBarPadding: true,
      capacitorCliPreparationParams: ['sync', ctx.targetName],
      appName: 'ChainbowAdmin'
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
    electron: {
      bundler: 'builder', // 'packager' or 'builder'

      // packager: {
      //   // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

      //   // OS X / Mac App Store
      //   // appBundleId: '',
      //   // appCategoryType: '',
      //   // osxSign: '',
      //   // protocol: 'myapp://path',

      //   // Windows only
      //   // win32metadata: { ... }
      // },

      builder: {
        // https://www.electron.build/configuration/configuration
        appId: 'io.chainbow.admin',
        productName: 'ChainBow',
        copyright: 'Copyright © 2021 ChainBow Co. Ltd.',
        protocols: {
          name: 'ChainbowAdmin',
          schemes: ['chainbow', 'bitcoin']
        },
        mac: {
          category: 'public.app-category.productivity',
          artifactName: '${productName}-${version}-${os}.${ext}',
          target: [
            'dmg',
            'zip'
          ],
          publish: ['github']
        },
        win: {
          target: 'nsis',
          icon: 'build/icon.ico',
          artifactName: '${productName}-${version}-${os}.${ext}',
          publish: ['github']
        },
        linux: {
          target: 'AppImage',
          publish: ['github']
        },
        nsis: {
          deleteAppDataOnUninstall: true,
          createDesktopShortcut: 'always'
          // include: 'nsis.nsh'
        },
        publish: null
        // publish: {
        //   'provider': 's3',
        //   'bucket': 'myS3bucket'
        // }
      },

      // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: true,

      // was renamed from chainWebpack()
      chainWebpackMain(chain) {
      },

      // was renamed from extendWebpack()
      extendWebpackMain(cfg) {
        cfg.devtool = 'source-map'
        console.log(cfg)
      },

      // New!
      chainWebpackPreload(chain) {
      },

      // New!
      extendWebpackPreload(cfg) { /* ... */ },
    }
  }
});
