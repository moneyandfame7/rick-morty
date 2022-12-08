import React, { FC } from "react";
import { CircularProgress } from "@mui/material";
import { useFetchEpisodesQuery } from "../redux/slices/rickMortyApiSlice";
import ErrorMessage from "../components/ErrorMessage";
import Navigation from "../components/Navigation";
import { NavigationTypeEnum } from "../constants/api";
import { useQueryParams } from "../hooks/useQueryParams";

const EpisodePage: FC = () => {
  const queryPage = Number(useQueryParams().get("page"));
  const { data, isError, isLoading, error } = useFetchEpisodesQuery(Number(queryPage));

  return (
    <>
      <Navigation
        prev={data?.info.prev}
        next={data?.info.next}
        navigationType={NavigationTypeEnum.EPISODE}
        isLoading={isLoading}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 15,
          flexWrap: "wrap",
          marginTop: "20px",
          justifyContent: "center",
        }}
      >
        {isError && <ErrorMessage error={error} />}
        {isLoading && !isError ? (
          <CircularProgress sx={{ marginTop: "30px" }} />
        ) : (
          data?.results?.map(episode => (
            <h5 style={{ width: "49%", textAlign: "center" }} key={episode.id}>
              <span style={{ opacity: 0.9 }}>Name: </span>
              <span style={{ opacity: 0.6 }}>{episode.name}</span>
            </h5>
          ))
        )}
      </div>
    </>
  );
};

export default EpisodePage;
