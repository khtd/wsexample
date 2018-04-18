define([
    "module",
    "wilton/Channel",
    "wilton/loader"
], function(module, Channel, loader) {
    "use strict";

    var conf = loader.loadModuleJson("wilton_longpolling/config.json");

    // get configration provided from index.js
    return conf;
});