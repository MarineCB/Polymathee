import React, {useContext} from "react";
import { useHistory, withRouter } from "react-router-dom";
import { useEffect } from "react";
import {
  Card,
  Grid,
  List,
  CircularProgress,
  Box,
  Paper,
  Tabs,
  Tab,
  Button,
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  IconButton,
} from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PublicationTile from "../../components/publication/PublicationTile";
import axios from "axios";
import PublicationTileFav from "../../components/publication/PublicationTileFav";
import { Info, Publish, Search } from "@material-ui/icons";
import {UserContext} from '../../store/UserContext';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginTop: "30px",
    marginBottom: "30px",
    padding: 50,
    fontSize: "200%",
    "&:hover": {
      transition: "transform .2s", /* Animation */
      color: theme.palette.primary.main,
      transform: "scale(1.5)"
    },
  },
}));
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

function CreatePublicationBox({ pubs }) {
  const classes = useStyles();
  const history = useHistory();
  const empty = pubs === undefined || pubs.length === 0;
  return (
    <Box p={2} style={{ paddingBottom: "40px" }}>
      <Typography variant="h6">
        {empty
          ? "Publiez votre première publication"
          : "Publiez une nouvelle publication"}
      </Typography>
      <IconButton
        onClick={() => history.push("/createPublication")}
        className={classes.icon}
        variant="outlined"
        color="secondary"
      >
        <Publish fontSize="large" />
      </IconButton>
      <Typography>
        {" "}
        {empty
          ? "En seulement quelques clics"
          : `Déjà ${pubs.length} publications créees`}
      </Typography>
    </Box>
  );
}

function AddFavoriteBox({ pubsFav }) {
  const history = useHistory();
  const classes = useStyles();
  const empty = pubsFav === undefined || pubsFav.length === 0;
  return (
    <Box p={2} style={{ paddingBottom: "40px" }}>
      <Typography variant="h6">
        {empty ? "Aucun favori pour le moment" : "Ajouter des favoris"}
      </Typography>
      <IconButton
        onClick={() => history.push("/")}
        className={classes.icon}
        variant="outlined"
        color="secondary"
      >
        <Search fontSize="large" />
      </IconButton>
      <Typography> Parcourir les publications</Typography>
    </Box>
  );
}

function NoPublicationsMsg() {
  return (
    <Box p={6}>
      <Grid container justify="center" direction="row">
        <Grid>
          <Info />
        </Grid>
        <Grid>
          <Typography style={{ paddingLeft: "20px" }}>
            Aucune publication n'a ce statut
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

function MyPublications() {
  const {userId} = useContext(UserContext);
  const classes = useStyles();
  const [pubs, setPubs] = React.useState([]);
  const [pubsFav, setPubsFav] = React.useState([]);
  const [loaded, setLoaded] = React.useState(false); // Loading animation for the user's publications
  const [loadedFav, setLoadedFav] = React.useState(false); // Loading animation for favorites
  const [snackbarMsg, setSnackbarMsg] = React.useState("");
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  const [transition, setTransition] = React.useState();
  const [delPubDialogVisible, setDelPubDialogVisible] = React.useState(false);
  const [delPubDialogMsg, setDelPubDialogMsg] = React.useState("");
  const [curFilter, setCurFilter] = React.useState(); // Nothing means no filter
  const [confirmDeleteHandler, setConfirmDeleteHandler] = React.useState(
    () => () => {
      console.error(
        "The handler for the publication delete button was not set"
      );
    }
  );
  let displayPubs = getFilteredPubs();
  const [tabValue, setTabValue] = React.useState(0);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  function setTab(tabIndex, status) {
    setTabValue(tabIndex);
    setCurFilter(status);
  }

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

  useEffect(() => {
    // Load all publications
    loadSubmittedPublications(setPubs, setLoaded, userId);
    loadFavoritedPublications(setPubsFav, setLoadedFav, userId);
  }, [userId]);

  function getFilteredPubs() {
    return curFilter !== undefined
      ? pubs.filter((p) => p.status.toLowerCase() === curFilter)
      : pubs;
  }
  return (
    <div className="App">
      <div>
        <Grid direction="column" container>
          {" "}
          <Card raised>
            <Typography variant="h4" style={{ marginTop: 20 }}>
              Publications
            </Typography>
            {(() => {
              if (!loaded) {
                return <CircularProgress style={{margin:"30px"}} color="primary" size={70} />;
              } else {
                return <CreatePublicationBox pubs={pubs} />;
              }
            })()}

            <Paper className={classes.root}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                indicatorColor="secondary"
                textColor="secondary"
                centered
              >
                <Tab label="Tout" onClick={() => setTab(0)} />
                <Tab label="Publié" onClick={() => setTab(1, "published")} />
                <Tab label="Brouillon" onClick={() => setTab(2, "saved")} />
                <Tab label="En attente" onClick={() => setTab(3, "to_treat")} />
                <Tab label="Rejeté" onClick={() => setTab(4, "rejected")} />
              </Tabs>
            </Paper>
            <List>
              {displayPubs.length > 0 ? (
                displayPubs.map((publication) => (
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
                      loadSubmittedPublications(
                        setPubs,
                        setLoaded,
                        userId
                      );
                    }}
                    userId={userId}
                  />
                ))
              ) : (
                <NoPublicationsMsg />
              )}
            </List>
          </Card>
          <Card raised style={{ marginTop: "5 0px" }}>
            <Typography variant="h4" style={{ marginTop: 20 }}>
              Favoris
            </Typography>
            <List>
              {(() => {
                if (!loadedFav) {
                  return <CircularProgress style={{margin:"30px"}} color="primary" size={70} />;
                } else {
                  return <AddFavoriteBox pubsFav={pubsFav} />;
                }
              })()}

              {pubsFav.map((publication) => (
                <PublicationTileFav
                  key={publication.id}
                  publication={publication}
                  loadFavoritedPublications={()=>loadFavoritedPublications(setPubsFav,setLoadedFav,userId)}
                  setDelPubDialogMsg={setDelPubDialogMsg}
                  setSnackbarMsg={setSnackbarMsg}
                  userId={userId}
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
