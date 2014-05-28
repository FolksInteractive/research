if (Meteor.isClient) {
  // Template.hello.greeting = function () {
  //   return "Welcome to animation.";
  // };

  Template.content.events({

  });
  Template.content.rendered(function() {
    var canvas, stage, exportRoot;


    canvas = document.getElementById("canvas");
    
    cont = document.getElementById("cont");
    contDOMElement = new DOMElement(cont);

    stage = new Stage(canvas);

    //move it's rotation center at the center of the form
    contDOMElement.regX = cont.offsetWidth*0.5;
    contDOMElement.regY = cont.offsetHeight*0.5;
    //move the form above the screen
    contDOMElement.x = canvas.width * 0.5;
    contDOMElement.y =  - 200;
    stage.addChild(cont);

    Ticker.setFPS(32);
    Ticker.addListener(stage);
    Tween.get(contDOMElement).to({alpha:1, y:canvas.height * 0.5, rotation:720},2000,Ease.cubicOut);

  });
} 

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
