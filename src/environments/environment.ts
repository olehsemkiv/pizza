// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'semkiv-pizza',
    appId: '1:122734784701:web:ccc8e4d8fa036b5e0fc7d4',
    storageBucket: 'semkiv-pizza.appspot.com',
    apiKey: 'AIzaSyAiNXvaS2xB5oltJQR5BLTQXAQ6stdZf4A',
    authDomain: 'semkiv-pizza.firebaseapp.com',
    messagingSenderId: '122734784701',
  },
  production: false,
  TELEGRAM_KEY: {
    url: 'https://api.telegram.org/bot6230237805:AAEHDNFus3U5u14iaaHl-BBcZEdpudpkHtk/sendMessage',
    chatID: '-1001952516802'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
