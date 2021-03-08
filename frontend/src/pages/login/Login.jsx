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

  function GoToSignup(e) {
    history.push("/signup");
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
            ></TextField>
            <TextField
              style={{ padding: 10 }}
              placeholder="Mot de passe"
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
              <Button variant="contained" color="secondary">
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
