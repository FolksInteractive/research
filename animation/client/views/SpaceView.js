var View = require("famous/core/View");
var Surface = require("famous/core/Surface");
var Transform     = require('famous/core/Transform');
var StateModifier = require('famous/modifiers/StateModifier');
var Modifier       = require("famous/core/Modifier");
var MouseSync      = require("famous/inputs/MouseSync");
var Transitionable = require("famous/transitions/Transitionable");

SpaceView = function(xPos, yPos, relationView) {
  View.apply(this, arguments);
  var position = [xPos, yPos];
  this.availability = false;
  this.relationView = relationView;
  this.zone;
  _createSpace.call(this);

  this.getPosition = function() {
    return position;
  }
  var relationView = this.relationView;
  Engine.on('dragging', function(data) {
    if(data === relationView)
      console.log('i caught you dragging my', data);
  });
}

SpaceView.prototype = Object.create(View.prototype);
SpaceView.prototype.constructor = SpaceView;

SpaceView.DEFAULT_OPTIONS = {};

function _createSpace() {
  this.zone = new Surface({
    size: [150,150],
    properties: {
      border: '1px dotted grey',
      borderRadius: '15px',
      zIndex: '0'
    }
  });

  var zoneModifier = new StateModifier({
    origin: [0.5,0.5],
    align: [0.5,0.5],
    size: [150,150]
  });
  this.add(this.relationView);
  this.add(zoneModifier).add(this.zone).add(this.relationView);
} 