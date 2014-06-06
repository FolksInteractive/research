var View = require("famous/core/View");
var Surface = require("famous/core/Surface");
var Transform     = require('famous/core/Transform');
var StateModifier = require('famous/modifiers/StateModifier');
var Modifier       = require("famous/core/Modifier");
var MouseSync      = require("famous/inputs/MouseSync");
var Transitionable = require("famous/transitions/Transitionable");

RelationView = function(relation, xPos, yPos) {
  View.apply(this, arguments);
  this.relation = relation;
  this.position = new Transitionable([0,0]);
  this.sync = new MouseSync();
  this.relationModifier;
  this.zoneModifier;
  _createRelationTile.call(this);
}

RelationView.prototype = Object.create(View.prototype);
RelationView.prototype.constructor = RelationView;

RelationView.DEFAULT_OPTIONS = {};

function _createRelationTile() {
  var content = this.relation.icon; 

  this.relationModifier = new StateModifier({
    origin: [0.5,0.5],
    align: [0.5,0.5],
    size: [100,100]
  });

  var relationSurface = new Surface({
    size: [100,100],
    content: content,
    properties: {
      backgroundColor: '#ffffff',
      fontSize: '50px',
      padding: '25px',
      textAlign: 'center',
      borderRadius: '10px',
      zIndex: '1'
    }
  });

  var sync = this.sync;
  var position = this.position;
  relationSurface.pipe(sync);

  var positionModifier = new Modifier({
    transform : function(){
      var currentPosition = position.get();
      return Transform.translate(currentPosition[0], currentPosition[1], 0);
    }
  });

  this.relationSurface = relationSurface;

  var zone = new Surface({
    size: [150,150],
    properties: {
      border: '1px dotted grey',
      borderRadius: '15px',
      zIndex: '0'
    }
  });
  this.zoneModifier = new StateModifier({
    origin: [0.5,0.5],
    align: [0.5,0.5],
    size: [150,150]
  });
  
  sync.on('update', function(data){
    var currentPosition = position.get();
    var xTimes = Math.floor(currentPosition[0]/deltaX());
    position.set([
      currentPosition[0] + data.delta[0],
      currentPosition[1] + data.delta[1]
      ]);
      Session.set('x', xTimes); 
      console.log("moved",xTimes);
      // if(xTimes%1 === 0)
      // position.set([xTimes*deltaX(),0], {curve : 'easeOutBounce', duration : 300}); 
  });

  sync.on('end', function(){
    var currentPosition = position.get();
    
    var xTimes = Session.get('x');
    var yTimes = Math.floor(currentPosition[1]/deltaY());
    //Spaces to the left
    if(currentPosition[0] < (xTimes*deltaX() + 200)  && currentPosition[0] > (xTimes*deltaX() -200)){
      console.log("moved",xTimes);

      position.set([xTimes*deltaX(),0], {curve : 'easeOutBounce', duration : 300}); 

    }      
    else
      position.set([0,0], {curve : 'easeOutBounce', duration : 300});
  });


  this.add(this.zoneModifier).add(zone);
  this.add(positionModifier).add(this.relationModifier).add(relationSurface);
}