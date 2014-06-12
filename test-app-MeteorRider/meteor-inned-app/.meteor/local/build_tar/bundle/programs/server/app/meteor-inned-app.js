(function(){if (Meteor.isClient) {
  Meteor.startup(function () {
    if (typeof phonegapapp !== 'undefined') {// phonegap context
      Meteor._reload.onMigrate('phonegapapp', function () {
        phonegapapp.meteorRider();
        return [false];
      });
    }
  });
}

// if (Meteor.isServer) {
//   Meteor.startup(function () {
//     // code to run on server at startup
//   });
// }

})();
