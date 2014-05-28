if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to animation.";
  };

  Template.content.events({
   var canvas, stage, exportRoot;
   window.onload = init;
   
   function init() {
    canvas = document.getElementById("canvas");
    
    stage = new Stage(canvas);
    
    Ticker.setFPS(32);
    Ticker.addListener(stage);
  }
});
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
