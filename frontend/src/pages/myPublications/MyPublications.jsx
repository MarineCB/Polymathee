import React from "react";
import { withRouter } from "react-router-dom";

import { Button, Card, Grid, Box, List } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80%",
  },
  parallelogram: {
    background: "orange",
    // Distord shape
    transform: "skewX(-20deg)",
    minHeight: "20px",
    minWidth: "20px",
    marginRight: 5,
  },
  publicationCard: {
    padding: 10,
    margin: 20,
    border: "1px solid #E5E5E5",
  },
}));

function MyPublications() {
  const classes = useStyles();
  return (
    <div className="App">
      <div className={classes.root}>
        <Grid
          direction="column"
          container
        >
          {" "}
          <Card raised >
            <Typography variant="h5" style={{ marginTop: 20 }}>
              Publications
            </Typography>
            <List>
              <Card className={classes.publicationCard}>
                <Grid container alignItems="center" item>
                  <Grid item xs={3}>
                    <Typography variant="h6">Efrei Formal Modelling</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>Sauvegarder un brouillon</Typography>
                  </Grid>
                  <Grid
                    container
                    justify="flex-end"
                    alignItems="center"
                    item
                    xs={5}
                  >
                    <Box
                      variant="contained"
                      className={classes.parallelogram}
                    />
                    <Box
                      variant="contained"
                      className={classes.parallelogram}
                    />
                    <Box
                      variant="contained"
                      className={classes.parallelogram}
                    />
                  </Grid>
                </Grid>
              </Card>
              <Card className={classes.publicationCard}>
                <Grid container alignItems="center" item>
                  <Grid item xs={3}>
                    <Typography variant="h6">DevOps</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>Sauvegarder un brouillon</Typography>
                  </Grid>
                  <Grid
                    container
                    justify="flex-end"
                    alignItems="center"
                    item
                    xs={5}
                  >
                    <Box
                      variant="contained"
                      className={classes.parallelogram}
                    />
                    <Box
                      variant="contained"
                      className={classes.parallelogram}
                    />
                    <Box
                      variant="contained"
                      className={classes.parallelogram}
                    />
                  </Grid>
                </Grid>
              </Card>
            </List>
          </Card>
          <Card raised style={{ marginTop: "30px" }}>
            <Typography variant="h5" style={{ marginTop: 20 }}>Favoris</Typography>
            <List>
              <Card className={classes.publicationCard}>
                <Grid alignItems="center" container item>
                  <Grid item xs={3}>
                    <Typography variant="h6">Efrei Formal Modelling</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography>20/12/2020</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Button variant="contained" color="secondary">
                      Remove
                    </Button>
                  </Grid>
                </Grid>
              </Card>
              <Card className={classes.publicationCard}>
                <Grid alignItems="center" container item>
                  <Grid item xs={3}>
                    <Typography variant="h6">Canaux de Transmission</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography>20/12/2020</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Button variant="contained" color="secondary">
                      Remove
                    </Button>
                  </Grid>
                </Grid>
              </Card>
            </List>
          </Card>
        </Grid>
      </div>
    </div>
  );
}

export default withRouter(MyPublications);
