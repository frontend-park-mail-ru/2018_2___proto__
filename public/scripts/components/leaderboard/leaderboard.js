import "./leaderboard.css";
import template from "./leaderboard.hbs";
import BaseComponent from "../baseComponent/baseComponent";
import httpModule from "../../modules/http";

/**
 * Компонент Leaderboard
 */
export default class LeaderboardComponent extends BaseComponent {
	constructor() {
		super();
		this.template = template;
		this._currentPage = "1";
		this._offset = 0;
		httpModule.doGet({
			callback: (xhr) => {
				this.render(JSON.parse(xhr.responseText));
			},
			path: "/leaders/0/10",
		});
	}

	render(context) {
		const newContext = this._pagination(context);
		super.render(newContext);
		this._context.pages.forEach((page) => {
			this._element
				.querySelector(`[num=page-${page.value}]`)
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
		httpModule.doGet({
			callback: (xhr) => {
				this.render(JSON.parse(xhr.responseText));
			},
			path: `/leaders/${this._offset}/10`,
		});
	}
}
