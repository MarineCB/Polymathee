import React from "react";
import { withRouter } from "react-router-dom";
import { useEffect } from "react";
import { Button, Card, Grid, List, CircularProgress } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PublicationTile from "../../components/publication/PublicationTile";
import axios from "axios";
var PUBLICATION_URL = "http://localhost:8080/api/publications";
const USER_ID = 2; // TODO : remove for prod
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
  const [pubs, setPubs] = React.useState([]);
  const [loaded, setLoaded] = React.useState(false);
  useEffect(() => {
    axios.get("http://localhost:8080/api/publications").then((res) => {
      setPubs(res.data.filter((pub) => pub.userId.id === USER_ID));
      setLoaded(true)
    });
  }, []);

  const classes = useStyles();
  return (
    <div className="App">
      <div >
        <Grid  direction="column" container>
          {" "}
          <Card raised>
            <Typography variant="h5" style={{ marginTop: 20 }}>
              Publications
            </Typography>
            <List>
            {!loaded? <CircularProgress color="primary" size={100} /> : <div></div>}
              {pubs.map((publication) => (
                <PublicationTile data={publication} />
              ))}
            </List>
          </Card>
          <Card raised style={{ marginTop: "30px" }}>
            <Typography variant="h5" style={{ marginTop: 20 }}>
              Favoris
            </Typography>
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
