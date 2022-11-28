import { ICharacter, IEpisode, ILocation } from "../interfaces";

export interface ICharactersResponse {
  info: {
    count: number;
    next: string;
    pages: number;
    prev: null | string;
  };
  results: Array<ICharacter>;
}

export interface IEpisodesResponse {
  info: {
    count: number;
    next: string;
    pages: number;
    prev: null | string;
  };
  results: Array<IEpisode>;
}

export interface ILocationsResponse {
  info: {
    count: number;
    next: string;
    pages: number;
    prev: null | string;
  };
  results: Array<ILocation>;
}

// for Episodes, Locations and Characters
export const getApiResource = async <IResultEntity>(url: string): Promise<IResultEntity | null> => {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      console.error("Could not fetch", res.status);
      return null;
    }

    return await res.json();
  } catch (e) {
    console.error("ERROR", e.message);
    return null;
  }
};

export const makeConcurrentRequest = async (url: string[]) => {
  return await Promise.all(
    url.map(res => {
      return fetch(res).then(res => res.json());
    })
  );
};
