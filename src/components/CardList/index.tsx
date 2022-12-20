import React, { FC } from "react";
import { map } from "lodash";
import { ICharacter } from "../../interfaces";
import { CharacterCard } from "../../components";
import { Grid } from "@mui/material";
interface ICardListProps {
  items?: ICharacter[];
}
export const CardList: FC<ICardListProps> = ({ items }) => {
  return (
    <Grid container spacing={3} alignItems='flex-end'>
      {map(items, item => (
        <CharacterCard key={item.id} {...item} />
      ))}
    </Grid>
  );
};
