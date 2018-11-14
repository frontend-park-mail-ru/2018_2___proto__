import IdManager from "../../utility/idManager";
import NameManager from "../../utility/nameManager";
import Transform2d from "../transformation/transform";
import Vector2 from "../transformation/vector2";
import Behaviour from "./behaviour";

export default class GameObject {
	private _name: string;
	private readonly _id: number;
	private _isEnabled: boolean;
	private _transform: Transform2d;
	private _behaviourArr: Array<Behaviour>;
	private _objectCoordinates: Array<Vector2>;
	private _textureCoordinates: Array<Vector2>;
	private _behaviourMap: Map<string, Array<Behaviour>>;

	public get Enabled(): boolean {
		return this._isEnabled;
	}

	public get Transform(): Transform2d {
		return this._transform;
	}

	public get Id(): number {
		return this._id;
	}

	public get Name(): string {
		return this._name;
	}

	constructor() {
		this._isEnabled = true;
		this._id = IdManager.GenerateId();
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
	 * @param behaviour
	 */
	public AddBehaviour(behaviour: Behaviour): void {
		const behaviourType: string = behaviour.Type;

		if (this._behaviourMap.has(behaviourType)) {
			if (typeof this._behaviourMap.get(behaviourType) === "undefined") {
				this._behaviourMap.set(
					behaviourType,
					new Array<Behaviour>(behaviour),
				);
			} else {
				this._behaviourMap.get(behaviourType)!.push(behaviour);
			}
		}

		behaviour.GameObject = this;
	}

	/**
	 * Получение всей информации об игровом объекте
	 * @returns {Array<any>}
	 */
	public GetObjectInfo(): Array<any> {
		return new Array<any>(
			this._id,
			this._name,
			this._behaviourMap,
			this._behaviourArr,
			this._objectCoordinates,
			this._textureCoordinates,
		);
	}

	/**
	 * Активация игрового объекта (отображается на сцене, скрипты исполняются)
	 */
	public Enable() {
		this._isEnabled = true;

		this._behaviourArr.forEach((behaviour) => {
			behaviour.Enable();
		});
	}

	/**
	 * Деактивация игрового объекта (не отображается на сцене, скрипты исполняются)
	 */
	public Disable() {
		this._isEnabled = false;

		this._behaviourArr.forEach((behaviour) => {
			behaviour.Disable();
		});
	}

	public Update() {
		this._behaviourArr.forEach((behaviour) => {
			behaviour.OnUpdate();
		});
	}

	/**
	 * Получение скрипта поведения по ID
	 * @param {number} id
	 * @returns {Behaviour || null}
	 */
	private GetBehaviourById(id: number): Behaviour | null {
		this._behaviourArr.forEach((script) => {
			if (script.Id === id) {
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
		this._behaviourArr.forEach((script) => {
			if (script.Name === name) {
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
}
