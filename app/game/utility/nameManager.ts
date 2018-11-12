export default class NameManager {
	public static GenerateName(obj: any): string {
		const objType: string = typeof obj;

		if (!this._typeMap.has(objType)) {
			this._typeMap.set(objType, 0);
		}

		let objTypesCount: number | undefined = this._typeMap.get(objType);
		const name: string = objType + objTypesCount;

		const newObjTypesCount: number =
			objTypesCount === undefined ? 0 : ++objTypesCount;
		this._typeMap.set(objType, newObjTypesCount);

		return name;
	}

	private static _typeMap: Map<string, number | undefined> = new Map<string, number | undefined>();
}
