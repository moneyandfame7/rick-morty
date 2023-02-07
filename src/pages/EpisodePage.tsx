import React, { FC } from "react";
import { useFetchEpisodesQuery } from "../redux/slices/rickMortyApiSlice";
import { NavigationTypeEnum } from "../constants/api";
import { useQueryParams } from "../hooks/useQueryParams";
import { CircularProgress } from "@mui/material";
import { ErrorMessage, Navigation } from "../components";

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
