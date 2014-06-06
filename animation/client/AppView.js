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

  this.grid = grid;

  this.relations = [];

  _generateRelations.call(this);
  var relations = this.relations;
  grid.sequenceFrom(relations);
  
  context.on('resize', function() {
    // console.log(relations[0]);
    contextSize = [window.outerWidth, window.outerHeight];
    if(contextSize[0] < 1000)
      grid.setOptions({dimensions: [2,5]});
    else 
      grid.setOptions({dimensions: [5,2]});

  });
  this.add(grid);
  for(var i = 0 ; i < relations.length; i++){
    // this.add(relations[i]);
    _listenDrag(relations, relations[i], i);
    _listenOver(relations, relations[i], i);
  }

}

AppView.prototype = Object.create(View.prototype);
AppView.prototype.constructor = AppView;

_generateRelations = function() {

  var relations = getRelations();

  for(var i = 0; i < relations.length; i++) {
    this.relations.push(new RelationView(relations[i], x ,y));
    x = x + deltaX();
    if (i === 4) {
      x = 100;
      y = y + deltaY();
    }
  }
}
var one;
var next;

_listenDrag = function(relations, relation, which) {
  relation.sync.on('start', function() {
    Session.set('over', undefined);
    // console.log("ready");
    Session.set('dragged',which);
    relation.relationSurface.setProperties({zIndex: '1000'});
    // console.log('drag',Session.get('dragged'));
  });

  relation.sync.on('update', function(data) {
    
  });

  relation.sync.on('end', function() {
    // one = undefined;
    // two = undefined;
    relation.relationSurface.setProperties({zIndex: '1'});

    Session.set('dragged', undefined);
    Session.set('over',undefined);   
  });
}

_listenOver = function(relations, relation, which) {
 
  relation.relationSurface.on('mouseover', function() {
    if (!!Session.get('dragged') && (Session.get('dragged') !== which)) {
      Session.set('over', which);
      console.log(Session.get('dragged'),'is over', Session.get('over'));
      relations[Session.get('over')].position.set([-deltaX()*Session.get('x'),0]);
    };  

  });
  
}