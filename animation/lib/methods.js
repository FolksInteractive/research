loadTemplate = function(template) {
  var div = document.createElement('div');
  UI.insert(UI.render(template), div);
  return div;
};

getTemplates = function() {
  return [loadTemplate(Template.c1), loadTemplate(Template.c2),
    loadTemplate(Template.c3), loadTemplate(Template.c4)];
};