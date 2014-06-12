(function(){
UI.body.contentParts.push(UI.Component.extend({render: (function() {
  var self = this;
  return HTML.DIV({
    "class": "content"
  }, "\n    ", Spacebars.TemplateWith(function() {
    return "app";
  }, UI.block(function() {
    var self = this;
    return Spacebars.include(self.lookupTemplate("deviceRender"));
  })), "\n  ");
})}));
Meteor.startup(function () { if (! UI.body.INSTANTIATED) { UI.body.INSTANTIATED = true; UI.DomRange.insert(UI.render(UI.body).dom, document.body); } });

Template.__define__("app", (function() {
  var self = this;
  var template = this;
  return [ HTML.DIV({
    "class": "row"
  }, function() {
    return Spacebars.mustache(self.lookup("media"));
  }), HTML.Raw('\n  <button type="button" class="btn btn-default">+</button>\n  '), UI.Each(function() {
    return Spacebars.call(self.lookup("clicks"));
  }, UI.block(function() {
    var self = this;
    return [ "\n    ", HTML.DIV({
      "class": "row"
    }, function() {
      return Spacebars.mustache(self.lookup("content"));
    }, " - ", function() {
      return Spacebars.mustache(self.lookup("createdAt"));
    }), "\n  " ];
  })) ];
}));

Template.__define__("app_phone", (function() {
  var self = this;
  var template = this;
  return [ HTML.DIV({
    "class": "row"
  }, function() {
    return Spacebars.mustache(self.lookup("media"));
  }), HTML.Raw('\n  <button type="button" class="btn btn-default">+</button>\n  '), UI.Each(function() {
    return Spacebars.call(self.lookup("clicks"));
  }, UI.block(function() {
    var self = this;
    return [ "\n    ", HTML.DIV({
      "class": "row"
    }, function() {
      return Spacebars.mustache(self.lookup("content"));
    }), "\n  " ];
  })) ];
}));

Template.__define__("item", (function() {
  var self = this;
  var template = this;
  return "";
}));

})();
