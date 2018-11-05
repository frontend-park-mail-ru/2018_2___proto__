import Matrix3x3 from "./matrix3x3";
import Vector3 from "./vector3";
import Vector2 from "./vector2";

export default class Transform2d {
	public Basis: Matrix3x3;
	public Parent: Transform2d;	//по какой-то причине я не могу обнулить это
	private Childs: Array<Transform2d>;

	public get Position(): Vector3 {
		let position: Vector3 = Vector3.CreateVector(
			this.Basis.GetByIndex(0, 2),
			this.Basis.GetByIndex(1, 2),
			this.Basis.GetByIndex(2, 2),
		);

		return position;
	}

	public get Rotation(): Vector2 {
		let rotation: Vector2 = new Vector2(
			this.Basis.GetByIndex(0, 1),
			this.Basis.GetByIndex(1, 0),
			true
		);

		return rotation;
	}

	constructor(parent: Transform2d) {
		this.Parent = parent;
		this.Childs = new Array<Transform2d>();
		this.Basis = Matrix3x3.One();
	}

	public AddChild(transform: Transform2d): void {
		this.Childs.push(transform);
	}
	
	private CalcTransitionMatrix(): Matrix3x3 {
		let parentsMatricies: Array<Matrix3x3> = new Array<Matrix3x3>();
		let parent: Transform2d = this.Parent;

		while(parent != null) {
			parentsMatricies.push(parent.Basis);
			parent = parent.Parent;
		}

		let transitionMatrix: Matrix3x3 = Matrix3x3.One();
		for(let i: number = parentsMatricies.length; i >= 0; i--) {
			transitionMatrix = Matrix3x3.Multiply(transitionMatrix, parentsMatricies[i]);
		}

		return transitionMatrix;
	}

	public CalcGlobalCoords(x: number, y: number) : Vector3 {
		let transitionMatrix: Matrix3x3 = this.CalcTransitionMatrix();
		let globalCoords: Vector3 = Vector3.CreateVector(x, y, 1);
		
		return Matrix3x3.MultiplyToVector(transitionMatrix, globalCoords);
	}

	public Move(vec: Vector3) {
		this.Basis.Transition(vec);
	}
}
