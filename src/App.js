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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/home";
import PageNotFound from "./components/UI/layout/pageNotFound";
import { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path={paths.SIGNUP} element={<Signup />} />
            <Route
              path={paths.LOGIN}
              index
              element={<Login setIsLogin={setIsLogin} />}
            />
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
      </Provider>

      <ToastContainer
        style={{ fontSize: "0.8rem" }}
        position="bottom-right"
        theme="colored"
      />
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
