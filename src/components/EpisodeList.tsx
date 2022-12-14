import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import { makeConcurrentRequest } from "../utils/fetch";
import { IEpisode } from "../interfaces";

interface ICharacterEpisodes {
  episodes: string[];
}

const EpisodeList: FC<ICharacterEpisodes> = ({ episodes }) => {
  const [data, setData] = useState<IEpisode[] | undefined>();
  useEffect(() => {
    (async () => {
      const res = await makeConcurrentRequest<IEpisode>(episodes);
      if ("error" in res[0]) {
        return null;
      }
      setData(res);
    })();
  }, [episodes]);
  return (
    <>
      {!data && <span style={{ padding: "20px", textAlign: "center" }}>Error to loading episodes</span>}
      {data && (
        <ListGroup variant='flush' as='ol' numbered>
          {data.map(item => (
            <ListGroup.Item as='li' action key={item.id}>
              <Link to={`/episode/${item.id}`}>{item.name}</Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>
  );
};

export default EpisodeList;
