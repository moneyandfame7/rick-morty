import * as React from "react";
import { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import { red, green, grey } from "@mui/material/colors";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useFetchEpisodeByIdQuery } from "../redux/slices/rickMortyApiSlice";
import { getIdFromName } from "../utils/getIdFromUrl";
import { NavigationTypeEnum } from "../constants/api";

interface ICharacterCardProps {
  status: string;
  name: string;
  image: string;
  location: {
    name: string;
    url: string;
  };
  episode: Array<string>;
  id: number;
}

const CharacterCard: FC<ICharacterCardProps> = ({ status, name, image, location, episode, id }) => {
  const { data, isLoading } = useFetchEpisodeByIdQuery(getIdFromName(episode[0]));

  const textColor = () => {
    switch (true) {
      case status.includes("Dead"):
        return { color: red[600] };
      case status.includes("Alive"):
        return { color: green[600] };
      default:
        return { color: grey[400] };
    }
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card sx={{ height: "100%" }}>
        <CardMedia component='img' alt='green iguana' image={image} width='200px' />
        <CardHeader
          sx={{ minHeight: "100px", padding: 1 }}
          title={name}
          subheader={location.name}
          titleTypographyProps={{ align: "center" }}
          subheaderTypographyProps={{
            align: "center",
          }}
        />
        <CardContent sx={{ padding: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "baseline",
              mb: 2,
            }}
          >
            <Typography component='h4' variant='h5' color='text.primary' sx={textColor()}>
              {status}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
            <Typography component='h5' variant='subtitle1' sx={{ fontWeight: "bolder" }}>
              First seen in:
            </Typography>

            {isLoading ? (
              <CircularProgress />
            ) : (
              <Stack direction='column' gap='3px'>
                <Typography component='h6' variant='subtitle2' color='text.primary' sx={{ textAlign: "center" }}>
                  {data?.name}
                </Typography>
                <Typography component='h6' variant='subtitle2' color='text.primary' sx={{ textAlign: "center" }}>
                  {`(${data?.episode})`}
                </Typography>
              </Stack>
            )}
          </Box>
        </CardContent>
        <CardActions>
          <Button fullWidth variant='outlined' component={RouterLink} to={`/${NavigationTypeEnum.CHARACTER}/${id}`}>
            Read more
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
export default CharacterCard;
