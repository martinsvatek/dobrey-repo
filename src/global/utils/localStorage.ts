export const getLocalStorage = <T>(key: string, defaultValue: T): T =>
	localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) || '{}') : defaultValue;

export const removeLocalStorage = (key: string): void => {
	localStorage.removeItem(key);
};

export const setLocalStorage = <T>(key: string, value: T): void => {
	localStorage.setItem(key, JSON.stringify(value));
};
