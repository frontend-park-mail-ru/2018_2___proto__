(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['profile.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"main-block__form\">\n    <div class=\"main-block__profile\">\n        <div class=\"main-block__profile-user\">\n            <img src="
    + alias4(((helper = (helper = helpers.avatar || (depth0 != null ? depth0.avatar : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"avatar","hash":{},"data":data}) : helper)))
    + " alt=\"avatar\" class=\"main-block__profile-user-avatar\">\n            <span class=\"main-block__profile-user-name\">"
    + alias4(((helper = (helper = helpers.username || (depth0 != null ? depth0.username : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data}) : helper)))
    + "</span>\n        </div>\n        <div class=\"main-block__profile-info\">\n            <ul>\n                <li>\n                    <p><strong>E-Mail:</strong> "
    + alias4(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"email","hash":{},"data":data}) : helper)))
    + "</p>\n                </li>\n                <li>\n                    <p><strong>Wins:</strong> "
    + alias4(((helper = (helper = helpers.wins || (depth0 != null ? depth0.wins : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"wins","hash":{},"data":data}) : helper)))
    + "</p>\n                </li>\n                <li>\n                    <p><strong>Loses:</strong> "
    + alias4(((helper = (helper = helpers.loses || (depth0 != null ? depth0.loses : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"loses","hash":{},"data":data}) : helper)))
    + "</p>\n                </li>\n            </ul>\n        </div>\n    </div>\n</div>";
},"useData":true});
})();