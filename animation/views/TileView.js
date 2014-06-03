if(Meteor.isClient) {
  var View = require("famous/core/View");
  var Surface = require("famous/core/Surface");
  var GridLayout = require("famous/views/GridLayout");

  TileView = function() {
    View.apply(this, arguments);

    _createTiles.call(this);
    _createGrid.call(this);
  }

  TileView.prototype = Object.create(View.prototype);
  TileView.prototype.constructor = TileView;

  TileView.DEFAULT_OPTIONS = {};

  function _createTiles() {
    this.tiles = [];
    var templates = getTemplates();

    for(var i = 0; i < templates.length; i++) {
      // if(surfaces.length >= 4)
      this.tiles.push(new Surface({
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
      this.tiles[i].on('click', function(tile) {
        this._eventOutput.emit('tile', tile);
      }.bind(this));
    }
  }

  function _createGrid() {

    var grid = new GridLayout({
      dimensions: [2, 2]
    });

    grid.sequenceFrom(this.tiles);

    this.add(grid);
  }
}