// import CanvasInterface from "../../game/animation/interface";

export default class Hero {
	constructor({ side, charClass, canvas }) {
		this.charClass = charClass;
		this.side = side;
		switch (this.side) {
			case "left":
				this.coord = {
					x: 20,
					y: 100,
				};
				break;
			case "right":
				this.coord = {
					x: 500,
					y: 100,
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
		this.canvas = canvas;
		this.hp = 4;
	}

	animateIdle() {
		const spriteName = `${this.charClass}_${this.side}_idle`;
		// debugger
		const data = {
			image_name: spriteName,
			pos_x: this.coord.x,
			pos_y: this.coord.y,
			width: this.meta.idle.width,
			height: this.meta.idle.height,
			numberOfFrames: this.meta.idle.numberOfFrames,
			ticksPerFrame: this.meta.idle.ticksPerFrame,
		};
		this.canvas.animate(data);
		// return data;
	}

	parseMeta(charClass, side) {
		const request = new XMLHttpRequest();
		request.open("GET", "/public/sprites/meta.json", false);
		request.send(null);
		const meta = JSON.parse(request.responseText);
		this.meta = meta[charClass][side];
	}
}
