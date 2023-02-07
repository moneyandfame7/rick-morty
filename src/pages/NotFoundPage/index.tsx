import React, { FC } from "react";
import { useLocation, useNavigate } from "react-router";
import styles from "./NotFoundPage.module.scss";
import { Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { NavigationTypeEnum } from "../../constants/api";

const NotFoundPage: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Stack direction='column' gap='10px' alignItems='center'>
      <Typography component='h3' variant='h3' fontWeight='bold'>
        404
      </Typography>
      <Typography component='h4' variant='h4'>
        Not found page
      </Typography>

      <Stack direction='row' gap='20px' alignItems='center'>
        No match for
        <Button variant='outlined' data-testid='button-link' disabled>
          {location.pathname}
        </Button>
      </Stack>
    </Stack>
  );
};

export default NotFoundPage;
