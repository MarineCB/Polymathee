import React from "react";
import { useHistory, withRouter } from "react-router-dom";
import CommentArea from "../../components/commentArea/CommentArea";
import { useEffect } from "react";
import axios from "axios";
import queryString from "query-string";

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
  Badge,
} from "@material-ui/core";
import {
  Favorite,
  SaveAlt,
  MoreVert,
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
let PUBLICATION_ID = undefined;
let MOCK_USER_ID = 2; // TODO : REPLACE BY REAL VALUE
function PublicationTags({ publication }) {
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

function reportPublication(publication, userId, setReportButtonDisabled) {
  const PUT_PUBLICATION_URL = "api/publication/" + publication.id;
  axios
    .put(PUT_PUBLICATION_URL, {
      publication_content: publication.content,
      publication_file: publication.file,
      publication_tags: publication.tags,
      publication_title: publication.title,
      report: parseInt(publication.report + 1),
    })
    .then((res) => {
      setReportButtonDisabled(true);
    })
    .catch((e) => {
      console.error(e);
      alert("report publication fail");
    });
}

async function incrementDownloadCount(
  publicationId,
  downloadCount,
  setDownloadCount
) {
  try {
    const result = await axios.put("api/download/publication/" + publicationId);
    if (result.status === 200) {
      setDownloadCount(downloadCount + 1);
    }
  } catch (e) {
    console.error(e);
  }
}

function PublicationActions({
  pdfFile,
  objectURL,
  setObjectURL,
  publication,
  downloadCount,
  setDownloadCount,
}) {
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
        onClick={async () => {
          // Download the file
          const url = window.URL.createObjectURL(pdfFile)
          setObjectURL(url)
          link.href = url
          link.download = pdfFile.path
          link.dispatchEvent(new MouseEvent("click"))
          incrementDownloadCount(publication.id,downloadCount, setDownloadCount)
          setDownloadEnabled(false)
          setTimeout(() => {
            setDownloadEnabled(true)
          }, 1000);
        }}
      >
        Télécharger
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
  downloadCount,
  setDownloadCount,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [reportButtonDisabled, setReportButtonDisabled] = React.useState(false);
  const [likeNumber, setLikeNumber] = React.useState(pubInfos.likeNumber);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const incrementFavNumber = () => {
    setLikeNumber(pubInfos.likeNumber + 1);
  };
  const decrementFavNumber = () => {
    setLikeNumber(pubInfos.likeNumber);
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
            <MenuItem
              disabled={reportButtonDisabled}
              onClick={() => {
                reportPublication(
                  pubInfos,
                  MOCK_USER_ID,
                  setReportButtonDisabled
                );
                handleClose();
              }}
            >
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
                      pubInfos,
                      setAlreadyFavorited,
                      decrementFavNumber
                    );
                  }}
                  color="secondary"
                  variant="contained"
                >
                  <Tooltip title="Retirer de vos favoris">
                    <Badge badgeContent={likeNumber}>
                      <Favorite color="error" />
                    </Badge>
                  </Tooltip>
                </IconButton>
              ) : (
                <IconButton
                  onClick={() => {
                    addToFavorites(
                      MOCK_USER_ID,
                      pubInfos,
                      setAlreadyFavorited,
                      incrementFavNumber
                    );
                  }}
                  color="secondary"
                  variant="contained"
                >
                  <Tooltip title="Ajouter cette publication aux favoris">
                    <Badge badgeContent={likeNumber}>
                      <FavoriteBorderOutlined />
                    </Badge>
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
              publication={pubInfos}
              downloadCount={downloadCount}
              setDownloadCount={setDownloadCount}
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
function  syncFavButttonStatus(userId, publicationId, setAlreadyFavorited) {
  const URL_FAVORIS_FOR_USER = "/api/favoris/" + userId;
  axios
    .get(URL_FAVORIS_FOR_USER)
    .then((res) => {
      let alreadyFav = false;
      res.data.forEach((f) => {
        if (f.publicationId.id === parseInt(publicationId)) {
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

function addToFavorites(
  userId,
  publication,
  setAlreadyFavorited,
  incrementFavNumber
) {
  const URL_ADD_TO_FAVORITES = "/api/favoris/";
  axios
    .post(URL_ADD_TO_FAVORITES, {
      publication_id: publication.id,
      user_id: userId,
    })
    .then((res) => {
      syncFavButttonStatus(userId, publication.id, setAlreadyFavorited);
      incrementFavNumber();
    })
    .catch((e) => {
      console.error(e);
      alert("Error when adding to favs");
    });
}

function removeFromFavorites(
  userId,
  publication,
  setAlreadyFavorited,
  decrementFavNumber
) {
  const URL_RMV_FROM_FAVORITES =
    "/api/favoris/" + userId + "/" + publication.id;
  console.log(URL_RMV_FROM_FAVORITES);
  axios
    .delete(URL_RMV_FROM_FAVORITES)
    .then((res) => {
      syncFavButttonStatus(userId, publication.id, setAlreadyFavorited);
      decrementFavNumber();
    })
    .catch((e) => {
      console.error(e);
      alert("Error when removing from favs");
    });
}

function ViewPublication(props) {
  const [pubInfos, setPubsInfos] = React.useState();
  const [pdfFile, setPdfFile] = React.useState();
  const URL_DOWNLOAD = "/api/download";
  const histo = useHistory();
  const [objectURL, setObjectURL] = React.useState(null);
  const [alreadyFavorited, setAlreadyFavorited] = React.useState(false);
  const TIMEOUT_DELAY = 10000 // The time to load a publication before an error message is displayed
  const [downloadCount, setDownloadCount] = React.useState();
  const [timeoutReached, setTimeoutReached] = React.useState(false);
  setTimeout(() => {
    setTimeoutReached(true);
  }, TIMEOUT_DELAY);
  //let publicationId = props.location.publicationId
  let params = queryString.parse(props.location.search);

  if (params.publicationId !== null && params.publicationId !== undefined) {
    PUBLICATION_ID = params.publicationId;
  }
  const URL_PUBLICATION_BY_ID = "/api/publications/" + PUBLICATION_ID;
  useEffect(() => {
    if (PUBLICATION_ID !== undefined) {
      syncFavButttonStatus(MOCK_USER_ID, PUBLICATION_ID, setAlreadyFavorited);
      axios
        .get(URL_PUBLICATION_BY_ID)
        .then((resInfos) => {
          if (resInfos.status === 200) {
            const selectedPublication = resInfos.data;
            console.log(
              "Load success of publication data",
              selectedPublication
            );
            setPubsInfos(selectedPublication);
            setDownloadCount(selectedPublication.downloadNumber);
            axios
              .get(URL_DOWNLOAD + "/" + selectedPublication.file, {
                responseType: "arraybuffer", // We don't download as a blob directly, as it will be downloaded as application/octed-stream which is invalid for iframes
              })
              .then((resPdf) => {
                let blob = new Blob([resPdf.data], { type: "application/pdf" }); // Convert to blob, required to display the PDF
                blob.path = selectedPublication.file;
                if (selectedPublication.file === undefined) {
                  throw new ReferenceError(
                    "File path must be provided with blob ( path attribute)"
                  );
                }
                setPdfFile(blob);
              })
              .catch((err) => {
                console.error("Could not load pdf file is " + err.status);
              });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  const classes = useStyles();
  return (
    <div>
      <div className="App">
        {(() => {
          if (pubInfos !== undefined)
            return (
              <Grid>
                <InfoPhrase
                  downloadCount={downloadCount}
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
                        downloadCount={downloadCount}
                        setDownloadCount={setDownloadCount}
                        item
                      />
                    </Grid>
                  </Grid>
                </Card>
                <div className={classes.comments}>
                  <CommentArea
                    publicationId={pubInfos.id}
                    userId={MOCK_USER_ID}
                  />
                </div>
              </Grid>
            );
          else if (timeoutReached) {
            return (
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
                          search:
                            "?" +
                            new URLSearchParams({
                              publicationId:
                                params.publicationId || PUBLICATION_ID,
                            }).toString(),
                        });
                      }}
                    >
                      Recharger la page
                    </Button>
                  </CardContent>
                </Card>
              </Box>
            );
          }
        })()}
      </div>
    </div>
  );
}

export default withRouter(ViewPublication);
