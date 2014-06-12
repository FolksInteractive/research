famousPolyfills;
famous.core.famous;
mainContext = famous.core.Engine.createContext();
renderController = new famous.views.RenderController();
Deps.autorun(function(){
  clicks = Clicks.find().fetch();
  var surfaces = [];
  var counter = 0;


  console.log(clicks);

  for (var i = 0; i < clicks.length; i++) {
    var content = clicks[i].content + " " + clicks[i].createdAt;
    surfaces.push(new famous.core.Surface({
     content: content,
     size: [undefined, undefined],
     properties: {
       backgroundColor: "hsl(" + (i * 360 / 10) + ", 100%, 80%)",
       lineHeight: "200px",
       textAlign: 'center'
     }
   }));
  }

  renderController.show(surfaces[0]);

  famous.core.Engine.on("click", function() {
    var next = (counter++ + 1) % surfaces.length;
    this.show(surfaces[next]);
  }.bind(renderController));

  mainContext.add(new famous.core.Modifier({origin: [.5, .5]})).add(renderController);
});
