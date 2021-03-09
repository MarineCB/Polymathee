import "./App.css";
import { Switch, Route } from "react-router-dom";
import ModeratorPage from './pages/moderatorPage/ModeratorPage';
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Landing from "./pages/landing/Landing";
import CreatePublication from "./pages/createPublication/CreatePublication";
import AppBar from "./components/header/NavBar";
import ViewPublication from "./pages/viewPublication/ViewPublication";
import MyPublication from "./pages/myPublications/MyPublications";
import { ThemeProvider } from "@material-ui/styles";
import { Box, createMuiTheme, CssBaseline } from "@material-ui/core";
import { PublicationProvider } from "./store/PublicationContext";
import RedirectToNotFound from "./RedirectToNotFound";
import NotFound from "./pages/notFound/NotFound";
import {UserWrapper} from './store/UserContext';
import AdminPage from './pages/adminPage/AdminPage';

export const theme = createMuiTheme({
  palette: {
    light: {
      main: "#FFFAFA",
    },
    primary: {
      main: "#116466",
    },
    secondary: {
      main: "#252C41",
    },
    type: "light",
  },
  typography: {
    h3: {
      color: "#FFFAFA",
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "*": {
          "scrollbar-width": "thin",
        },
        "*::-webkit-scrollbar": {
          width: "5px",
          height: "5px",
        },
        "*::-webkit-scrollbar-thumb": {
          background: "#888",
        },

        "*::-webkit-scrollbar-thumb:hover": {
          background: "#555",
        },
      },
    },
  },
});

export default function App() {
  const DefaultRoutes = () => {
    return (
      <Box height="100%">
        <AppBar />
        <PublicationProvider>
          <Switch>
            <Route exact path="/homepage" component={Homepage} />
            <Route exact path="/loginAdmin" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route
              exact
              path="/createPublication"
              component={CreatePublication}
            />
            <Route exact path="/viewPublication" component={ViewPublication} />
            <Route exact path="/myPublications" component={MyPublication} />
            <Route exact path="/moderatorPage" component={ModeratorPage}/>
            <Route exact path="/adminPage" component={AdminPage}/>
            <Route component={RedirectToNotFound} />
          </Switch>
        </PublicationProvider>
      </Box>
    );
  };

  return (
    <UserWrapper>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box height="100%">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route component={NotFound} path="/notfound" />
            <Route component={DefaultRoutes} />
          </Switch>
        </Box>
      </ThemeProvider>
    </UserWrapper>
  );
}
