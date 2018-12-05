import CanvasWrapper from "./render";

export default class Interface extends CanvasWrapper {
	constructor(args) {
		super(args);
		this.hpBarWidth = 450;
		this.hpBarHeight = 90;
		this.x_margin = 50;
		this.y_margin = 30;
		// this.side = side; // left or right
	}

	setLeftHP(hp) {
		const spriteName = `hp/hp_${hp}_left`;
		const leftHPBar = {
			image_name: spriteName,
			pos_x: this.x_margin, // coords of the sprite"s top left point
			pos_y: this.y_margin,
			width: this.hpBarWidth, // size of the image
			height: this.hpBarHeight,
		};
		this.draw(leftHPBar);
	}

	setRightHP(hp) {
		const spriteName = `hp/hp_${hp}_right`;
		const rightHPBar = {
			image_name: spriteName,
			// coords of the sprite"s top left point
			pos_x: super.canvas_width - this.x_margin - this.hpBarWidth,
			pos_y: this.y_margin,
			width: this.hpBarWidth, // size of the image
			height: this.hpBarHeight,
		};
		this.draw(rightHPBar);
	}

	drawBackground() {
		this.draw({
			image_name: "full-bg",
			pos_x: 0, // coords of the sprite"s top left point
			pos_y: 0,
			width: 1920, // size of the image
			height: 1080,
		});
	}

	setTimer() {

	}
}
