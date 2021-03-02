import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Box, Card, Typography, Grid, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { ZoomIn, Edit } from "@material-ui/icons";
const useStyles = makeStyles(() => ({
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

/**
 * Returns the publication status
 * @param {String} status
 */
function GetInfoForPublicationStatus(status) {
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
        msg: "Publication en ligne",
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
  console.log("publicationInfo", publicationInfo);
  for (let i = 0; i < 3; i++) {
    if (i < publicationInfo.step) {
      rects.push(
        <Box variant="contained" className={classes.parallelogramDone} />
      );
    } else if (i > publicationInfo.step) {
      rects.push(
        <Box variant="contained" className={classes.parallelogramEmpty} />
      );
    } else {
      // Show current status color
      rects.push(<Box variant="contained" className={publicationInfo.class} />);
    }
  }
  return (
    <Grid container justify="flex-end" alignItems="center" item xs={5}>
      {rects}
    </Grid>
  );
}

function PublicationTile({ data }) {
  const classes = useStyles();
  const history = useHistory();
  const infos = GetInfoForPublicationStatus(data.status);
  return (
    <Card className={classes.publicationCard}>
      <Grid container alignItems="center" item>
        <Grid item xs={3}>
          <Typography variant="h6">{data.title}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography>{infos.msg}</Typography>
        </Grid>
        <Grid item>
          {data.status === "Saved" ? (
            <Button
              startIcon={<Edit />}
              onClick={() => {
                history.push({
                  pathname: "/createPublication",
                  preset: data,
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
                  publicationId: data.id,
                });
              }}
            >
              Visionner
            </Button>
          )}
        </Grid>
        <Grid container justify="flex-end" alignItems="center" item xs={5}>
          <ProgressRects publicationInfo={infos} />
        </Grid>
      </Grid>
    </Card>
  );
}

export default PublicationTile;
