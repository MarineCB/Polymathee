import React from "react";
import { useHistory, withRouter } from "react-router-dom";
import { useEffect } from "react";
import {
  Card,
  Grid,
  List,
  CircularProgress,
  Box,
  Button,
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
} from "@material-ui/core";
import { Typography } from "@material-ui/core";
import PublicationTile from "../../components/publication/PublicationTile";
import axios from "axios";
import PublicationTileFav from "../../components/publication/PublicationTileFav";
const MOCK_USER_ID = 2; // TODO : remove for prod

// Load created publications
function loadSubmittedPublications(setPubs, setLoaded, userId) {
  axios.get("api/publications/user/" + userId).then((res) => {
    setPubs(res.data);
    setLoaded(true);
  });
}

// Load publications that the current user added to favorites
function loadFavoritedPublications(setPubsFav, setLoadedFav, userId) {
  axios.get("api/favoris/" + userId).then((res) => {
    setPubsFav(res.data);
    setLoadedFav(true);
  });
}

/* Make snackbar if available */
function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

function MyPublications() {
  const [pubs, setPubs] = React.useState([]);
  const [pubsFav, setPubsFav] = React.useState([]);
  const [loaded, setLoaded] = React.useState(false); // Loading animation for the user's publications
  const [loadedFav, setLoadedFav] = React.useState(false); // Loading animation for favorites
  const [snackbarMsg, setSnackbarMsg] = React.useState("");
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  const [transition, setTransition] = React.useState();
  const [delPubDialogVisible, setDelPubDialogVisible] = React.useState(false);
  const [delPubDialogMsg, setDelPubDialogMsg] = React.useState("");
  const [confirmDeleteHandler, setConfirmDeleteHandler] = React.useState(
    () => () => {
      console.error(
        "The handler for the publication delete button was not set"
      );
    }
  );
  const showSnackbar = (Transition) => () => {
    setTransition(() => Transition);
    setSnackbarVisible(true);
  };

  const hideSnackbar = (Transition) => () => {
    setTransition(() => Transition);
    setSnackbarVisible(false);
  };

  const handleClose = () => {
    setSnackbarVisible(false);
    setDelPubDialogVisible(false);
  };

  const history = useHistory();
  useEffect(() => {
    // Load all publications
    loadSubmittedPublications(setPubs, setLoaded, MOCK_USER_ID);
    loadFavoritedPublications(setPubsFav, setLoadedFav, MOCK_USER_ID);
  }, []);

  return (
    <div className="App">
      <div>
        <Grid direction="column" container>
          {" "}
          <Card raised>
            <Typography variant="h5" style={{ marginTop: 20 }}>
              Publications
            </Typography>
            <List>
              {!loaded ? (
                <CircularProgress color="primary" size={100} />
              ) : (
                <div></div>
              )}
              {pubs.map((publication) => (
                <PublicationTile
                  key={publication.id}
                  publication={publication}
                  setSnackbarMsg={setSnackbarMsg}
                  showSnackbar={showSnackbar(TransitionUp)}
                  hideSnackbar={hideSnackbar(TransitionUp)}
                  delPubDialogMsg={delPubDialogMsg}
                  setDelPubDialogMsg={setDelPubDialogMsg}
                  setDelPubDialogVisible={setDelPubDialogVisible}
                  setConfirmDeleteHandler={setConfirmDeleteHandler} // We need to be able to override the handler for deleting a publication with the correct id, so that each publication uses its own delete function
                  reloadPublications={() => {
                    loadSubmittedPublications(setPubs, setLoaded, MOCK_USER_ID);
                  }}
                />
              ))}
            </List>
          </Card>
          <Card raised style={{ marginTop: "30px" }}>
            <Typography variant="h5" style={{ marginTop: 20 }}>
              Favoris
            </Typography>
            <List>
              {!loadedFav ? (
                <CircularProgress color="primary" size={100} />
              ) : (
                <Box p={2} style={{ paddingBottom: "40px" }}>
                  <Typography variant="h6">
                    Aucun publication ajoutée pour le moment
                  </Typography>
                  <Button
                    onClick={() => history.push("/")}
                    style={{ marginTop: "10px" }}
                    variant="outlined"
                    color="secondary"
                  >
                    Parcourir les publications
                  </Button>
                </Box>
              )}
              {pubsFav.map((publication) => (
                <PublicationTileFav
                  key={publication.id}
                  publication={publication}
                  loadFavoritedPublications={loadFavoritedPublications}
                  setDelPubDialogMsg={setDelPubDialogMsg}
                  setSnackbarMsg={setSnackbarMsg}
                />
              ))}
            </List>
          </Card>
          {/** Confirm if we want to delete a publication */}
          <Dialog
            open={delPubDialogVisible}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle>{"Information"}</DialogTitle>
            <DialogContent>
              {/*We use whiteSpace: 'pre-line' to enable line breaks*/}
              <DialogContentText style={{ whiteSpace: "pre-line" }}>
                {delPubDialogMsg}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => confirmDeleteHandler()}>Supprimer</Button>
              <Button onClick={handleClose} color="primary">
                Annuler
              </Button>
            </DialogActions>
          </Dialog>
          <Snackbar
            open={snackbarVisible}
            onClose={handleClose}
            TransitionComponent={transition}
            message={snackbarMsg}
            key={transition ? transition.name : ""}
          />
        </Grid>
      </div>
    </div>
  );
}

export default withRouter(MyPublications);
