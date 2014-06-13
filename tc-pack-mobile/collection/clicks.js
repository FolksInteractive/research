ddp = DDP.connect('http://tc-pack.meteor.com');

Clicks = new Meteor.Collection('clicks', ddp);
