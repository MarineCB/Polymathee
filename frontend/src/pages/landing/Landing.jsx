import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { Parallax } from "react-parallax";
import image from "./landingImage.jpg";
import { Box, Card, Typography, Avatar, Grid, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import {
  FindInPage,
  Create,
  SaveAlt,
  Forum,
  FilterList,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  center: {
    position: "absolute",
    top: "65%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
  title: {
    padding: 20,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    color: "white",
    textShadow: "2px 2px 1px  #000",
  },
  large: {
    width: theme.spacing(9),
    height: theme.spacing(9),
    backgroundColor: theme.palette.primary.main,
  },
  medium: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
}));

function Landing() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Box width="75%" mx="auto" textAlign="center">
      <Card spacing={4}>
        <Box m={3}>
          <Parallax blur={4} bgImage={image} strength={-280}>
            <div style={{ height: 500 }}>
              <Typography className={classes.title} variant="h2">
                Polymathée
              </Typography>
              <Button
                color="secondary"
                variant="contained"
                className={classes.center}
                onClick={() => {
                  history.push({
                    pathname: "/homepage",
                  });
                }}
              >
                Découvrir
              </Button>
            </div>
          </Parallax>
        </Box>
        <br />
        <br />
        <Typography variant="h5">
          La plateforme de partage de connaissances pour les étudiants, par les
          étudiants !
        </Typography>
        <br />
        <Box my={10}>
          <Grid container justify="space-evenly">
            <Grid item xs={3}>
              <Grid
                container
                item
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Avatar className={classes.large}>
                  <FindInPage className={classes.medium} />
                </Avatar>
                <br />
                <Typography variant="h6">Consultation</Typography>
                <Typography>
                  Consultez les publications partagées par d'autres étudiants
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <Grid
                container
                item
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Avatar className={classes.large}>
                  <Create className={classes.medium} />
                </Avatar>
                <br />
                <Typography variant="h6">Publication</Typography>
                <Typography>
                  Partagez vos propres publications et documents pdf
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <Grid
                container
                item
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Avatar className={classes.large}>
                  <SaveAlt className={classes.medium} />
                </Avatar>
                <br />
                <Typography variant="h6">Téléchargement et favoris</Typography>
                <Typography>
                  Téléchargez ou sauvegardez les publications que vous ne voulez
                  pas perdre
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <br />
          <br />
          <Grid container justify="center" spacing={10}>
            <Grid item xs={3}>
              <Grid
                container
                item
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Avatar className={classes.large}>
                  <FilterList className={classes.medium} />
                </Avatar>
                <br />
                <Typography variant="h6">Tags</Typography>
                <Typography variant="subtitle1">
                  Filtrez vos recherches et catégorisez vos publications grâce
                  aux tags
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <Grid
                container
                item
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Avatar className={classes.large}>
                  <Forum className={classes.medium} />
                </Avatar>
                <br />
                <Typography variant="h6">Commentaires</Typography>
                <Typography>Échangez avec d'autres étudiants</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box m={6}>
          <Typography
            textAlign="center"
            variant="h5"
            style={{ fontWeight: "bold" }}
          >
            À propos
          </Typography>
          <Box textAlign="start" mt={3}>
            <Typography variant="h6">Qu'est-ce que Polymathée ?</Typography>

            <Typography align="justify" variant="subtitle1">
              Polymathée est un site de partage de connaissances en ligne où les
              étudiants, du secondaire au supérieur, peuvent discuter et
              s'entraider. Les étudiants peuvent y partager des documents ainsi
              que les compléter avec une description ou des explications. Il est
              également possible d'échanger avec les autres étudiants sur un fil
              dédié à chaque publication pour partager ses incompréhensions,
              reflexions ou solutions.
            </Typography>
          </Box>
          <Box textAlign="start" my={2}>
            <Typography variant="h6">
              Peur d'être perdu dans toutes les publications ?
            </Typography>
            <Typography align="justify" variant="subtitle1">
              Polymathée est basé sur l'utilisation de tags pour permettre de
              catégoriser les publications plus efficacement. Ainsi, il est
              possible de filtrer les publications existantes par tags ou par
              utilisateurs.
            </Typography>
          </Box>
          <Box textAlign="start" my={2}>
            <Typography variant="h6">
              Comment s'assurer de la qualité du contenu?
            </Typography>
            <Typography align="justify" variant="subtitle1">
              Nos publications sont vérifiées par des modérateurs pour s'assurer
              qu'elles correspondent à nos standards de qualité. De plus, les
              étudiants peuvent signaler les publications et commentaires s'ils
              jugent qui ne sont pas appropriés.
            </Typography>
          </Box>
        </Box>
        <br />
        <br />
      </Card>
    </Box>
  );
}

export default withRouter(Landing);
