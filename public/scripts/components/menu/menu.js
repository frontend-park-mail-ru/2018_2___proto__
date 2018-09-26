"use strict";

import "./menu.css";
import BaseComponent from "../baseComponent/baseComponent.js";
import ButtonComponent from "../button/button.js";

export default class MenuComponent extends BaseComponent {
	constructor() {
		super();
		this._template = require("./menu.hbs");
	}

	render() {
		super.render();
		this._renderChildren();
	}

	_renderChildren() {
		this._renderChild("singleplayer", ButtonComponent, {
			text: "Play singleplayer",
			click: this._onSingleplayerClick,
		});

		this._renderChild("multiplayer", ButtonComponent, {
			text: "Play multiplayer",
			click: this._onMultiplayerClick,
		});

		this._renderChild("profile", ButtonComponent, {
			text: "View profile",
			click: this._onProfileClick,
		});

		this._renderChild("leaderboard", ButtonComponent, {
			text: "Leaderboard",
			click: this._onLeaderboardClick,
		});

		this._renderChild("about", ButtonComponent, {
			text: "About",
			click: this._onAboutClick,
		});
	}

	_onSingleplayerClick() {}

	_onMultiplayerClick() {}

	_onProfileClick() {}

	_onLeaderboardClick() {}

	_onAboutClick() {}
}
