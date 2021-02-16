import './App.css';
import { Switch, Route } from "react-router-dom";
import Homepage from './pages/homepage/Homepage';
import Login from './pages/login/Login';
import AppBar from './components/header/NavBar';

import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, CssBaseline } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    light: {
      main: '#FFFAFA'
    },
    primary: {
      main: '#116466'
    },
    secondary: {
      main: '#252C41'
    },
    type: "light"
  },
  typography: {
    h3: {
      color: "#FFFAFA",
    },
  }
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <div className="App">
        <AppBar/>
        <Switch>
          <Route exact path='/'component={Homepage}/>
          <Route exact path='/login'component={Login}/>
        </Switch>
      </div>
    </ThemeProvider>
  );
}