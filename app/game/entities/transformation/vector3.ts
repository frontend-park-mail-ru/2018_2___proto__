import Matrix from "./matrix";

export default class Vector3 extends Matrix {
    constructor(x: number, y: number, z: number, isColumn: boolean) {
        let array: Array<number> = new Array<number>(x, y, z);
        let len: number = 3;

        if (isColumn)
            super(array, 1, len);
        else
            super(array, len, 1);
    }

    public IsColumn(): boolean {
        return this._height > this._width;
    }

    public GetByIndex(index: number): number {
        if (this.IsColumn)
            return this._values[index][0];
        else
            return this._values[0][index];
    }

    public get X(): number {
        return this.GetByIndex(0);
    }

    public get Y(): number {
        return this.GetByIndex(1);
    }

    public get Z(): number {
        return this.GetByIndex(2);
    }
}