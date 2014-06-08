var View          = require('famous/core/View');
var Easing = require('famous/transitions/Easing');
var Surface       = require('famous/core/Surface');
var Transform     = require('famous/core/Transform');
var StateModifier = require('famous/modifiers/StateModifier');
var GridLayout = require("famous/views/GridLayout");



AppView = function(context) {
  View.apply(this, arguments);

  var contextSize = [window.outerWidth, window.outerHeight];
  var dimensions;

  if (contextSize[0] < 1000 || contextSize[1] < 1000) {
    dimensions = [2,5];
  } else {
    dimensions = [5,2];
  };

  var grid = new GridLayout({
    dimensions: dimensions,
    gutterSize: [0,100]
  });

  this.relations = [];
  this.spaces = [];

  _generateSpaces.call(this);

  grid.sequenceFrom(this.spaces);
  
  this.add(grid);

  _listenResize(context, grid);

  for(var i = 0 ; i < this.spaces.length; i++){
    _listenOver(this.spaces[i],i);
    _listenDrag(this.spaces[i].relationView, i);
  }
}

AppView.prototype = Object.create(View.prototype);
AppView.prototype.constructor = AppView;

_generateSpaces = function() {

  var relations = getRelations();

  for(var i = 0; i < relations.length; i++) {
    this.spaces.push(new SpaceView(0, 0,
      new RelationView(relations[i])));
  }
}

_listenResize = function(context, grid) {
  context.on('resize', function() {
    var contextSize = [window.outerWidth,  window.outerHeight];
    if(contextSize[0] < 1000)
      grid.setOptions({dimensions: [2,5], gutterSize: [0,500]});
    else 
      grid.setOptions({dimensions: [5,2], gutterSize: [0,100]});
  });
}

_listenDrag = function(relation,which) {
  relation.sync.on('start', function() {
    Session.set('dragged', which);
    relation.relationSurface.setProperties({zIndex: '1000'});
    Engine.emit('dragging', relation);
  });

  relation.sync.on('update', function(data) {
    
  });

  relation.sync.on('end', function() {
    relation.relationSurface.setProperties({zIndex: '1'});
    Session.set('dragged', undefined);   
  });
}

_listenOver = function(space, which) {
 
  space.zone.on('mouseover', function() {
    if(!!Session.get('dragging'))
      // Engine.on('dragging',function(data){
        console.log(which);
      // });
  });
  
}