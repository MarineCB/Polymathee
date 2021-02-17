import React from "react";
import { withRouter } from "react-router-dom";
import CommentArea from "../../components/commentArea/CommentArea";
import Tag from "../../components/tag/Tag";
import {
  Button,
  Card,
  Grid,
  Chip,
  Typography,
  CardContent,
} from "@material-ui/core";
import { Favorite, SaveAlt } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(() => ({
  comments: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80%",
  },
  pdfViewer: {
    maxWidth: "100%",
    maxHeight: "100%",
  },
  button: {
    marginInline: "2px",
  },
}));

function PublicationTags() {
  return (
    <div>
      <Grid item>
        <Typography variant="h6" style={{ padding: 10 }}>
          Tags
        </Typography>
      </Grid>
      <Grid>
        <Tag label="TEST" />
        <Tag label="Anglais"></Tag>
        <Tag label="Communication"></Tag>
      </Grid>
    </div>
  );
}

function PublicationActions() {
  const classes = useStyles();
  return (
    <div>
      <Button
        color="secondary"
        variant="contained"
        className={classes.button}
        startIcon={<SaveAlt />}
      >
        Télécharger
      </Button>
      <Button
        color="secondary"
        variant="contained"
        className={classes.button}
        startIcon={<Favorite />}
      >
        Liker
      </Button>
    </div>
  );
}

function InfoPhrase() {
  return (
    <Grid>
      <Typography variant="caption">
        282 téléchargement, publié le 28/03/2020 par{" "}
      </Typography>
      <Chip label="Dekka"></Chip>
    </Grid>
  );
}

function RightSide() {
  return (
    <div>
      <Grid>
        <CardContent>
          <Typography component="h5" variant="h5">
            The Twist of Fate
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Dekka
          </Typography>
          <Typography variant="h5">Description</Typography>
          <Typography style={{ margin: "10px" }}>
            C'est un roman sympa, en anglais par contre. C'est un des livres
            possibles à lire en comm
          </Typography>
        </CardContent>
        <Grid>
          <Grid item>
            <PublicationActions />
          </Grid>
        </Grid>
      </Grid>
      <Grid>
        <PublicationTags />
      </Grid>
    </div>
  );
}

function ViewPublication() {
  const classes = useStyles();
  return (
    <div>
      <Grid>
        <InfoPhrase />
        <Card raised style={{ margin: "30px" }}>
          <Grid style={{ padding: "20px" }}>
            <Grid container justify="center" direction="row">
              <Grid sm={6} xs={6} item>
                <img
                  className={classes.pdfViewer}
                  alt="Nom du pdf"
                  src="https://rightword.com.au/ptero/wp-content/uploads/2011/07/iBooks_PDF_read.png"
                />
              </Grid>
              <RightSide sm={6} xs={6} item />
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <div className={classes.comments}>
        <CommentArea />
      </div>
    </div>
  );
}

export default withRouter(ViewPublication);
