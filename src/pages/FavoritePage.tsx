import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAppSelector } from "../redux/hooks";
import { getCharacters } from "../redux/selectors";
import { CardList, Modal } from "../components";

const FavoritePage: FC = () => {
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const characters = useAppSelector(getCharacters);
  const navigate = useNavigate();
  useEffect(() => {
    characters.length ? setIsEmpty(false) : setIsEmpty(true);
  }, [characters]);
  const handleClose = () => {
    setIsEmpty(false);
    navigate("/character");
  };
  return (
    <>
      {!isEmpty ? (
        <CardList items={characters} />
      ) : (
        <Modal
          title='Your favorites list is empty.'
          onClose={handleClose}
          open={isEmpty}
          message='Please, add characters to see them.'
        />
      )}
    </>
  );
};

export default FavoritePage;
