(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['signup.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"main-block__form\">\n    <form>\n        <input type=\"text\" class=\"main-block__form-field\" placeholder=\"Login\">\n        <input type=\"email\" class=\"main-block__form-field\" placeholder=\"E-Mail\">\n        <input type=\"password\" class=\"main-block__form-field\" placeholder=\"Password\">\n        <input type=\"password\" class=\"main-block__form-field\" placeholder=\"Confirm password\">\n        <input type=\"submit\" class=\"main-block__form-button\" value=\"Sign Up\">\n\n        <div class=\"main-block__form-links\">\n            <p><a href=\"#\" class=\"\">Already registered?</a></p>\n            <p><a href=\"#\" class=\"\">Forgot your password?</a></p>\n        </div>\n    </form>\n</div>";
},"useData":true});
})();