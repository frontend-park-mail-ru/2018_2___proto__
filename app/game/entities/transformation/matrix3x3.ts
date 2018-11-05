import AMatrix from "./amatrix";
import Vector3 from "./vector3";
import Vector2 from "./vector2";

const MATRIX3x3_LENGTH = 9;
const MATRIX3x3_HEIGHT = 3;
const MATRIX3x3_WIDTH = 3;

export default class Matrix3x3 extends AMatrix {
    constructor(array: Array<number>) {
        super(array, MATRIX3x3_HEIGHT, MATRIX3x3_WIDTH);
    }

    public static One(): Matrix3x3 {
        let array: Array<number> = new Array<number>(
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        );

        return new Matrix3x3(array);
    }

    public static Empty(): Matrix3x3 {
        let array: Array<number> = new Array<number>(
            0, 0, 0,
            0, 0, 0,
            0, 0, 0
        );

        return new Matrix3x3(array);
    }

    protected CalcIndex(row: number, column: number): number {
        let index: number = this._width * row + column;

        if (index >= this._height * this._width || index < 0)
            throw new Error("index out of range");

        return index;
    }

    public Add(matrix: Matrix3x3) {
        for (let i: number = 0; i < MATRIX3x3_LENGTH; i++)
            this._values[i] += matrix._values[i];
    }

    public static Sum(matrix1: Matrix3x3, matrix2: Matrix3x3) {
        let res: Matrix3x3 = new Matrix3x3(matrix1._values);
        res.Add(matrix2);

        return res;
    }

    public Substract(matrix: Matrix3x3) {
        for (let i: number = 0; i < MATRIX3x3_LENGTH; i++)
            this._values[i] -= matrix._values[i];
    }

    public static Difference(matrix1: Matrix3x3, matrix2: Matrix3x3) {
        let res: Matrix3x3 = new Matrix3x3(matrix1._values);
        res.Substract(matrix2);

        return res;
    }

    public Multiply(matrix: Matrix3x3) {
        let newValues: Array<number> = new Array<number>(this._height * matrix.Width);

        for (let i: number = 0; i < this._height; i++)
            for (let j: number = 0; j < matrix.Width; j++)
            {
                let newValueIndex: number = this.CalcIndex(i, j); 
                newValues[newValueIndex] = 0;

                for (let k: number = 0; k < matrix.Height; k++)
                    newValues[newValueIndex] += this.GetByIndex(i, k) * matrix.GetByIndex(k, j);
            }

        this._values = newValues;
    }

    // TODO: исправить этот костыль
    public MultiplyToVector(vec: Vector3) {
        let newValues: Array<number> = new Array<number>(this._height * vec.Width);

        for (let i: number = 0; i < this._height; i++)
            for (let j: number = 0; j < vec.Width; j++)
            {
                let newValueIndex: number = i; 
                newValues[newValueIndex] = 0;

                for (let k: number = 0; k < vec.Height; k++)
                    newValues[newValueIndex] += this.GetByIndex(i, k) * vec.GetByIndex(k, j);
            }

        this._values = newValues;
    }

    public static MultiplyToVector(matrix: Matrix3x3, vector: Vector3) : Vector3 {
        let res: Matrix3x3 = new Matrix3x3(matrix._values);
        res.MultiplyToVector(vector);

        return new Vector3(res._values);
    }

    public static Multiply(m1: Matrix3x3, m2: Matrix3x3): Matrix3x3 {
        let res: Matrix3x3 = new Matrix3x3(m1._values);
        res.Multiply(m2);
        
        return res;
    }

    public Transition(vec: Vector3) {
        // это не магические числа, а оптимизация, чтобы не высчитвать их на каждой трансформации
        let newX: number = vec.X * this._values[0] + vec.Y * this._values[1] + this._values[2];
        let newY: number = vec.X * this._values[3] + vec.Y * this._values[4] + this._values[5];
        let newZ: number = vec.X * this._values[6] + vec.Y * this._values[7] + this._values[8];

        this._values[2] = newX;
        this._values[5] = newY;
        this._values[8] = newZ;
    }

    public static Transition(matrix: Matrix3x3, vec: Vector3): Matrix3x3 {
        let res: Matrix3x3 = new Matrix3x3(matrix._values);
        res.Transition(vec);
        
        return res;
    }

    public Scale(vec: Vector3) {
        // это не магические числа, а оптимизация, чтобы не высчитвать их на каждой трансформации
        this._values[0] *= vec.X;
        this._values[3] *= vec.X;
        this._values[6] *= vec.X; 

        this._values[1] *= vec.Y;
        this._values[4] *= vec.Y;
        this._values[7] *= vec.Y; 
    }

    // TODO: реализовать
    public Rotate(vec: Vector2) {

    }

    public static Rotate(matrix: Matrix3x3, vec: Vector2) {
        let res: Matrix3x3 = new Matrix3x3(matrix._values);
        res.Rotate(vec);
        
        return res;
    }

    public static Scale(matrix: Matrix3x3, vec: Vector3): Matrix3x3 {
        let res: Matrix3x3 = new Matrix3x3(matrix._values);
        res.Scale(vec);
        
        return res;
    }
}