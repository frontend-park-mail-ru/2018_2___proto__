import "./leaders.css";
import template from "./leaders.hbs";
import BaseComponent from "../baseComponent/baseComponent";

/**
 * Компонент Leaderboard
 */
export default class LeadersComponent extends BaseComponent {
	constructor() {
		super();
		this.template = template;
	}
}
