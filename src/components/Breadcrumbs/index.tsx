import React, { FC } from "react";
import { useLocation, useMatches, useNavigate } from "react-router";
import HomeIcon from "@mui/icons-material/Home";
import { Breadcrumbs, Chip, emphasize, styled, useTheme } from "@mui/material";
import { NavLink } from "react-router-dom";
import "./styles.scss";
import { uniqBy } from "lodash";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

interface IBreadcrumbsConfig {
  id: number;
  label: string;
  path: string;
}

interface IMyBreadcrumbs {
  customLabel?: string;
}
const MyBreadcrumbs: FC<IMyBreadcrumbs> = ({ customLabel }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const paths = location.pathname.split("/");
  console.log(paths);

  const makeArchitectureBreadcrumbs = (arr: string[], customLabel?: string): IBreadcrumbsConfig[] => {
    const newArr = arr.map((path, index) => {
      if (path.length === 0)
        return {
          id: index,
          label: "Home",
          path: "/",
        };

      if (!Number(path))
        return {
          id: index,
          label: path[0].toUpperCase() + path.substring(1) + "s",
          path: "/" + path + "?page=1",
        };
      else
        return {
          id: index,
          label: customLabel ? customLabel : "Information page",
          path: location.pathname,
        };
    });

    return uniqBy(newArr, "path");
  };

  console.log(makeArchitectureBreadcrumbs(paths));

  const theme = useTheme();
  const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor = theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[800];
    return {
      backgroundColor,
      height: theme.spacing(3),
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightRegular,
      "&:hover, &:focus": {
        backgroundColor: emphasize(backgroundColor, 0.06),
      },
      "&:active": {
        boxShadow: theme.shadows[1],
        backgroundColor: emphasize(backgroundColor, 0.12),
      },
    };
  }) as typeof Chip;

  return (
    // <Button onClick={handleGoBack} variant='contained' sx={{ gap: "5px" }}>
    //   <ArrowBack />
    //   <span>Go back</span>
    // </Button>
    <Breadcrumbs aria-label='breadcrumb' separator={<NavigateNextIcon fontSize='small' />}>
      {makeArchitectureBreadcrumbs(paths).map(link => (
        <NavLink
          key={link.id}
          to={link.path}
          style={({ isActive }) => (isActive ? { color: theme.palette.primary.dark } : undefined)}
        >
          <StyledBreadcrumb
            component='span'
            label={link.label}
            icon={link.label === "Home" ? <HomeIcon fontSize='small' /> : undefined}
            className='inner-link'
          />
        </NavLink>
      ))}
    </Breadcrumbs>
  );
};

export default MyBreadcrumbs;
