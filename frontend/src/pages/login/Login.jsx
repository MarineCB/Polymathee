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
import Link from "@material-ui/core/Link";
import "./Login.css";
import { useHistory } from "react-router-dom";

function Login() {
  const history = useHistory();

  function GoToSignup(e) {
    history.push("/signup");
  }

  return (
    <div className="center">
      <Card
        color="primary"
        alignItems="center"
        raised
        style={{ borderRadius: 30 }}
      >
        <CardHeader
          style={{ marginBottom: 0 }}
          variant="contained"
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
              <Link variant="contained" color="primary">
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
  );
}

export default withRouter(Login);
