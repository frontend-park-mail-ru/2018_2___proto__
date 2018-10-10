import MenuView from "./views/menu/menu";
import AboutView from "./views/about/about";
import ProfileView from "./views/profile/profile";
import LeaderboardView from "./views/leaderboard/leaderboard";
import SignInView from "./views/forms/signin/signin";
import SignUpView from "./views/forms/signup/signup";
import ApplicationView from "./views/application/application";

import Router from "./modules/router";
// import RequestModule from "./modules/request";

const menu = new MenuView();
const signin = new SignInView();
const signup = new SignUpView();
const profile = new ProfileView();
const leaderboard = new LeaderboardView();
const about = new AboutView();
const root = new ApplicationView();
root.render();

Router.register("", menu)
	.register("/", menu)
	.register("/signin", signin)
	.register("/signup", signup)
	.register("/profile", profile)
	.register("/about", about)
	.register("/leaderboard", leaderboard)
	.start();


function createApplication() {
	const application = new ApplicationView();
	application.render();
	document.body.appendChild(application.element);
}

window.onload = createApplication();
