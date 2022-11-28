export interface IEntity {
  id: number;
  name: string;
  created: string;
}

export interface ICharacter extends IEntity {
  episode: Array<string>;
  gender: string;
  image: string;
  location: {
    name: string;
    url: string;
  };
  url: string;
  origin: {
    name: string;
    url: string;
  };
  species: string;
  status: string;
}

export interface IEpisode extends IEntity {
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
}

export interface ILocation extends IEntity {
  type: string;
  dimension: string;
  residents: string[];
  url: string[];
}
