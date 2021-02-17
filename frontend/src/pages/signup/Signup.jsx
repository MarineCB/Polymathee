import React from "react";
import { useHistory } from "react-router-dom";

import { Button, Card, FormControl, Grid, TextField } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { withRouter } from "react-router-dom";
const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80%",
  },
  textfield: {
    padding: 10,
  },
  link: {
    fontSize: 17,
  },
  button: {
    borderRadius: 50,
    width: "50px",
    color: "white",
    backgroundColor: "#252C41",
  },
  card: {
    borderRadius: 30,
  },
}));

function Signup() {
  const classes = useStyles();
  const history = useHistory();

  function GoToLogin() {
    history.push("/login");
  }

  return (
    <div className="App">
      <div className={classes.root}>
        <Card raised className={classes.card}>
          <FormControl style={{ margin: 20 }}>
            <Grid container>
              <Typography style={{ marginLeft: 10 }}>Inscription </Typography>
            </Grid>
            <Grid>
              <TextField className={classes.textfield} placeholder="Nom">
                Nom
              </TextField>
              <TextField
                className={classes.textfield}
                placeholder="Prenom"
              ></TextField>
            </Grid>
            <TextField
              className={classes.textfield}
              placeholder="Identifiant"
            ></TextField>
            <TextField
              className={classes.textfield}
              placeholder="Mot de passe"
            ></TextField>
            <TextField
              className={classes.textfield}
              placeholder="Addresse mail"
            ></TextField>
            <TextField
              className={classes.textfield}
              placeholder="Confirmer addresse mail"
            ></TextField>
            <Link onClick={GoToLogin} className={classes.link}>
              Se connecter
            </Link>
            <Grid container justify="flex-end">
              <Button className={classes.button}>OK</Button>
            </Grid>
          </FormControl>
        </Card>
      </div>
    </div>
  );
}

export default withRouter(Signup);
