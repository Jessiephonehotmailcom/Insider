// import React from "react";
import { withRouter,useLocation } from "react-router-dom";
import { StoreProvider } from "easy-peasy";
import store from "./store";
import { HelmetProvider } from "react-helmet-async";
import ErrorCatch from "./ErrorCatch";
import Layout from "./components/Layout/Layout";
import Routes from "./helpers/Routes";
import ToolbarComponent from "./components/Toolbar/Toolbar";
import DrawerComponent from "./components/Drawer/Drawer";
function App() {
  const location = useLocation();
  
  // Determine if the current route should have a layout
  const noLayoutRoutes = ['/PilotImageERPPage']; // Add more paths here if needed
  const showLayout = !noLayoutRoutes.includes(location.pathname);

  return (
    <ErrorCatch>
    <StoreProvider store={store}>
      
      {showLayout ? (
        
           <HelmetProvider>
            <Routes />
          </HelmetProvider> 
        
      ) : (
        <HelmetProvider>
          <Routes />
        </HelmetProvider>
      )}
      {/* <div className="App">
        <ToolbarComponent ></ToolbarComponent>
              </div> */}
    </StoreProvider>
  </ErrorCatch>
  );
}

export default withRouter(App);