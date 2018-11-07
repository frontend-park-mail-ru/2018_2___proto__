import Vector2 from "./transformation/vector2";
import Behaviour from "./gameBehaviour/behaviour";
import Transform2d from "./transformation/transform";
import IdManager from "../utility/idManager";
import NameManager from "../utility/nameManager";

export default class GameObject {
	private _name: string;
	private readonly id: number;
	private _isEnabled: boolean;
	private _transform: Transform2d;
	private _behaviourArr: Array<Behaviour>;
	private _objectCoordinates: Array<Vector2>;
	private _textureCoordinates: Array<Vector2>;
	private _behaviourMap: Map<string, Array<Behaviour>>;

	public get Enabled() {
		return this._isEnabled;
	}

	public get Transform() {
		return this._transform;
	}


	// TODO сделать мэнеджер имен, который будет генерить имена, для того, чтобы избавиться от этого нелепого конструктора
	constructor() {
		this._isEnabled = true;
		this.id = IdManager.GenerateId();
		this._behaviourArr = new Array<Behaviour>();
		this._name = NameManager.GenerateName(this);
		this._objectCoordinates = new Array<Vector2>();
		this._textureCoordinates = new Array<Vector2>();
		this._behaviourMap = new Map<string, Array<Behaviour>>();
		this._transform = new Transform2d(this);
	}

	/**
	 * Рендеринг объекта
	 */
	public Render(): void {}

	/**
	 * Добавление скрипта поведения к объекту
	 * @param script
	 */
	public AddBehaviour(script: Behaviour): void {
		let scriptType: string = script.getType();

		if (this._behaviourMap.has(scriptType)) {
			if (typeof this._behaviourMap.get(scriptType) === "undefined") {
				this._behaviourMap.set(scriptType, new Array<Behaviour>(script));
			} else {
				(this._behaviourMap.get(scriptType))!.push(script);
			}
		}

		script.setParent(this);
	}

	/**
	 * Получение скрипта поведения по ID
	 * @param {number} id
	 * @returns {Behaviour || null}
	 */
	private GetBehaviourById(id: number): Behaviour | null {
		this._behaviourArr.forEach(script => {
			if (script.getId() == id) {
				return script;
			}
		});

		return null;
	}

	/**
	 * Получение скрипта поведения по имени
	 * @param {string} name
	 * @returns {Behaviour || null}
	 */
	private GetBehaviourByName(name: string): Behaviour | null {
		this._behaviourArr.forEach(script => {
			if (script.getName() == name) {
				return script;
			}
		});

		return null;
	}

	/**
	 * Получение всех скриптов поведения
	 */
	private GetBehaviours(): Array<Behaviour> {
		return this._behaviourArr;
	}

	/**
	 * Получение всех скриптов поведения по типу
	 * @param {string} type
	 * @returns {Array<Behaviour> || undefined}
	 */
	private GetBehavioursByType(type: string): Array<Behaviour> | undefined {
		return this._behaviourMap.get(type);
	}

	/**
	 * Получение всей информации об игровом объекте
	 * @returns {Array<any>}
	 */
	public GetObjectInfo(): Array<any> {
		return new Array<any>(
			this.id,
			this._name,
			this._behaviourMap,
			this._behaviourArr,
			this._objectCoordinates,
			this._textureCoordinates
		);
	}

	/**
	 * Активация игрового объекта (отображается на сцене, скрипты исполняются)
	 */
	public Enable(): void {
		this._isEnabled = true;
	}

	/**
	 * Деактивация игрового объекта (не отображается на сцене, скрипты исполняются)
	 */
	public Disable(): void {
		this._isEnabled = false;
	}
}
