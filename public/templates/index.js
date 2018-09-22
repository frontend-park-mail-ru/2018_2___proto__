(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['index.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"main-block__form\">\n    <ul class=\"buttons\">\n        <li><a href=\"../Game/fight.html\" class=\"main-block__menu-button\">Play singleplayer</a></li>\n        <li><a href=\"#\" class=\"main-block__menu-button\">Play multiplayer</a></li>\n        <li><a onclick=\"renderProfile();\" href=\"#\" class=\"main-block__menu-button\">View profile</a></li>\n        <li><a onclick=\"renderLeaders();\" href=\"#\" class=\"main-block__menu-button\">Leaderboard</a></li>\n        <li><a onclick=\"renderAbout();\" href=\"#\" class=\"main-block__menu-button\">About</a></li>\n    </ul>\n</div>";
},"useData":true});
})();