export default class Transform {
	public coordinates: Array<Number>;
	private parent: Transform;
	private children: Array<Transform>;

	constructor(parent: Transform) {
		this.parent = parent;
		this.coordinates = new Array<Number>(0, 0, 0);
		this.children = new Array<Transform>();
	}

	public setParent(transform: Transform): void {
		this.parent = transform;
	}

	public getParent(): Transform {
		return this.parent;
	}

	public addChild(transform: Transform): void {
		this.children.push(transform);
	}

	public getChildren(): Array<Transform> {
		return this.children;
	}

	//TODO: методы для работы с координатной плоскостью
}
