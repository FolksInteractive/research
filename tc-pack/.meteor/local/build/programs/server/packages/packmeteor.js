(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var WebApp = Package.webapp.WebApp;
var main = Package.webapp.main;
var WebAppInternals = Package.webapp.WebAppInternals;
var RoutePolicy = Package.routepolicy.RoutePolicy;
var _ = Package.underscore._;

/* Package-scope variables */
var Packmeteor;

(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/packmeteor/meteor/packmeteor-server.js                   //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
var crypto = Npm.require('crypto');                                  // 1
var fs = Npm.require('fs');                                          // 2
var path = Npm.require('path');                                      // 3
                                                                     // 4
                                                                     // 5
var beforeFiles = [];                                                // 6
var afterFiles = [];                                                 // 7
                                                                     // 8
Packmeteor = {                                                       // 9
  config: function(options) {                                        // 10
                                                                     // 11
  },                                                                 // 12
  addFile: function(url, before) {                                   // 13
    if (before) {                                                    // 14
      beforeFiles.push(url);                                         // 15
    } else {                                                         // 16
      afterFiles.push(url);                                          // 17
    }                                                                // 18
  }                                                                  // 19
};                                                                   // 20
                                                                     // 21
WebApp.connectHandlers.use(function(req, res, next) {                // 22
  if (req.url !== '/packmeteor.manifest') {                          // 23
    return next();                                                   // 24
  }                                                                  // 25
                                                                     // 26
  var manifest = '#PACKMETEOR\n';                                    // 27
                                                                     // 28
  manifest += '/' + '\n';                                            // 29
                                                                     // 30
  _.each(WebApp.clientProgram.manifest, function (resource) {        // 31
    if (resource.where === 'client') {                               // 32
                                                                     // 33
      var url = resource.url.split('?')[0];                          // 34
      manifest += url + '\n';                                        // 35
    }                                                                // 36
  });                                                                // 37
                                                                     // 38
  manifest += '#BEFORE\n';                                           // 39
                                                                     // 40
  _.each(beforeFiles, function (url) {                               // 41
    manifest += url + '\n';                                          // 42
  });                                                                // 43
                                                                     // 44
  manifest += '#AFTER\n';                                            // 45
                                                                     // 46
  _.each(afterFiles, function (url) {                                // 47
    manifest += url + '\n';                                          // 48
  });                                                                // 49
                                                                     // 50
  // content length needs to be based on bytes                       // 51
  var body = new Buffer(manifest);                                   // 52
                                                                     // 53
  res.setHeader('Content-Type', 'text/plain');                       // 54
  res.setHeader('Content-Length', body.length);                      // 55
  return res.end(body);                                              // 56
});                                                                  // 57
                                                                     // 58
///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package.packmeteor = {
  Packmeteor: Packmeteor
};

})();
