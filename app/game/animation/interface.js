import CanvasWrapper from "./render";

export default class Interface extends CanvasWrapper {
	constructor(args) {
		super(args);
		this.hpBarWidth = 450;
		this.hpBarHeight = 90;
		this.x_margin = this.canvas.width * 0.05;
		this.y_margin = this.canvas.height * 0.1;
		// this.side = side; // left or right
	}

	clearHPBar(side) {
		let data;
		switch (side) {
			case "left":
				data = {
					pos_x: 0,
					pos_y: 0,
					width: this.canvas.width / 2,
					height: this.canvas.height / 2,
				};
				this.clear(data);
				break;
			case "right":
				data = {
					pos_x: this.canvas.width / 2,
					pos_y: 0,
					width: this.canvas.width,
					height: this.canvas.height,
				};
				// console.log(data);
				this.clear(data);
				break;
			default:
				console.log("clearHPBar: incorrect side ", side);
		}
	}

	setHP(side, hp) {
		this.clearHPBar(side);
		if (hp < 0) { hp = 0; }
		const spriteName = `hp/hp_${hp}_${side}`;
		// debugger
		const x = (side === "left")
			? this.x_margin : this.canvas.width - this.x_margin - this.hpBarWidth;
		const bar = {
			image_name: spriteName,
			pos_x: x, // coords of the sprite"s top left point
			pos_y: this.y_margin,
			width: this.hpBarWidth, // size of the image
			height: this.hpBarHeight,
		};
		this.draw(bar);
	}

	drawBackground() {
		let height = 1536 - document.documentElement.clientHeight;
		if (height < 0) { height = 0; }
		this.draw({
			image_name: "full-bg",
			pos_x: 0, // coords of the sprite"s top left point
			pos_y: 0,
			width: document.documentElement.clientWidth, // size of the image
			height: document.documentElement.clientHeight,
		}, {
			src_x: 0,
			src_y: height,
		});
	}

	drawInterface(leftHP = 4, rightHP = 4) {
		// left hp bar
		this.draw({
			image_name: `hp/hp_${leftHP}_left`,
			pos_x: this.x_margin, // coords of the sprite"s top left point
			pos_y: this.y_margin,
			width: 450, // size of the image
			height: 90,
		});

		// right hp bar
		this.draw({
			image_name: `hp/hp_${rightHP}_right`,
			pos_x: this.canvas.width - 450 - this.x_margin, // coords of the sprite"s top left point
			pos_y: this.y_margin,
			width: 450, // size of the image
			height: 90,
		});
	}
}
