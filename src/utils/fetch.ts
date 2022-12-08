/**
 * Асинхронная функция *Promise.all()*;
 * */
export const makeConcurrentRequest = async <T>(url: string[]): Promise<Array<T>> => {
  try {
    return await Promise.all(url.map(res => fetch(res).then(res => res.json())));
  } catch (e) {
    throw new Error(e.message);
  }
};
