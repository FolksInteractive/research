Package.describe({
  summary: "MVC style package that makes Famo.us reactive.",
  environments: ['client']
});

Package.on_use(function(api) {
  api.use('deps');
  api.add_files(['reactive-render-node.js']);
  api.export('ReactiveWrapper');
});