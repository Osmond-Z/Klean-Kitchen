import React, { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Logo } from "../components/nav";
import ListItem from "@material-ui/core/ListItem";
import {
  DashboardIcon,
  TalentIcon,
  ProjectsIcon,
  PackagesIcon,
  MessagingIcon,
  AuditionsIcon,
  ScheduleIcon,
  ContactsIcon,
  WebsiteIcon,
  ExpandIcon,
  CollapseIcon,
  ProfilesIcon,
  MediaIcon,
  RepresentationIcon,
  PitchIcon,
} from "../components/icon";
import Talent from "../features/talent";
import Settings from "../features/settings";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Hidden from "@material-ui/core/Hidden";
import { useStyles } from "./App.style";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
// import { useMainListeItemStyle } from "../components/style/listItem.style";
import Avatar from "@material-ui/core/Avatar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  // finishLoading,
  // hideNotification,
  // setCurrentResult,
  // startLoading,
} from "./appSlice";
import { isReturnStatement } from "typescript";
import { AppState } from "./appSlice";
import { RootState } from "./rootReducer";
import { Backdrop, CircularProgress, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Result, ResultType } from "../types";
// import { fetchMyProfiles } from "../features/talent/profileSlice";
// import { ProfileState } from "../features/talent/profileTypes";
// import { PrimaryImageState } from "../features/talent/primaryImage/primaryImageTypes";
// import { fetAccountPageData } from "../features/settings/myAccount/myAccountSlice";
// import { MyAccountState } from "../features/settings/myAccount/myAccountTypes";

export default function App() {
  const classes = useStyles();
  const listItemStyle = useMainListeItemStyle();
  const theme = useTheme();
  const dispatch = useDispatch();
  const screenLarge = useMediaQuery(theme.breakpoints.up("md"), {
    noSsr: true,
  });
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [drawerCollapse, setDrawerCollapse] = React.useState(!screenLarge);
  const [currentCollapseState, setCurrentCollapseState] = React.useState(false);
  const [selectedMenu, setSelectedMenu] = React.useState("");
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerCollapse = () => {
    setDrawerCollapse(!drawerCollapse);
  };

  const handleNotificationClose = () => {
    dispatch(hideNotification());
  };

  const handleNavItemHover = (over: boolean) => {
    if (over) {
      if (drawerCollapse) {
        setCurrentCollapseState(drawerCollapse);
        setDrawerCollapse(false);
      }
    } else {
      setDrawerCollapse(currentCollapseState);
    }
  };

  const appState: AppState = useSelector((state: RootState) => state.app);

  const profile: ProfileState = useSelector(
    (state: RootState) => state.profile
  );

  const myAccount: MyAccountState = useSelector(
    (state: RootState) => state.myAccount
  );

  const menuItems = [
    {
      name: "Dashboard",
      icon: <DashboardIcon />,
      link: "",
    },
    {
      name: "Profiles",
      icon: <ProfilesIcon />,
      link: "profiles",
    },
    {
      name: "Media",
      icon: <MediaIcon />,
      link: "",
    },
    {
      name: "Projects",
      icon: <ProjectsIcon />,
      link: "projects",
    },
    {
      name: "Messaging",
      icon: <MessagingIcon />,
      link: "",
    },
    {
      name: "Representation",
      icon: <RepresentationIcon />,
      link: "",
    },
    {
      name: "Pitch",
      icon: <PitchIcon />,
      link: "",
    },
    {
      name: "Schedule",
      icon: <ScheduleIcon />,
      link: "",
    },
    // , {
    //     name: 'Contacts',
    //     icon: <ContactsIcon />,
    //     link: '',
    // }, {
    //     name: 'Website',
    //     icon: <WebsiteIcon />,
    //     link: '',
    // }
  ];

  const myDrawer = (
    <div className={classes.drawerContainer}>
      <div className={classes.drawerHeader}>
        <Link to="/app/settings">
          <Logo />
        </Link>
      </div>
      <List
        className={classes.menuList}
        onMouseEnter={() => handleNavItemHover(true)}
        onMouseLeave={() => handleNavItemHover(false)}
      >
        {menuItems.map((item) => {
          return (
            <ListItem
              button
              key={item.name}
              selected={selectedMenu === item.name}
              disabled={item.link.length === 0}
              component={Link}
              to={"/app/" + item.link}
              onClick={() => setSelectedMenu(item.name)}
              classes={listItemStyle}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          );
        })}
      </List>
      <div
        className={classes.myAccountContainer}
        onClick={() => {
          setSelectedMenu("");
        }}
      >
        <div
          className={clsx(classes.collapseContainer, {
            [classes.collapseContainerSmall]: drawerCollapse,
          })}
        >
          <IconButton onClick={handleDrawerCollapse}>
            {drawerCollapse ? (
              <ExpandIcon
                width="48"
                height="48"
                viewBox="0 0 48 48"
                style={{ width: 48, height: 48 }}
                className={classes.collapseButton}
              />
            ) : (
              <CollapseIcon
                width="48"
                height="48"
                viewBox="0 0 48 48"
                style={{ width: 48, height: 48 }}
                className={classes.collapseButton}
              />
            )}
          </IconButton>
        </div>
        <div>
          <Link to="/app/settings" className={classes.myAccountContent}>
            <Avatar
              alt={myAccount.model.firstName + " " + myAccount.model.lastName}
              src={profile.profiles.find((x) => x.isPrimary)?.primaryImage}
              className={classes.headShot}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                color: "#fff",
                padding: "20px",
              }}
              className={clsx({
                [classes.hidden]: drawerCollapse,
              })}
            >
              <h4 style={{ margin: "0px 0px 5px 0px" }}>
                {myAccount.model.firstName} {myAccount.model.lastName}
              </h4>
              <span style={{ fontSize: "12px", color: "#D9D9D9" }}>
                My Account
              </span>
            </div>
            <img
              alt=""
              src="/Vector.png"
              style={{ marginLeft: "20px" }}
              className={clsx({
                [classes.hidden]: drawerCollapse,
              })}
            />
          </Link>
        </div>
      </div>
    </div>
  );

  const getErrorMessage = (result: Result): string => {
    if (result.type !== ResultType.success) {
      if (result.message && result.message.length > 0) {
        return result.message;
      }
      if (result.errors) {
        const error = result.errors[0];
        return error.message || "";
      } else {
        return "Failed";
      }
    }

    return "Success.";
  };

  useEffect(() => {
    dispatch(fetchMyProfiles(appState.memberId));
    dispatch(fetAccountPageData(appState.memberId));
  }, []);

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: !drawerCollapse,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            className={clsx(classes.menuButton, {})}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </Toolbar>
      </AppBar>
      <Router>
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {myDrawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: !drawerCollapse,
              [classes.drawerClose]: drawerCollapse,
            })}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: !drawerCollapse,
                [classes.drawerClose]: drawerCollapse,
              }),
            }}
          >
            {myDrawer}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Route path="/app/profiles" component={Talent} />
          <Route path="/app/settings" component={Settings} />
          <Route exact path="/app">
            <Redirect to="/app/profiles" />
          </Route>
        </main>
      </Router>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={appState.showResult}
        onClose={handleNotificationClose}
        autoHideDuration={6000}
        key={"bottom right"}
      >
        <Alert
          onClose={handleNotificationClose}
          variant="filled"
          severity={
            appState.currentResult?.type === ResultType.success
              ? "success"
              : appState.currentResult?.type === ResultType.error
              ? "error"
              : "warning"
          }
        >
          {getErrorMessage(
            appState.currentResult || {
              type: ResultType.success,
              message: "",
              showMessage: false,
            }
          )}
        </Alert>
      </Snackbar>
    </div>
  );
}
