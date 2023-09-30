import { Box } from "@mui/material";
import Header from "./header";
import ErrorBoundary from "./ErrorBoundary";

function Layout({ children }) {
  return (
    <Box
      component="section"
      sx={{ display: "flex", width: "100vw", height: "100vh" }}
    >
      {/* <Sidebar /> */}
      <Box component="section" sx={{ width: "100%" }}>
        <Header />
        <ErrorBoundary>
          <Box component="section" id="page-layout-container">
            {children}
          </Box>
        </ErrorBoundary>
      </Box>
    </Box>
  );
}

export default Layout;
