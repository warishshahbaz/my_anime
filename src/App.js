import "./App.css";
import Login from "./pages/login";
import { Signup } from "./pages/signup";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import * as paths from "./config/route-path";

import Home from "./pages/home";
import PageNotFound from "./components/UI/layout/pageNotFound";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path={paths.SIGNUP} element={<Signup />} />
          <Route path={paths.LOGIN} index element={<Login />} />
          <Route
            path={"/home"}
            index
            element={
              <PrivateRoute isSignedIn={true}>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

//Auth Routers
function PrivateRoute({ isSignedIn, children }) {
  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default App;
