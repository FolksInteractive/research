if (Meteor.isClient) {
  require("famous-polyfills"); // Add polyfills
  require("famous/core/famous"); // Add the default css file
  var Engine = require("famous/core/Engine");
  var Surface = require("famous/core/Surface");
  var Modifier = require("famous/core/Modifier");
  var GridLayout = require("famous/views/GridLayout");

  var context = Engine.createContext();

  var div = document.createElement('div');
  var templates = [UI.insert(UI.render(Template.c1), div),
  UI.insert(UI.render(Template.c2), div),
  UI.insert(UI.render(Template.c3), div),
  UI.insert(UI.render(Template.c4), div)];

  console.log(templates);
  var modifier = new Modifier({ 
    origin: [0.5, 0.5] 
  });
  // var div = document.createElement('div');
  // UI.insert(UI.render(Template.content), div);

  // var surface = new Surface({ 
  //     content: div, 
  //     size: [250, 250], 
  //     properties: { 
  //         border: "1px solid"
  //     } 
  // });

  // context.add(modifier).add(surface);


  var grid = new GridLayout({
    dimensions: [2, 2]
  });

  var surfaces = [];
  grid.sequenceFrom(surfaces);

  for(var i = 0; i < templates.length; i++) {
    surfaces.push(new Surface({
      content: templates[i],
      size: [250, 250],
      properties: {
        border: "1px dotted",
        borderRadius: "10px",
        backgroundColor: "hsl(" + (1 * 360 / 8) + ", 100%, 50%)",
        color: "black",
        lineHeight: window.innerHeight / 2 + 'px',
        textAlign: 'center'
      }
    }));
  }

   context.add(modifier).add(grid);

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
