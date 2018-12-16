// import CanvasInterface from "../../game/animation/interface";

export default class Hero {
	constructor({	side, charClass, canvas }, manager) {
		this.canvas = canvas;
		this.charClass = charClass;
		this.side = side;
		this.manager = manager;
		console.log("manager", manager);
		switch (this.side) {
			case "left":
				this.coord = {
					x: document.documentElement.clientWidth * 0.1,
					y: document.documentElement.clientHeight * 0.55,
					// x: 20,
					// y: 100,
				};
				// console.log("x", this.coord.x);
				break;
			case "right":
				this.coord = {
					x: document.documentElement.clientWidth * 0.7,
					y: document.documentElement.clientHeight * 0.65,
					// x: 500,
					// y: 100,
				};
				break;
			default:
				console.log(`side of ${charClass} is not set`);
				this.coord = {
					x: 0,
					y: 0,
				};
				// debugger;
		}
		this.parseMeta(charClass, side);
		this.hp = 4;
	}

	animate(action) {
		const spriteName = `${this.charClass}_${this.side}_${action}`;
		// debugger
		const data = {
			image_name: spriteName,
			pos_x: this.meta[action].x ? this.meta[action].x : this.coord.x,
			pos_y: this.meta[action].y ? this.meta[action].y : this.coord.y,
			width: this.meta[action].width,
			height: this.meta[action].height,
			numberOfFrames: this.meta[action].numberOfFrames,
			ticksPerFrame: this.meta[action].ticksPerFrame,
		};
		let once = false;
		if (action === "attack" || action === "die") {
			once = true;
		}
		// this.canvas._stopAnimation();
		this.canvas.animate(data, once);
		// return data;
	}

	decreaseHP() {
		this.hp -= 1;
		// this.manager.getCanvas("interface").setLeftHP(this.hp);
		this.manager.getCanvas("interface").setHP(this.side, this.hp);
	}

	parseMeta(charClass, side) {
		const request = new XMLHttpRequest();
		request.open("GET", "/public/sprites/meta.json", false);
		request.send(null);
		const meta = JSON.parse(request.responseText);
		this.meta = meta[charClass][side];
	}
}
