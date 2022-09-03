export const readFromLocalStorage = <T>(key: string): T | null => {
  if (typeof localStorage === 'undefined') {
    return null;
  }

  const data = localStorage.getItem(key);

  if (data) {
    return JSON.parse(data) as T;
  }
  return null;
};

export const deleteFromLocalStorage = (key: string): void => {
  if (typeof localStorage === 'undefined') {
    return;
  }
  localStorage.removeItem(key);
};

export const writeToLocalStorage = (key: string, value: unknown): void => {
  if (typeof localStorage === 'undefined') {
    return;
  }
  localStorage.setItem(key, JSON.stringify(value));
};
