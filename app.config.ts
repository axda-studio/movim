import { ConfigContext, ExpoConfig } from 'expo/config';

// App production config
const APP_NAME = 'Movim';
const BUNDLE_IDENTIFIER = 'com.axdastudio.movim';
const PACKAGE_NAME = 'com.axdastudio.movim';
const SCHEME = 'movim';

const IOS_ICON = (env: 'development' | 'preview' | 'production') => ({
  dark: `./assets/images/ios-dark-icon${env !== 'production' ? `--${env}` : ''}.png`,
  light: `./assets/images/ios-light-icon${env !== 'production' ? `--${env}` : ''}.png`,
  tinted: `./assets/images/ios-tinted-icon${env !== 'production' ? `--${env}` : ''}.png`,
});

const ANDROID_ICON = (env: 'development' | 'preview' | 'production') => ({
  foregroundImage: `./assets/images/android-adaptive-icon${
    env !== 'production' ? `--${env}` : ''
  }.png`,
  monochromeImage: `./assets/images/android-adaptive-icon${
    env !== 'production' ? `--${env}` : ''
  }.png`,
  backgroundColor: '#ffffff',
});

const SPLASH_ICON = (env: 'development' | 'preview' | 'production') => ({
  dark: `./assets/images/splash-dark-icon${env !== 'production' ? `--${env}` : ''}.png`,
  light: `./assets/images/splash-light-icon${env !== 'production' ? `--${env}` : ''}.png`,
});

export const getDynamicAppConfig = (environment: 'development' | 'preview' | 'production') => {
  if (environment === 'development') {
    return {
      name: `${APP_NAME} Dev`,
      bundleIdentifier: `${BUNDLE_IDENTIFIER}.dev`,
      packageName: `${PACKAGE_NAME}.dev`,
      iosIcon: IOS_ICON(environment),
      androidIcon: ANDROID_ICON(environment),
      splashIconDark: SPLASH_ICON(environment).dark,
      splashIconLight: SPLASH_ICON(environment).light,
      scheme: `${SCHEME}-dev`,
    };
  }

  if (environment === 'preview') {
    return {
      name: `${APP_NAME} Prev`,
      bundleIdentifier: `${BUNDLE_IDENTIFIER}.preview`,
      packageName: `${PACKAGE_NAME}.preview`,
      iosIcon: IOS_ICON(environment),
      androidIcon: ANDROID_ICON(environment),
      splashIconDark: SPLASH_ICON(environment).dark,
      splashIconLight: SPLASH_ICON(environment).light,
      scheme: `${SCHEME}-prev`,
    };
  }

  return {
    name: APP_NAME,
    bundleIdentifier: BUNDLE_IDENTIFIER,
    packageName: PACKAGE_NAME,
    iosIcon: IOS_ICON(environment),
    androidIcon: ANDROID_ICON(environment),
    splashIconDark: SPLASH_ICON(environment).dark,
    splashIconLight: SPLASH_ICON(environment).light,
    scheme: SCHEME,
  };
};

export default ({ config }: ConfigContext): ExpoConfig => {
  console.log('⚙️ Building app for environment:', process.env.APP_VARIANT);
  const {
    name,
    bundleIdentifier,
    iosIcon,
    androidIcon,
    packageName,
    scheme,
    splashIconDark,
    splashIconLight,
  } = getDynamicAppConfig(
    (process.env.APP_VARIANT as 'development' | 'preview' | 'production') || 'production'
  );

  return {
    ...config,
    scheme,
    name: name,
    slug: 'movim',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    splash: {
      image: splashIconDark,
      imageWidth: 200,
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
      dark: {
        image: splashIconLight,
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor: '#000000',
      },
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      ...config.ios,
      supportsTablet: true,
      bundleIdentifier: bundleIdentifier,
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
      icon: iosIcon,
    },
    android: {
      ...config.android,
      edgeToEdgeEnabled: true,
      adaptiveIcon: androidIcon,
      package: packageName,
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    plugins: ['expo-router'],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {},
      eas: {
        projectId: 'e75f7427-0269-4fe2-9ac6-495dcc561265',
      },
    },
    owner: 'axda-studio',
    runtimeVersion: '1.0.0',
    updates: {
      url: 'https://u.expo.dev/e75f7427-0269-4fe2-9ac6-495dcc561265',
    },
  };
};
