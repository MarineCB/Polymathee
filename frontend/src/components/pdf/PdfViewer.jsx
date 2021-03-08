import './PdfViewer.css';
import { Document, Page, pdfjs } from "react-pdf";
import {useMemo} from "react";
import React from "react";
import { Button, Grid, Box, Chip, IconButton, Tooltip } from "@material-ui/core";
import { Fullscreen } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const useStyles = makeStyles(() => ({
  button: {
    marginInline: "2px",
  },
}));

function PdfViewer({pdfFile,height}) {
  const classes = useStyles();
  const [numPages, setNumPages] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [pdfData, setPdfData] = React.useState(); // Binary data
  
  // Convert the metadata pdf to a readable file
  function loadPdf(file) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const result = reader.result;
        setPdfData(result)
        setPageNumber(1)
      });
      reader.readAsDataURL(file);
}

  useMemo(() => {
    // Load the pdf as soon as  the component is mounted
    if (pdfFile.pdfFile !== undefined) {
      loadPdf(pdfFile.pdfFile);
    }
  }, [pdfFile.pdfFile]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function nextPage() {
    if (!isLastPage()) {
      setPageNumber(pageNumber + 1);
    }
  }

  function isFirstPage(){
    return pageNumber <= 1
  }

  function isLastPage() {
    return pageNumber === numPages
  }

  function previousPage() {
      if(!isFirstPage()) {
          setPageNumber(pageNumber - 1);
      }
  }

  return (
      <Grid style={{
          margin: '0',
          padding: ' 0',
          overflowX: 'hidden'
        }} 
        container direction='column'>
      <Grid item>
        <Document className={"PDFDocument"} file={pdfData} onLoadSuccess={onDocumentLoadSuccess}>
          <Page className={"PDFPage"} height={height} pageNumber={pageNumber} />
        </Document>
      </Grid>
      <Box p={2}>
      <Tooltip title="Mode plein écran" aria-label="fullscreen">
        <IconButton
        color="secondary"
        variant="contained"
        className={classes.button}
        onClick={() => {
          if (pdfFile instanceof Blob) {
            pdfFile.pdfFile = pdfFile
          }
          const url = window.URL.createObjectURL(pdfFile.pdfFile);
          if (url !== null) {
              var ifrm = document.createElement(
                'iframe'
              );
              ifrm.setAttribute("src",url);
              ifrm.setAttribute("allowfullscreen", true);
              ifrm.setAttribute("id", "IFRAME");
              ifrm.setAttribute("webkitallowfullscreen", true);
              ifrm.style.width = "0px";
              ifrm.style.height = "0px";
              document.getElementById("top").appendChild(ifrm);

            var docelem = document.getElementById("IFRAME");
            if (docelem.requestFullscreen) {
              docelem.requestFullscreen();
            } else if (docelem.mozRequestFullScreen) {
              docelem.mozRequestFullScreen();
            } else if (docelem.webkitRequestFullscreen) {
              docelem.webkitRequestFullscreen();
            } else if (docelem.msRequestFullscreen) {
              docelem.msRequestFullscreen();
            }
          }
        }}
      >
        <Fullscreen />
      </IconButton>
      </Tooltip>
  
        <Button onClick={previousPage} disabled={isFirstPage()}>Previous</Button>
        <Button onClick={nextPage} disabled={isLastPage()}>Next</Button>
        <Chip label={`Page ${pageNumber} / ${numPages}`}></Chip>
              {/* Fullscreen button */}

     </Box>
    </Grid>
  );
}

export default PdfViewer;
