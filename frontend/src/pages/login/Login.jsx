import { withRouter } from "react-router-dom";
import {
  Button,
  Card,
  FormControl,
  Grid,
  TextField,
  CardContent,
  CardHeader,
} from "@material-ui/core";
import "./Login.css";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {useState, useContext} from "react";
import axios from 'axios';
import {UserContext} from "../../store/UserContext";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80%",
  },
}));

function Login({role}) {
  const classes = useStyles();
  const history = useHistory();
  const{setIsConnected, setName, setEmail, setUserId, setRole, setAuthToken} = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function getUserInfo() {
      const res = await axios.post('/api/login', {
        "moderator_password": `${password}`,
        "moderator_username": `${username}`,
        });
      const data = res.data;
      if(data) {
        setIsConnected(true);
        setEmail(data.email);
        setUserId(data.id);
        setName(data.name);
        setRole(data.role);
        setAuthToken('');
      }
      if(data.role === 'Administrator') history.push('/adminPage');
      else history.push('/moderatorPage');
  }

  const handleSignIn = () => {
    getUserInfo();
  }

  async function createModerator() {
    await axios.post('/api/moderator', {
        "moderator_password": `${password}`,
        "moderator_username": `${username}`,
    });
    history.push('/adminPage');
  }

  const handleSignUp = () => {
      createModerator();
  }

  if(role === 'Administrator') {
    return (
      <Card
      color="primary"
        raised
        style={{ borderRadius: 30 }}
        >
           <CardHeader
          style={{ marginBottom: 0 }}
          color="inherit"
          title="Créer Modérateur"
        />
        <CardContent>
          <FormControl style={{ minWidth: 400, margin: 15 }}>
            <TextField
              style={{ padding: 10 }}
              placeholder="Identifiant"
              onChange={e => setUsername(e.target.value)}
            ></TextField>
            <TextField
              style={{ padding: 10 }}
              placeholder="Mot de passe"
              type="password"
              onChange={e => setPassword(e.target.value)}
            ></TextField>
            <Grid
              style={{ marginTop: 15 }}
              container
              justify="space-between"
              alignItems="flex-end"
            >
              <Button variant="contained" color="secondary" onClick={handleSignUp}>
                OK
              </Button>
            </Grid>
          </FormControl>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="App">
    <div className={classes.root}>
      <Card
        color="primary"
        raised
        style={{ borderRadius: 30 }}
      >
        <CardHeader
          style={{ marginBottom: 0 }}
          color="inherit"
          title="Connexion"
        />
        <CardContent>
          <FormControl style={{ minWidth: 400, margin: 15 }}>
            <TextField
              style={{ padding: 10 }}
              placeholder="Identifiant"
              onChange={e => setUsername(e.target.value)}
            ></TextField>
            <TextField
              style={{ padding: 10 }}
              placeholder="Mot de passe"
              type="password"
              onChange={e => setPassword(e.target.value)}
            ></TextField>
            <Grid
              style={{ marginTop: 15 }}
              container
              justify="space-between"
              alignItems="flex-end"
            >
              <Button variant="contained" color="secondary" onClick={handleSignIn}>
                OK
              </Button>
            </Grid>
          </FormControl>
        </CardContent>
      </Card>
    </div>
    </div>
  );
}

export default withRouter(Login);
