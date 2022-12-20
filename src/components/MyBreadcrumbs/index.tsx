import React, { FC } from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { Breadcrumbs, Chip, emphasize, styled, useTheme } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import makeArchitectureBreadcrumbs from "../../utils/makeArchitectureBreadcrumbs/makeArchitectureBreadcrumbs";

interface IBreadcrumbsConfig {
  id: number;
  label: string;
  path: string;
  isActive?: boolean;
}

export const MyBreadcrumbs: FC = () => {
  const location = useLocation();
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
    <Breadcrumbs aria-label='breadcrumb' separator={<NavigateNextIcon fontSize='small' />} sx={{ px: 3 }}>
      {makeArchitectureBreadcrumbs(location)?.map(link => (
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
