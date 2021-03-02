import React from "react";
import { useHistory, withRouter } from "react-router-dom";
import CommentArea from "../../components/commentArea/CommentArea";
import Tag from "../../components/tag/Tag";
import { useEffect } from "react";
import axios from "axios";
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Card,
  Grid,
  Chip,
  Typography,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@material-ui/core";
import { Favorite, MoreVert, SaveAlt, ArrowUpward } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import PdfViewer from "../../components/pdf/PdfViewer";
import PolymatheeEditor from "../../components/polymatheeEditor/PolymatheeEditor";
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

function PublicationActions({ pdfFile, objectURL, setObjectURL }) {
  const classes = useStyles();
  const [downloadEnabled, setDownloadEnabled] = React.useState(true);
  const link = document.createElement("a");
  return (
    <div>
      <Button
        color="secondary"
        variant="contained"
        className={classes.button}
        startIcon={<SaveAlt />}
        disabled={!downloadEnabled}
        onClick={() => {
          // Download the file
          const url = window.URL.createObjectURL(pdfFile);
          setObjectURL(url);
          link.href = url;
          link.download = pdfFile.path;
          link.dispatchEvent(new MouseEvent("click"));

          setDownloadEnabled(false);
          setTimeout(() => {
            setDownloadEnabled(true);
          }, 1000);
        }}
      >
        Télécharger
      </Button>
      <Button
        color="secondary"
        variant="contained"
        className={classes.button}
        startIcon={<ArrowUpward />}
      >
        Upvote
      </Button>
    </div>
  );
}

function InfoPhrase({ author, downloadCount, date }) {
  return (
    <Grid>
      <Typography variant="caption">
        {downloadCount} téléchargement{downloadCount > 1 ? "s" : ""}, publié le{" "}
        {date} par{" "}
      </Typography>
      <Chip label={author}></Chip>
    </Grid>
  );
}

function RightSide({ pdfFile, objectURL, setObjectURL, pubInfos }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div id="top">
      <Grid>
        <Grid container justify="flex-end">
          <IconButton
            aria-label="delete"
            aria-controls="simple-menu"
            aria-haspopup="true"
            color="primary"
            onClick={handleClick}
          >
            <MoreVert />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              Signaler en tant que contenu inapproprié
            </MenuItem>
          </Menu>
        </Grid>
        <CardContent>
          <Typography component="h5" variant="h5">
            {pubInfos.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {pubInfos.userId.name} ({pubInfos.userId.role})
          </Typography>
          <Typography variant="h5">Description</Typography>
          {/* <PolymatheeEditor readOnly={Boolean(true)} value={RichTextEditor.createValueFromString(pubInfos.content , 'html')} /> */}
        </CardContent>
        <Grid>
          <Grid item>
            <PublicationActions
              pdfFile={pdfFile}
              objectURL={objectURL}
              setObjectURL={setObjectURL}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid>
        <PublicationTags />
      </Grid>
    </div>
  );
}

function LeftSide(pdfFile, objectURL, setObjectURL) {
  const classes = useStyles();

  return (
    <Grid sm={6} xs={6} item>
      <Grid>
        <PdfViewer
          pdfFile={pdfFile}
        />
        <IconButton
          color="secondary"
          variant="contained"
          className={classes.button}
        >
          <Favorite />
        </IconButton>
      </Grid>
    </Grid>
  );
}

function ViewPublication(props) {
  const [pubInfos, setPubsInfos] = React.useState();
  const [pdfFile, setPdfFile] = React.useState();
  const URL_PUBLICATIONS = "http://localhost:8080/api/publications";
  const URL_DOWNLOAD = "http://localhost:8080/api/download";
  const histo = useHistory();
  const [objectURL, setObjectURL] = React.useState(null);

  //let publicationId = props.location.publicationId
  let publicationId = 11;
  useEffect(() => {
    if (publicationId !== undefined) {
      axios
        .get(URL_PUBLICATIONS)
        .then((resInfos) => {
          if (resInfos.status === 200) {
            const selectedPublication = resInfos.data.filter(
              (pub) => pub.id === publicationId
            )[0];
            console.log(
              "Load success of publication data",
              selectedPublication
            );
            setPubsInfos(selectedPublication);
            axios
              .get(URL_DOWNLOAD + "/" + selectedPublication.file, {
                responseType: "arraybuffer" // We don't download as a blob directly, as it will be downloaded as application/octed-stream which is invalid for iframes
              })
              .then(resPdf => {
                let blob = new Blob([resPdf.data], { type: 'application/pdf' } ) // Convert to blob, required to display the PDF
                console.log("Load success of pdf into this page", resPdf);
                blob.path = selectedPublication.file;
                if (selectedPublication.file === undefined) {
                  throw new ReferenceError(
                    "File path must be provided with blob ( path attribute)"
                  );
                }
                setPdfFile(blob);
              })
              .catch((err) => {
                console.error(err);
              });
          }
        })
        .catch((err) => {
          console.error("Could not load pdf file is " + err.status);
        });
    }
  }, []);

  const classes = useStyles();
  return (
    <div>
      <div className="App">
        {pubInfos ? (
          <Grid>
            <InfoPhrase
              downloadCount={pubInfos.downloadNumber}
              author={pubInfos.userId.name}
              date={pubInfos.date}
            />
            <Card raised style={{ margin: "30px" }}>
              <Grid style={{ padding: "20px" }}>
                <Grid container justify="center" direction="row">
                  <LeftSide
                    sm={6}
                    xs={6}
                    pdfFile={pdfFile}
                    objectURL={objectURL}
                    setObjectURL={setObjectURL}
                    item
                  />
                  <RightSide
                    sm={6}
                    xs={6}
                    pdfFile={pdfFile}
                    objectURL={objectURL}
                    setObjectURL={setObjectURL}
                    pubInfos={pubInfos}
                    item
                  />
                </Grid>
              </Grid>
            </Card>
            <div className={classes.comments}>
              <CommentArea />
            </div>
          </Grid>
        ) : (
          <Box m={2}>
            <Card>
              <CardContent>
                <Typography>
                  Echec de chargement de la publication, veuillez réessayer
                </Typography>
                <Button
                  style={{ marginTop: "20px" }}
                  variant="outlined"
                  onClick={() => {
                    histo.push({
                      pathname: "/viewPublication",
                      publicationId: publicationId,
                    });
                  }}
                >
                  Recharger la page
                </Button>
              </CardContent>
            </Card>
          </Box>
        )}
      </div>
    </div>
  );
}

export default withRouter(ViewPublication);
