import React from "react";
import { withRouter } from "react-router-dom";
import { DropzoneArea } from "material-ui-dropzone";
import {
  Button,
  Card,
  FormControl,
  Grid,
  TextField,
} from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TagsArea from "../../components/tag/TagsArea";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80%",
  },
  card: {
    display: "flex",
    width: "50%",
    borderRadius: "30",
    marginTop: "70px",
  },
  description: {
    width: "80%",
  },
  previewChip: {
    minWidth: 160,
    maxWidth: 210,
  },
}));

function AttachmentArea() {
  const classes = useStyles();

  return (
    <Grid
      style={{ marginLeft: "45px", marginRight: "25px", marginTop: "25px" }}
    >
      <DropzoneArea
        showPreviews={true}
        showPreviewsInDropzone={false}
        filesLimit={1}
        useChipsForPreview
        previewGridProps={{ container: { spacing: 1, direction: "row" } }}
        previewChipProps={{ classes: { root: classes.previewChip } }}
        dropzoneText="Déposez votre document "
        previewText="Contenu choisi"
        acceptedFiles={["application/pdf"]}
      />
      {/* Action buttons */}
      <Button
        color="secondary"
        variant="contained"
        style={{
          marginTop: "20px",
          borderRadius: 50,
          marginInline: 2,
        }}
      >
        Publier
      </Button>
      <Button
        color="secondary"
        variant="contained"
        style={{
          marginTop: "20px",
          borderRadius: 50,
          marginInline: 2,
        }}
      >
        Enregistrer
      </Button>
    </Grid>
  );
}

function CreatePublicationForm({tags, setTags}) {
  return (
    // We set fullWidth to remove the huge margin
    <FormControl fullWidth={true} style={{ margin: 20 }}>
      <Typography variant="h5" style={{ marginInline: 10 }}>
        Créer une publication
      </Typography>
      <TextField style={{ padding: 10 }} placeholder="Titre"></TextField>
      <Typography variant="h6">Description</Typography>
      <TextField
        variant="outlined"
        multiline
        id="outlined-multiline-static"
        rowsmin={5}
        rowsMax={20}
        placeholder="Description your publication"
      />
      <Typography variant="h6" style={{ padding: 10 }}>
        Tags
      </Typography>
      <Card>
        <TagsArea tags={tags} setTags={setTags} label="Ajouter un nouveau tag" />
      </Card>
    </FormControl>
  );
}

function CreatePublication() {
  const classes = useStyles();

  const [tags, setTags] = React.useState([
    {
      label: "EFREI",
    },
    {
      label: "Long à lire",
    },
  ])

  return (
    <div className="App">
      <Grid
        container
        id="grid1"
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Card raised className={classes.card}>
          <Grid container>
            <Grid item xs={12} md={6} xl={6}>
              <CreatePublicationForm tags={tags} setTags={setTags}/>
            </Grid>
            <Grid item xs={12} md={6} xl={6}>
              <AttachmentArea />
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </div>
  );
}

export default withRouter(CreatePublication);
