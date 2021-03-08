import { withRouter } from "react-router-dom";
import {
  Button,
  Card,
  FormControl,
  Grid,
  TextField,
  CardContent,
  CardHeader,
  Link,
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

function Login() {
  const classes = useStyles();
  const history = useHistory();
  const{setIsConnected, setName, setEmail, setUserId, setRole} = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function GoToSignup(e) {
    history.push("/signup");
  }

  async function getUserInfo() {
      const res = await axios.post('/api/login', {
        "moderator_password": `${username}`,
        "moderator_username": `${password}`,
        });
      console.log("this is res", res);
  }

  const handleSignIn = () => {
    getUserInfo();
  }

    console.log("username", username);
    console.log("pwd", password)
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
              onChange={e => setPassword(e.target.value)}
            ></TextField>

            <Link onClick={GoToSignup}>S'inscrire</Link>
            <Grid
              style={{ marginTop: 15 }}
              container
              justify="space-between"
              alignItems="flex-end"
            >
              <Link color="primary">
                Mot de passe oublié ?{" "}
              </Link>
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
