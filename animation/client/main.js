
require("famous-polyfills"); // Add polyfills
require("famous/core/famous"); // Add the default css file

Engine = require("famous/core/Engine");

var context = Engine.createContext();

context.add(new AppView(context));