import GameObject from "../gameObject";
import IdManager from "../../utility/idManager";
import NameManager from "../../utility/nameManager";

/**
 * Базовый абстрактный класс поведенческого скрипта игрового объекта
 *
 * Используется для реализации скриптов каждого из игровых объектов
 */
export default abstract class Behaviour {
	private readonly _id: number;
	private _name: string;
	private _type: string;
	private _gameObject: GameObject;
	private _isEnabled: boolean;

	constructor(type: string, parent: GameObject) {
		this._type = type;
		this._gameObject = parent;
		this._isEnabled = true;
		this._id = IdManager.GenerateId();
		this._name = NameManager.GenerateName(this);
	}

	public get Id(): number {
		return this._id;
	}

	public get Name(): string {
		return this._name;
	}

	public set Name(name: string) {
		this._name = name;
	}

	public get Type(): string {
		return this._type;
	}

	public set Type(type: string) {
		this._type = type;
	}

	public set GameObject(parent: GameObject) {
		this._gameObject = parent;
	}

	public OnUpdate(): void {}

	public Enable() {
		this._isEnabled = true;
		this.OnEnable();
	}

	public Disable() {
		this._isEnabled = false;
		this.OnDisable();
	}

	protected OnEnable(): void {}

	protected OnDisable(): void {}
}
