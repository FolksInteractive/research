loadTemplate = function(template) {
  var div = document.createElement('div');
  UI.insert(UI.render(template), div);
  return div;
};

getTemplates = function() {
  return [loadTemplate(Template.c1), loadTemplate(Template.c2),
  loadTemplate(Template.c3), loadTemplate(Template.c4)];
};

createRelations = function() {

  if (Relations.find().count() === 0) {
    Relations.insert({
      icon: '<span class="glyphicon glyphicon-trash"></span>'
    });
    Relations.insert({
      icon: '<span class="glyphicon glyphicon-home"></span>'
    });
    Relations.insert({
      icon: '<span class="glyphicon glyphicon-file"></span>'
    });
    Relations.insert({
      icon: '<span class="glyphicon glyphicon-time"></span>'
    });
    Relations.insert({
      icon: '<span class="glyphicon glyphicon-road"></span>'
    });
    Relations.insert({
      icon: '<span class="glyphicon glyphicon-th"></span>'
    });
    Relations.insert({
      icon: '<span class="glyphicon glyphicon-search"></span>'
    });
    Relations.insert({
      icon: '<span class="glyphicon glyphicon-music"></span>'
    });
    Relations.insert({
      icon: '<span class="glyphicon glyphicon-cloud"></span>'
    });
    Relations.insert({
      icon: '<span class="glyphicon glyphicon-envelope"></span>'
    });
  }
}

getRelations = function() {
  createRelations();

  return Relations.find().fetch();

}

deltaX = function() {
  return window.innerWidth/5;
}
deltaY = function() {
  return window.innerHeight/2;
}
