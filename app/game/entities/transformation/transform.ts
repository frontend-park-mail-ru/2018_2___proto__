import Matrix3x3 from "./matrix3x3";
import Vector3 from "./vector3";
import Vector2 from "./vector2";

export default class Transform2d {
	private _basis: Matrix3x3;
	private _parent: Transform2d;	//по какой-то причине я не могу обнулить это
	private _childs: Array<Transform2d>; //нужно предусмотреть возможность удаления детей

	public get Position(): Vector3 {
		let position: Vector3 = Vector3.CreateVector(
			this._basis.GetByIndex(0, 2),
			this._basis.GetByIndex(1, 2),
			this._basis.GetByIndex(2, 2),
		);

		return position;
	}

	public get IsOrphan(): boolean {
		return this == this._parent;
	}

	public get Rotation(): Vector2 {
		let rotation: Vector2 = Vector2.CreateVector(
			this._basis.GetByIndex(0, 1),
			this._basis.GetByIndex(1, 0)
		);

		return rotation;
	}

	constructor() {
		this._parent = this;
		this._childs = new Array<Transform2d>();
		this._basis = Matrix3x3.One();
	}

	public AddChild(transform: Transform2d): void {
		this._childs.push(transform);
		transform._parent = this;
	}

	// TODO: implement this later
	public RemoveChild(transform: Transform2d): void {

	}
	
	private CalcTransitionMatrix(): Matrix3x3 {
		let parentsMatricies: Array<Matrix3x3> = new Array<Matrix3x3>();
		let parent: Transform2d = this;

		parentsMatricies.push(parent._basis)
		while(!parent.IsOrphan) {
			parent = parent._parent;
			parentsMatricies.push(parent._basis);
		}

		let transitionMatrix: Matrix3x3 = Matrix3x3.One();
		for(let i: number = parentsMatricies.length-1; i >= 0; i--) {
			transitionMatrix = Matrix3x3.Multiply(transitionMatrix, parentsMatricies[i]);
		}

		return transitionMatrix;
	}

	public CalcGlobalVectorCoords(dot: Vector3) : Vector3 {
		let transitionMatrix: Matrix3x3 = this.CalcTransitionMatrix();
		return Matrix3x3.MultiplyToVector(transitionMatrix, dot);
	}
	
	public CalcGlobalValues(x: number, y: number) : Vector2 {
		let localCoords: Vector3 = Vector3.CreateVector(x, y, 1);
		let globalCoords: Vector3 = this.CalcGlobalVectorCoords(localCoords);

		return Vector2.CreateVector(globalCoords.X, globalCoords.Y);
	}

	public Move(vec: Vector3) {
		this._basis.Transition(vec);
	}
}
