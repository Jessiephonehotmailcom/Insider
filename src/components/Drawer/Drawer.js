/** @format */

import {
  AccountCircle,
  Close,
  Contacts,
  Handyman,
  Logout,
  Summarize,
  UploadFile,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Drawer as MuiDrawer,
  MenuItem as MuiMenuItem,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Search from "../Header/Search";

const menuItems = [
  {
    text: "Administration",
    url: "/Administration",
    icon: <Handyman />,
  },
  {
    text: "People",
    url: "/People",
    icon: <Contacts />,
  },
  {
    text: "Import File",
    url: "/ImportFile",
    icon: <UploadFile />,
  },
  {
    text: "NCR",
    url: "/NCR",
    icon: <Summarize />,
  },
];

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  marginTop: "160px",
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const MenuItem = ({ text, url, icon, open }) => {
  const location = useLocation();

  return (
    <ListItem
      component={Link}
      to={url}
      disablePadding
      sx={{ display: "block" }}
    >
      <ListItemButton
        selected={location.pathname === url}
        sx={{
          minHeight: 64,
          justifyContent: open ? "initial" : "center",
          px: 2.5,
          "&.Mui-selected": {
            background:
              "linear-gradient(180deg, rgba(101,109,114,1) 60%, rgba(40,50,55,1) 120%);",
            borderRadius: 3,
          },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : "auto",
            justifyContent: "center",
            color: location.pathname === url ? "#111c25" : "white",
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText
          primary={text}
          sx={{
            opacity: open ? 1 : 0,
            color: location.pathname === url ? "#111c25" : "white",
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default function Drawer({ open, handleDrawerClose }) {
  const isMobile = useMediaQuery("(max-width:768px)");
  const isDesktop = !isMobile;
  const [anchorEl, setAnchorEl] = useState(null);
  const openAccountMenu = Boolean(anchorEl);

  const handleAccountClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAccountClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleAccountClose();
    window.location.replace(
      "https://login.windows.net/fc16c45f-83c5-424c-bfcc-5ccaa08a8fcb/oauth2/logout"
    );
  };

  return (
    <>
      {isDesktop && (
        <StyledDrawer
          variant="permanent"
          open={open}
          PaperProps={{
            sx: {
              marginTop: "160px",
              borderRadius: "0 40px 40px 0",
              height: "calc(100vh - 160px)",
              background:
                "linear-gradient(120deg, rgba(131,134,137,1) 10%, rgba(21,37,49,1) 100%);",
            },
          }}
        >
          <List>
            {open && (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    paddingRight: "16px",
                  }}
                >
                  <Button onClick={handleDrawerClose}>
                    <Close
                      sx={{
                        color: "white",
                        fontSize: "24px",
                      }}
                    />
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0px 16px 16px 16px",
                  }}
                >
                  <Button
                    id="basic-button"
                    aria-controls={openAccountMenu ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openAccountMenu ? "true" : undefined}
                    onClick={handleAccountClick}
                    sx={{ marginRight: "16px" }}
                  >
                    <AccountCircle
                      sx={{
                        color: "white",
                        fontSize: "48px",
                      }}
                    />
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={openAccountMenu}
                    onClose={handleAccountClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MuiMenuItem onClick={handleLogout}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MuiMenuItem>
                  </Menu>
                  <Typography color="white">Hello, Bruce</Typography>
                </Box>
                <Divider
                  color="white"
                  sx={{
                    marginLeft: "16px",
                    marginRight: "40px",
                    marginBottom: "16px",
                  }}
                />
              </>
            )}
            {!open && <Box sx={{ paddingTop: "32px" }} />}
            {menuItems.map((item) => (
              <MenuItem
                key={item.text}
                text={item.text}
                url={item.url}
                icon={item.icon}
                open={open}
              />
            ))}
          </List>
        </StyledDrawer>
      )}

      {isMobile && (
        <MuiDrawer
          open={open}
          onClose={handleDrawerClose}
          PaperProps={{
            sx: {
              borderRadius: "0 40px 40px 0",
              height: "100vh",
              background:
                "linear-gradient(120deg, rgba(131,134,137,1) 10%, rgba(21,37,49,1) 100%);",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              paddingRight: "16px",
              paddingTop: "16px",
            }}
          >
            <Button onClick={handleDrawerClose}>
              <Close
                sx={{
                  color: "white",
                  fontSize: "24px",
                }}
              />
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: "40px",
            }}
          >
            <Button
              id="basic-button"
              aria-controls={openAccountMenu ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openAccountMenu ? "true" : undefined}
              onClick={handleAccountClick}
              sx={{ marginRight: "16px" }}
            >
              <AccountCircle
                sx={{
                  color: "white",
                  fontSize: "48px",
                }}
              />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={openAccountMenu}
              onClose={handleAccountClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MuiMenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MuiMenuItem>
            </Menu>
            <Typography color="white">Hello, Bruce Banner</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "32px",
            }}
          >
            <Search />
          </Box>
          <Divider
            color="white"
            sx={{
              marginLeft: "24px",
              marginRight: "36px",
              marginBottom: "24px",
            }}
          />
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={handleDrawerClose}
          >
            <List>
              {menuItems.map((item) => (
                <MenuItem
                  key={item.text}
                  text={item.text}
                  url={item.url}
                  icon={item.icon}
                  open={open}
                />
              ))}
            </List>
          </Box>
        </MuiDrawer>
      )}
    </>
  );
}
