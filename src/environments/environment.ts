// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase:{
     // Initialize Firebase
     apiKey: "AIzaSyAZDYWG9AtuKSm_-qjS-PETBn4lodIhqEU",
     authDomain: "organicshop-new.firebaseapp.com",
     databaseURL: "https://organicshop-new.firebaseio.com",
     projectId: "organicshop-new",
     storageBucket: "organicshop-new.appspot.com",
     messagingSenderId: "494515379269"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


