Router.map(function () {
  this.route('hello', {
    path: '/',
    waitOn: function(){return Meteor.subscribe('clicks');},
    data: function() {return Clicks.find().fetch();}
  });
});