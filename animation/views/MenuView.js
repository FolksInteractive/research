if(Meteor.isClient) {
  var View = require("famous/core/View");
  var Surface = require("famous/core/Surface");
  var Transform = require('famous/core/Transform');
  var StateModifier = require('famous/modifiers/StateModifier');

  MenuView = function() {
    View.apply(this, arguments);

    _createMenuItems.call(this);
  }

  MenuView.prototype = Object.create(View.prototype);
  MenuView.prototype.constructor = MenuView;

  MenuView.DEFAULT_OPTIONS = {
    offset: 75
  };

  function _createMenuItems() {
    this.itemsModifiers = [];

    var itemsGlyph = ['<span class="glyphicon glyphicon-align-left"></span>',
    '<span class="glyphicon glyphicon-align-center"></span>',
    '<span class="glyphicon glyphicon-align-right"></span>',
    '<span class="glyphicon glyphicon-align-justify"></span>',
    '<span class="glyphicon glyphicon-list"></span>'];

    var yOffSet = this.options.offset;

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
      this.itemsModifiers.push(new StateModifier({
        transform: Transform.translate(-50,height,0)
      }));
      this.add(this.itemsModifiers[i]).add(items[i]);
      height = height + yOffSet;

      items[i].on('click', function(item) {
        this._eventOutput.emit('menuItem', item);
      }.bind(this));
    }
  }

}