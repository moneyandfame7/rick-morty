import React, { FC, useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import CharacterList from "../../components/CardList";
import { getCharacters } from "../../redux/selectors";
import Modal from "../../components/Modal";
import { useNavigate } from "react-router";

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
        <CharacterList items={characters} />
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
