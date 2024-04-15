import * as React from 'react';
import { useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ContactsIcon from '@mui/icons-material/Contacts';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AddBoxIcon from '@mui/icons-material/AddBox';
import UploadIcon from '@mui/icons-material/Upload';
import SearchBar from '../Header/SearchBar';
function ToolbarComponent(props) {
    const [open, setOpen] = React.useState(false);
    const ContentArea = styled('div')(({ theme, open }) => ({
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        padding: theme.spacing(2),
        transition: theme.transitions.create('justify-content', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        })
    }));
    const HeaderArea = styled('div')(({ theme, open }) => ({
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        padding: theme.spacing(2),
        transition: theme.transitions.create('justify-content', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        })
    }));
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{
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
        }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                <ListItem component={Link} to="/Administration" style={{ textDecoration: 'none', color: '#000000DE' }}>
                    <ListItemIcon><AdminPanelSettingsIcon /></ListItemIcon>
                    <ListItemText primary="Administration" />
                </ListItem>
                <ListItem component={Link} to="/People" style={{ textDecoration: 'none', color: '#000000DE' }}>
                    <ListItemIcon><ContactsIcon /></ListItemIcon>
                    <ListItemText primary="People" />
                </ListItem>
                <ListItem component={Link} to="/ImportFile" style={{ textDecoration: 'none', color: '#000000DE' }}>
                    <ListItemIcon><UploadIcon /></ListItemIcon>
                    <ListItemText primary="Import File" />
                </ListItem>
                <ListItem component={Link} to="/NCR" style={{ textDecoration: 'none', color: '#000000DE' }}>
                    <ListItemIcon><AddBoxIcon /></ListItemIcon>
                    <ListItemText primary="NCR" />
                </ListItem>
            </List>
        </Box>
    );
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar
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
                // style={{ background : `url("/HeaderBackground.png") , url("/HeaderRibbon.png") no-repeat 10% 50%`,
                //  height: '80px', maxHeight: '100%', maxWidth: '100%', padding:'10px' }}
                // position="static"
                >

                    <Toolbar
                    >
                        {/* <div style=" background: `url(/HeaderBackground.png)`">Hello!</div> */}

                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={toggleDrawer(true)}
                        >
                            <MenuIcon ></MenuIcon>
                        </IconButton>
                        <Drawer open={open} onClose={() => toggleDrawer(false)}>
                            {DrawerList}
                        </Drawer>
                        <SearchBar />
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        </Typography>
                        <img style={{
                            display: "block",
                            maxWidth: 215,
                            maxHeight: 60,
                            width: "auto",
                            height: "auto"
                        }} src="/pilot_logo_white.png"
                            alt="">
                        </img>
                    </Toolbar>
                </AppBar>
            </Box>
            <ContentArea open={open}>
                {props.children}
            </ContentArea>
        </div>
    )
}

export default ToolbarComponent
