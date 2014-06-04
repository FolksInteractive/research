
var View          = require('famous/core/View');
var Surface       = require('famous/core/Surface');
var Transform     = require('famous/core/Transform');
var StateModifier = require('famous/modifiers/StateModifier');

SelectedView = function() {
  View.apply(this, arguments);

  _fillselectedView.call(this);
}

SelectedView.prototype = Object.create(View.prototype);
SelectedView.prototype.constructor = SelectedView;

SelectedView.DEFAULT_OPTIONS = {};

function _fillselectedView() {
  this.selectedViewModifiers = [];
  this.surfaces = [];
  var templates = getTemplates();
  var x = 0.25;
  var y = 0.25;
  for(var i = 0; i < templates.length; i++) {
    this.selectedViewModifiers[i] = new StateModifier({ 
      opacity: 0,
      origin: [x,y]
    });
    this.selectedViewModifiers[i].setTransform(Transform.scale(0.1,0.1,0));

    this.surfaces.push(new Surface({classes: ['selected'],
      content: templates[i],
      properties: {
        backgroundColor: 'white'
      }
    }));

    this.add(this.selectedViewModifiers[i]).add(this.surfaces[i]);

    if(i === 0)
      x = x + 0.5;
    if (i === 1){
      y = y + 0.5;
      x = x - 0.5;
    }
    if (i ===2)
      x = x + 0.5;
  }
}

slideContent = function() {
  var templates = getTemplates();
  var mod = new StateModifier({transform: Transform.translate(-2000,0,0)});
  this.surfaces[this.currentTile].add(mod).add(new Surface({content: templates[this.currentTile]}));
  mod.setTransform(Transform.translate(0,0,0), {duration:500});
}

