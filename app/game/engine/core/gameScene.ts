import InputManager from "../../utility/inputManager";
import GameObject from "./gameObject";

export default class GameScene {
	private static _currentScene: GameScene;
	public gameObjects: Array<GameObject>;
	public inputManager: InputManager;

	public static get CurrentScene(): GameScene {
		return this._currentScene;
	}

	constructor() {
		this.gameObjects = new Array<GameObject>();
		this.inputManager = new InputManager();

		GameScene._currentScene = this;
	}

	public Render() {
		this.inputManager.ReadInputs();

		this.gameObjects.forEach((gameObject) => {
			gameObject.Update();
		});

		this.gameObjects.forEach((gameObject) => {
			gameObject.Render();
		});
	}

	/**
	 * Получение игрового объекта на сцене по ID
	 * @param id
	 * @returns {GameObject || null}
	 */
	public GetGameObjectById(id: number): GameObject | null {
		this.gameObjects.forEach((object) => {
			if (object.Id === id) {
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
		this.gameObjects.forEach((object) => {
			if (object.Name === name) {
				return object;
			}
		});

		return null;
	}
}
