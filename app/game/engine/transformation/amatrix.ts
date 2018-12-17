export default abstract class AMatrix {
	protected _values: Array<number>;
	protected _height: number;
	protected _width: number;

	public get Height(): number {
		return this._height;
	}

	public get Width(): number {
		return this._width;
	}

	constructor(array: Array<number>, height: number, width: number) {
		if (height * width !== array.length) {
			throw new Error("Dimensions doesn't match");
		}

		this._height = height;
		this._width = width;

		this._values = array.slice();
	}

	public Drop() {
		for (let i: number = 0; i < this._height * this._width; i++) {
			this._values[i] = 0;
		}
	}

	public GetByIndex(row: number, column: number) {
		return this._values[this.CalcIndex(row, column)];
	}

	public GetByRowIndex(index: number) {
		return this._values[index];
	}

	protected abstract CalcIndex(row: number, column: number): number;
}
