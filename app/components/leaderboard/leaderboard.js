import "./leaderboard.scss";
import template from "./leaderboard.hbs";
import BaseComponent from "../baseComponent";
import http from "../../modules/http";

/**
 * Компонент Leaderboard
 */
export default class LeaderboardComponent extends BaseComponent {
	constructor() {
		super();
		this.template = template;
		this._currentPage = "1";
		this._offset = 0;
		http.doGet({
			callback: xhr => {
				this.render(JSON.parse(xhr.responseText));
			},
			path: `https://rasseki.org:8443/leaders/0/10`,
		});
	}

	render(context) {
		context = this._pagination(context);
		super.render(context);
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

	_onPageClick() {
		this._currentPage = event.target.innerText;
		this._offset = (this._currentPage - 1) * 10;
		http.doGet({
			callback: xhr => {
				this.render(JSON.parse(xhr.responseText));
			},
			path: `https://rasseki.org:8443/leaders/${this._offset}/10`,
		});
	}
}
