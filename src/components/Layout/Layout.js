/** @format */

import { Box, useMediaQuery } from "@mui/material";
import { useState } from "react";
import Drawer from "../Drawer/Drawer";
import Header from "../Header/Header";

export default function Layout({ children }) {
  const [open, setOpen] = useState(true);
  const isMobile = useMediaQuery("(max-width:768px)");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Header
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
      />

      <Drawer open={open} handleDrawerClose={handleDrawerClose} />

      <Box
        component="main"
        sx={{
          marginTop: isMobile ? "100px" : "160px",
          display: "flex",
          width: "100%",
          marginLeft: isMobile ? "0" : "8px",
          padding: isMobile ? "8px" : "0",
          overflowX: "hidden",
          paddingBottom: "16px",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
