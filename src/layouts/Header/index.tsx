import React, { FC, useState } from "react";
import styles from "./Header.module.scss";
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
  Button,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import BookmarksIcon from "@mui/icons-material/Bookmarks";

import { useAppSelector } from "../../redux/hooks";
import { getFavoritesAmount } from "../../redux/selectors";

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
      <AppBar component='nav'>
        <Toolbar
          sx={{
            display: "flex",
            backgroundColor: "#1a1f2d",
            justifyContent: { xs: "space-between" },
          }}
        >
          <IconButton
            className={styles.icon}
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" }, "&:hover": { backgroundColor: "#1A1F2DFF" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: "flex", gap: 5, alignItems: "center" }}>
            <Typography variant='h6' component='div' sx={{ display: { xs: "block", sm: "block" } }}>
              RICK & MORTY
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "flex" } }}>
              {LINKS_CONFIG.map(({ id, name, url }) => (
                <NavLink key={id} style={{ color: "#fff" }} to={url}>
                  <Button key={id} sx={{ color: "#fff", fontWeight: "bold" }} className={styles.link}>
                    {name}
                  </Button>
                </NavLink>
              ))}
            </Box>
          </Box>
          <Link to='/favorite'>
            <IconButton className={styles.icon} color='inherit' aria-label='Open favorite page' edge='start' sx={{}}>
              <Badge badgeContent={amountFavorite} color='primary' component='span'>
                <BookmarksIcon />
              </Badge>
            </IconButton>
          </Link>
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
