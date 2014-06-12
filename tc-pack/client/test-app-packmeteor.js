if (Meteor.isClient) {
  // var oShell = new ActiveXObject("Shell.Application");
  // console.log(oShell);
  Template.app.clicks = function() {
    return Clicks.find().fetch();
  }

  Template.app.events({
    'click .btn': function () {
        // template data, if any, is available in 'this'
        count = Clicks.find().fetch().length;
        Clicks.insert({content: count, createdAt: new Date()});
    }
  });
  Template.app.media = function() {
    return "Desktop:" + Meteor.Device.isDesktop();
  }
  Template.app_phone.media = function() {
    return "Phone:" + Meteor.Device.isPhone();
  }

  // Template.item.rendered = function(){
  //   $(".date").hide();
  // }
  // Template.item.events({
  //   'click .item': function(data) {
  //     $('body').scrollTop(0);
  //     $(data.currentTarget).toggleClass('fullscreen');
  //     $(data.currentTarget.lastElementChild).toggle("fast");
  //   }
  // });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
