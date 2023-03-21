export const getLocalStorage = <Data>(key: string): Data | null => {
  const data = localStorage.getItem(key)
  if (data) {
    return JSON.parse(data)
  }
  return null
}

export const setLocalStorage = <Data>(key: string, data: Data) => {
  localStorage.setItem(key, JSON.stringify(data))
}
export const setOrUpdateLocalStorage = <Data>(key: string, data: Data) => {
  const exist = localStorage.getItem(key)
  if (exist) {
    const upd = {
      ...JSON.parse(exist),
      ...data
    }
    localStorage.setItem(key, upd)
  }
  localStorage.setItem(key, JSON.stringify(data))
}

export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key)
}
