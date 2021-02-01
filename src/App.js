import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Fab from "@material-ui/core/Fab";
import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import CloseIcon from "@material-ui/icons/Close";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import FilterListIcon from "@material-ui/icons/FilterList";
import SearchIcon from "@material-ui/icons/Search";

import Layout from "./Layout";
import DemoForm from "./DemoForm";

import "./styles.css";

const filterCategories = [
  {
    label: "Блюда",
    value: 1,
  },
  {
    label: "Заготвки",
    value: 2,
  },
  {
    label: "Продукты",
    value: 3,
  },
  {
    label: "Напитки",
    value: 4,
  },
  {
    label: "Десерты",
    value: 5,
  },
  {
    label: "Салаты",
    value: 6,
  },
  {
    label: "Ролы",
    value: 7,
  },
];

const filterRestaurants = [
  {
    label: "Атриум",
    value: 1,
  },
  {
    label: "Доставка",
    value: 2,
  },
];

const items = [...Array(100)].map((_, i) => ({
  name: "Блюдо " + (i + 1),
  category: Math.ceil(Math.random() * filterCategories.length),
  restaurant: Math.ceil(Math.random() * filterRestaurants.length),
}));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  list: {
    flexGrow: 1,
    padding: theme.spacing(1),
    overflow: "auto",
    backgroundColor: theme.palette.background.default,
  },
  card: {
    width: "100%",
  },
  paper: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
  },
  input: {
    marginLeft: theme.spacing(2),
    fontSize: "1.125rem",
    flex: 1,
  },
  filterButton: {
    position: "fixed",
    bottom: "15%",
    right: 25,
  },
  searchButton: {
    position: "fixed",
    bottom: "calc(15% + 50px)",
    right: 25,
    transition: theme.transitions.create("right", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  sectionTitle: {
    display: "inline-block",
    marginLeft: theme.spacing(0.25),
    marginTop: theme.spacing(2),
  },
  chipsList: {
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",

    marginBottom: theme.spacing(2),
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  hiddenInput: {
    display: "flex",
    transition: theme.transitions.create("height", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflow: "hidden",
  },
  itemDrawer: {
    height: "100vh",
    padding: theme.spacing(2),
    overflowY: "auto",
    boxSizing: "border-box",
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  itemDrawerHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    height: 50,
    width: '100%',
    boxShadow: theme.shadows[5],
    backgroundColor: '#fff',
    zIndex: 1000,
  },
  itemDrawerHeaderTitle: {
    paddingLeft: 12,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  itemDrawerFooter: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'fixed',
    flexFlow: 'row-reverse',
    bottom: 0,
    left: 0,
    height: 60,
    width: '100%',
    padding: theme.spacing(0, 2),
    boxShadow: theme.shadows[5],
    boxSizing: 'border-box',
    backgroundColor: '#fff',
    zIndex: 1000,
  },
  filterRepresentChips: {
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",

    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(1),
    "& > *": {
      margin: theme.spacing(0.25),
    },
  },
}));

export default function App() {
  const classes = useStyles();

  const inputRef = React.useRef();
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [saveConfirmOpen, setSaveConfirmOpen] = React.useState(false);
  const [currentItem, setCurrentItem] = React.useState();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategories, setSelectedCategories] = React.useState([]);
  const [selectedRestaurants, setSelectedRestaurants] = React.useState([]);

  const clearFilter = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedRestaurants([]);
  };

  const toggleCategoryFilter = (categoryKey) => () => {
    if (selectedCategories.includes(categoryKey)) {
      setSelectedCategories(
        selectedCategories.filter((key) => key !== categoryKey)
      );
      return;
    }

    setSelectedCategories([...selectedCategories, categoryKey]);
  };

  const toggleRestaurantsFilter = (restaurantKey) => () => {
    if (selectedRestaurants.includes(restaurantKey)) {
      setSelectedRestaurants(
        selectedRestaurants.filter((key) => key !== restaurantKey)
      );
      return;
    }

    setSelectedRestaurants([...selectedRestaurants, restaurantKey]);
  };

  const toggleFilterDrawer = (value = !filterOpen) => () => {
    setFilterOpen(value);
  };

  const toggleItemDrawer = (item) => () => {
    setCurrentItem(item);
  };

  const toggleSearch = (value = !searchOpen) => () => {
    setSearchOpen(value);
    if (value && inputRef.current.focus) {
      inputRef.current.focus();
    }
  };

  const handleItemClick = (item) => () => {
    setCurrentItem(item);
  };

  const closeItem = () => {
    setCurrentItem(undefined);
  };

  const searchChip = searchQuery
    ? {
        label: `"${searchQuery}"`,
        value: "searchQuery",
        keyPrefix: "categories",
        color: "default",
        action: () => setSearchQuery(""),
      }
    : null;

  const selectedChips = [
    searchChip,
    ...(selectedRestaurants.length !== filterRestaurants.length
      ? filterRestaurants
          .filter((item) => selectedRestaurants.includes(item.value))
          .map((item) => ({
            ...item,
            keyPrefix: "restaurants",
            color: "secondary",
            action: toggleRestaurantsFilter(item.value),
          }))
      : []),
    ...(selectedCategories.length !== filterCategories.length
      ? filterCategories
          .filter((item) => selectedCategories.includes(item.value))
          .map((item) => ({
            ...item,
            keyPrefix: "categories",
            color: "primary",
            action: toggleCategoryFilter(item.value),
          }))
      : []),
  ].filter(Boolean);

  const searchedItems = items
    .filter((item) => item.name.includes(searchQuery))
    .filter(
      (item) =>
        !selectedCategories.length || selectedCategories.includes(item.category)
    )
    .filter(
      (item) =>
        !selectedRestaurants.length ||
        selectedRestaurants.includes(item.restaurant)
    );

  const handleSearchInputClickAway = ev => {
    if (searchOpen) {
      ev.stopPropagation();
      ev.preventDefault();
      setSearchOpen(false)
      return false;
    }
  }

  const handleSaveConfirmClose = () => {

  }

  const handleSaveConfirm = () => {

  }

  return (
    <div className="App">
      <Layout>
        <ClickAwayListener
          disableReactTree
          mouseEvent="onMouseUp"
          onClickAway={handleSearchInputClickAway}
        >
          <Box
            className={classes.hiddenInput}
            style={{ height: searchOpen ? 48 : 0 }}
          >
            <InputBase
              fullWidth
              inputRef={inputRef}
              className={classes.input}
              placeholder="Поиск"
              value={searchQuery}
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <IconButton
              type="submit"
              className={classes.iconButton}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </Box>
        </ClickAwayListener>
        {Boolean(selectedChips.length) && (
          <Box className={classes.filterRepresentChips}>
            {selectedChips.length > 1 && (
              <Chip
                clickable
                size="small"
                label="Очистить все"
                onClick={clearFilter}
                onDelete={clearFilter}
              />
            )}
            {selectedChips.map((item) => (
              <Chip
                key={`${item.keyPrefix}_${item.value}`}
                clickable
                size="small"
                label={item.label}
                color={item.color}
                onDelete={item.action}
              />
            ))}
          </Box>
        )}
        <List
          className={classes.list}
          style={{ height: `calc(100% - ${searchOpen ? 48 : 0}px)` }}
        >
          {searchedItems.map((item) => (
            <ListItem button key={item.name} onClick={handleItemClick(item)}>
              <ListItemIcon>
                <FastfoodIcon />
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
          {!searchedItems.length && (
            <Box py={4}>
              <Typography variant="body2" align="center" color="textSecondary">
                По вашему запросу ничего не найдено
              </Typography>
            </Box>
          )}
        </List>
        <Fab
          size="small"
          color="primary"
          aria-label="filter"
          className={classes.searchButton}
          style={{ right: searchOpen ? -50 : 25 }}
          onClick={toggleSearch()}
        >
          <SearchIcon />
        </Fab>
        <Fab
          size="small"
          color="primary"
          aria-label="filter"
          className={classes.filterButton}
          onClick={toggleFilterDrawer()}
        >
          <FilterListIcon />
        </Fab>
        <SwipeableDrawer
          open={filterOpen}
          anchor="bottom"
          onClose={toggleFilterDrawer(false)}
          onOpen={toggleFilterDrawer(true)}
        >
          <Box p={2}>
            <Typography gutterBottom variant="h6" align="center">
              Фильтр
            </Typography>
            <Typography gutterBottom className={classes.sectionTitle}>
              Рестораны:
            </Typography>
            <Box className={classes.chipsList}>
              {filterRestaurants.map((restaurant) => (
                <Chip
                  key={restaurant.value}
                  clickable
                  label={restaurant.label}
                  color={
                    selectedRestaurants.includes(restaurant.value)
                      ? "secondary"
                      : "default"
                  }
                  onClick={toggleRestaurantsFilter(restaurant.value)}
                />
              ))}
            </Box>
            <Divider />
            <Typography gutterBottom className={classes.sectionTitle}>
              Категории:
            </Typography>
            <Box className={classes.chipsList}>
              {filterCategories.map((cat) => (
                <Chip
                  key={cat.value}
                  clickable
                  label={cat.label}
                  color={
                    selectedCategories.includes(cat.value)
                      ? "primary"
                      : "default"
                  }
                  onClick={toggleCategoryFilter(cat.value)}
                />
              ))}
            </Box>
            <Divider />
          </Box>
        </SwipeableDrawer>

        <Drawer
          open={Boolean(currentItem)}
          anchor="bottom"
          classes={{ paper: classes.itemDrawer }}
        >
          <Box className={classes.itemDrawerHeader}>
            <Typography variant="body1" className={classes.itemDrawerHeaderTitle}>
              {(currentItem || {}).name}
            </Typography>
            <IconButton aria-label="close" onClick={toggleItemDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <DemoForm />
          
          <Box className={classes.itemDrawerFooter}>
            <Button
              variant="contained"
              color="primary"
              style={{ flex: 2 }}
            >
              Сохранить
            </Button>
            <Box px={0.5} />
            <Button
              variant="contained"
              style={{ flex: 1 }}
              onClick={toggleItemDrawer(false)}
            >
              Отмена
            </Button>
          </Box>
        </Drawer>

        <Dialog
          open={saveConfirmOpen}
          onClose={handleSaveConfirmClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Сохранить изменения"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Вы уверены что хотите сохранить изменения?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSaveConfirmClose} color="primary">
              Отменить
            </Button>
            <Button onClick={handleSaveConfirm} color="primary" autoFocus>
              Сохранить
            </Button>
          </DialogActions>
        </Dialog>
      </Layout>
    </div>
  );
}
