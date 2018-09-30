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
		this._currentPage = 1;
	}

	render(context) {
		// this._pagination(context);
		super.render(context);
	}

	_pagination(context) {
		const amount = Math.ceil(context.cscores / 10);
		const pages = [];
		for (let i = 0; i < amount; i++) {
			pages.push({
				value: i + 1,
				isCurrent: i + 1 === this._currentPage,
			});
		}

		context = { ...context, ...{ pages: pages } };
	}

	_onPageClick() {}
}
