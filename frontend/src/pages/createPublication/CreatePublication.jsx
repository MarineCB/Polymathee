import React from "react";
import RichTextEditor from "react-rte";
import { withRouter } from "react-router-dom";
import { DropzoneAreaBase } from "material-ui-dropzone";
import { Document, Page, pdfjs } from "react-pdf";
import axios from "axios";
import "./CreatePublication.css";
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
} from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Tag from "../../components/tag/Tag";
import PolymatheeEditor from "../../components/polymatheeEditor/PolymatheeEditor";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
let descriptionText = "";
let editMode = false;
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

let MOCK_USER_ID = 2;

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
          error={tags.length !== 0 ? false : true}
          id="outlined-adornment-amount"
          variant="outlined"
          label="Ajouter un nouveau tag"
          inputProps={{ maxLength: 20 }} // we don't want the tags to be too long
          value={tagText}
          onChange={(event) => {
            setTagText(event.target.value);
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
    setPdfFile,
    pageNumber,
    setNumPages,
    numPages,
    setPdfStream,
  } = props.form;
  const classes = useStyles();

  function loadPdf(file) {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const result = reader.result;
      setPdfFile(result);
    });
    setPdfStream(file);
    reader.readAsDataURL(file);
  }

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
                    loadPdf(files[0]);
                    setSize(6);
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
                loadPdf(files[0]);
                setSize(6);
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
  editMode // Indicate if the publication must be created or edited
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
  if (msg !== "") {
    setAlertDialogMsg(msg);
    setDialogOpen(true);
  } else {
    const UPLOAD_URL = "api/upload";
    const PUBLICATION_URL = "api/publication";
    let createdPublication = null; // Publication created with first post
    // First POST : All informations but not the PDF
    if(editMode === true){
      // TODO COMPLETE
    } else {
    axios
      .post(PUBLICATION_URL, {
        publication_content: descriptionText,
        publication_date: Date.now(),
        publication_download_number: 0,
        publication_file: title,
        publication_like_number: 0,
        publication_report: 0,
        publication_status: isDraft ? "Saved" : "To_Treat", // Precise enum values
        publication_tags: tags.map((t) => t.label).join(","), // separate with "," each tag
        publication_title: title + "_user_" + MOCK_USER_ID,
        user_id: MOCK_USER_ID,
      })
      .then((res) => {
        console.log(res.status, res.statusText);
        createdPublication = res.data;
        console.log("Pub infos sent to database!", createdPublication);
        // We create a format for sending a pdf
        const formData = new FormData();
        formData.append("file", pdfStream);
        const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };
        // Second POST : the PDF only
        axios
          .post(UPLOAD_URL, formData, config)
          .then((resUpload) => {
            if (isDraft) {
              setAlertDialogMsg(
                "Publication sauvegardée en tant que brouillon"
              );
              setDialogOpen(true);
              setSubmitButtonLocked(true);
            } else {
              setAlertDialogMsg("Publication envoyée pour validation!");
              setDialogOpen(true);
            }
          })
          .catch((errUpload) => {
            setAlertDialogMsg(
              "Une erreur est survenue lors de la publication de votre fichier"
            );
            setDialogOpen(true);
            console.error(
              "Failed to upload pdf,deleting publication",
              errUpload
            );
            axios
              .delete(PUBLICATION_URL + "/" + createdPublication.id)
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
          "Une erreur est survenue lors de l'envoie des informations de votre publication"
        );
        console.error(err);
        setDialogOpen(true);
      });
  }    }

}

function CreatePublicationSummary(props) {
  const classes = useStyles();
  let {
    title,
    pdfFile,
    description,
    setDescription,
    tags,
    pdfStream,
  } = props.form;
  const [submitButtonLocked, setSubmitButtonLocked] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [alertDialogMsg, setAlertDialogMsg] = React.useState("");

  const handleClose = () => {
    setDialogOpen(false);
  };
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
            value={descriptionText}
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
          <Grid container direction="row">
            {/* Action buttons */}
              <Box>
                <Button
                  color="secondary"
                  variant="contained"
                  disabled={Boolean(submitButtonLocked)}
                  style={{
                    marginTop: "20px",
                    borderRadius: 50,
                    marginInline: 2,
                  }}
                  onClick={() => {
                    savePublication(
                      pdfFile,
                      description,
                      tags,
                      title,
                      pdfStream,
                      setSubmitButtonLocked,
                      false,
                      setAlertDialogMsg,
                      setDialogOpen
                    );
                  }}
                >
                  {editMode ? "Publier ce brouillon" : "Publier"} 
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{
                    marginTop: "20px",
                    borderRadius: 50,
                    marginInline: 2,
                  }}
                  onClick={() => {
                    savePublication(
                      pdfFile,
                      description,
                      tags,
                      title,
                      pdfStream,
                      setSubmitButtonLocked,
                      true,
                      setAlertDialogMsg,
                      setDialogOpen,
                      editMode
                    );
                  }}
                >
                  {editMode ? "Mettre à jour ce brouillon" : "Enregistrer en tant que brouillon"}
                </Button>
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
            Créer une publication
          </Typography>
          <TextField
            error={title.length !== 0 ? false : true}
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
    descriptionText = presetDescription.toString("html"); // Can't edit the rich text area at the moment if the publication is already created
  }
  const [description, setDescription] = React.useState(presetDescription);
  const [title, setTitle] = React.useState((preset && preset.title) || "");
  const [numPages, setNumPages] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [pdfFile, setPdfFile] = React.useState();
  const [pdfStream, setPdfStream] = React.useState();
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
            text: descriptionText,
            setNumPages: setNumPages,
            pageNumber: pageNumber,
            description: description,
            setDescription: setDescription,
            setPageNumber: setPageNumber,
            pdfStream: pdfStream,
            setPdfStream: setPdfStream,
            pdfFile: pdfFile,
            setPdfFile: setPdfFile,
          }}
        />
      );
    case 2:
      return (
        <CreatePublicationSummary
          form={{
            text: descriptionText,
            title: title,
            numPages: numPages,
            pageNumber: pageNumber,
            pdfFile: pdfFile,
            pdfStream: pdfStream,
            setPdfStream: setPdfStream,
            description: description,
            setDescription: setDescription,
            tags: tags,
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
            descriptionText = e.toString("html");
          }}
          description={description}
          value={descriptionText}
        />
        <AttachmentArea form={props.form} />
      </Card>
    </div>
  );
}

function CreatePublication(props) {
  console.log(props.location.preset);
  editMode = props.location.editMode !== undefined && props.location.editMode === true;
  return (
    <div className="App">
      <CreatePublicationStepper preset={props.location.preset} />
    </div>
  );
}

export default withRouter(CreatePublication);
