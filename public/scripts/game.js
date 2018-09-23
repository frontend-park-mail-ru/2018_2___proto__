"use strict";

// Здесь полная срань и попытки в анимацию (в которые не шмог :c)

let health = 100;

function attack() {
	let damage = 0;

	if (health != 0) {
		damage = Math.floor(Math.random() * 100);
	}

	health = health - damage < 0 ? (health = 0) : health - damage;

	apply();
}

function healing() {
	let heal = 0;

	if (health != 100) {
		heal = Math.floor(Math.random() * 100);
	}

	health = health + heal > 100 ? (health = 100) : health + heal;

	apply();
}

function apply() {
	let text = document.getElementsByClassName(
		"gamer-info__health__bar-text"
	)[1];
	text.innerText = health + "%";
	let red = document.getElementsByClassName("gamer-info__health__bar-red")[1];
	let bar = document.getElementsByClassName("gamer-info__health__bar")[1];
	let blue = document.getElementsByClassName("gamer-info__health__bar-blue")[1];
	frame(red, 300);
	frame(bar, 700);
	frame(blue, 500);
}

function frame(elem, duratation) {
	// let from = 0;
	// let to = 500;
	let start = new Date().getTime();

	setTimeout(() => {
		let now = new Date().getTime() - start;
		let progress = now / duratation;
		// let result = (to - from) * progress + from;

		elem.style.width = health + "%";

		if (progress > 1) {
			setTimeout(arguments.callee, 10);
		}
	});
}

// Вопрос

function openQuestion(event) {
	document.getElementById("question").style.display = "block";
}

function closeQuestion() {
	document.getElementById("question").style.display = "none";
}

window.onclick = (event) => {
	if (event.target == document.getElementById("question")) {
		document.getElementById("question").style.display = none;
	}
}