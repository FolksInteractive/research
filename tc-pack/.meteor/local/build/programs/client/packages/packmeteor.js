//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
//                                                                      //
// If you are using Chrome, open the Developer Tools and click the gear //
// icon in its lower right corner. In the General Settings panel, turn  //
// on 'Enable source maps'.                                             //
//                                                                      //
// If you are using Firefox 23, go to `about:config` and set the        //
// `devtools.debugger.source-maps-enabled` preference to true.          //
// (The preference should be on by default in Firefox 24; versions      //
// older than 23 do not support source maps.)                           //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var Reload = Package.reload.Reload;
var Deps = Package.deps.Deps;

/* Package-scope variables */
var Packmeteor;

(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// packages/packmeteor/meteor/packmeteor-client.js                                                //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
Packmeteor = {                                                                                    // 1
  chrome: {},                                                                                     // 2
  cordova: {}                                                                                     // 3
};                                                                                                // 4
                                                                                                  // 5
// Cordova device ready dependency                                                                // 6
var deviceReady = false;                                                                          // 7
var deviceReadyDeps = new Deps.Dependency();                                                      // 8
                                                                                                  // 9
// Chrome packaged apps                                                                           // 10
var chromePackagedApp = (typeof chrome !== 'undefined' && typeof chrome.runtime !== 'undefined'); // 11
                                                                                                  // 12
Packmeteor.chrome.isReady = function() {                                                          // 13
  return chromePackagedApp;                                                                       // 14
};                                                                                                // 15
                                                                                                  // 16
Packmeteor.cordova.isReady = function() {                                                         // 17
  deviceReadyDeps.depend();                                                                       // 18
  return deviceReady;                                                                             // 19
};                                                                                                // 20
                                                                                                  // 21
// Listen to the cordova event                                                                    // 22
document.addEventListener("deviceready", function() {                                             // 23
  deviceReady = true;                                                                             // 24
  deviceReadyDeps.changed();                                                                      // 25
}, false);                                                                                        // 26
////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package.packmeteor = {
  Packmeteor: Packmeteor
};

})();

//# sourceMappingURL=83340f0dc4ad6bb1c946736dbfaaaf41653851be.map
