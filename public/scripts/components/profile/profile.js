import "./profile.css";
import template from "./profile.hbs";
import BaseComponent from "../baseComponent/baseComponent";
import ButtonComponent from "../button/button";

/**
 * Компонент profile
 */
export default class ProfileComponent extends BaseComponent {
	constructor() {
		super();
		this.template = template;
		this._context = {
			changeProfile: false,
		};
	}

	render(context) {
		super.render(context);

		const btnText = this._context.changeProfile ? "Save profile" : "Change profile";

		this.renderChild("changeProfile", ButtonComponent, {
			text: btnText,
			onClick: this._onChangeProfileClick.bind(this),
		});
	}

	_onChangeProfileClick() {
		this._context = {
			changeProfile: true,
		};

		this.render();
	}
}
