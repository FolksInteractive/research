famousPolyfills;
famous.core.famous;
document.addEventListener('deviceready', function () {
          navigator.splashscreen.hide(); //Hides the splash screen for your app.
        StatusBar.overlaysWebView(false);    
}, false);

Template.hello.rendered = function() {
  Engine = famous.core.Engine;
  mainContext = Engine.createContext();
  Transform = famous.core.Transform;

  scrollView = new famous.views.Scrollview({},0,0,100,100);
  var position = [0, 0];


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
    console.log(surfaces.length,clicks.length, amount());
    scrollView.sequenceFrom(surfaces);

    // if(amount() !== Clicks.find().fetch().length)
    //   window.navigator.vibrate(100);
  });

  drag = new famous.modifiers.Draggable({
    xRange: [0,75],
    yRange: [0,0]
  });
  menuView = new famous.core.View();

  side = new famous.core.Surface({
    size: [75, undefined],
    properties: {
      backgroundColor: 'black',
      zIndex: '1'
    }
  });
  
  icon = new famous.core.Surface({
    size: [105,70],
    properties: {
      borderRadius: '35px',
      background: 'rgba(0,0,0,0.4)',
      zIndex: '2'
    }
  });
  menuView.add(side);
  menuView.add(icon);
  sideMod = new famous.core.Modifier({
    transform: Transform.translate(-75,0,0)
  });

  drag.subscribe(icon);
  mainContext.add(scrollView);
  mainContext.add(drag).add(sideMod).add(menuView);

  window.plugin.notification.local.add({message: 'Your app is loaded'});

  Clicks.find().observeChanges({
    added: function(){
      console.log('Added click');
      window.plugin.notification.local.add({message: 'New click, go see that'});
    }
  });


}