if (Meteor.isClient) {
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
    var templates = getTemplates();
    for(var i = 0; i < templates.length; i++) {
      this.selectedViewModifiers[i] = new StateModifier({ opacity: 0 });
      this.add(this.selectedViewModifiers[i]).add(
        new Surface({classes: ['selected'], content: templates[i]}));
    }
  }
};
