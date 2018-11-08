export default class IdManager {
    private static _lastId: number = 0;

    public static GenerateId(): number {
        let newId = this._lastId;
        this._lastId++;

        return newId;
    }
}