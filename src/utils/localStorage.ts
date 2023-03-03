export const FAVORITE_CHARACTERS = "FAVORITE_CHARACTERS";

export const getLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  }
  return {};
};

export const setLocalStorage = <Data>(key: string, data: Data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
