import React, { FC } from "react";
import { IEpisode } from "../../interfaces";
import { useErrorApi } from "../../hooks/useErrorApi";
import { API_EPISODE_ALL, NavigationTypeEnum } from "../../constants/api";
import Navigation from "../../components/CharacterNavigation";
import { useDataFromApi } from "../../hooks/useDataFromApi";
import { CircularProgress } from "@mui/material";

const EpisodePage: FC = () => {
  const { setIsErrorApi, render, setMessageError } = useErrorApi();
  const { prevPage, nextPage, counterPage, isLoading, data, getResource } = useDataFromApi<IEpisode[]>({
    url: API_EPISODE_ALL,
    setIsErrorApi,
    setMessageError,
  });

  console.log(nextPage);
  return render(
    <>
      <Navigation<IEpisode>
        getResource={getResource}
        prevPage={prevPage}
        nextPage={nextPage}
        counterPage={counterPage}
        navigationType={NavigationTypeEnum.EPISODE}
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
        {!isLoading ? (
          data?.map(episode => (
            <React.Fragment key={episode.id}>
              <h5 style={{ width: "49%", textAlign: "center" }}>
                <span style={{ opacity: 0.9 }}>Name: </span>
                <span style={{ opacity: 0.6 }}>{episode.name}</span>
              </h5>
            </React.Fragment>
          ))
        ) : (
          <CircularProgress />
        )}
      </div>
    </>
  );
};

export default EpisodePage;
