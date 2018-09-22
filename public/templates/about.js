(function () {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
  templates['about.hbs'] = template({
    "1": function (container, depth0, helpers, partials, data) {
      var helper, alias1 = depth0 != null ? depth0 : (container.nullContext || {}), alias2 = helpers.helperMissing, alias3 = "function", alias4 = container.escapeExpression;

      return "						    <li><a href=\""
        + alias4(((helper = (helper = helpers.link || (depth0 != null ? depth0.link : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "link", "hash": {}, "data": data }) : helper)))
        + "\" class=\"main-block__menu-button\">"
        + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { "name": "name", "hash": {}, "data": data }) : helper)))
        + "</a></li>\n";
    }, "compiler": [7, ">= 4.0.0"], "main": function (container, depth0, helpers, partials, data) {
      var stack1, alias1 = container.lambda, alias2 = container.escapeExpression;

      return "<!DOCTYPE html>\n<html lang=\"en\">\n\n	<head>\n		<meta charset=\"UTF-8\">\n		<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n		<meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\n		<title>About project</title>\n		<link rel=\"stylesheet\" href=\"../../styles/main.css\">\n	</head>\n\n	<body>\n		<div id=\"root\">\n			<div id=\"authbar\">\n				<ul class=\"auth\">\n					<li><a href=\"sign_in.html\" class=\"authbar__auth-button\">Sign In</a></li>\n					<li><a href=\"sign_up.html\" class=\"authbar__auth-button\">Sign Up</a></li>\n				</ul>\n			</div>\n\n			<div id=\"logo\">\n				<h1><a href=\"index.html\">Our game</a></h1>\n			</div>\n\n			<div id=\"main-block\">\n				<div class=\"main-block__form\">\n					<ul class=\"buttons\">\n"
        + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}), (depth0 != null ? depth0.developers : depth0), { "name": "each", "hash": {}, "fn": container.program(1, data, 0), "inverse": container.noop, "data": data })) != null ? stack1 : "")
        + "\n						<p><h2>Mentor</h2></p>\n						    <li><a href=\""
        + alias2(alias1(((stack1 = (depth0 != null ? depth0.mentor : depth0)) != null ? stack1.link : stack1), depth0))
        + "\" class=\"main-block__menu-button\">"
        + alias2(alias1(((stack1 = (depth0 != null ? depth0.mentor : depth0)) != null ? stack1.name : stack1), depth0))
        + "</a></li>\n					</ul>\n				</div>\n			</div>\n		</div>\n	</body>\n\n</html>\n";
    }, "useData": true
  });
})();