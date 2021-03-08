import {useState, useEffect} from 'react';
import {
    Card,
    Grid,
    Button,
    Tooltip,
    Typography
  } from "@material-ui/core";
import { ZoomIn, HighlightOff, Check } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import {useStyles} from '../publication/PublicationTile';

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


    async function updatePublication(id, status) {
        const res = await axios.put(`/api/status/publication/${id}/${status}`);
        console.log(res);
        window.location.reload();
    }

    return(
        <Card
            key={publication.id}
            className={classes.publicationCard}
        >
            <Grid container alignItems="center" item>
                <Grid item xs={3}>
                    <Tooltip  title={`Créee le ${new Date(publication.date).toLocaleDateString()}`}>
                        <Typography>{publication.title}</Typography>
                    </Tooltip>
                </Grid>
                <Grid item xs={3}>
                    {infos && <Typography>{infos.msg}</Typography>}
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
                            updatePublication(publication.id, 'Published')
                        }}
                    >
                        Valider
                    </Button>
                    <Button
                        startIcon={<HighlightOff />}
                        onClick={() => {
                            updatePublication(publication.id, 'Rejected')
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