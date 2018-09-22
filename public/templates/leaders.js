(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['leaders.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <div class=\"main-block__table-row\">\n                <div class=\"main-block__table-cell\">"
    + alias4(((helper = (helper = helpers.place || (depth0 != null ? depth0.place : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"place","hash":{},"data":data}) : helper)))
    + "</div>\n                <div class=\"main-block__table-cell\">"
    + alias4(((helper = (helper = helpers.username || (depth0 != null ? depth0.username : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data}) : helper)))
    + "</div>\n                <div class=\"main-block__table-cell\">"
    + alias4(((helper = (helper = helpers.score || (depth0 != null ? depth0.score : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"score","hash":{},"data":data}) : helper)))
    + "</div>\n            </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"main-block__form\">\n    <div class=\"main-block__table\">\n        <div class=\"main-block__table-body\">\n            <div class=\"main-block__table-row\">\n                <div class=\"main-block__table-cell main-block__table-head\">Place</div>\n                <div class=\"main-block__table-cell main-block__table-head\">Gamer</div>\n                <div class=\"main-block__table-cell main-block__table-head\">Score</div>\n            </div>\n\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n        </div>\n    </div>\n</div>";
},"useData":true});
})();