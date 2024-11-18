import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'org.nativescript.petgrooming',
  appPath: 'app',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none'
  },
  webpackConfigPath: 'webpack.config.js',
  ios: {
    discardUncaughtJsExceptions: true
  }
} as NativeScriptConfig;