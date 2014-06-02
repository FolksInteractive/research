if (Meteor.isClient) {
  require("famous-polyfills"); // Add polyfills
  require("famous/core/famous"); // Add the default css file
  var Engine = require("famous/core/Engine");
  var View = require("famous/core/View");
  var Surface = require("famous/core/Surface");
  var Modifier = require("famous/core/Modifier");
  var HeaderFooterLayout = require("famous/views/HeaderFooterLayout");
  var GridLayout = require("famous/views/GridLayout");
  var Transform = require('famous/core/Transform');
  var StateModifier = require('famous/modifiers/StateModifier');
  var Easing = require('famous/transitions/Easing');
  var EventHandler = require('famous/core/EventHandler');

  /******
  * UTILS
  *******/
  var context = Engine.createContext();
  var layout;
  var selected = true;
  var menu = false;

  var enventHandler = new EventHandler();

  var itemsGlyph = ['<span class="glyphicon glyphicon-align-left"></span>',
  '<span class="glyphicon glyphicon-align-center"></span>',
  '<span class="glyphicon glyphicon-align-right"></span>',
  '<span class="glyphicon glyphicon-align-justify"></span>',
  '<span class="glyphicon glyphicon-list"></span>'];

  /**********
  * MODIFIERS
  ***********/
  var mainModifier = new StateModifier({
    origin: [0.5,0.5],
    transform: Transform.translate(0, 0, 0.1)
  });

  var headModifier = new StateModifier({
    origin: [0,0],
    align: [0,0]
  });

  var menuModifier = new StateModifier({
    origin: [0,0],
    transform: Transform.translate(0, 0, 1)
  });

  var glyphModifier = new StateModifier();

  var view2Modifiers = [];

  var itemsModifiers = [];
  
  /***************
  * SURFACES/VIEWS
  ****************/
  var tiles = createTiles();
  
  var currentTile = 0;

  var view1 = new View();
  view1.add(createGrid());

  var view2 = new View();

  var menuView = new View();
  createMenuItems();
  

  var glyph = new Surface({
    size: [undefined,55],
    content: '<span class="glyphicon glyphicon-th-large"></span>',
    properties: {
      fontSize: "40px",
      textAlign: "center",
      paddingTop: "15px",
      zIndex: "1"
    }
  });

  var menu = new Surface({
    size: [45,45],
    content: '<span class="glyphicon glyphicon-cog"></span>',
    properties: {
      fontSize: "30px",
      padding: '15px',
      zIndex: "2"
    }
  });

  /******
  * CALLS
  *******/  
  createLayout();
  addHeader();
  layout.content.add(mainModifier).add(view1);
  fillView2();
  layout.content.add(menuModifier).add(menuView);
  handleEvents();

  /**********
  * FUNCTIONS
  ***********/
  function createLayout() {
    layout = new HeaderFooterLayout({
      headerSize: 150 
    });

    context.add(layout);
  }

  function addHeader() {
    var head = loadTemplate(Template.header);

    glyph.on('click', function() {
      enventHandler.emit('glyph');
    });

    menu.on('click',function() {
      enventHandler.emit('menu');
    });

    layout.header.add(menu);
    layout.header.add(glyphModifier).add(glyph);
    layout.header.add(headModifier).add(new Surface({
      content: head,
      properties: {
        zIndex: '0'
      }
    }));
  }

  function fillView2() {
   var templates = [loadTemplate(Template.c1), loadTemplate(Template.c2),
   loadTemplate(Template.c3), loadTemplate(Template.c4)];
   for(var i = 0; i < tiles.length; i++) {
    view2Modifiers[i] = new StateModifier({
      opacity: 0
    });
    view2.add(view2Modifiers[i]).add(new Surface({classes: ['selected'], content: templates[i]}));
  }
  layout.content.add(view2);
  }

  function createGrid() {
    var grid = new GridLayout({
      dimensions: [2, 2]
    });

    grid.sequenceFrom(tiles);

    return grid;
  }

  function createMenuItems() {
    var items = [];

    var height = 0;
    for(var i = 0; i < 5; i++) {
      items.push(new Surface({
        size: [45,30],
        content: itemsGlyph[i],
        properties: {
          fontSize: '30px',
          paddingLeft: '15px'
        }
      }));
      itemsModifiers.push(new StateModifier({
        transform: Transform.translate(-50,height,0)
      }));
      menuView.add(itemsModifiers[i]).add(items[i]);
      height = height + 75;
    }

  }

  function createTiles() {
  var surfaces = [];
  var templates = [loadTemplate(Template.c1), loadTemplate(Template.c2),
  loadTemplate(Template.c3), loadTemplate(Template.c4)];

  for(var i = 0; i < templates.length; i++) {
      // if(surfaces.length >= 4)
      surfaces.push(new Surface({
        origin: [0.5,0.5],
        content: templates[i],
        size: [440, undefined],
        classes: ['tile'],
        properties: {
          border: "1px solid grey",
          // borderRadius: "20px",
          textAlign: "center",
          color: "black",
          backgroundColor: 'white',
          overflow: 'hidden'
        }
      }));
      surfaces[i].on('click', function() {
        enventHandler.emit('tile', this);
      });
    }
    return surfaces;
  }

  function handleEvents() {
    enventHandler.on('tile', function(tile) {

      currentTile = tile.id;

      view2Modifiers[currentTile].setOpacity(
        1, 
        {duration: 1000}
        );
      headModifier.setTransform(
        Transform.translate(0,-1000,0),
        { duration : 1000, curve: Easing.inOutBack }
        );
      glyphModifier.setOpacity(
        0,
        {duration : 500, curve: Easing.inSine },
        function() {
          glyph.setProperties({
            textAlign: 'right',
            paddingRight: '15px'
          });
          glyphModifier.setOpacity(1, {duration : 500});
        }
        );

      slideRight(mainModifier);

      selected = true;
    });

    enventHandler.on('glyph', function() {

      if(selected) {
        view2Modifiers[currentTile].setOpacity(
          0, 
          {duration: 1000}
          );
        headModifier.setTransform(
          Transform.translate(0,0,0),
          { duration : 1000, curve: Easing.inOutBack }
          );
        glyphModifier.setOpacity(
          0,
          {duration : 500, curve: Easing.inSine },
          function() {
            glyph.setProperties({
              textAlign: 'center'
            });
            glyphModifier.setOpacity(1, {duration : 500});
          }
          );

        slideLeft(mainModifier);

        selected = false;
      }

    });

    enventHandler.on('menu', function() {
      if(menu) {
        var time = 100;
        var height = 0;
        for(var i = 0; i < itemsModifiers.length; i++) {
          itemsModifiers[i].setTransform(Transform.translate(0,height,0), {duration: time, curve: Easing.inOutSine});
          if(view2Modifiers[i])
            view2Modifiers[i].setTransform(Transform.translate(50,0,0), {duration: 200, curve: Easing.inOutSine});
          time = time + 100;
          height = height + 75;
        }
      }

      else {
        var time = 100;
        var height = 0;
        for(var i = 0; i < itemsModifiers.length; i++) {
          itemsModifiers[i].setTransform(Transform.translate(-50,height,0), {duration: time, curve: Easing.inOutSine});
          if(view2Modifiers[i])
            view2Modifiers[i].setTransform(Transform.translate(0,0,0), {duration: 200, curve: Easing.inOutSine});
          time = time + 100;
          height = height + 75;
        }
      }

      menu = !menu;
    });
  }

  function loadTemplate(template) {
    var div = document.createElement('div');
    UI.insert(UI.render(template), div);
    return div;
  }

  function slideRight(modifier) {
    modifier.setTransform(
      Transform.translate(10000,0,0.1),
      { duration: 1000, curve: Easing.inSine }
      );
  }

  function slideLeft(modifier) {
    modifier.setTransform(
      Transform.translate(0,0,0.1),
      { duration: 1000, curve: Easing.inSine }
      );
  }

}

if (Meteor.isServer) {
  // Meteor.startup(function () {
  //   // code to run on server at startup
  // });
}
