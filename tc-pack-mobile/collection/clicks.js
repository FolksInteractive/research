ddp = DDP.connect('http://tc-pack.meteor.com');

Clicks = new Meteor.Collection('clicks', ddp);

// Meteor.publish('clicks', function() {
//   return Clicks.find();
// });

