if (Meteor.isClient) {
  require("famous-polyfills"); // Add polyfills
  require("famous/core/famous"); // Add the default css file
  var Engine = require("famous/core/Engine");

  var context = Engine.createContext();

  context.add(new AppView());
}

if (Meteor.isServer) {
  // Meteor.startup(function () {
  //   // code to run on server at startup
  // });
}