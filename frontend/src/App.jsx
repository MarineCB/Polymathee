import './App.css';
import { Switch, Route } from "react-router-dom";
import Homepage from './pages/homepage/Homepage';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup'
import CreatePublication from './pages/createPublication/CreatePublication'
import AppBar from './components/header/NavBar';
import ViewPublication from './pages/viewPublication/ViewPublication';
import MyPublication from './pages/myPublications/MyPublications'
import { ThemeProvider } from '@material-ui/styles';
import { Box, createMuiTheme, CssBaseline } from '@material-ui/core';

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
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '*': {
          'scrollbar-width': 'thin',
        },
        '*::-webkit-scrollbar': {
          width: '5px',
          height: '5px',
        },
'*::-webkit-scrollbar-thumb': {
  background: "#888"
},

'*::-webkit-scrollbar-thumb:hover': {
  background: "#555"
}
      }
    }
  }
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Box height="100%">
        <AppBar/>
        <Switch>
          <Route exact path='/'component={Homepage}/>
          <Route exact path='/login'component={Login}/>
          <Route exact path='/signup'component={Signup}/>
          <Route exact path='/createPublication'component={CreatePublication}/>
          <Route exact path='/viewPublication'component={ViewPublication}/>
          <Route exact path='/myPublications'component={MyPublication}/>
        </Switch>
      </Box>
    </ThemeProvider>
  );
}
