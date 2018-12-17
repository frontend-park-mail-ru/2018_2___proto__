import GameObject from "../core/gameObject";
import Matrix3x3 from "./matrix3x3";
import Vector2 from "./vector2";
import Vector3 from "./vector3";

export default class Transform2d {
	public get GameObject() {
		return this._gameObject;
	}

	public get Position(): Vector3 {
		const position: Vector3 = Vector3.CreateVector(
			this._basis.GetByIndex(0, 2),
			this._basis.GetByIndex(1, 2),
			this._basis.GetByIndex(2, 2),
		);

		return position;
	}

	public get Parent(): Transform2d {
		return this._parent;
	}

	public get IsOrphan(): boolean {
		return this === this._parent;
	}

	public get Rotation(): Vector2 {
		const rotation: Vector2 = Vector2.CreateVector(
			this._basis.GetByIndex(0, 1),
			this._basis.GetByIndex(1, 0),
		);

		return rotation;
	}
	private _basis: Matrix3x3;
	private _parent: Transform2d; // по какой-то причине я не могу обнулить это
	private _children: Set<Transform2d>;
	private _gameObject: GameObject;

	constructor(gameObject: GameObject) {
		this._parent = this;
		this._gameObject = gameObject;
		this._basis = Matrix3x3.One();
		this._children = new Set<Transform2d>();
	}

	public CalcGlobalVectorCoords(dot: Vector3): Vector3 {
		const transitionMatrix: Matrix3x3 = this.CalcTransitionMatrix();
		return Matrix3x3.MultiplyToVector(transitionMatrix, dot);
	}

	public CalcGlobalValues(x: number, y: number): Vector2 {
		const localCoords: Vector3 = Vector3.CreateVector(x, y, 1);
		const globalCoords: Vector3 = this.CalcGlobalVectorCoords(localCoords);

		return Vector2.CreateVector(globalCoords.X, globalCoords.Y);
	}

	public Move(vec: Vector3) {
		this._basis.Transition(vec);
	}

	public SetParent(newParent: Transform2d) {
		if (!this.IsOrphan) {
			this._parent.RemoveChild(this);
		}

		newParent._children.add(this);
		this._parent = newParent;
	}

	public AddChild(newChild: Transform2d) {
		newChild.SetParent(this);
	}

	public RemoveChild(child: Transform2d) {
		this._children.delete(child);
		child._parent = child;
	}

	private CalcTransitionMatrix(): Matrix3x3 {
		const parentsMatricies: Array<Matrix3x3> = new Array<Matrix3x3>();
		let parent: Transform2d = this;

		parentsMatricies.push(parent._basis);
		while (!parent.IsOrphan) {
			parent = parent._parent;
			parentsMatricies.push(parent._basis);
		}

		let transitionMatrix: Matrix3x3 = Matrix3x3.One();
		for (let i: number = parentsMatricies.length - 1; i >= 0; i--) {
			transitionMatrix = Matrix3x3.Multiply(
				transitionMatrix,
				parentsMatricies[i],
			);
		}

		return transitionMatrix;
	}
}
