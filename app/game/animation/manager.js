import Hero from "./hero";
import CanvasInterface from "./interface";
import Bus from "../../modules/bus";

export default class CanvasManager {
	constructor({ width, height }) {
		this.width = width;
		this.height = height;
		this._canvasMap = new Map();
		// this._parseMeta();
		Bus.on("animate", ({ side, action }) => {
			this[`${side}Hero`].animate(action);
			console.log(side, action);
		});
	}

	createHero(charClass, side) {
		const newHeroData = {
			charClass,
			side,
			canvas: this.getCanvas(`hero-${side}`),
		};
		// console.log(this);
		this[`${side}Hero`] = new Hero(newHeroData, this);

		return this;
	}

	getHero(side) {
		return this[`${side}Hero`];
	}

	addCanvas(canvasClass) {
		// game-screen__background is saved as 'background'
		const [canvas] = document.getElementsByClassName(canvasClass);
		canvas.width = this.width;
		canvas.height = this.height;
		const newInterface = new CanvasInterface(canvas);
		this._canvasMap.set(canvasClass.split("__")[1], newInterface);
		return this;
	}

	getCanvas(canvasName) {
		return this._canvasMap.get(canvasName);
	}


	getMeta(spriteName) {
		return this.meta[spriteName];
	}

	_parseMeta() {
		const request = new XMLHttpRequest();
		request.open("GET", "https://rasseki.pro/public/sprites/meta.json", false);
		request.send(null);
		this.meta = JSON.parse(request.responseText);
	}
}
