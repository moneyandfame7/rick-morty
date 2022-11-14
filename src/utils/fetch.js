import { log } from "util"

const BASE_URL = "https://rickandmortyapi.com/api/"
const CHARACTER = "character"
const LOCATION = "location"
const EPISODE = "episode"

export const getApiResource = async url => {
  try {
    const res = await fetch(url)

    if (!res.ok) {
      console.error("Could not fetch", res.status)
      return false
    }

    return await res.json()
  } catch (e) {
    console.error("Could not fetch", e.message)
    return false
  }
}
