import {useState, useEffect} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {
    Box,
    Card,
    Grid,
    Button,
    IconButton,
    Tooltip,
    Typography
  } from "@material-ui/core";
import { ZoomIn, Edit, HighlightOff, Check } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "80%",
    },
    parallelogramDone: {
      background: "green",
      // Distord shape
      transform: "skewX(-20deg)",
      minHeight: "20px",
      minWidth: "20px",
      marginRight: 5,
    },
    parallelogramProcessing: {
      background: "orange",
      // Distord shape
      transform: "skewX(-20deg)",
      minHeight: "20px",
      minWidth: "20px",
      marginRight: 5,
    },
    parallelogramInvalid: {
      background: "red",
      // Distord shape
      transform: "skewX(-20deg)",
      minHeight: "20px",
      minWidth: "20px",
      marginRight: 5,
    },
    parallelogramEmpty: {
      background: "#E8E8E8",
      // Distord shape
      transform: "skewX(-20deg)",
      minHeight: "20px",
      minWidth: "20px",
      marginRight: 5,
    },
    publicationCard: {
      padding: 10,
      margin: 20,
      border: "1px solid #E5E5E5",
    },
  }));

function ProgressRects({ publicationInfo }) {
    const rects = [];
    const classes = useStyles();
    for (let i = 0; i < 3; i++) {
        if (i < publicationInfo.step) {
        rects.push(
            <Box
            key={i}
            variant="contained"
            className={classes.parallelogramDone}
            />
        );
        } else if (i > publicationInfo.step) {
        rects.push(
            <Box
            key={i}
            variant="contained"
            className={classes.parallelogramEmpty}
            />
        );
        } else {
        // Show current status color
        rects.push(
            <Box key={i} variant="contained" className={publicationInfo.class} />
        );
        }
    }
    return (
        <Grid container justify="flex-end" alignItems="center" item xs={5}>
        {rects}
        </Grid>
    );
}

const GenericPublicationTile = ({publication}) => {
    const classes = useStyles();
    const history = useHistory();
    const [infos, setInfos] = useState();

    useEffect(() => {
        if(publication) {
            setInfos(GetInfoForPublicationStatus(publication.status));
        }
    },[]);

    function GetInfoForPublicationStatus(status) {
        switch (status) {
          case "Saved":
            return {
              step: 0,
              msg: "Sauvegardé en tant que brouillon",
              class: classes.parallelogramEmpty,
            };
          case "To_Treat":
            return {
              step: 1,
              msg: "En attente de validation",
              class: classes.parallelogramProcessing,
            };
          case "Published":
            return {
              step: 3,
              msg: "Publié",
              class: classes.parallelogramDone,
            };
          case "Rejected":
            return {
              step: 2,
              msg: "Publication refusée",
              class: classes.parallelogramInvalid,
            };
          default:
            console.error(status);
            return {
              step: 0,
              msg: "Statut inconnu",
              class: classes.parallelogramProcessing,
            };
        }
      }

    return(
        <Card
            key={publication.id}
            className={classes.publicationCard}
        >
            <Grid container alignItems="center" item>
                <Grid item xs={3}>
                    <Tooltip  title={"Créee le " + new Date(publication.date).toLocaleDateString()}>
                        <Typography variant="h6">{publication.title}</Typography>
                    </Tooltip>
                </Grid>
                <Grid item xs={3}>
                    {infos ? <Typography>{infos.msg}</Typography> : <Typography>info</Typography>}
                </Grid>
                <Grid item xs={3}>
                    <Button
                        startIcon={<ZoomIn />}
                        onClick={() => {
                        history.push({
                        pathname: "/viewPublication",
                        publicationId: publication.id,
                        });
                        }}
                    >
                        Visionner
                    </Button>
                </Grid>
                
                <Grid container justify="flex-end" alignItems="center" item xs={3}>
                <Button
                        startIcon={<Check />}
                        onClick={() => {
                            console.log("je valide ce taff chacal")
                        }}
                    >
                        Valider
                    </Button>
                    <Button
                        startIcon={<HighlightOff />}
                        onClick={() => {
                            console.log("nul nul nul")
                        }}
                    >
                        Refuser
                    </Button>
                    
                </Grid>
            </Grid>
        </Card>
    );
}

export default GenericPublicationTile;