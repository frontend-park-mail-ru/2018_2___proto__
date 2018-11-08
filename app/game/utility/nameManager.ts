export default class NameManager {
    private static _typeMap: Map<string, number | undefined> = new Map<string, number | undefined>();


    public static GenerateName(obj: any): string {
        let objType: string = typeof obj;

        if(!this._typeMap.has(objType)) {
            this._typeMap.set(objType, 0);
        }

        let objTypesCount: number | undefined = this._typeMap.get(objType);
        let name: string = objType + objTypesCount;

        let newObjTypesCount: number = objTypesCount == undefined ? 0 : ++objTypesCount; 
        this._typeMap.set(objType, newObjTypesCount);

        return name;
    }
}