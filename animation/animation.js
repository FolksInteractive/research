if (Meteor.isClient) {
  require("famous-polyfills"); // Add polyfills
  require("famous/core/famous"); // Add the default css file
  var Engine = require("famous/core/Engine");
  var Surface = require("famous/core/Surface");
  var Modifier = require("famous/core/Modifier");
  var HeaderFooterLayout = require("famous/views/HeaderFooterLayout");
  var GridLayout = require("famous/views/GridLayout");
  var Transform = require('famous/core/Transform');
  var StateModifier = require('famous/modifiers/StateModifier');
  var Easing = require('famous/transitions/Easing');

  var context = Engine.createContext();

  var layout;

  var contentModifier = new Modifier({ 
    origin: [0.5, 0.5] 
  });

  var surfaces = [];

  var templates = [loadTemplate(Template.c1),loadTemplate(Template.c2),
  loadTemplate(Template.c3),loadTemplate(Template.c4)];
  
  var glyph;
  var currentTile;

  createLayout();
  addHeader();
  addContent();

  function createGrid() {
    var grid = new GridLayout({
      dimensions: [2, 2]
    });

    grid.sequenceFrom(surfaces);

    for(var i = 0; i < templates.length; i++) {
      if(surfaces.length >= 4)
        surfaces = []
      surfaces.push(new Surface({
        content: templates[i],
        size: [440, 380],
        properties: {
          border: "1px solid grey",
          borderRadius: "20px",
          textAlign: "center",
          color: "black"
        }
      }));
    }

    for(var j = 0; j < surfaces.length; j++) {
      
      surfaces[j].on('click', function() {
        var focus = new StateModifier({
          origin: [0.5,0.5],
          opacity: 0
        });
        currentTile = this;
        console.log(currentTile);

        Session.set('tile', true);
        contentModifier.setTransform(
          Transform.scale(0, 0, 0),
          { duration : 10, curve: Easing.inExpo },
          function() {
            console.log("HELLO");
            currentTile.setSize([undefined,undefined]);
            // currentTile.setProperties({
            //   fontSize: "30px"
            // });
            currentTile.addClass('selected');
            focus.setTransform(
              Transform.scale(1, 1, 0),
              { duration : 100, curve: Easing.inExpo },
              function() {
                focus.setOpacity(1,
                  { duration : 500, curve: Easing.inExpo }
                );
                
              }
            );

            layout.content.add(focus).add(currentTile);
            
          }
        );
        

      }); 

    }
    return grid;
  }
  glyph.on('click', function() {
    console.log(surfaces);

          if(Session.get('tile')) {
            contentModifier.setTransform(
              Transform.scale(1, 1, 0),
              { duration : 1000, curve: Easing.inExpo }
              );
            console.log(context);

            currentTile.removeClass('selected');
            currentTile.setSize([440,380]);
            layout.content.add(contentModifier).add(createGrid());
            Session.set('tile', undefined);
          }
          console.log("GLYPOH");
        });

  function createLayout() {
    layout = new HeaderFooterLayout({
      headerSize: 200 
    });

    context.add(layout);
  }

  function addHeader() {
    var head = loadTemplate(Template.header);
    glyph = new Surface({
      content: '<span class="glyphicon glyphicon-th-large"></span>',
      properties: {
        fontSize: "40px",
        textAlign: "center",
        padding: "15px",
        zIndex: "1"
      }
    });
    
    layout.header.add(new Surface({
      content: head
    }));
    layout.header.add(glyph);
  }

  function addContent() {
    layout.content.add(contentModifier).add(createGrid());
  }

  function loadTemplate(template) {
    var div = document.createElement('div');
    UI.insert(UI.render(template), div);
    return div;
  }


}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
