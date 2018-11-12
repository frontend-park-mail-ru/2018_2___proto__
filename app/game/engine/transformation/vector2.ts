import AMatrix from "./amatrix";

const VEC2_LENGTH = 2;

export default class Vector2 extends AMatrix {
	public get X() {
		return this._values[0];
	}

	public get Y() {
		return this._values[1];
	}

	// по-хорошему это должен быть конструктор, но я так и не понял, как по-нормальному перегрузить конструктор
	public static CreateVector(x: number, y: number): Vector2 {
		const array: Array<number> = new Array<number>(x, y);
		return new Vector2(array);
	}

	constructor(array: Array<number>) {
		super(array, VEC2_LENGTH, 1);
	}

	protected CalcIndex(row: number, column: number): number {
		if (row >= this._height || row < 0 || column !== 0) {
			throw new Error("index out of range");
		}

		return row;
	}
}
