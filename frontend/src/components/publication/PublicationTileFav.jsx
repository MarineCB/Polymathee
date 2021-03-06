import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Card, Typography, Grid, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { ZoomIn } from "@material-ui/icons";
import axios from "axios";
const MOCK_USER_ID = 2; // TODO : remove for prod

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80%",
  },
  publicationCard: {
    padding: 10,
    margin: 20,
    border: "1px solid #E5E5E5",
  },
}));

function removeFavAndSync(userId, publicationId, loadFavoritedPublications) {
  axios
    .delete("api/favoris/" + userId + "/" + publicationId)
    .then((res) => {
      loadFavoritedPublications(userId)
    })
    .catch((e) => {
      console.error(e)
    });
}

function PublicationTileFav({ publication, onClick, loadFavoritedPublications }) {
  publication = publication.publicationId;
  const classes = useStyles();
  const history = useHistory();
  return (
    <Card className={classes.publicationCard} onClick={onClick}>
      <Grid alignItems="center" container item>
        <Grid item xs={3}>
          <Typography variant="h6">{publication.title}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography>
            {new Date(publication.date).toLocaleDateString()}
          </Typography>
        </Grid>
        <Grid item xs={4} container alignItems="flex-end" justify="flex-end">
          <Grid item>
            <Button onClick={()=>{
              removeFavAndSync(MOCK_USER_ID,publication.id,loadFavoritedPublications)
            }} variant="contained" color="secondary">
              Retirer
            </Button>
          </Grid>
          <Grid item>
            <Button
              startIcon={<ZoomIn />}
              onClick={() => {
                history.push({
                  pathname: "/viewPublication",
                  publicationId: publication.id,
                });
              }}
            >
              Visionner
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

export default PublicationTileFav;
