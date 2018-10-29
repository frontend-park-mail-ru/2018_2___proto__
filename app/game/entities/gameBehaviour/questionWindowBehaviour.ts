import Behaviour from "./behaviour";
import GameObject from "../gameObject";

/**
 * Класс поведения окна вопроса
 */
export default class QuestionWindowBehaviour extends Behaviour {
	constructor(id: number, name: string, type: string, parent: GameObject) {
		super(id, name, type, parent);
	}
}
