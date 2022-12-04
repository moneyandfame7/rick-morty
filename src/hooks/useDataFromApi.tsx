import { useQueryParams } from "./useQueryParams";
import { useCallback, useEffect, useState } from "react";
import { getApiResource } from "../utils/fetch";

interface IUseDataFromApiConfig {
  url: string;
  setIsErrorApi: (value: boolean) => void;
  setMessageError: (value: Error) => void;
}

export const useDataFromApi = <ItemType,>({ url, setIsErrorApi, setMessageError }: IUseDataFromApiConfig) => {
  const query = useQueryParams();
  const queryPage = query.get("page");

  const [data, setData] = useState<ItemType>();
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [counterPage, setCounterPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const getResource = useCallback(
    async (url: string) => {
      setIsLoading(true);
      const res = await getApiResource<any>(url);
      if (res) {
        setData(res.results);
        setPrevPage(res.info.prev);
        setNextPage(res.info.next);
        setIsErrorApi(false);
        setCounterPage(Number(queryPage));
        setIsLoading(false);
        console.log(Number(queryPage));
      } else {
        setIsLoading(false);
        setMessageError(new Error("ERROR_DATA_FETCHING"));
        setIsErrorApi(true);
      }
    },
    [queryPage]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    getResource(url + queryPage);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {
    prevPage,
    nextPage,
    counterPage,
    isLoading,
    data,
    getResource,
  };
};
