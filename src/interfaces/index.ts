interface IEntity {
  id: number;
  name: string;
  createdAt: Date;
}

interface IResponse {
  info: {
    page: number;
    take: number;
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
}

export type CharacterGender = "Female" | "Male" | "Genderless" | "unknown";
export type CharacterStatus = "Alive" | "Dead" | "unknown";
export type CharacterLocation = Omit<ILocation, "residents">;

export interface ICharacter {
  id: number;
  status: CharacterGender;
  name: string;
  species: string;
  gender: CharacterStatus;
  type: string;
  image: string;
  createdAt: Date;
  origin: CharacterLocation;
  location: CharacterLocation;
  episodes: number[];
}

export interface ILocation {
  id: number;
  name: string;
  type: string;
  dimension: string;
  createdAt: Date;
  residents: number[];
}

export interface IEpisode extends IEntity {
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
}

export interface IResponseCharacter extends IResponse {
  results: ICharacter[];
}

export interface IResponseEpisode extends IResponse {
  results: IEpisode[];
}

export interface IResponseLocation extends IResponse {
  results: ILocation[];
}
