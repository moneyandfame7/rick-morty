import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import CharacterList from "../../components/CardList";
import { getCharacters } from "../../redux/selectors";
import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";
import { FAVORITE_CHARACTERS, getLocalStorage } from "../../utils/localStorage";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#1A1F2DFF",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const FavoritePage = () => {
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const characters = useAppSelector(getCharacters);
  useEffect(() => {
    console.log(getLocalStorage(FAVORITE_CHARACTERS));
    characters.length ? setIsEmpty(false) : setIsEmpty(true);
  }, [characters]);

  return (
    <>
      {!isEmpty ? (
        <CharacterList items={characters} />
      ) : (
        <Modal
          aria-labelledby='transition-modal-title'
          aria-describedby='transition-modal-description'
          open={isEmpty}
          onClose={() => {
            setIsEmpty(false);
          }}
          disableEnforceFocus
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={isEmpty}>
            <Box sx={style}>
              <Typography id='transition-modal-title' variant='h6' component='h2'>
                Empty
              </Typography>
              <Typography id='transition-modal-description' sx={{ mt: 2 }}>
                Please add characters to favorites to view them.
              </Typography>
            </Box>
          </Fade>
        </Modal>
      )}
    </>
  );
};

export default FavoritePage;
