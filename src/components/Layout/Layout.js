import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Header } from '../Header/Header';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';


import ContactsIcon from '@mui/icons-material/Contacts';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AddBoxIcon from '@mui/icons-material/AddBox';
import UploadIcon from '@mui/icons-material/Upload';
import Footer from '../Footer/Footer';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import Typography from '@mui/material/Typography';
//import AccountIcon from '@mui/material/AccountCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import SearchBar from '../Header/SearchBar';
import Fade from '@mui/material/Fade';
import LogoutIcon from '@mui/icons-material/Logout';
import { left } from '@popperjs/core';
const PREFIX = 'MyCard';
const classes = {
  root: `${PREFIX}-root`,
  toolbarLeft: `${PREFIX}-toolbarLeft`,
  appBar: `${PREFIX}-appBar`,
  appBarTitle: `${PREFIX}-appBarTitle`,
  toolbarRight: `${PREFIX}-toolbarRight`,
  menuButton: `${PREFIX}-menuButton`,
  hide: `${PREFIX}-hide`,
  menuItem: `${PREFIX}-menuItem`,
}

const Root = styled('div')(({ theme }) => ({
  [`&.${classes.root}`]: {
    display: 'flex',
    
  },
  [`&.${classes.menuItem}`]: {
    display: 'flex',
    color: 'black',
  },
  [`& .${classes.toolbarLeft}`]: {
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    //padding: theme.spacing(0, 2),
    // padding: '2em',
    //necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  [`& .${classes.appBar}`]: {
    zIndex: theme.zIndex.drawer + 1,
    color: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '1vh',
    background: '#8a2432',
    background: 'linear-gradient(0deg, #8a2432 98%, #8a2432 100%)',

  },
  [`& .${classes.appBarTitle}`]: {
    flexGrow: 1,
    marginLeft: 30,
    marginTop: 25
  },
  [`& .${classes.toolbarRight}`]: {
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    padding: '2em',
    marginRight: '2%',
    paddingTop: 25,
    //necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  [`& .${classes.menuButton}`]: {
    marginRight: 36,
  },
  [`& .${classes.hide}`]: {
    display: 'none',
  },
}))
const drawerWidth = 265;

const openedMixin = (theme) => ({
  //marginTop: '115px',
  //  width: 600,
  //  marginLeft: '-100px',
  //maxWidth:'30%',
  //maxHeight: '60%',
  // height:1000,
  // transition: theme.transitions.create('width', {
  //   easing: theme.transitions.easing.sharp,
  //   duration: theme.transitions.duration.enteringScreen,
  // }),
  // overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(9)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});



const ContentArea = styled('div')(({ theme, open }) => ({
  marginTop: "100px",
  flexGrow: 1,
  display: 'flex',
  justifyContent: 'center',
  padding: theme.spacing(2),
  transition: theme.transitions.create('justify-content', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  })
}));


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  // justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    // width: drawerWidth,
    // width: '20vw',
    width: `calc(${theme.spacing(16)} + 120px)`,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const ListItemBtn = styled(ListItemButton)(({ theme }) => ({
  "&.Mui-selected": {
    backgroundColor: "#50555B",
    borderColor: "#696D74",
    boxShadow: 3,
    borderRadius: 3,
  },
  "&.Mui-focusVisible": {
    backgroundColor: "#50555B",
    borderColor: "#696D74",
    boxShadow: 3,
    borderRadius: 3,
  },
  ":hover": {
    backgroundColor: "#686C74",
    borderColor: "#696D74",
    boxShadow: 3,
    borderRadius: 3,
  },
}));

export default function Layout(props) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [width, setWidth] = useState(window.innerWidth);
  const [drawerOpen, setdrawerOpen] = useState(true);
  const [selected, setSelected] = useState(false);
  const storageRoles = localStorage.getItem('roles');
  const roles = JSON.parse(storageRoles);

  const isAuthenticated = true;
  const pilotId = localStorage.getItem('pilotId');
  // const theme = useTheme();
  // const [anchorEl, setAnchorEl] = React.useState(null);

  // const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  // const handleClose = (ev) => {
  //   setAnchorEl(null);
  //   localStorage.setItem('pilotId', null);
  //   const pilotId = localStorage.getItem('pilotId');
  //   console.log('LOGOUT PAGE ::::: PilotId :::::::::::: ' + pilotId);
  //   if (ev.target.innerText === 'Logout') {

  //     window.location.replace('https://login.windows.net/fc16c45f-83c5-424c-bfcc-5ccaa08a8fcb/oauth2/logout');


  //   }
  // };



  const handleClose = (ev) => {
    // setAnchorEl(null);
    // localStorage.setItem('pilotId', null);
    // const pilotId = localStorage.getItem('pilotId');
    // console.log('PilotId :::::::::::: ' + pilotId);
    // if (ev.target.innerText === 'Logout') {
    //   if (window.location.host === 'witty-rock-05985bd10.3.azurestaticapps.net') {
    //     window.location.replace('https://pilotdev.onelogin.com/oidc/2/logout')
    //   }
    //   else if (window.location.host === 'photos.pilottest.cc') {
    //     window.location.replace('https://pilotstaging.onelogin.com/oidc/2/logout')
    //   }
    //   else if (window.location.host === 'photos.pilotcat.com') {
    //     window.location.replace('https://pilot.onelogin.com/oidc/2/logout')
    //   }
    // }
  }


  const handleDrawerClose = () => {
    setdrawerOpen(false);
  };

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  let isMobile = width <= 768;
  return (
    <>
      <div style={{ height: '30vh', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          {/* <Header isAuthenticated="true" /> */}







          <Root className={classes.root}>
            <AppBar
              position="fixed"
              elevation={0}
              className={classes.appBar}
              style={{
                backgroundImage: `url("/HeaderRibbon.png")`,
                backgroundPosition: "right bottom",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                height: "100%",
                shadow: 5,
                width: "100%",
                maxHeight: "160px",
                maxWidth: "100%",
                padding: "10px",
                objectfit: "cover",

              }}
            >

              <Toolbar className={classes.toolbarLeft}>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={drawerOpen ? handleDrawerClose : setdrawerOpen}
                >
                  <MenuIcon sx={{ mr: 1 }} style={{ marginTop: '30px' }}></MenuIcon>
                </IconButton>
                <SearchBar ></SearchBar>
                {/* <IconButton
                  color="inherit"
                  aria-label="account menu"
                  aria-controls="account-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                  edge="end"
                >
                  {isAuthenticated &&
                    <AccountCircleIcon />
                  }
                </IconButton> */}

              </Toolbar>

              <Toolbar className={classes.toolbarRight}>
                <img style={{
                  // display: "block",
                  // maxWidth: 215,
                  // maxHeight: 60,
                  // width: "auto",
                  // height: "auto"
                  width: '250px',
                  height: '80px',
                }} src="/pilot_logo_white.png"
                  alt=""></img>
                <Typography
                  variant="h6"
                  className={classes.appBarTitle}
                >
                  {/* Pilot Insider */}
                </Typography>
              </Toolbar>
            </AppBar>

            <Menu
              id="long-menu"
              aria-labelledby="long-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              TransitionComponent={Fade}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>





















            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: 500,
                  width: '20ch',
                },
              }}
            >
              {['Logout'].map((option) => (
                <MenuItem key={option} onClick={handleClose}>
                  {option}
                </MenuItem>
              ))}
            </Menu>
            {/* <div
            sx={{
              width: 250,
              height: '900px',
              backgroundSize: "cover, cover",
              backgroundRepeat: "no-repeat",

              paddingTop: "20px",
              maxHeight: "90%",
              maxWidth: "100%",
              // padding: "10px",
              backgroundImage: `url("/LeftNav.png")`,
              objectfit: "cover"
            }}

          ></div> */}


            <Drawer

              PaperProps={{
                sx: {
                  backgroundImage: `url("/LeftNav.png")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '100% 100%',
                  height: '90vh',
                  width: '250px',
                  margin: '3px auto 0',
                  position: 'fixed',
                  marginTop: '140px'
                }
              }}

              variant="permanent" open={drawerOpen}>
              <DrawerHeader style={{ marginTop: '80px' }}>
             
                <IconButton
                  color="inherit"
                  aria-label="account menu"
                  aria-controls="account-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                  edge="end"
                  marginRight="130px"

                >
                  
                  {isAuthenticated &&
                    <>
                      <AccountCircleIcon style={{ width: "65px", height: "65px", color: "#FFFFFF", marginLeft:'-10px' }} />


                    </>
                  }
                </IconButton>
                <div style={{ color: "#FFFFFF", marginLeft:'10px',   inlineSize: '140px',   overflowWrap: 'break-word', whiteSpace:'wrap'}}>   
                Hello, Bartholomew Montgomery
              </div>
              {/* <IconButton onClick={drawerOpen ? handleDrawerClose : setdrawerOpen} style={{ width: '0%', marginRight: '50%', paddingTop: 80 }}>
                {drawerOpen ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />}
              </IconButton> */}
            </DrawerHeader>

            <Divider sx={{ bgcolor: "#FFFFFF", width: '80%', marginLeft: '10%' }} />

            {/* {roles !== null && ( */}
            <List>
              {/*{roles.some(x => x === "Admin") && (*/}
              <ListItem component={Link} to="/Administration" style={{ textDecoration: 'none', color: "#FFFFFF" }}>
                <ListItemBtn
                  selected={selected === 0}
                  onClick={() => setSelected(0)}

                // sx={{
                //   "&.Mui-selected": {
                //     backgroundColor: "#50555B",
                //     borderColor: "#696D74",
                //     boxShadow: 3,
                //     borderRadius: 3,
                //   },
                //   "&.Mui-focusVisible": {
                //     backgroundColor: "#50555B",
                //     borderColor: "#696D74",
                //     boxShadow: 3,
                //     borderRadius: 3,
                //   },
                //   ":hover": {
                //     backgroundColor: "#686C74",
                //     borderColor: "#696D74",
                //     boxShadow: 3,
                //     borderRadius: 3,
                //   },
                // }}
                >
                  <ListItemIcon style={{ color: "#FFFFFF" }}><AdminPanelSettingsIcon /></ListItemIcon>
                  <ListItemText primary="Administration" style={{ color: "#FFFFFF" }} />
                </ListItemBtn>
              </ListItem>
              {/* )} */}
              {/*{roles.some(x => x === "Admin") && (*/}
              <ListItem component={Link} to="/People" style={{ textDecoration: 'none', color: "#FFFFFF" }}>
                <ListItemButton
                  selected={selected === 1}
                  onClick={() => setSelected(1)}
                  sx={{
                    "&.Mui-selected": {
                      backgroundColor: "#50555B",
                      borderColor: "#696D74",
                      boxShadow: 3,
                      borderRadius: 3,
                    },
                    "&.Mui-focusVisible": {
                      backgroundColor: "#50555B",
                      borderColor: "#696D74",
                      boxShadow: 3,
                      borderRadius: 3,
                    },
                    ":hover": {
                      backgroundColor: "#686C74",
                      borderColor: "#696D74",
                      boxShadow: 3,
                      borderRadius: 3,
                    },
                  }}>
                  <ListItemIcon style={{ color: "#FFFFFF" }}><ContactsIcon /></ListItemIcon>
                  <ListItemText primary="People" style={{ color: "#FFFFFF" }} />
                </ListItemButton>
              </ListItem>
              {/* )} */}
              {/* {roles.some(x => x === "Adjuster") && ( */}

              <ListItem component={Link} to="/ImportFile" style={{ textDecoration: 'none', color: '#000000DE' }}>
                <ListItemButton
                  selected={selected === 2}
                  onClick={() => setSelected(2)}
                  sx={{
                    "&.Mui-selected": {
                      backgroundColor: "#50555B",
                      borderColor: "#696D74",
                      boxShadow: 3,
                      borderRadius: 3,
                      color: 'black'
                    },
                    "&.Mui-focusVisible": {
                      backgroundColor: "#50555B",
                      borderColor: "#696D74",
                      boxShadow: 3,
                      borderRadius: 3,
                    },
                    ":hover": {
                      backgroundColor: "#686C74",
                      borderColor: "#696D74",
                      boxShadow: 3,
                      borderRadius: 3,
                    },
                  }}>
                  <ListItemIcon style={{ color: "#FFFFFF" }}><UploadIcon /></ListItemIcon>
                  <ListItemText primary="Import File" style={{ color: "#FFFFFF" }} />
                </ListItemButton>
              </ListItem>
              {/* )} */}
              {/*{roles.some(x => x === "Admin") && (*/}
              <ListItem component={Link} to="/NCR" style={{ textDecoration: 'none', color: '#000000DE' }}>
                <ListItemButton
                  selected={selected === 3}
                  onClick={() => setSelected(3)}
                  sx={{
                    "&.Mui-selected": {
                      backgroundColor: "#50555B",
                      borderColor: "#696D74",
                      boxShadow: 3,
                      borderRadius: 3,
                    },
                    "&.Mui-focusVisible": {
                      backgroundColor: "#50555B",
                      borderColor: "#696D74",
                      boxShadow: 3,
                      borderRadius: 3,
                    },
                    ":hover": {
                      backgroundColor: "#686C74",
                      borderColor: "#696D74",
                      boxShadow: 3,
                      borderRadius: 3,
                    },
                  }}>
                  <ListItemIcon style={{ color: "#FFFFFF" }}><AddBoxIcon /></ListItemIcon>
                  <ListItemText primary="NCR" style={{ color: "#FFFFFF" }} />
                </ListItemButton>
              </ListItem>
              {/* )} */}

            </List>
            {/* )} */}
          </Drawer>
          {isMobile ? (
            <ContentArea open={drawerOpen}>
              {props.children}
            </ContentArea>
          ) : (

            <ContentArea open={drawerOpen}>
              {props.children}
            </ContentArea>
          )}
        </Root>
      </Box>

    </div >
      <div>
        <Footer />
      </div>
    </>
  )
};