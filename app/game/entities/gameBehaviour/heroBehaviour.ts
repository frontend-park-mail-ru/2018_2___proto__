import Behaviour from "./behaviour";
import GameObject from "../gameObject";

/**
 * Класс поведения героя игрока
 */
export default class HeroBehaviour extends Behaviour {
	private health: number;

	constructor(id: number, name: string, type: string, parent: GameObject) {
		super(id, name, type, parent);
		this.health = 100;
	}
}