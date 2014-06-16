famousPolyfills;
famous.core.famous;

Template.hello.rendered = function() {
  Engine = famous.core.Engine;
  mainContext = Engine.createContext();
  Transform = famous.core.Transform;
  var TouchSync = require("famous/inputs/TouchSync");

  scrollView = new famous.views.Scrollview({},0,0,100,100);
  var position = [0, 0];

  touchSync = new TouchSync(function() {
    return position;
  });
  Engine.pipe(touchSync);

  var clicks = [];
  var surfaces;
  var counter = 0;

  ReactiveWrapper(function(){
    clicks = Clicks.find().fetch();
    surfaces = [];

    for (var i = 0; i < clicks.length; i++) {
      var content = clicks[i].content + " " + clicks[i].createdAt;
      var surf = new famous.core.Surface({
        content: content,
        size: [undefined, 250],
        properties: {
          backgroundColor: "hsl(" + (i * 360 / 10) + ", 100%, 80%)",
          lineHeight: "100px",
          textAlign: 'center'
        }
      });
      surf.pipe(scrollView);
      surfaces.push(surf);
    }  
    console.log(surfaces.length,clicks.length);
    scrollView.sequenceFrom(surfaces);
  });

  var drag = new famous.modifiers.Draggable();
  side = new famous.core.Surface({
    size: [75, undefined],
    properties: {
      backgroundColor: 'black',
      zIndex: '1'
    }
  });
  sideMod = new famous.core.Modifier({
    transform: Transform.translate(-75,0,0)
  });


  touchSync.on("start", function() {
    console.log('start drag');
  });

  touchSync.on("update", function(data) {
    console.log('touchin', data);
  });

  touchSync.on("end", function() {
    console.log('end touch');
  });

  drag.subscribe(side);
  mainContext.add(scrollView);
  mainContext.add(drag).add(sideMod).add(side);
}

