import AMatrix from "./amatrix";

export default class Vector2 extends AMatrix {
    constructor(x: number, y: number, isColumn: boolean) {
        let array: Array<number> = new Array<number>(x, y);
        let len: number = 2;

        if (isColumn)
            super(array, 1, len);
        else
            super(array, len, 1);
    }

    public IsColumn(): boolean {
        return this._height > this._width;
    }

    public get X(): number {
        return this.GetByRowIndex(0);
    }

    public get Y(): number {
        return this.GetByRowIndex(1);
    }
}