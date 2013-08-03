this["JST"] = this["JST"] || {};

this["JST"]["src/Templates/Attachment.handlebars"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div>";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>";
  return buffer;
  });

this["JST"]["src/Templates/Browse.handlebars"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"browse-layout\">\n\n  <div class=\"col20\">\n    <div class=\"user-accounts\">\n      <div class=\"account-categories\">\n      	ACCOUNTS\n      </div>\n    </div>\n  </div>\n\n  <div class=\"col80\">\n    <div class=\"contents\">\n    	BROWSE\n    </div>\n  </div>\n  \n</div>\n";
  });

this["JST"]["src/Templates/BrowseLoading.handlebars"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<img src=\"/public/img/analyzing.jpg\" width=\"\" height=\"\">";
  });

this["JST"]["src/Templates/Contact.handlebars"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div>";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>";
  return buffer;
  });

this["JST"]["src/Templates/Email.handlebars"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div>";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>";
  return buffer;
  });

this["JST"]["src/Templates/EmptyTaskGroup.handlebars"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "Ain't nobody got time for that!";
  });

this["JST"]["src/Templates/Entity.handlebars"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div>";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>";
  return buffer;
  });

this["JST"]["src/Templates/Evernote.handlebars"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div>";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>";
  return buffer;
  });

this["JST"]["src/Templates/Navigation.handlebars"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<ul class=\"unstyled pull-right\">\n   <li class=\"settings dropdown\">\n      <a data-original-title=\"did you find something fast?\" title=\"\" data-placement=\"bottom\" data-toggle=\"tooltip\" class=\"tweet\" href=\"";
  if (stack1 = helpers.twitterHref) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.twitterHref; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" target=\"_blank\">\n      <i class=\"icon-twitter\"></i>\n      </a>\n      <a data-original-title=\"take the tour\" title=\"\" data-placement=\"bottom\" data-toggle=\"tooltip\" class=\"tour open-panel\" rel=\"getstarted#step4\">\n      <i class=\"icon-facetime-video\"></i>\n      </a>\n      <a class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n      <i class=\"icon-cog\"></i>\n      </a>\n      <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"dLabel\">\n         <li><a class=\"open-panel\" rel=\"accounts\">Accounts</a></li>\n         <li><a class=\"open-panel\" rel=\"settings\">Settings</a></li>\n         <li><a class=\"open-panel\" rel=\"getstarted\">Get Started</a></li>\n         <li class=\"divider\"></li>\n         <li><a tabindex=\"-1\" href=\"/logout\">Logout</a></li>\n      </ul>\n   </li>\n</ul>\n<a class=\"back-button hidden\" href=\"/tasks\">\n<i class=\"icon-chevron-left\"></i>\n</a>\n<a class=\"brand\" href=\"/tasks\">\n<img src=\"public/img/logo/header.png\">\n</a>\n<ul class=\"nav nav-pills\">\n   <li data-id=\"browse\" class=\"active\">\n       <a id=\"browse\" href=\"#\">Browse</a>\n   </li>\n   <li data-id=\"priorities\">\n      <a id=\"priorities\" href=\"#\">Priorities</a>\n   </li>\n   <li data-id=\"people\">\n   </li>\n</ul>";
  return buffer;
  });

this["JST"]["src/Templates/PathNotFound.handlebars"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "INVALID 404";
  });

this["JST"]["src/Templates/Priorities.handlebars"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"browse\">\n \n  <div class=\"col20 filters\">\n\n    <form data-id=\"keyword\" class=\"filter\">\n      <i class=\"icon-search\"></i>\n      <input placeholder=\"Keyword\" class=\"input-search\" name=\"q\" type=\"text\">\n    </form>\n\n    <div data-id=\"completed\" class=\"filter\"></div>\n    <div data-id=\"date\" class=\"filter\"></div>\n\n  </div>\n\n  <div class=\"col80 browser tasks\">\n\n    <form class=\"create-task\">\n      <input class=\"input-xxlarge\" name=\"task-desc\" type=\"text\" placeholder=\"Today @ 8am Task Name\" />\n      <button class=\"btn create-task-btn\" type=\"button\">\n        <i class=\"icon-plus-sign-alt\"></i>\n        Create New Task\n      </button>\n    </form>\n\n    <div class=\"task-paging\"></div>\n    <div class=\"task-entities\"></div>\n\n  </div>\n</div>\n\n\n\n<!-- <div class=\"task-title\">\n	<h1>Priority Actions</h1>\n</div>\n<div id=\"priorities\"></div> -->\n\n";
  });

this["JST"]["src/Templates/Related.handlebars"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div></div>";
  });

this["JST"]["src/Templates/RelatedEntity.handlebars"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression;


  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  return escapeExpression(stack1);
  });

this["JST"]["src/Templates/Sidebar.handlebars"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div><h2>Inbox</h2></div>\n<div><h2>All Mail</h2></div>\n<div><h2>Fiels</h2></div>\n<div><h2>Notes</h2></div>\n<div><h2>Search All</h2></div>";
  });

this["JST"]["src/Templates/SidebarAccount.handlebars"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression;


  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  return escapeExpression(stack1);
  });

this["JST"]["src/Templates/Task.handlebars"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<img src=\"";
  if (stack1 = helpers.src) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.src; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"><a href=\"#\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a>";
  return buffer;
  });

this["JST"]["src/Templates/TaskEntities.handlebars"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "";


  return buffer;
  });

this["JST"]["src/Templates/TaskGroup.handlebars"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"task-section\">\n	<h2>";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h2>\n	<ul class=\"task-list\"></ul>\n</div>\n";
  return buffer;
  });

this["JST"]["src/Templates/TaskLayout.handlebars"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"entity\">\n\n  <div class=\"col80 entity-preview\"></div>\n\n  <div class=\"col20 entity-details\">\n    <div class=\"entity-sharing actions\"></div>\n    <div class=\"entity-info\"></div>\n    <div class=\"entity-related\"></div>\n  </div>\n\n</diV>\n";
  });

this["JST"]["src/Templates/TaskLoading.handlebars"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<img src=\"/public/img/analyzing.jpg\" width=\"\" height=\"\">\n\nLOADING Task...";
  });

this["JST"]["src/Templates/TasksLoading.handlebars"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "LOADING...";
  });