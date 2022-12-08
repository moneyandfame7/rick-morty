import React, { FC } from "react";
import { ICharacter } from "../interfaces";
import Card from "./Card";
import { Grid } from "@mui/material";

interface ICardListProps {
  items?: ICharacter[];
}
const CharacterList: FC<ICardListProps> = ({ items }) => {
  return (
    <Grid container spacing={3} alignItems='flex-end'>
      {items?.map(item => (
        <Card key={item.id} {...item} />
      ))}
    </Grid>
  );
};

export default CharacterList;
