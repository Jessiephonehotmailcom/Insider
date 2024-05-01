import React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
//import AccountIcon from '@mui/material/AccountCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem'
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import ListItemIcon from '@mui/material/ListItemIcon';
//import Logout from '@mui/material/Logout';
import LogoutIcon from '@mui/icons-material/Logout';
import Fade from '@mui/material/Fade';
import SearchBar from '../Header/SearchBar';
import MenuIcon from '@mui/icons-material/Menu';

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
    padding: theme.spacing(0, 1),
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
    padding: theme.spacing(0, 1),
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

export function Header({ isAuthenticated }) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (ev) => {
    setAnchorEl(null);
    localStorage.setItem('pilotId', null);
    const pilotId = localStorage.getItem('pilotId');
    console.log('LOGOUT PAGE ::::: PilotId :::::::::::: ' + pilotId);
    if (ev.target.innerText === 'Logout') {

      window.location.replace('https://login.windows.net/fc16c45f-83c5-424c-bfcc-5ccaa08a8fcb/oauth2/logout');


    }
  };
  return (
    <>
      <Root className={classes.root}>
        <AppBar
          position="fixed"
          className={classes.appBar}
          style={{
            backgroundImage: `url("/HeaderRibbon.png"), url("/HeaderBackground.png")`,
            backgroundPosition: "right bottom, right top",
            backgroundSize: "cover, cover",
            backgroundRepeat: "no-repeat",
            height: "80px, 1000px",
            width: "100%",
            maxHeight: "190%",
            maxWidth: "100%",
            padding: "10px",
            objectfit: "cover, cover"
          }}
        >

          <Toolbar className={classes.toolbarLeft}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            //  onClick={toggleDrawer(true)}
            // onClick={handleClick}
            >
              <MenuIcon ></MenuIcon>
            </IconButton>

            <SearchBar></SearchBar>
            <IconButton
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
            </IconButton>

          </Toolbar>

          <Toolbar className={classes.toolbarRight}>
            <img style={{
              display: "block",
              maxWidth: 215,
              maxHeight: 60,
              width: "auto",
              height: "auto"
            }} src="/pilot_logo_white.png"
              alt=""></img>
            <Typography
              variant="h6"
              className={classes.appBarTitle}
            >
              Pilot Insider
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
      </Root>
    </>
  )
};

