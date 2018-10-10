import "./leaderboard.scss";
import template from "./leaderboard.hbs";
import BaseView from "../baseView";

/**
 * Компонент Leaderboard
 */
export default class LeaderboardView extends BaseView {
	constructor() {
		super();
		this.template = template;
		this._currentPage = "1";
		this._offset = 0;
		this.requestModule.getLeaderboard(this._offset, 10).then((data) => {
			this.render(JSON.parse(data));
		});
	}

	render(context) {
		const newContext = this._pagination(context);
		super.render(newContext);
		this._context.pages.forEach((page) => {
			this._element
				.querySelector(`[tag=page-${page.value}]`)
				.addEventListener("click", this._onPageClick.bind(this));
		});
	}

	_pagination(context) {
		const amount = Math.ceil(context.count / 10);
		const pages = [];

		for (let i = 0; i < amount; i++) {
			pages.push({
				value: i + 1,
				isCurrent: i + 1 === this._currentPage,
			});
		}

		return { ...context, ...pages };
	}

	_onPageClick(event) {
		this._currentPage = event.target.innerText;
		this._offset = (this._currentPage - 1) * 10;
		this.requestModule.getLeaderboard(this._offset, 10).then((data) => {
			this.render(JSON.parse(data));
		});
	}
}
