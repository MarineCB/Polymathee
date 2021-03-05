import React from "react";
import { useHistory, withRouter } from "react-router-dom";
import CommentArea from "../../components/commentArea/CommentArea";
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
  Tooltip,
} from "@material-ui/core";
import {
  Favorite,
  SaveAlt,
  MoreVert,
  ArrowUpward,
  FavoriteBorderOutlined,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import PdfViewer from "../../components/pdf/PdfViewer";
import RichTextEditor from "react-rte";
import Tag from "../../components/tag/Tag";
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
let MOCK_PUBLICATION_ID = 11; // TODO : REPLACE BY REAL VALUE
let MOCK_USER_ID = 2; // TODO : REPLACE BY REAL VALUE
function PublicationTags({ publication }) {
  console.log(publication);
  return (
    <div>
      <Grid item>
        <Typography variant="h6" style={{ padding: 10 }}>
          Tags
        </Typography>
      </Grid>
      <Grid>
        {publication.tags.split(",").map((t, index) => (
          <Tag key={`${t}${index}`} label={t} variant="outlined" />
        ))}
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
        {new Date(date).toLocaleDateString()} par{" "}
      </Typography>
      <Chip label={author}></Chip>
    </Grid>
  );
}

function RightSide({
  pdfFile,
  objectURL,
  setObjectURL,
  pubInfos,
  alreadyFavorited,
  setAlreadyFavorited,
}) {
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
        
          <Grid justify="center" alignItems="center" container>
            <Grid item>
              <Typography component="h5" variant="h5">
                {pubInfos.title}
              </Typography>
            </Grid>
            <Grid item>
              {alreadyFavorited ? (
                <IconButton
                  onClick={() => {
                    removeFromFavorites(
                      MOCK_USER_ID,
                      MOCK_PUBLICATION_ID,
                      setAlreadyFavorited
                    );
                  }}
                  color="secondary"
                  variant="contained"
                >
                  <Tooltip title="Retirer de vos favoris">
                    <Favorite color="error" />
                  </Tooltip>
                </IconButton>
              ) : (
                <IconButton
                  onClick={() => {
                    addToFavorites(
                      MOCK_USER_ID,
                      MOCK_PUBLICATION_ID,
                      setAlreadyFavorited
                    );
                  }}
                  color="secondary"
                  variant="contained"
                >
                  <Tooltip title="Ajouter cette publication aux favoris">
                    <FavoriteBorderOutlined />
                  </Tooltip>
                </IconButton>
              )}
            </Grid>
          </Grid>
          <Typography variant="subtitle1" color="textSecondary">
            {pubInfos.userId.name} ({pubInfos.userId.role})
          </Typography>
          <Typography variant="h5">Description</Typography>
          <RichTextEditor
            readOnly
            value={RichTextEditor.createValueFromString(
              "<p><strong>Ceci est un texte en gras</strong></p>" +
                "<h1><strong>Texte gros</strong></h1>" +
                "<p><u>Coucou c'est un nouveau test, souligné</u></p>",
              "html"
            )}
          />{" "}
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
        <PublicationTags publication={pubInfos} />
      </Grid>
    </div>
  );
}

function LeftSide(pdfFile, objectURL, setObjectURL) {

  return (
    <Grid sm={6} xs={6} item>
      <Grid>
        <PdfViewer pdfFile={pdfFile} />
      </Grid>
    </Grid>
  );
}

/**
 * Set if the favorite button is in add or remove from favorites mode
 */
function syncFavButttonStatus(userId, publicationId, setAlreadyFavorited) {
  const URL_FAVORIS_FOR_USER = "/api/favoris/" + userId;
  axios
    .get(URL_FAVORIS_FOR_USER)
    .then((res) => {
      let alreadyFav = false;
      res.data.forEach((f) => {
        if (f.publicationId.id === publicationId) {
          alreadyFav = true;
        }
      });
      if (setAlreadyFavorited) {
        setAlreadyFavorited(alreadyFav);
      }
    })
    .catch((e) => {
      alert("Error favorited");
      console.error(e);
    });
}

function addToFavorites(userId, publicationId, setAlreadyFavorited) {
  const URL_ADD_TO_FAVORITES = "/api/favoris/";
  axios
    .post(URL_ADD_TO_FAVORITES, {
      publication_id: publicationId,
      user_id: userId,
    })
    .then((res) => {
      syncFavButttonStatus(userId, publicationId, setAlreadyFavorited);
    })
    .catch((e) => {
      console.error(e);
      alert("Error when adding to favs");
    });
}

function removeFromFavorites(userId, publicationId, setAlreadyFavorited) {
  const URL_RMV_FROM_FAVORITES = "/api/favoris/" + userId + "/" + publicationId;
  console.log(URL_RMV_FROM_FAVORITES);
  axios
    .delete(URL_RMV_FROM_FAVORITES)
    .then((res) => {
      syncFavButttonStatus(userId, publicationId, setAlreadyFavorited);
    })
    .catch((e) => {
      console.error(e);
      alert("Error when removing from favs");
    });
}

function ViewPublication(props) {
  const [pubInfos, setPubsInfos] = React.useState();
  const [pdfFile, setPdfFile] = React.useState();
  const URL_PUBLICATIONS = "/api/publications";
  const URL_DOWNLOAD = "/api/download";
  const histo = useHistory();
  const [objectURL, setObjectURL] = React.useState(null);
  const [alreadyFavorited, setAlreadyFavorited] = React.useState(false);

  //let publicationId = props.location.publicationId

  if (
    props.location.publicationId !== null &&
    props.location.publicationId !== undefined
  ) {
    MOCK_PUBLICATION_ID = props.location.publicationId;
  } else {
    console.warn("using mock user: " + MOCK_PUBLICATION_ID);
  }
  useEffect(() => {
    if (MOCK_PUBLICATION_ID !== undefined) {
      syncFavButttonStatus(
        MOCK_USER_ID,
        MOCK_PUBLICATION_ID,
        setAlreadyFavorited
      );
      axios
        .get(URL_PUBLICATIONS)
        .then((resInfos) => {
          if (resInfos.status === 200) {
            const selectedPublication = resInfos.data.filter(
              (pub) => pub.id === MOCK_PUBLICATION_ID
            )[0];
            console.log(
              "Load success of publication data",
              selectedPublication
            );
            setPubsInfos(selectedPublication);
            axios
              .get(URL_DOWNLOAD + "/" + selectedPublication.file, {
                responseType: "arraybuffer", // We don't download as a blob directly, as it will be downloaded as application/octed-stream which is invalid for iframes
              })
              .then((resPdf) => {
                let blob = new Blob([resPdf.data], { type: "application/pdf" }); // Convert to blob, required to display the PDF
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
                    alreadyFavorited={alreadyFavorited}
                    setAlreadyFavorited={setAlreadyFavorited}
                    item
                  />
                </Grid>
              </Grid>
            </Card>
            <div className={classes.comments}>
              <CommentArea publicationId={pubInfos.id} userId={MOCK_USER_ID} />
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
                      publicationId: MOCK_PUBLICATION_ID,
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
