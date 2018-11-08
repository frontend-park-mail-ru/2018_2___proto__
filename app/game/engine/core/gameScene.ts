import GameObject from "./gameObject";
import InputManager from "../../utility/inputManager";

export default class GameScene {
	private static _currentScene: GameScene;
	public GameObjects: Array<GameObject>;
	public InputManager: InputManager;

	public static get CurrentScene(): GameScene {
		return this._currentScene;
	}


	constructor() {
		this.GameObjects = new Array<GameObject>();
		this.InputManager = new InputManager();

		GameScene._currentScene = this;
	}

	public Render() {
		this.InputManager.ReadInputs();

		this.GameObjects.forEach(gameObject => {
			gameObject.Update();
		});

		this.GameObjects.forEach(gameObject => {
			gameObject.Render();
		});
	}

	/**
	 * Получение игрового объекта на сцене по ID
	 * @param id
	 * @returns {GameObject || null}
	 */
	public GetGameObjectById(id: number): GameObject | null {
		this.GameObjects.forEach((object) => {
			if (object.Id == id) {
				return object;
			}
		});

		return null;
	}

	/**
	 * Получение игрового объекта на сцене по имени
	 * @param name
	 * @returns {GameObject || null}
	 */
	public GetGameObjectByName(name: string) : GameObject | null {
		this.GameObjects.forEach((object) => {
			if (object.Name == name) {
				return object;
			}
		});

		return null;
	}
}
