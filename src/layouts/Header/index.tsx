import React, { FC, useState } from "react";
// import styles from "./Header.module.scss";
import { Link, NavLink } from "react-router-dom";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Badge,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import BookmarksIcon from "@mui/icons-material/Bookmarks";

import { useAppSelector } from "../../redux/hooks";
import { getFavoritesAmount } from "../../redux/selectors";
import ToggleMode from "../../components/ToggleMode";
import { grey } from "@mui/material/colors";
import { useTheme } from "@mui/material/styles";

interface ILinkConfig {
  url: string;
  name: string;
  id: number;
}

const LINKS_CONFIG: ILinkConfig[] = [
  {
    url: "/character?page=1",
    name: "Characters",
    id: 0,
  },
  {
    url: "/episode?page=1",
    name: "Episodes",
    id: 1,
  },
  {
    url: "/location",
    name: "Locations",
    id: 2,
  },
];

interface IHeaderProps {
  window?: () => Window;
}
const drawerWidth = 240;
const Header: FC<IHeaderProps> = ({ window }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const amountFavorite = useAppSelector(getFavoritesAmount);
  const theme = useTheme();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center", height: "70px" }}>
      <Typography variant='h6' sx={{ my: 2 }}>
        RICK & MORTY
      </Typography>
      <Divider />
      <List>
        {LINKS_CONFIG.map(
          ({ url, name, id }) =>
            name !== "Favorites" && (
              <ListItem key={id} disablePadding>
                <ListItemButton sx={{ textAlign: "center" }}>
                  <NavLink to={url} key={id}>
                    <ListItemText primary={name} />
                  </NavLink>
                </ListItemButton>
              </ListItem>
            )
        )}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        component='nav'
        sx={{
          backgroundColor: "background.default",
          boxShadow: "none",
          borderBottom: "1px solid",
          borderColor: "neutral.main",
          color: "text.primary",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: { xs: "space-between" },
          }}
        >
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" }, "&:hover": { backgroundColor: "#1A1F2DFF" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: "flex", gap: 5, alignItems: "center" }}>
            <Typography variant='h6' color='inherit' noWrap sx={{ flexGrow: 1 }} fontWeight='bolder'>
              Rick & morty
            </Typography>
            <Stack sx={{ display: { xs: "none", sm: "flex" } }} direction='row' gap={5}>
              {LINKS_CONFIG.map(({ id, name, url }) => (
                <NavLink key={id} to={url}>
                  <Typography key={id} sx={{ fontWeight: "bold" }} variant='body1'>
                    {name}
                  </Typography>
                </NavLink>
              ))}
            </Stack>
          </Box>
          <Stack direction='row' gap={5}>
            <ToggleMode />
            <Link to='/favorite'>
              <IconButton color='inherit' aria-label='Open favorite page' edge='start' sx={{}}>
                <Badge badgeContent={amountFavorite} color='primary' component='span'>
                  <BookmarksIcon />
                </Badge>
              </IconButton>
            </Link>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box component='nav'>
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component='main' sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
};
export default Header;
