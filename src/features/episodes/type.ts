import { IPageInformation } from "../../shared/types/page";

export interface IEpisode {
  id: number;
  name: string;
  episode: string;
  airDate: string;
  createdAt: string;
  characters: number[];
}

export interface IManyEpisode {
  info: IPageInformation;
  results: IEpisode[];
}
