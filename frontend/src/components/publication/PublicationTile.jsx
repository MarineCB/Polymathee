import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import {
  Box,
  Card,
  Typography,
  Grid,
  Button,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { ZoomIn, Edit, Delete } from "@material-ui/icons";
import axios from "axios";
export const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80%",
  },
  parallelogramDone: {
    background: "green",
    // Distord shape
    transform: "skewX(-20deg)",
    minHeight: "20px",
    minWidth: "20px",
    marginRight: 5,
  },
  parallelogramProcessing: {
    background: "orange",
    // Distord shape
    transform: "skewX(-20deg)",
    minHeight: "20px",
    minWidth: "20px",
    marginRight: 5,
  },
  parallelogramInvalid: {
    background: "red",
    // Distord shape
    transform: "skewX(-20deg)",
    minHeight: "20px",
    minWidth: "20px",
    marginRight: 5,
  },
  parallelogramEmpty: {
    background: "#E8E8E8",
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

function deletePublication(
  publicationId,
  setSnackbarMsg,
  showSnackbar,
  hideSnackbar,
  reloadPublications,
  setDelPubDialogVisible,
  userId
) {
  const DELETE_PUB_URL = "api/publication/" + publicationId + `/${userId}`;
  setSnackbarMsg("Suppression...");
  showSnackbar();
  axios
    .delete(DELETE_PUB_URL)
    .then((res) => {
      if (showSnackbar) {
        setSnackbarMsg("Publication supprimée");
        setTimeout(() => {
          hideSnackbar();
        }, 5000);
      }
      setDelPubDialogVisible(false);
      reloadPublications(); // Reload all publications, removing the publication
    })
    .catch((err) => {
      console.error(err);
      if (showSnackbar) {
        setSnackbarMsg("Echec de suppression de cette publication");
        setTimeout(() => {
          hideSnackbar();
        }, 3000);
      }
      setDelPubDialogVisible(false);
    });
}

function askDeletePublication(
  publication,
  setDelPubDialogVisible,
  setDelPubDialogMsg,
  setSnackbarMsg,
  showSnackbar,
  hideSnackbar,
  setConfirmDeleteHandler,
  reloadPublications, 
  userId
) {
  // Configure the handler for deletion
  setConfirmDeleteHandler(() => () => {
    deletePublication(
      publication.id,
      setSnackbarMsg,
      showSnackbar,
      hideSnackbar,
      reloadPublications,
      setDelPubDialogVisible,
      userId
    );
  });

  setDelPubDialogMsg(
    "Êtes-vous sûr de supprimer votre publication : " + publication.title
  );
  setDelPubDialogVisible(true);
}

/**
 * Returns the publication status
 * @param {String} status
 */
export function GetInfoForPublicationStatus(status) {
  const classes = useStyles();
  switch (status) {
    case "Saved":
      return {
        step: 0,
        msg: "Sauvegardé en tant que brouillon",
        class: classes.parallelogramEmpty,
      };
    case "To_Treat":
      return {
        step: 1,
        msg: "En attente de validation",
        class: classes.parallelogramProcessing,
      };
    case "Published":
      return {
        step: 3,
        msg: "Publié",
        class: classes.parallelogramDone,
      };
    case "Rejected":
      return {
        step: 2,
        msg: "Publication refusée",
        class: classes.parallelogramInvalid,
      };
    default:
      console.error(status);
      return {
        step: 0,
        msg: "Statut inconnu",
        class: classes.parallelogramProcessing,
      };
  }
}
function ProgressRects({ publicationInfo }) {
  const rects = [];
  const classes = useStyles();
  for (let i = 0; i < 3; i++) {
    if (i < publicationInfo.step) {
      rects.push(
        <Box
          key={i}
          variant="contained"
          className={classes.parallelogramDone}
        />
      );
    } else if (i > publicationInfo.step) {
      rects.push(
        <Box
          key={i}
          variant="contained"
          className={classes.parallelogramEmpty}
        />
      );
    } else {
      // Show current status color
      rects.push(
        <Box key={i} variant="contained" className={publicationInfo.class} />
      );
    }
  }
  return (
    <Grid container justify="flex-end" alignItems="center" item xs={5}>
      {rects}
    </Grid>
  );
}

function PublicationTile({
  publication,
  onClick,
  setSnackbarMsg,
  showSnackbar,
  hideSnackbar,
  setDelPubDialogVisible,
  delPubDialogMsg,
  setDelPubDialogMsg,
  setConfirmDeleteHandler,
  reloadPublications,
  userId
}) {
  const classes = useStyles();
  const history = useHistory();
  const infos = GetInfoForPublicationStatus(publication.status);

  return (
    <Card
      key={publication.id}
      onClick={onClick}
      className={classes.publicationCard}
    >
      <Grid container alignItems="center" item>
        <Grid item xs={3}>
          <Tooltip
            title={
              "Créee le " + new Date(publication.date).toLocaleDateString()
            }
          >
            <Typography variant="h6">{publication.title}</Typography>
          </Tooltip>
        </Grid>
        <Grid item xs={3}>
          <Typography>{infos.msg}</Typography>
        </Grid>
        <Grid item xs={6}>
          {publication.status === "Saved" ? (
            <Button
              startIcon={<Edit />}
              onClick={() => {
                history.push({
                  pathname: "/createPublication",
                  preset: publication,
                  editMode: true,
                });
              }}
            >
              Modifier
            </Button>
          ) : (
            <Button
              startIcon={<ZoomIn />}
              onClick={() => {
                history.push({
                  pathname: "/viewPublication",
                  search:
                    "?" +
                    new URLSearchParams({
                      publicationId: publication.id,
                    }).toString(),
                });
              }}
            >
              Visionner
            </Button>
          )}
          <Tooltip
            title="Supprimer"
            placement="right"
            style={{ padding: "20px" }}
          >
            <IconButton
              onClick={() =>
                askDeletePublication(
                  publication,
                  setDelPubDialogVisible,
                  setDelPubDialogMsg,
                  setSnackbarMsg,
                  showSnackbar,
                  hideSnackbar,
                  setConfirmDeleteHandler,
                  reloadPublications,
                  userId
                )
              }
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid container justify="flex-end" alignItems="center" item xs={5}>
          <ProgressRects publicationInfo={infos} />
        </Grid>
      </Grid>
    </Card>
  );
}

export default PublicationTile;
