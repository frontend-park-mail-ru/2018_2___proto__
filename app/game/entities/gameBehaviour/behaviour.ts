import GameObject from "../gameObject";

/**
 * Базовый абстрактный класс поведенческого скрипта игрового объекта
 *
 * Используется для реализации скриптов каждого из игровых объектов
 */
export default abstract class Behaviour {
	private readonly id: number;
	private name: string;
	private type: string;
	private parent: GameObject;
	private isEnabled: boolean;

	constructor(id: number, name: string, type: string, parent: GameObject) {
		this.id = id;
		this.name = name;
		this.type = type;
		this.parent = parent;
		this.isEnabled = true;
	}

	public getId(): number {
		return this.id;
	}

	public getName(): string {
		return this.name;
	}

	public setName(name: string): void {
		this.name = name;
	}

	public getType(): string {
		return this.type;
	}

	public setType(type: string): void {
		this.type = type;
	}

	public setParent(parent: GameObject): void {
		this.parent = parent;
	}

	public onUpdate(): void {}

	public onEnable(): void {
		this.isEnabled = true;
	}

	public onDisable(): void {
		this.isEnabled = false;
	}
}
