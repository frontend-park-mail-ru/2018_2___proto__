import Matrix from "./matrix"
import Vector3 from "./vector3"

export default class Matrix3x3 extends Matrix {
    constructor() {
        let array: Array<number> = new Array<number>(
            0, 0, 0,
            0, 0, 0,
            0, 0, 0
        );

        super(array, 3, 3);
    }

    public static One() {
        let result = new Matrix3x3();

        result._values[0][0] = 1;
        result._values[1][1] = 1;
        result._values[2][2] = 1;

        return result;
    }

    public static Transition(matrix: Matrix3x3, vec: Vector3) : Matrix3x3 {
        let result: Matrix3x3 = new Matrix3x3();
        result.Add(matrix);

        result._values[0][2] = vec.X * matrix._values[0][0] + vec.Y * matrix._values[0][1] + matrix._values[0][2];
        result._values[1][2] = vec.X * matrix._values[1][0] + vec.Y * matrix._values[1][1] + matrix._values[1][2];
        result._values[2][2] = vec.X * matrix._values[2][0] + vec.Y * matrix._values[2][1] + matrix._values[2][2];  
        
        return result;
    }

    public Transition(vec: Vector3) {
        let newX: number = vec.X * this._values[0][0] + vec.Y * this._values[0][1] + this._values[0][2];
        let newY: number = vec.X * this._values[1][0] + vec.Y * this._values[1][1] + this._values[1][2];
        let newZ: number = vec.X * this._values[2][0] + vec.Y * this._values[2][1] + this._values[2][2];

        this._values[0][2] = newX;
        this._values[1][2] = newY;
        this._values[2][2] = newZ;
    }

    public static Scale(matrix: Matrix3x3, vec: Vector3) : Matrix3x3 {
        let result: Matrix3x3 = new Matrix3x3();
        result.Add(matrix);

        result._values[0][0] *= vec.X;
        result._values[1][0] *= vec.X;
        result._values[2][0] *= vec.X; 

        result._values[0][1] *= vec.Y;
        result._values[1][1] *= vec.Y;
        result._values[2][1] *= vec.Y; 
        
        return result;
    }

    public Scale(vec: Vector3) {
        this._values[0][0] *= vec.X;
        this._values[1][0] *= vec.X;
        this._values[2][0] *= vec.X; 

        this._values[0][1] *= vec.Y;
        this._values[1][1] *= vec.Y;
        this._values[2][1] *= vec.Y; 
    }
}