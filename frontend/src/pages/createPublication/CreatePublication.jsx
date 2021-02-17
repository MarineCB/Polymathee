import React from "react";
import { withRouter } from "react-router-dom";
import { DropzoneArea } from "material-ui-dropzone";

import {
  Button,
  Card,
  FormControl,
  Grid,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Tag from "../../components/tag/Tag";

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

let tagList = [
  {
    label: "EFREI",
  },
  {
    label: "Long à lire",
  },
];

function TagsCard(props) {
  const [tags, setTags] = React.useState(props.tags);
  const [text, setText] = React.useState("");
  const handleKeyPress = (data) => {
    if (data.event.key === "Enter") {
      setTags(() => [...tags, { label: data.text }]);
      setText("");
    }
  };
  return (
    <Card
      style={{
        padding: 30,
        border: "1px solid #E5E5E5", // Add shadow everywhere around
      }}
    >
      <Grid>
        {tags.map((t, index) => (
          <Tag
            key={`${t.label}${index}`}
            label={t.label}
            onDelete={() => {
              setTags(tags.filter((ct) => ct.label !== t.label));
              console.log(tags);
            }}
          />
        ))}
      </Grid>
      <div>
        <TextField
          style={{ marginTop: 30 }}
          id="outlined-adornment-amount"
          variant="outlined"
          label="Ajouter un nouveau tag"
          inputProps={{ maxLength: 20 }} // we don't want the tags to be too long
          value={text}
          onChange={(event) => {
            setText(event.target.value);
          }}
          onKeyPress={(e) => handleKeyPress({ event: e, text: text })}
          InputProps={{
            startAdornment: <InputAdornment position="start">+</InputAdornment>,
          }}
        />
      </div>
    </Card>
  );
}

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

function CreatePublicationForm() {
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
      <TagsCard tags={tagList} />
    </FormControl>
  );
}

function CreatePublication() {
  const classes = useStyles();

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
              <CreatePublicationForm />
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
