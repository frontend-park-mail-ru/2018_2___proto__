export default class IdManager {
	public static GenerateId(): number {
		const newId = this._lastId;
		this._lastId++;

		return newId;
	}

	private static _lastId: number = 0;
}
