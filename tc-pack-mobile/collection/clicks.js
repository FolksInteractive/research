ddp = DDP.connect('http://tc-pack.meteor.com');

Clicks = new Meteor.Collection('clicks', ddp);

amount = function() { return Clicks.find().fetch().length };
