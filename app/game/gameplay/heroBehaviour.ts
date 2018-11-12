import Behaviour from "../engine/core/behaviour";
import GameObject from "../engine/core/gameObject";

/**
 * Класс поведения героя игрока
 */
export default class HeroBehaviour extends Behaviour {
	private health: number;

	constructor(type: string, parent: GameObject) {
		super(type, parent);
		this.health = 100;
	}
}
