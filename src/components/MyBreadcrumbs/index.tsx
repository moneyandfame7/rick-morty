import React, { FC } from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import { uniqBy } from "lodash";
import HomeIcon from "@mui/icons-material/Home";
import { Breadcrumbs, Chip, emphasize, styled, useTheme } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

interface IBreadcrumbsConfig {
  id: number;
  label: string;
  path: string;
  isActive?: boolean;
}

export const MyBreadcrumbs: FC = () => {
  const location = useLocation();
  const theme = useTheme();

  const paths = location.pathname.split("/");
  const makeArchitectureBreadcrumbs = (arr: string[]): IBreadcrumbsConfig[] => {
    const newArr = arr.map((path, index) => {
      const isActive = index + 1 === arr.length;
      if (path.length === 0)
        return {
          id: index,
          label: "Home",
          path: "/",
          isActive,
        };

      if (!Number(path))
        return {
          id: index,
          label: path[0].toUpperCase() + path.substring(1) + "s",
          path: "/" + path + "?page=1",
          isActive,
        };
      else
        return {
          id: index,
          label: "Information page",
          path: location.pathname,
          isActive,
        };
    });

    return uniqBy(newArr, "path");
  };

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
    <Breadcrumbs aria-label='breadcrumb' separator={<NavigateNextIcon fontSize='small' />} sx={{ px: 3 }}>
      {makeArchitectureBreadcrumbs(paths)?.map(link => (
        <NavLink key={link.id} to={link.path}>
          <StyledBreadcrumb
            component='span'
            label={link.label}
            icon={link.label === "Home" ? <HomeIcon fontSize='small' /> : undefined}
            sx={link.isActive ? { color: theme.palette.primary.main } : undefined}
          />
        </NavLink>
      ))}
    </Breadcrumbs>
  );
};
