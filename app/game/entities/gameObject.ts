import Behaviour from "./gameBehaviour/behaviour";

export default class GameObject {
	private behaviourMap: Map<string, Array<Behaviour>>;
	private behaviourArr: Array<Behaviour>;
	private readonly id: number;
	private name: string;
	private isEnabled: boolean;
	private objectCoordinates: Array<Number>;
	private textureCoordinates: Array<Number>;

	constructor(id: number, name: string) {
		this.id = id;
		this.name = name;
		this.isEnabled = true;
		this.behaviourMap = new Map<string, Array<Behaviour>>();
		this.behaviourArr = new Array<Behaviour>();
		this.objectCoordinates = new Array<Number>(0, 0, 0);
		this.textureCoordinates = new Array<Number>(0, 0, 0);
	}

	/**
	 * Рендеринг объекта
	 */
	public render(): void {}

	/**
	 * Добавление скрипта поведения к объекту
	 * @param script
	 */
	public addBehaviour(script: Behaviour): void {
		let scriptType: string = script.getType();

		if (this.behaviourMap.has(scriptType)) {
			if (typeof this.behaviourMap.get(scriptType) === "undefined") {
				this.behaviourMap.set(scriptType, new Array<Behaviour>(script));
			} else {
				(this.behaviourMap.get(scriptType))!.push(script);
			}
		}

		script.setParent(this);
	}

	/**
	 * Получение скрипта поведения по ID
	 * @param {number} id
	 * @returns {Behaviour || null}
	 */
	private getBehaviourById(id: number): Behaviour | null {
		this.behaviourArr.forEach(script => {
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
	private getBehaviourByName(name: string): Behaviour | null {
		this.behaviourArr.forEach(script => {
			if (script.getName() == name) {
				return script;
			}
		});

		return null;
	}

	/**
	 * Получение всех скриптов поведения
	 */
	private getBehaviours(): Array<Behaviour> {
		return this.behaviourArr;
	}

	/**
	 * Получение всех скриптов поведения по типу
	 * @param {string} type
	 * @returns {Array<Behaviour> || undefined}
	 */
	private getBehavioursByType(type: string): Array<Behaviour> | undefined {
		return this.behaviourMap.get(type);
	}

	/**
	 * Получение всей информации об игровом объекте
	 * @returns {Array<any>}
	 */
	public getObjectInfo(): Array<any> {
		return new Array<any>(
			this.id,
			this.name,
			this.behaviourMap,
			this.behaviourArr,
			this.objectCoordinates,
			this.textureCoordinates
		);
	}

	/**
	 * Активация игрового объекта (отображается на сцене, скрипты исполняются)
	 */
	public enable(): void {
		this.isEnabled = true;
	}

	/**
	 * Деактивация игрового объекта (не отображается на сцене, скрипты исполняются)
	 */
	public disable(): void {
		this.isEnabled = false;
	}
}
