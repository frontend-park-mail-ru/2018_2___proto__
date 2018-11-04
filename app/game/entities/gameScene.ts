import GameObject from "./gameObject";

export default class GameScene {
	public gameObjects: Array<GameObject>;

	constructor() {
		this.gameObjects = new Array<GameObject>();
	}

	public render() {}

	/**
	 * Получение игрового объекта на сцене по ID
	 * @param id
	 * @returns {GameObject || null}
	 */
	public getGameObjectById(id: number): GameObject | null {
		this.gameObjects.forEach((object) => {
			/*if (object.getObjectInfo[0] == id) {
				return object;
			}*/
		});

		return null;
	}

	/**
	 * Получение игрового объекта на сцене по имени
	 * @param name
	 * @returns {GameObject || null}
	 */
	public getGameObjectByName(name: string) : GameObject | null {
		this.gameObjects.forEach((object) => {
			/*if (object.getObjectInfo[1] == name) {
				return object;
			}*/
		});

		return null;
	}
}
