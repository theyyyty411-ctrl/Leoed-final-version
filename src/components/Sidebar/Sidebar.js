import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowBack as ArrowBackIcon, Home as HomeIcon } from "@mui/icons-material";
import { Drawer, IconButton, List, Box } from "@mui/material";
import { useTheme } from "@mui/material";
import classNames from "classnames";
import { useLocation } from "react-router-dom";

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";

function Sidebar({ structure }) {
  let classes = useStyles();
  let theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleDrawer = (value) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    if (value && !isPermanent) toggleSidebar(layoutDispatch);
  };

  // global
  let { isSidebarOpened } = useLayoutState();
  let layoutDispatch = useLayoutDispatch();

  // local
  let [isPermanent, setPermanent] = useState(true);

  const isSidebarOpenedWrapper = useMemo(
    () => (!isPermanent ? !isSidebarOpened : isSidebarOpened),
    [isPermanent, isSidebarOpened],
  );

  useEffect(function () {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpenedWrapper,
        [classes.drawerClose]: !isSidebarOpenedWrapper,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpenedWrapper,
          [classes.drawerClose]: !isSidebarOpenedWrapper,
        }),
      }}
      open={isSidebarOpenedWrapper}
      onClose={toggleDrawer(true)}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List
        className={classes.sidebarList}
        classes={{ padding: classes.padding }}
      >
        {structure.map((link) => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={!isPermanent ? !isSidebarOpened : isSidebarOpened}
            {...link}
            toggleDrawer={toggleDrawer(true)}
          />
        ))}
      </List>
      <Box sx={{ mt: "auto", p: 1, textAlign: "center" }}>
        <IconButton
          onClick={() => navigate("/landing")}
          size="small"
          sx={{ color: "text.secondary" }}
          title="Back to landing page"
        >
          <HomeIcon />
        </IconButton>
      </Box>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    let windowWidth = window.innerWidth;
    let breakpointWidth = theme.breakpoints.values.md;
    let isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default Sidebar;
