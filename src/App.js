import "./App.css";
import Login from "./pages/login";
import { Signup } from "./pages/signup";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";
import * as paths from "./config/route-path";
import { lazy } from "react";
import Home from "./pages/home";

const HomePage = lazy(() => import("./pages/home"));
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path={paths.SIGNUP} element={<Signup />} />
          <Route path={paths.LOGIN} index element={<Login />} />
          <Route path={"/home"} index element={<Home />} />

          {/* <PrivateRoute path={'./home'}>
            <HomePage />
          </PrivateRoute> */}
        </Routes>
      </Router>
    </>
  );
}

//Auth Routers
// const PrivateRoute = ({ children, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={({ location }) =>
//         isAuthenticated ? (
//           children
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/login",
//               state: { from: location },
//             }}
//           />
//         )
//       }
//     />
//   );
// };

export default App;
