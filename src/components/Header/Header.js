/** @format */

import { Button, AppBar as MuiAppBar, useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import Search from "./Search";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  height: "160px",
}));

const MobileAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer - 1,
  height: "100px",
}));

export default function Header({ open, handleDrawerOpen, handleDrawerClose }) {
  const isMobile = useMediaQuery("(max-width:768px)");
  const isDesktop = !isMobile;

  return (
    <>
      {isDesktop && (
        <AppBar
          position="fixed"
          open={open}
          sx={{
            backgroundImage: `url("/HeaderRibbon.png")`,
            backgroundSize: "cover",
            backgroundPosition: "right bottom",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flex: 1,
              alignItems: "center",
              justifyContent: "space-between",
              padding: "24px 72px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "12px",
                alignItems: "center",
              }}
            >
              <Button
                sx={{ width: "32px" }}
                onClick={open ? handleDrawerClose : handleDrawerOpen}
              >
                <img
                  src="/HamburgerBar.png"
                  alt="Hamburger Bar"
                  style={{
                    width: "70%",
                  }}
                />
              </Button>
              <Search />
            </Box>
            <Box>
              <img src="/pilot_logo_white.png" alt="Pilot Logo" />
            </Box>
          </Box>
        </AppBar>
      )}

      {isMobile && (
        <MobileAppBar
          position="fixed"
          open={open}
          sx={{
            backgroundImage: `url("/HeaderRibbon.png")`,
            backgroundSize: "cover",
            backgroundPosition: "right bottom",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flex: 1,
              alignItems: "center",
              justifyContent: "space-between",
              paddingLeft: "16px",
              paddingRight: "16px",
            }}
          >
            <Button
              sx={{ width: "32px" }}
              onClick={open ? handleDrawerClose : handleDrawerOpen}
            >
              <img
                src="/HamburgerBar.png"
                alt="Hamburger Bar"
                style={{
                  width: "70%",
                }}
              />
            </Button>
            <img src="/pilot_logo_white.png" alt="Pilot Logo" />
            <Box sx={{ width: "64px" }} />
          </Box>
        </MobileAppBar>
      )}
    </>
  );
}
