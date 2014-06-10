if (Meteor.isClient) {
  Template.hello.greeting = function () {
   return "Welcome to test-app-packmeteor.";
 };
 Template.hello.clicks = function() {
  return Clicks.find().fetch();
 }

 Template.hello.events({
  'click input': function () {
      // template data, if any, is available in 'this'
      count = Clicks.find().fetch().length;
      Clicks.insert({content: count});
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
