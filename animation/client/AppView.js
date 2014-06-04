var View          = require('famous/core/View');
var Easing = require('famous/transitions/Easing');
var Flipper    = require("famous/views/Flipper");
var Surface       = require('famous/core/Surface');
var Transform     = require('famous/core/Transform');
var EventHandler = require('famous/core/EventHandler');
var StateModifier = require('famous/modifiers/StateModifier');
var HeaderFooterLayout = require("famous/views/HeaderFooterLayout");
var Transitionable = require('famous/transitions/Transitionable');
var SnapTransition = require('famous/transitions/SnapTransition');
Transitionable.registerMethod('snap', SnapTransition);
var Draggable = require('famous/modifiers/Draggable');
var Timer = require('famous/utilities/Timer');



var enventHandler = new EventHandler();

AppView = function() {
  View.apply(this, arguments);

  _createModifiers.call(this);
  _createViews.call(this);
  _createHeaderSurfaces.call(this);
  _createLayout.call(this);
  _addHeader.call(this);
  _addContent.call(this);
  _handleEvents.call(this);
}

AppView.prototype = Object.create(View.prototype);
AppView.prototype.constructor = AppView;

/**********
* MODIFIERS
***********/
function _createModifiers() {
  this.mainModifier = new StateModifier({
    origin: [0.5,0.5],
    transform: Transform.translate(0, 0, 0.1)
  });

  this.headModifier = new StateModifier({
    origin: [0,0],
    align: [0,0]
  });

  this.menuModifier = new StateModifier({
    origin: [0,0],
    transform: Transform.translate(0, 0, 1)
  });

  this.glyphModifier = new StateModifier(); 
} 

/***************
* SURFACES/VIEWS
****************/
function _createViews() {
  this.tileView = new TileView();

  this.selectedView = new SelectedView();

  this.menuView = new MenuView();
}

function _createHeaderSurfaces() {
  this.glyph = new Surface({
    size: [undefined,55],
    content: '<span class="glyphicon glyphicon-th-large"></span>',
    properties: {
      fontSize: "40px",
      color: "grey",
      textAlign: "center",
      paddingTop: "15px",
      zIndex: "1"
    }
  });

  this.menu = new Surface({
    size: [45,45],
    content: '<span class="glyphicon glyphicon-cog"></span>',
    properties: {
      fontSize: "30px",
      color: "grey",
      padding: '15px',
      zIndex: "2"
    }
  });
}

/**********
* FUNCTIONS
***********/
function _createLayout() {
  this.layout = new HeaderFooterLayout({
    headerSize: 150 
  });

  this.add(this.layout);
}

function _addHeader() {
  var head = loadTemplate(Template.header);

  this.glyph.on('click', function() {
    enventHandler.emit('glyph');
  });

  this.menu.on('click',function() {
    enventHandler.emit('menu');
  });
  var draggable = new Draggable({
    snapX: 1,
    snapY:1
  }); 
  draggable.subscribe(this.menu);

  this.layout.header.add(draggable).add(this.menu);
  this.layout.header.add(this.glyphModifier).add(this.glyph);
  this.layout.header.add(this.headModifier).add(new Surface({
    content: head,
    properties: {
      zIndex: '0',
      color: '#ffffff'
    }
  }));
}

function _addContent() {
  this.layout.content.add(this.mainModifier).add(this.tileView);
  this.layout.content.add(this.selectedView);
  this.layout.content.add(this.menuModifier).add(this.menuView);
}

function _handleEvents() {
  var selected = false;
  var menuState = false;
  var currentTile = 0;

  var itemsModifiers = this.menuView.itemsModifiers;
  var selectedViewModifiers = this.selectedView.selectedViewModifiers;
  var headModifier = this.headModifier;
  var glyphModifier = this.glyphModifier;
  var mainModifier = this.mainModifier;

  var glyph = this.glyph;
  var menu = this.menu;
  var layout = this.layout;
  var tileV = this.tileView;
  tileV.on('tile', function(tile) {

    currentTile = tile.origin.id;
    console.log(currentTile);
    mainModifier.setTransform(Transform.translate(0,0,0));
    mainModifier.setOpacity(0, {duration: 500});
    selectedViewModifiers[currentTile].setOpacity(
      1, 
      {duration: 500, curve: Easing.inCubic},
      function() {
        Transform.translate(0,0,1);
      }
      );
    selectedViewModifiers[currentTile].setTransform(
      Transform.scale(1,1,1), {duration: 500, curve: Easing.inCubic},
      function() {
      }
    );
    // slideContent.call(this, currentTile);
    Timer.after(function() {
      layout.setOptions({headerSize: 0});
    }, 4);

    headModifier.setTransform(
      Transform.translate(0,-1000,0),
      { duration : 500, curve: Easing.inOutBack }
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

    selected = true;
  });

  enventHandler.on('glyph', function() {
    if(selected) {
      mainModifier.setTransform(Transform.translate(0,0,1),
        {duration: 500});
      mainModifier.setOpacity(1, {duration: 500});
      selectedViewModifiers[currentTile].setOpacity(0, { duration: 1000 });
      selectedViewModifiers[currentTile].setTransform(
        Transform.scale(0.1,0.1,0),
        {duration: 500});

      layout.setOptions({headerSize: 150});
      headModifier.setTransform( Transform.translate(0,0,0),
        { duration : 500, curve: Easing.inOutBack }
        );

      glyphModifier.setOpacity(0, { duration : 500, curve: Easing.inSine },
        function() {
          glyph.setProperties({ textAlign: 'center' });
          glyphModifier.setOpacity(1, {duration : 500});
        }
        );

      selected = false;
    }
    else {
      console.log('cannot');
    }
  });

  enventHandler.on('menu', function() {
    menuState = !menuState;
    if(menuState) 
      menuToggle(0, 50, itemsModifiers, selectedViewModifiers);

    else 
      menuToggle(-50,0, itemsModifiers, selectedViewModifiers);
  });
  var tileView = this.tileView;
  
  this.menuView.on('menuItem', function (item) {
    var clicked = item.origin.id;
    var snap = {
      method: 'snap',
      period: 1000,
      dampingRatio: .01,
      velocity: 0.01
    };

    if(clicked === 9)
      mainModifier.setTransform(Transform.rotate(45,45,-60),
        {duration: 1000});

    if(clicked === 10)
      mainModifier.setTransform(Transform.scale(1.1,1.1,1.1),
        {duration: 100},
        function() {
          mainModifier.setTransform(Transform.translate(1,1,1), snap);
        });

    if(clicked === 11) {
      
    }

    console.log("ITEM", item.origin.id);
  });
}

/***************
* TRANFORMATIONS
****************/
function menuToggle(itemsX, selectedX, items, selected) {

  var time = 100;
  var height = 0;

  for(var i = 0; i < items.length; i++) {
    items[i].setTransform(Transform.translate(itemsX,height,0), 
      {duration: time, curve: Easing.inOutSine});

    if(selected[i]) {
      selected[i].setTransform(
        Transform.translate(selectedX, 0, 0), 
        { duration: 200, curve: Easing.inOutSine });
    }

    time = time + 100;
    height = height + 75;
  }
}

function slideRight(modifier) {
  modifier.setTransform(
    Transform.scale(0,0,0.1),
    { duration: 1000, curve: Easing.inSine }
    );
}

function slideLeft(modifier) {
  modifier.setTransform(
    Transform.scale(1,0,0.1),
    { duration: 1000, curve: Easing.inSine }
    );
}