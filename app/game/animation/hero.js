export default class Hero {
	constructor({	side, charClass, canvas }, manager) {
		this.canvas = canvas;
		this.charClass = charClass;
		this.side = side;
		this.manager = manager;
		// console.log("manager", manager);
		this.parseMeta(charClass, side);
		this.heroCenter = {};
		switch (this.side) {
			case "left":
				this.heroCenter.x = document.documentElement.clientWidth * 0.15;
				this.heroCenter.y = document.documentElement.clientHeight * 0.55;
				break;
			case "right":
				this.heroCenter.x = document.documentElement.clientWidth * 0.55;
				this.heroCenter.y = document.documentElement.clientHeight * 0.55;
				break;
			default:
				console.error(`side of ${this.charClass} is not set`);
		}
		this.hp = 4;
	}

	animate(action) {
		const spriteName = `${this.charClass}_${this.side}_${action}`;
		const coord = this._calcCoord(action);
		const data = {
			image_name: spriteName,
			// pos_x: this.meta[action].x ? this.meta[action].x : this.coord.x,
			// pos_y: this.meta[action].y ? this.meta[action].y : this.coord.y,
			pos_x: coord.x,
			pos_y: coord.y,
			width: this.meta[action].width,
			height: this.meta[action].height,
			numberOfFrames: this.meta[action].numberOfFrames,
			ticksPerFrame: this.meta[action].ticksPerFrame,
		};
		this.canvas.animate(data, action);
	}

	decreaseHP() {
		this.hp -= 1;
		// this.manager.getCanvas("interface").setLeftHP(this.hp);
		this.manager.getCanvas("interface").setHP(this.side, this.hp);
	}

	setHP(hp) {
		this.hp = hp;
		this.manager.getCanvas("interface").setHP(this.side, hp);
	}

	_calcCoord(action) {
		const meta = this.meta[action];

		// const bottomBorder = document.documentElement.clientHeight -
		// const y = this.heroCenter.y + meta.offset.y;
		const y = document.documentElement.clientHeight
		- meta.margin_bottom - meta.height + meta.border.bottom + meta.offset.y;
		const x = this.heroCenter.x + meta.offset.x;

		return { x, y };
	}

	parseMeta(charClass, side) {
		const request = new XMLHttpRequest();
		request.open("GET", "/public/sprites/meta.json", false);
		request.send(null);
		const metaData = JSON.parse(request.responseText);
		this.meta = metaData[charClass][side];
	}
}
