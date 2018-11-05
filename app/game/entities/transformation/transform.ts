import Matrix3x3 from "./matrix3x3";
import Vector3 from "./vector3";
import Vector2 from "./vector2";
import Matrix from "./matrix";

export default class Transform2d {
	public Basis: Matrix3x3;
	public Parent: Transform2d;	//по какой-то причине я не могу обнулить это
	private Childs: Array<Transform2d>;

	public get Position(): Vector3 {
		let position: Vector3 = new Vector3(
			this.Basis.GetByIndex(0, 2),
			this.Basis.GetByIndex(1, 2),
			this.Basis.GetByIndex(2, 2),
			true
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
	
	private CalcTransitionMatrix(): Matrix {
		let parentsMatricies: Array<Matrix3x3> = new Array<Matrix3x3>();
		let parent: Transform2d = this.Parent;

		while(parent != null) {
			parentsMatricies.push(parent.Basis);
			parent = parent.Parent;
		}

		let transitionMatrix: Matrix = Matrix3x3.One();
		for(let i: number = parentsMatricies.length; i >= 0; i--) {
			transitionMatrix = Matrix3x3.Multiply(transitionMatrix, parentsMatricies[i]);
		}

		return transitionMatrix;
	}

	public CalcGlobalCoords(x: number, y: number) : Matrix {
		let transitionMatrix: Matrix = this.CalcTransitionMatrix();
		let globalCoords: Vector3 = new Vector3(x, y, 1, true);
		
		return Matrix.Multiply(transitionMatrix, globalCoords);
	}

	public Move(vec: Vector3) {
		this.Basis.Transition(vec);
	}
}
