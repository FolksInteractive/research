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
  this.count = templates.length;
  for(var i = 0; i < this.count; i++) {
    // if(surfaces.length >= 4)
    this.tiles.push(new Surface({
      origin: [0.5,0.5],
      content: templates[i],
      size: [440, undefined],
      classes: ['tile'],
      properties: {
        border: "1px solid black",
        borderRadius: "20px",
        textAlign: "center",
        color: "black",
        backgroundColor: 'white',
        overflow: 'hidden'
      }
    }));
    this.tiles[i].on('click', function(tile) {
      if(i < (this.count-1))
        this._eventOutput.emit('tile', tile);
      else
        _addTiles.call(this);
    }.bind(this));
  }
}

function _createGrid() {

  this.grid = new GridLayout({
    dimensions: [2, (this.count/2)]
  });
  this.grid.sequenceFrom(this.tiles);

  this.add(this.grid);
}

function _addTiles() {
  var newTile = Tiles.insert({
    title: "New tile"
  });
  this.count = this.count + 1;
  this.grid.dimensions = [2, (this.count/2)];
  this.tiles.push(new Surface({
      origin: [0.5,0.5],
      content: newTile.title,
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
}

var getTilesAmount = function() {
  return this.tiles.length;
}