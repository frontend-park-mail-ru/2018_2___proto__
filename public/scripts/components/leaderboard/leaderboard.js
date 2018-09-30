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
		this._currentPage = "1";
	}

	render(context) {
		context = this._pagination(context);
		super.render(context);

		this._context.pages.forEach((page) => {
			this._element.querySelector(`[num=page-${page.value}]`).addEventListener("click", this._onPageClick.bind(this));
		});
	}

	_pagination(context) {
		const amount = Math.ceil(context.count / 10);
		const pages = [];

		for (let i = 0; i < amount; i++) {
			pages.push({
				value: i + 1,
				isCurrent: i + 1 == this._currentPage,
			});
		}

		return context = { ...context, ...{ pages: pages } };
	}

	_onPageClick() {
		this._currentPage = event.target.innerText;
		this.render(this._context);
	}
}
