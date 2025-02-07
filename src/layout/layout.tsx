import { useState } from "react";
import { Container, useMediaQuery } from "@mui/material";

import Header from "./TopBar";

import "./global.css";
import MiniDrawer from "./Navigation";
import navConfig from "./navConfig";

// home page tabs
import { Outlet } from "react-router-dom";

import { CssBaseline, ThemeProvider } from "@mui/material";
//theme
import { ColorModeContext, useMode } from "./Theme/themes";

export default function DashboardLayout() {
  const [theme, colorMode] = useMode();
  const isNonMobile = useMediaQuery("(min-width: 766px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [, setShowOutlet] = useState<boolean>(false);
  const APP_BAR = "64px";
  const handleSideBarState = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header
            APP_BAR={APP_BAR}
            setIsSidebarOpen={handleSideBarState}
          />
          <MiniDrawer
            APP_BAR={APP_BAR}
            setShowOutlet={setShowOutlet}
            isNonMobile={isNonMobile}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={handleSideBarState}
            navConfig={navConfig}
          />
          <Container
            component="main"
            sx={{
              flexGrow: 1,
              mt: 10,
              mr: "auto",
            }}
          >
            <Container><Outlet /></Container>
          </Container>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}
