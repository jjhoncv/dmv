yOSON.AppSchema.modules = {
  "error": {
    "controllers": {
      "error": {
        "allActions": function() {
          yOSON.AppCore.runModule("touch_menu_principal");
          yOSON.AppCore.runModule("search_top");
          yOSON.AppCore.runModule("search_top", {
            parent: ".frm_error_search"
          });
        },
        "actions": {
          "byDefault": function() {}
        }
      },
      "byDefault": function() {}
    },
    "byDefault": function() {},
    "allControllers": function() {}
  },  
  "byDefault": function() {},
  "allModules": function() {    
  }
};