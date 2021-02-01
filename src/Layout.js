import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import MenuIcon from "@material-ui/icons/Menu";
import RestoreIcon from "@material-ui/icons/Restore";

import useScreenSize from "./useScreenSize";

const items = [...Array(100)].map((_, i) => ({
  name: "Блюдо " + (i + 1),
}));

const useStyles = makeStyles((...props) => {
  console.log("props: ", props);
  return {
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    header: {
      position: "fixed",
      top: 0,
      height: 56,
    },
    fakeHeader: {
      height: 56,
    },
    footer: {
      position: "fixed",
      bottom: 0,
      width: "100%",
      height: 56,
    },
    fakeFooter: {
      height: 56,
    },
    content: {
      position: "relative",
      height: "calc(100vh - 112px)",
      overflow: "hidden",
    },
  };
});

export default function Layout({ children }) {
  const headerHeight = 56;
  const classes = useStyles({ headerHeight });
  const screenSize = useScreenSize();

  const [value, setValue] = React.useState(0);

  return (
    <>
      <AppBar className={classes.header} position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title}>Номекулатура</Typography>
          <IconButton edge="start" color="inherit" aria-label="logout">
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box className={classes.fakeHeader} />

      <div className={classes.content}>{children}</div>

      <Box className={classes.fakeFooter} />
      <BottomNavigation
        showLabels
        className={classes.footer}
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
      >
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
      </BottomNavigation>
    </>
  );
}
