import AMatrix from "./amatrix";

export default class Vector3 extends AMatrix {
	public get X() {
		return this._values[0];
	}

	public get Y() {
		return this._values[1];
	}

	public get Z() {
		return this._values[2];
	}

	// по-хорошему это должен быть конструктор, но я так и не понял, как по-нормальному перегрузить конструктор
	public static CreateVector(x: number, y: number, z: number): Vector3 {
		const array: Array<number> = new Array<number>(x, y, z);
		return new Vector3(array);
	}

	constructor(array: Array<number>) {
		super(array, 3, 1);
	}

	protected CalcIndex(row: number, column: number): number {
		if (row >= this._height || row < 0 || column !== 0) {
			throw new Error("index out of range");
		}

		return row;
	}
}
