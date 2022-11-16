import { ICharacter } from "../interfaces/character"

interface IApiResponse {
  info: {
    count: number
    next: string
    pages: number
    prev: null | string
  }
  results: Array<ICharacter>
}

export const getApiResource = async (
  url: string,
): Promise<IApiResponse | null> => {
  try {
    const res = await fetch(url)

    if (!res.ok) {
      console.error("Could not fetch", res.status)
      return null
    }

    return await res.json()
  } catch (e) {
    console.error("Could not fetch", e.message)
    return null
  }
}
