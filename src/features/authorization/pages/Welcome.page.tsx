import React, { FC, useEffect, useMemo } from "react";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import InfoIcon from "@mui/icons-material/Info";
import { useAppSelector } from "application/store";
import { selectCurrentUser } from "features/users/services";

import { useWelcome } from "features/authorization/hooks";
import { useNavigate } from "react-router";
import { selectHasPassedWelcome } from "features/authorization/services";
import { HOME_ROUTE } from "shared/routes";
import { ValidatedInput } from "shared/components/ValidatedInput";
import { SelectInput } from "shared/components/SelectInput";
import { SupportUkraineModel } from "shared/components/SupportUkraineModel";
import { textTransform } from "@mui/system";
import countryList from "react-select-country-list";
import { CountryAutocompleteInput } from "shared/components/CountryAutocompleteInput";
import { PutinHuiloModel } from "shared/components/PutinHuiloModel";
import { Backdrop } from "shared/components/Backdrop";

export const WelcomePage: FC = () => {
  const navigate = useNavigate();
  const { countries, formik, isLoading, isSuccess } = useWelcome();

  const hasPassedWelcome = useAppSelector(selectHasPassedWelcome);
  // useEffect(() => {
  //   if (hasPassedWelcome) {
  //     navigate({ pathname: HOME_ROUTE.path })
  //   }
  // }, [])

  return (
    <React.Fragment>

      {isLoading && <Backdrop />}
      {formik.values.country === "RU" && <PutinHuiloModel />}

      <Container
        component="main"
        maxWidth="xs"
        sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 25 }}
      >
        <Typography variant="h3" fontWeight={400} textAlign="center">
          Welcome!
        </Typography>
        <Typography variant="subtitle1" fontWeight={500} textAlign="center" color={grey[600]} m="10px 0 20px">
          Just a few questions to provide you with the best possible experience:
        </Typography>
      </Container>
      <Container component="form" onSubmit={formik.handleSubmit} noValidate maxWidth="xs">
        <Grid container spacing={2}>
          <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
            <ValidatedInput
              fullWidth
              size="small"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.username}
              errorText={formik.errors.username}
            >
              Username
            </ValidatedInput>
            <Tooltip
              TransitionComponent={Zoom}
              TransitionProps={{ timeout: 400 }}
              title="Your username will be public for everyone"
              placement="right"
              arrow
            >
              <InfoIcon sx={{ cursor: "help", ml: 1, width: 20, height: 20 }} />
            </Tooltip>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
            <CountryAutocompleteInput
              fullWidth
              items={countries}
              setFieldValue={formik.setFieldValue}
              onBlur={formik.handleBlur}
              touched={formik.touched.country}
              errorText={formik.errors.country}
            />

            <Tooltip
              TransitionComponent={Zoom}
              TransitionProps={{ timeout: 400 }}
              placement="right"
              title="We need to make sure that you don't choose a fucking russia"
              arrow
            >
              <InfoIcon sx={{ cursor: "help", ml: 1, width: 20, height: 20 }} />
            </Tooltip>
          </Grid>
          <Grid item xs={12} display="flex" alignItems="center" justifyContent="center">
            <Box component="div" display="flex" alignItems="center" gap={1}>
              <Checkbox
                id="mail_subscribe"
                name="mail_subscribe"
                checked={formik.values.mail_subscribe}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />
              <Typography variant="body2" fontWeight={500}>
                Subscribe to the newsletter?
              </Typography>
            </Box>
            <Tooltip
              TransitionComponent={Zoom}
              TransitionProps={{ timeout: 400 }}
              title=" We can email you updates on new features."
              arrow
              placement="right"
            >
              <InfoIcon sx={{ cursor: "help", ml: 1, width: 20, height: 20 }} />
            </Tooltip>
          </Grid>
        </Grid>
        <Box
          component="div"
          sx={{ mt: 2, width: "100%", display: "flex", justifyContent: "center", height: "max-content" }}
        >
          <Button type="submit" variant="contained" sx={{ textTransform: "inherit" }}>
            Get Started
          </Button>
        </Box>
      </Container>
    </React.Fragment>
  );
};
