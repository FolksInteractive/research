ReactiveWrapper = function(callback) {
  console.log('1');
  Deps.autorun(function() {
    if(Meteor.status().connected)
      Deps.autorun(function() {
        callback();
      });
  }); 
}

