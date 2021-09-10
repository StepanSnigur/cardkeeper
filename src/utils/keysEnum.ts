export type KeysEnum<T, V> = { [P in keyof Partial<T>]: V }
