import React, { useCallback, useEffect } from "react";
import RichTextEditor from "react-rte";
import { useHistory, withRouter } from "react-router-dom";
import { DropzoneAreaBase } from "material-ui-dropzone";
import { Document, Page, pdfjs } from "react-pdf";
import axios from "axios";
import "./CreatePublication.css";
import badWords from "./badWords.json";
import {
  Button,
  Card,
  FormControl,
  Grid,
  TextField,
  InputAdornment,
  Stepper,
  Step,
  StepButton,
  Dialog,
  DialogActions,
  Box,
  DialogTitle,
  DialogContent,
  DialogContentText,
  CircularProgress,
} from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Tag from "../../components/tag/Tag";
import PolymatheeEditor from "../../components/polymatheeEditor/PolymatheeEditor";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
let MOCK_USER_ID = 2; // TODO : replace in prod

let editMode = false;
let editedPdfFileToo = false; // Optimization, the pdf file will only be uploaded when edited
const useStyles = makeStyles((theme) => ({
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80%",
  },
  dropzoneParagraph: {
    padding: "20px",
  },
  card: {
    margin: "30px",
    padding: "30px",
  },
  title: {
    marginTop: theme.spacing(2),
  },
  previewChip: {
    minWidth: 160,
    maxWidth: 210,
  },
  rte: {
    minHeight: "200px",
  },
}));

function TagsCard(props) {
  let { tags, setTags } = props;
  const [tagText, setTagText] = React.useState("");
  const handleKeyPress = (data) => {
    if (data.event.key === "Enter") {
      if (data.text !== "") {
        setTags([...tags, { label: data.text }]);
        setTagText("");
      }
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
          value={tagText}
          onChange={(event) => {
            if (!event.target.value.endsWith(",")) {
              setTagText(event.target.value);
            }
          }}
          onKeyPress={(e) => handleKeyPress({ event: e, text: tagText })}
          InputProps={{
            startAdornment: <InputAdornment position="start">+</InputAdornment>,
          }}
        />
      </div>
    </Card>
  );
}

function AttachmentArea(props) {
  let {
    pdfFile,
    setPdfFile, // Used to set the pdf visually
    pageNumber,
    setNumPages,
    numPages,
    setPdfStream,
    preset,
  } = props.form;
  const classes = useStyles();

  const loadPdfCallback = useCallback(
    (blob) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const result = reader.result;
        setPdfFile(result);
      });
      setPdfStream(blob);
      reader.readAsDataURL(blob);
    },
    [setPdfFile, setPdfStream]
  );

  useEffect(() => {
    // If we edit a draft publication
    // Load PDF file from publication id
    if (editMode) {
      // If we already downloaded the file 1 time, no need to redownload it
      // if(!pdfFile) {
      const publicationCurrentlyEdited = preset;
      const URL_DOWNLOAD = "/api/download";
      axios
        .get(URL_DOWNLOAD + "/" + publicationCurrentlyEdited.file, {
          responseType: "arraybuffer", // We don't download as a blob directly, as it will be downloaded as application/octed-stream which is invalid for iframes
        })
        .then((resPdf) => {
          let blob = new Blob([resPdf.data], { type: "application/pdf" }); // Convert to blob, required to display the PDF
          blob.path = publicationCurrentlyEdited.file;
          if (publicationCurrentlyEdited.file === undefined) {
            throw new ReferenceError(
              "File path must be provided with blob ( <blob>.path attribute)"
            );
          }
          loadPdfCallback(blob);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    // }
  }, [preset, loadPdfCallback]);

  // Automatically display the number of loaded pages for the new PDF
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const [, setSize] = React.useState(12);
  return (
    <div>
      <Box m={2}>
        {pdfFile !== undefined && (
          <Box display="flex" justifyContent="center">
            <Box mr={2} alignContent="flex-end">
              <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
                <Page height={250} pageNumber={pageNumber} />
              </Document>
              <Typography>Nombre de pages : {numPages}</Typography>
            </Box>
            <Box ml={2} alignContent="flex-start">
              <DropzoneAreaBase
                showPreviews={true}
                showPreviewsInDropzone={false}
                filesLimit={1}
                maxFileSize={60000000}
                useChipsForPreview
                onDrop={(files) => {
                  if (files.length > 0) {
                    loadPdfCallback(files[0]);
                    setSize(6);
                    editedPdfFileToo = true;
                  }
                }}
                dropzoneParagraphClass={classes.dropzoneParagraph}
                previewGridProps={{
                  container: { spacing: 1, direction: "row" },
                }}
                previewChipProps={{ classes: { root: classes.previewChip } }}
                dropzoneText="Choisir à nouveau"
                initialFiles={pdfFile !== undefined ? [pdfFile] : undefined}
                previewText="Contenu choisi"
                acceptedFiles={["application/pdf"]}
              />
            </Box>
          </Box>
        )}
        {pdfFile === undefined && (
          <DropzoneAreaBase
            showPreviews={true}
            showPreviewsInDropzone={false}
            filesLimit={1}
            maxFileSize={60000000}
            useChipsForPreview
            onDrop={(files) => {
              if (files.length > 0) {
                loadPdfCallback(files[0]);
                setSize(6);
                editedPdfFileToo = true;
              }
            }}
            previewGridProps={{ container: { spacing: 1, direction: "row" } }}
            previewChipProps={{ classes: { root: classes.previewChip } }}
            dropzoneText="Déposez votre document "
            initialFiles={pdfFile !== undefined ? [pdfFile] : undefined}
            previewText="Contenu choisi"
            acceptedFiles={["application/pdf"]}
          />
        )}
      </Box>
    </div>
  );
}
// Save of modify a publication, with UI handling
function savePublication(
  pdfFile,
  description,
  tags,
  title,
  pdfStream,
  setSubmitButtonLocked,
  isDraft,
  setAlertDialogMsg,
  setDialogOpen,
  setSaveDraftButtonDisabled,
  publicationId, // Edit only, publication id for upload for S3
  setLoadingPost,
  publicationSentAction,
  publicatinSavedAction
) {
  // Check submit

  var msg = "";
  if (pdfFile === undefined) {
    msg += "\n- Pas de pdf";
  }
  if (description === "") {
    msg += "\n- Pas de description";
  }
  if (tags === undefined || tags.length === 0) {
    msg += "\n- Pas de tags";
  }
  if (title === undefined || title === "") {
    msg += "\n- Pas de titre";
  }
  tags = tags.map((t) => {
    return { label: t.label.replace(",", "") };
  }); // Remove special characters
  tags = tags.filter((t) => t.label.length !== 0 || t.label !== ""); // Remove invalid tags
  if (description !== undefined) {
    for (let i = 0; i < badWords.length; i++) {
      if (description.toLowerCase().includes(badWords[i].toLowerCase())) {
        msg += "\n- Mot interdit : " + badWords[i];
      }
    }
  }
  if (msg !== "") {
    setAlertDialogMsg(msg);
    setDialogOpen(true);
  } else {
    const PUT_PUBLICATION_URL_EDIT = "api/publication/" + publicationId;
    const POST_PUBLICATION_URL = "api/publication/";
    let createdPublication = null; // Publication created with first post
    const pubFile = title + ".pdf";

    const successHandler = ()=>{
      setDialogOpen(true);
      editedPdfFileToo = false;
      setLoadingPost(false);
      setAlertDialogMsg(
        "Publication publiée"
      );
      setSubmitButtonLocked(true)
      setSaveDraftButtonDisabled(true)
    }
    const errorHandler = () => {
      setAlertDialogMsg(
        "Une erreur est survenue lors de la modification du statut de votre publication"
      );
      setDialogOpen(true);
      setLoadingPost(false);
    }
    // First POST : All informations but not the PDF
    if (editMode === true) {
      axios
        .put(PUT_PUBLICATION_URL_EDIT, {
          publication_content: description,
          publication_file: pubFile,
          publication_tags: tags.map((t) => t.label).join(","),
          publication_title: title,
        })
        .then((res) => {
          const editedPublication = res.data;
          const UPLOAD_FILE_URL_EDIT = "api/upload/" + editedPublication.id;
          const DELETE_FILE_URL_EDIT = "api/delete/" + editedPublication.id;
          if (editedPdfFileToo) {
            axios
              .delete(DELETE_FILE_URL_EDIT) // Delete old PDF
              .then((resDelete) => {
                uploadPDF( // Then upload the new one
                  UPLOAD_FILE_URL_EDIT,
                  pdfStream,
                  setAlertDialogMsg,
                  setDialogOpen,
                  setLoadingPost,
                  !isDraft, // also update the status of the publication from Saved to To_treat, if this is a draft
                  editedPublication.id,
                  successHandler,
                  errorHandler
                );
              })
              .catch((eFile) => { 
                console.warn(
                  "Une erreur est survenue lors de la modification de votre fichier. Impossible de supprimer l'ancien fichier avant d'envoyer le nouveau. Peut être que le fichier n'existe plus",
                  eFile
                  );
                  uploadPDF(
                    UPLOAD_FILE_URL_EDIT,
                    pdfStream,
                    setAlertDialogMsg,
                    setDialogOpen,
                    setLoadingPost,
                    !isDraft, // also update the status of the publication from Saved to To_treat, if this is a draft
                    editedPublication.id,
                    successHandler,
                    errorHandler
                    );
                  });
                } else {
            if(!isDraft) {
              updateStatusFromDraftToToTreat(publicationId,successHandler,errorHandler)
            } else {
              setAlertDialogMsg("Brouillon mis à jour (informations seulement)");
            }
            setDialogOpen(true);
          }
        })
        .catch((e) => {
          setAlertDialogMsg(
            "Une erreur est survenue lors de la modification des informations de votre brouillon"
          );
          console.error(e);
        });
    } else {
      // When creating a new publication, not editing it (Submit button)
      const data = {
        publication_content: description,
        publication_date: Date.now(),
        publication_download_number: 0,
        publication_file: pubFile,
        publication_like_number: 0,
        publication_report: 0,
        publication_status: isDraft ? "Saved" : "To_Treat", // Precise enum values
        publication_tags: tags.map((t) => t.label).join(","), // separate with "," each tag
        publication_title: title,
        user_id: MOCK_USER_ID,
      };
      setLoadingPost(true);
      // First POST : All informations but not the PDF
      axios
        .post(POST_PUBLICATION_URL, data)
        .then((res) => {
          createdPublication = res.data;
          // We create a format for sending a pdf
          const formData = new FormData();
          formData.append("file", pdfStream);
          const config = {
            headers: {
              "content-type": "multipart/form-data",
            },
          };
          const UPLOAD_FILE_URL = "api/upload/" + createdPublication.id;
          // Second POST : the PDF only
          axios
            .post(UPLOAD_FILE_URL, formData, config)
            .then((resUpload) => {
              if (isDraft) {
                publicatinSavedAction();
              } else {
                publicationSentAction();
              }
            })
            .catch((errUpload) => {
              setAlertDialogMsg(
                "Une erreur est survenue lors de la publication de votre fichier"
              );
              setDialogOpen(true);
              setLoadingPost(false);
              console.error(
                "step 2 failed : Failed to upload pdf,deleting publication",
                errUpload
              );
              axios
                .delete("api/publication/" + createdPublication.id)
                .then((resDelete) => {
                  setAlertDialogMsg(
                    "Une erreur est survenue lors de la publication de votre fichier"
                  );
                  setDialogOpen(true);
                })
                .catch((e) => {
                  console.error(
                    "Failed to delete uploaded pub infos after we found that we couldn't delete the uploaded document",
                    e
                  );
                });
            });
        })
        .catch((err) => {
          setAlertDialogMsg(
            "Une erreur est survenue lors de l'envoi des informations de votre publication"
          );
          console.error("Step 1 failed", err);
          setDialogOpen(true);
        });
    }
  }
}

function updateStatusFromDraftToToTreat(publicationId,successHandler,errorHandler) {
  const status = "To_Treat"
  axios.put(`api/status/publication/${publicationId}/${status}`).then(resUpdatePubStatus =>{
    successHandler()
  }).catch(errUpdateStatus =>{
    console.error(errUpdateStatus)
    errorHandler()
  }) 
}

// Upload a PDF file to the S3 vault
function uploadPDF(
  UPLOAD_FILE_URL,
  pdfStream,
  setAlertDialogMsg,
  setDialogOpen,
  setLoadingPost,
  updateStatusToToTreat, // Change from Saved to To_Treat the publication status
  publicationId, // Only required if the status needs to be updated
  successHandlerStatus,
  errorHandlerStatus
) {
  setLoadingPost(true);
  const formData = new FormData();
  formData.append("file", pdfStream);
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  axios
    .post(UPLOAD_FILE_URL, formData, config)
    .then((resUploadNewFile) => {
      setAlertDialogMsg("Brouillon mis à jour (informations et fichier)");
      if(updateStatusToToTreat) {
        updateStatusFromDraftToToTreat(publicationId, successHandlerStatus,errorHandlerStatus)
      } else {
        setDialogOpen(true);
        setLoadingPost(false);
      }

    })
    .catch((eUploadNewFile) => {
      console.error(eUploadNewFile);
      setAlertDialogMsg(
        "Une erreur est survenue lors de la modification de votre fichier. Impossible d'envoyer le fichier modifié"
      );
      setDialogOpen(true);
      setLoadingPost(false);
    });
}

function CreatePublicationSummary(props) {
  const classes = useStyles();
  let {
    submitButtonLocked,
    setSubmitButtonLocked,
    saveDraftButtonDisabled,
    setSaveDraftButtonDisabled,
    title,
    pdfFile,
    description,
    setDescription,
    tags,
    pdfStream,
    publicationId,
  } = props.form;
  const history = useHistory();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [alertDialogMsg, setAlertDialogMsg] = React.useState("");
  const [loadingPost, setLoadingPost] = React.useState(false);
  const handleClose = () => {
    setDialogOpen(false);
  };

  function publicationSentAction() {
    setAlertDialogMsg("Publication envoyée pour validation!");
    setDialogOpen(true);
    setSaveDraftButtonDisabled(true);
    setSubmitButtonLocked(true);
    setLoadingPost(false);
  }

  function publicationSavedAction() {
    setAlertDialogMsg("Publication sauvegardée en tant que brouillon");
    setDialogOpen(true);
    setSubmitButtonLocked(true);
    setLoadingPost(false);
  }

  return (
    <div>
      <Card className={classes.card}>
        <Grid container direction="column">
          <Typography variant="h5" className={classes.title}>
            Nom de la publication
          </Typography>
          <Typography>{title}</Typography>
          <Typography variant="h6" className={classes.title}>
            Tags
          </Typography>
          <Grid>
            {tags.map((t, index) => (
              <Tag key={`${t.label}${index}`} label={t.label} />
            ))}
          </Grid>
          <Typography variant="h6" className={classes.title}>
            Description
          </Typography>
          <PolymatheeEditor
            readOnly
            className="new-post-editor"
            description={description}
            setDescription={setDescription}
            value={description}
          />
          <div>
            {/** Error area if one the required elements is missing from the controls for sending a new publication */}
            <Dialog
              open={dialogOpen}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle>{"Information"}</DialogTitle>
              <DialogContent>
                {/*We use whiteSpace: 'pre-line' to enable line breaks*/}
                <DialogContentText style={{ whiteSpace: "pre-line" }}>
                  {alertDialogMsg}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  OK
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <Grid>
            {/* Action buttons */}
            <Box>
              <Grid justify="space-between" alignItems="stretch" container>
                <Grid item>
                  <Button
                    color="secondary"
                    variant="contained"
                    disabled={submitButtonLocked}
                    style={{
                      marginTop: "20px",
                      borderRadius: 50,
                      marginInline: 2,
                    }}
                    onClick={() => {
                      savePublication(
                        pdfFile,
                        description.toString("html"),
                        tags,
                        title,
                        pdfStream,
                        setSubmitButtonLocked,
                        false,
                        setAlertDialogMsg,
                        setDialogOpen,
                        setSaveDraftButtonDisabled,
                        publicationId,
                        setLoadingPost,
                        publicationSentAction, // POST
                        publicationSavedAction // PUT
                      );
                    }}
                  >
                    {editMode ? "Publier ce brouillon" : "Publier"}
                    {loadingPost ? (
                      <CircularProgress
                        style={{ marginLeft: "10px" }}
                        size={25}
                      />
                    ) : (
                      <div />
                    )}
                  </Button>
                  <Button
                    color="secondary"
                    variant="contained"
                    disabled={submitButtonLocked || saveDraftButtonDisabled}
                    style={{
                      marginTop: "20px",
                      borderRadius: 50,
                      marginInline: 2,
                    }}
                    onClick={() => {
                      savePublication(
                        pdfFile,
                        description.toString("html"),
                        tags,
                        title,
                        pdfStream,
                        setSubmitButtonLocked,
                        true,
                        setAlertDialogMsg,
                        setDialogOpen,
                        setSaveDraftButtonDisabled,
                        publicationId,
                        setLoadingPost,
                        publicationSentAction, // POST
                        publicationSavedAction // PUT
                      );
                    }}
                  >
                    {editMode
                      ? "Mettre à jour ce brouillon"
                      : "Enregistrer en tant que brouillon"}
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    style={{
                      marginLeft: "30px",
                      marginTop: "20px",
                      borderRadius: 50,
                      marginInline: 2,
                    }}
                    onClick={() => history.push("/myPublications")}
                    color="secondary"
                    variant="contained"
                  >
                    Mes publications
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}

function CreatePublicationForm(props) {
  let { title, setTitle, tags, setTags } = props.form;
  const classes = useStyles();
  return (
    // We set fullWidth to remove the huge margin
    <Box height="100%">
      <Card className={classes.card}>
        <FormControl fullWidth={true} style={{ margin: 20 }}>
          <Typography variant="h5" style={{ marginInline: 10 }}>
            {editMode
              ? "Modification de votre publication"
              : "Créer une publication"}
          </Typography>
          <TextField
            style={{ padding: 10 }}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Titre"
          ></TextField>
          <Typography variant="h6" style={{ padding: 10 }}>
            Tags
          </Typography>
          <TagsCard tags={tags} setTags={setTags} />
        </FormControl>
      </Card>
    </Box>
  );
}

function CreatePublicationStepper({ preset }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const steps = getStepNames();

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <Box height="100%">
      <Stepper
        nonLinear
        activeStep={activeStep}
        style={{ background: "unset" }}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton
              onClick={handleStep(index)}
              completed={completed[index]}
            >
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <Box height="75%">
        {allStepsCompleted() ? (
          <Box>
            <Typography className={classes.instructions}>
              Toutes les étapes sont terminées
            </Typography>
            <Button onClick={handleReset}>Recommencer</Button>
          </Box>
        ) : (
          <Box height="100%">
            {GetStepContent(activeStep, preset)}
            <Box>
              <Button
                style={{ marginInline: "10px" }}
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Retour
              </Button>
              <Button
                style={{ marginInline: "10px" }}
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
                disabled={activeStep === totalSteps() - 1}
              >
                Suivant
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" className={classes.completed}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <div />
                ))}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

function getStepNames() {
  return ["Informations", "Contenu", "Vérification"];
}

function GetStepContent(step, preset) {
  let presetDescription = RichTextEditor.createEmptyValue();
  if (preset !== undefined && preset.content !== undefined) {
    presetDescription = RichTextEditor.createValueFromString(
      preset.content,
      "html"
    );
    // descriptionText =  description!==undefined ? description : ; // Can't edit the rich text area at the moment if the publication is already created
  }
  const [descriptionHtml, setDescriptionHtml] = React.useState(
    presetDescription === undefined
      ? RichTextEditor.createEmptyValue()
      : presetDescription
  );
  const [title, setTitle] = React.useState((preset && preset.title) || "");
  const [numPages, setNumPages] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [pdfFile, setPdfFile] = React.useState();
  const [pdfStream, setPdfStream] = React.useState();
  const [submitButtonLocked, setSubmitButtonLocked] = React.useState(false);
  const [saveDraftButtonDisabled, setSaveDraftButtonDisabled] = React.useState(
    false
  );
  const presetTags = [];
  if (preset !== undefined && preset.tags != null) {
    preset.tags.split(",").forEach((str) => {
      presetTags.push({ label: str });
    });
  }
  const [tags, setTags] = React.useState(presetTags);
  switch (step) {
    case 0:
      return (
        <CreatePublicationForm
          form={{
            title: title,
            setTitle: setTitle,
            tags: tags,
            setTags: setTags,
          }}
        />
      );
    case 1:
      return (
        <CreatePublicationContent
          form={{
            numPages: numPages,
            setNumPages: setNumPages,
            pageNumber: pageNumber,
            description: descriptionHtml,
            setDescription: setDescriptionHtml,
            setPageNumber: setPageNumber,
            pdfStream: pdfStream,
            setPdfStream: setPdfStream,
            pdfFile: pdfFile,
            setPdfFile: setPdfFile,
            preset: preset, // Used for editing the publication file in draft mode
          }}
        />
      );
    case 2:
      return (
        <CreatePublicationSummary
          form={{
            submitButtonLocked: submitButtonLocked,
            setSubmitButtonLocked: setSubmitButtonLocked,
            saveDraftButtonDisabled: saveDraftButtonDisabled,
            setSaveDraftButtonDisabled: setSaveDraftButtonDisabled,
            title: title,
            numPages: numPages,
            pageNumber: pageNumber,
            pdfFile: pdfFile,
            pdfStream: pdfStream,
            setPdfStream: setPdfStream,
            description: descriptionHtml,
            setDescription: setDescriptionHtml,
            tags: tags,
            publicationId: preset ? preset.id : undefined, // For draft modifications only
          }}
        />
      );
    default:
      return "Etape inconnue";
  }
}

function CreatePublicationContent(props) {
  const classes = useStyles();
  let { description, setDescription } = props.form;
  return (
    <div>
      <Card className={classes.card}>
        <Typography style={{ marginTop: "20px" }}>Description</Typography>
        <PolymatheeEditor
          className={classes.rte}
          editorClassName={classes.rte}
          setDescription={setDescription}
          onChange={(e) => {
            //descriptionText = e.toString("html");
          }}
          description={description}
          value={description}
        />
        <AttachmentArea form={props.form} />
      </Card>
    </div>
  );
}

function CreatePublication(props) {
  editMode =
    props.location.editMode !== undefined && props.location.editMode === true;
  return (
    <div className="App">
      <CreatePublicationStepper preset={props.location.preset} />
    </div>
  );
}

export default withRouter(CreatePublication);
