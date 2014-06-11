if (Meteor.isClient) {
  Template.hello.greeting = function () {
   return "Welcome to test-app-packmeteor.";
 };
 Template.hello.clicks = function() {
  return Clicks.find().fetch();
}

Template.hello.events({
  'click .btn': function () {
      // template data, if any, is available in 'this'
      count = Clicks.find().fetch().length;
      Clicks.insert({content: count, createdAt: new Date()});
      
    }
  });

Template.item.rendered = function(){
  $(".date").hide();
}
Template.item.events({
  'click .item': function(data) {
    $('body').scrollTop(0);
    $(data.currentTarget).toggleClass('fullscreen');
    $(data.currentTarget.lastElementChild).toggle("fast");
  }
});

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
