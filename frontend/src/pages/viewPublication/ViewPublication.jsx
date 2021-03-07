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
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { Favorite, MoreVert, SaveAlt, ArrowUpward } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import PdfViewer from "../../components/pdf/PdfViewer";
import { DropzoneArea } from "material-ui-dropzone";
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

function PublicationActions({pdfFile, objectURL, setObjectURL} ) {
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
          const url = window.URL.createObjectURL(pdfFile)
          setObjectURL(url);
              link.href = url;
              link.download = pdfFile.path;
              link.dispatchEvent(new MouseEvent("click"));
    
              setDownloadEnabled(false);
              setTimeout(() => {
                setDownloadEnabled(true);
          },1000)
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

function RightSide({pdfFile, objectURL, setObjectURL}) {
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
            <PublicationActions pdfFile={pdfFile} objectURL={objectURL} setObjectURL={setObjectURL} />
          </Grid>
        </Grid>
      </Grid>
      <Grid>
        <PublicationTags />
      </Grid>
    </div>
  );
}

function LeftSide(pdfFile,objectURL,setObjectURL) {
  const classes = useStyles();
  
  return (
    <Grid sm={6} xs={6} item>
      <Grid>
        <PdfViewer pdfFile={pdfFile} objectURL={objectURL} setObjectURL={setObjectURL}/>
        {/* <img
            className={classes.pdfViewer}
            alt="Nom du pdf"
            src="https://rightword.com.au/ptero/wp-content/uploads/2011/07/iBooks_PDF_read.png"
          /> */}
          <IconButton
            color="secondary"
            variant="contained"
            className={classes.button}
          >
            <Favorite/>
          </IconButton>
       
      </Grid>
    </Grid>
  );
}

function ViewPublication() {
  const classes = useStyles();
  const [pdfFile, setPdfFile] = React.useState();
  const [objectURL, setObjectURL] = React.useState(null);
  return (
    <div>
      <div className="App">
        <Grid>
          <InfoPhrase />
          <Card raised style={{ margin: "30px" }}>
            <Grid style={{ padding: "20px" }}>
              <Grid container justify="center" direction="row">
                <LeftSide sm={6} xs={6} pdfFile={pdfFile} objectURL={objectURL} setObjectURL={setObjectURL} item />
                <RightSide sm={6} xs={6} pdfFile={pdfFile} objectURL={objectURL} setObjectURL={setObjectURL} item />
              </Grid>
            </Grid>
          </Card>
          <DropzoneArea
            filesLimit={1}
            maxFileSize={60000000}
            onChange={(files) => {
              setPdfFile(files[0]);
            }}
          />
          <div className={classes.comments}>
            <CommentArea />
          </div>
        </Grid>
      </div>
    </div>
  );
}

export default withRouter(ViewPublication);
