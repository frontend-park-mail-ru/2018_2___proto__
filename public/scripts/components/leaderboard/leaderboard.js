import "./leaderboard.css";
import template from "./leaderboard.hbs";
import BaseComponent from "../baseComponent/baseComponent";

/**
 * Компонент Leaderboard
 */
export default class LeaderboardComponent extends BaseComponent {
	constructor() {
		super();
		this.template = template;
	}
}
