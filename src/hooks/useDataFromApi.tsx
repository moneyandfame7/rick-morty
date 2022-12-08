import { useQueryParams } from "./useQueryParams";
import { useCallback, useEffect, useState } from "react";
import { getApiResource } from "../utils/fetch";

interface IUseDataFromApiConfig {
  url: string;
  setIsErrorApi: (value: boolean) => void;
  setMessageError: (value: Error) => void;
}

export const useDataFromApi = <ItemType,>({ url, setIsErrorApi, setMessageError }: IUseDataFromApiConfig) => {
  const queryPage = useQueryParams().get("page");
  const [data, setData] = useState<ItemType>();
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [counterPage, setCounterPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getResource = useCallback(
    async (url: string) => {
      setIsLoading(true); //2
      //
      const res = await getApiResource<any>(url); //1
      //
      if (res) {
        //2
        setData(res.results);
        setPrevPage(res.info.prev);
        setNextPage(res.info.next);
        setIsErrorApi(false);
        setCounterPage(Number(queryPage));
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setMessageError(new Error("ERROR_DATA_FETCHING"));
        setIsErrorApi(true);
      }
    },
    [queryPage, setIsErrorApi, setMessageError]
  );

  useEffect(() => {
    getResource(url + queryPage);
  }, [getResource, queryPage, url]);
  return {
    prevPage,
    nextPage,
    counterPage,
    isLoading,
    data,
    getResource,
  };
};
