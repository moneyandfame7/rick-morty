import React, { FC } from "react";
import { IEpisode } from "../../interfaces";
import Navigation from "../../components/CharacterNavigation";
import { CircularProgress } from "@mui/material";
import { useFetchEpisodesQuery } from "../../redux/slices/rickMortyApiSlice";
import ErrorMessage from "../../components/ErrorMessage";
import MyBreadcrumbs from "../../components/Breadcrumbs";

const EpisodePage: FC = () => {
  const { data, isError, isLoading, error } = useFetchEpisodesQuery(1);

  return (
    <>
      {/*<Navigation<IEpisode>*/}
      {/*  getResource={getResource}*/}
      {/*  prevPage={prevPage}*/}
      {/*  nextPage={nextPage}*/}
      {/*  counterPage={counterPage}*/}
      {/*  navigationType={NavigationTypeEnum.EPISODE}*/}
      {/*/>*/}
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
            <React.Fragment key={episode.id}>
              <h5 style={{ width: "49%", textAlign: "center" }}>
                <span style={{ opacity: 0.9 }}>Name: </span>
                <span style={{ opacity: 0.6 }}>{episode.name}</span>
              </h5>
            </React.Fragment>
          ))
        )}
      </div>
    </>
  );
};

export default EpisodePage;
