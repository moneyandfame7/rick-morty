const API_URL = "https://rickandmortyapi.com/api/";
const CHARACTER = "character";
const LOCATION = "location";
const EPISODE = "episode";
const PAGE_PARAM = "?page=";

const API_CHARACTER_ALL = API_URL + CHARACTER + PAGE_PARAM;
const API_CHARACTER_ONLY_ONE = API_URL + CHARACTER;
const API_LOCATION = API_URL + LOCATION;
const API_EPISODE = API_URL + EPISODE;

export { API_LOCATION, API_CHARACTER_ALL, API_CHARACTER_ONLY_ONE, API_EPISODE };
