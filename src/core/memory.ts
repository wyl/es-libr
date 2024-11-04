const localMemory = new Map();

export async function getMemory(key: string) {
  return localMemory.get(key);
}

export function setMemory(key: string, value: any) {
  localMemory.set(key, value);
}
