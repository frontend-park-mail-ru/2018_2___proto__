export default class HashTable<T> extends Map<T, void> {
	public AddKey(key: T) {
		this.set(key, undefined);
	}

	public HasKey(key: T): boolean {
		return this.has(key);
	}

	public RemoveKey(key: T) {
		this.delete(key);
	}
}
