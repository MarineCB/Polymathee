import logo from "./logo.svg";
import React from "react";

import "./App.css";
import {
  Button,
  Card,
  FormControl,
  Grid,
  TextField,
  Chip,
  Box,
  IconButton,
  InputAdornment,
  TextareaAutosize,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Divider,
  ListItem,
  List,
} from "@material-ui/core";
import Link from "@material-ui/core/Link";
import { Typography } from "@material-ui/core";
import {  CloudDownload, CloudUpload, SaveAlt } from "@material-ui/icons";
import { spacing } from "@material-ui/system";
const theme = {
  spacing: 8,
};

function App() {
  return (
    <div className="App">
      <div className="Center-cards">
        <img src={logo} className="App-logo" alt="logo" />
        <Card raised="true" style={{ borderRadius: 30 }}>
          <FormControl style={{ margin: 20 }}>
            <Grid container justify="left">
              <Typography style={{ marginLeft: 10 }}>Inscription </Typography>
            </Grid>
            <Grid>
              <TextField style={{ padding: 10 }} placeholder="Nom">
                Nom
              </TextField>
              <TextField
                style={{ padding: 10 }}
                placeholder="Prenom"
              ></TextField>
            </Grid>
            <TextField
              style={{ padding: 10 }}
              placeholder="Identifiant"
            ></TextField>
            <TextField
              style={{ padding: 10 }}
              placeholder="Mot de passe"
            ></TextField>
            <TextField
              style={{ padding: 10 }}
              placeholder="Addresse mail"
            ></TextField>
            <TextField
              style={{ padding: 10 }}
              placeholder="Confirmer addresse mail"
            ></TextField>
            <Link style={{ fontSize: 17 }}>Se connecter</Link>
            <Grid container justify="flex-end">
              <Button
                style={{
                  borderRadius: 50,
                  width: "50px",
                  color: "white",
                  backgroundColor: "#252C41",
                }}
              >
                OK
              </Button>
            </Grid>
          </FormControl>
        </Card>
        <Card
          raised="true"
          style={{
            borderRadius: 30,
            width: "50%",
            minWidth: "50%",
            marginTop: 20,
          }}
        >
          {/* We set fullWidth to remove the huge margin */}
          <FormControl fullWidth={true} style={{ margin: 20 }}>
            <Grid>
              <Grid container justify="left">
                <Typography variant="h5" style={{ marginLeft: 10 }}>
                  Créer une publication
                </Typography>
              </Grid>
              <TextField
                style={{ padding: 10 }}
                placeholder="Titre"
              ></TextField>
              <Grid item xs={12}>
                <Typography variant="h6">Description</Typography>
                <TextField
                  rowsMax={20}
                  style={{ width: "80%" }}
                  id="outlined-multiline-static"
                  variant="outlined"
                  multiline
                  aria-label="minimum height"
                  rowsMin={5}
                  placeholder="Description your publication"
                />
              </Grid>
              <Grid container alignItems="center" direction="column">
                <Grid item style={{ minWidth: "220" }}>
                  <Typography variant="h6" style={{ padding: 10 }}>
                    Tags
                  </Typography>
                </Grid>
                <Card style={{ padding: 30, width: "60%", border: "1px solid #E5E5E5" }}>
                  <Grid>
                    <Chip
                      style={{
                        marginInline: 2,
                        color: "white",
                        backgroundColor: "#252C41",
                      }}
                      label="EFREI"
                    ></Chip>
                    <Chip
                      style={{
                        marginInline: 2,
                        color: "white",
                        backgroundColor: "#252C41",
                      }}
                      label="Long à lire"
                    ></Chip>
                  </Grid>
                  <div>
                    <TextField
                      style={{ margin: 30 }}
                      id="outlined-adornment-amount"
                      variant="outlined"
                      label="Ajouter un nouveau tag"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">+</InputAdornment>
                        ),
                      }}
                    />
                  </div>
                </Card>
              </Grid>
              <Button
                variant="contained"
                color="default"
                style={{ margin: 20 }}
                startIcon={<CloudUpload />}
              >
                Ajouter une pièce jointe{" "}
              </Button>
              <Grid container justify="center" style={{ marginTop: 20 }}></Grid>
              <Button
                style={{
                  borderRadius: 50,
                  marginInline: 2,
                  color: "white",
                  backgroundColor: "#252C41",
                  textTransform: "none",
                }}
              >
                Enregistrer
              </Button>
              <Button
                style={{
                  borderRadius: 50,
                  marginInline: 2,
                  color: "white",
                  backgroundColor: "#252C41",
                  textTransform: "none",
                }}
              >
                Publier
              </Button>
            </Grid>
          </FormControl>
        </Card>
        <Grid
          direction="column"
          container
          style={{ width: "50%", marginTop: 20, background: "#E5E5E5" }}
        >
          {" "}
          <Card raised="true">
            <Typography variant="h5" style={{ marginTop: 20 }}>
              Publications
            </Typography>
            <List>
              <Card
                style={{ padding: 10, margin: 20, border: "1px solid #E5E5E5" }}
              >
                <Grid style={{ alignItems: "center" }} container item>
                  <Grid item xs={3}>
                    <Typography variant="h6">Efrei Formal Modelling</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>Sauvegarder un brouillon</Typography>
                  </Grid>
                  <Grid
                    container
                    justify="flex-end"
                    alignItems="center"
                    item
                    xs={5}
                  >
                    <Box
                      variant="contained"
                      style={{
                        background: "orange",
                        // Parallelogram shape
                        transform: "skewX(-20deg)",
                        minHeight: "20px",
                        minWidth: "20px",
                        marginRight: 5,
                      }}
                    />
                    <Box
                      variant="contained"
                      style={{
                        background: "#F0F0F0",
                        // Parallelogram shape
                        transform: "skewX(-20deg)",
                        minHeight: "20px",
                        minWidth: "20px",
                        marginInline: 5,
                      }}
                    />
                    <Box
                      variant="contained"
                      style={{
                        background: "#F0F0F0",
                        // Parallelogram shape
                        transform: "skewX(-20deg)",
                        minHeight: "20px",
                        minWidth: "20px",
                        marginLeft: 5,
                      }}
                    />
                  </Grid>
                </Grid>
              </Card>
              <Card
                style={{ padding: 10, margin: 20, border: "1px solid #E5E5E5" }}
              >
                <Grid style={{ alignItems: "center" }} container item>
                  <Grid item xs={3}>
                    <Typography variant="h6">DevOps</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>Sauvegarder un brouillon</Typography>
                  </Grid>
                  <Grid
                    container
                    justify="flex-end"
                    alignItems="center"
                    item
                    xs={5}
                  >
                    <Box
                      variant="contained"
                      style={{
                        background: "orange",
                        // Parallelogram shape
                        transform: "skewX(-20deg)",

                        minHeight: "20px",
                        minWidth: "20px",
                        marginRight: 5,
                      }}
                    />
                    <Box
                      variant="contained"
                      style={{
                        background: "#F0F0F0",
                        // Parallelogram shape
                        transform: "skewX(-20deg)",
                        minHeight: "20px",
                        minWidth: "20px",
                        marginInline: 5,
                      }}
                    />
                    <Box
                      variant="contained"
                      style={{
                        background: "#F0F0F0",
                        // Parallelogram shape
                        transform: "skewX(-20deg)",

                        minHeight: "20px",
                        minWidth: "20px",
                        marginLeft: 5,
                      }}
                    />
                  </Grid>
                </Grid>
              </Card>
            </List>
          </Card>
          <Card raised="true" style={{ marginTop: "30px" }}>
            <Typography variant="h5">Favoris</Typography>
            <List>
              <Card
                style={{ padding: 10, margin: 20, border: "1px solid #E5E5E5" }}
              >
                <Grid style={{ alignItems: "center" }} container item>
                  <Grid item xs={3}>
                    <Typography variant="h6">Efrei Formal Modelling</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography>20/12/2020</Typography>
                  </Grid>
                  <Grid item xs={4} justify="flex-end">
                    <Button
                      style={{
                        borderRadius: 50,
                        color: "white",
                        backgroundColor: "#252C41",
                      }}
                    >
                      Remove
                    </Button>
                  </Grid>
                </Grid>
              </Card>
              <Card
                style={{ padding: 10, margin: 20, border: "1px solid #E5E5E5" }}
              >
                <Grid style={{ alignItems: "center" }} container item>
                  <Grid item xs={3}>
                    <Typography variant="h6">Canaux de Transmission</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography>20/12/2020</Typography>
                  </Grid>
                  <Grid item xs={4} justify="flex-end">
                    <Button
                      style={{
                        borderRadius: 50,
                        color: "white",
                        backgroundColor: "#252C41",
                      }}
                    >
                      Remove
                    </Button>
                  </Grid>
                </Grid>
              </Card>
            </List>
          </Card>
        </Grid>

        <p>
          Edit <code>src/App.jsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </div>
      <div style={{ background: "#E5E5E5" }}>
        <Grid spacing={5} container direction="row">
          <Grid item sm={6}>
            <img
              style={{ maxWidth: "100%", maxHeight: "100%" }}
              alt="Nom du pdf"
              src="https://rightword.com.au/ptero/wp-content/uploads/2011/07/iBooks_PDF_read.png"
            />
          </Grid>
          {/* right side of the page, with description card + tag list */}
          <Grid item sm={6}>
            <Typography variant="caption">282 téléchargement, publié le 28/03/2020 par </Typography>
            <Chip label="Dekka"></Chip>
            <Card raised="true"  style={{marginTop:'20px'}}>
              <Grid item style={{ padding: "20px" }}>
                <Typography variant="h5">A Wonder book</Typography>
                <Typography>Description</Typography>
                <Typography>
                  C'est un roman sympa, en anglais par contre. C'est un des
                  livres possibles à lire en comm
                </Typography>
                {/* Comment area */}
                <Grid>
                  <Typography>18 comments</Typography>
                  <Card raised="true"  style={{marginBlock:'20px'}}>
                    <List>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar
                            alt="John H"
                            src="/static/images/avatar/1.jpg"
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary="John H"
                          secondary={
                            <React.Fragment>
                              <Typography
                                component="span"
                                variant="body2"
                                color="textPrimary"
                              >
                              02/03/2020
                              </Typography>
                              {
                                " — Best storyline ever, i already read this book 2 times and i’m not going to stop. A must have"
                              }
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar
                            alt="Dekaa"
                            src="/static/images/avatar/2.jpg"
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary="Dekka"
                          secondary={
                            <React.Fragment>
                              <Typography
                                component="span"
                                variant="body2"
                                color="textPrimary"
                              >
                              20/03/2020
                              </Typography>
                              {
                                " —Sympa le livre!                                "
                              }
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar
                            alt="Cindy Baker"
                            src="/static/images/avatar/3.jpg"
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary="Aymeric"
                          secondary={
                            <React.Fragment>
                              <Typography
                                component="span"
                                variant="body2"
                                color="textPrimary"
                              >
                                31/03/2020
                              </Typography>
                              {
                                " — C'est si bien que ça ?"
                              }
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                    </List>
                  </Card>
                  <Button style={{background: '#252C41', marginInline:'2px', color:'white'}}
                          startIcon={<SaveAlt />}
                  >Télécharger</Button>
                  <Button style={{background:'#252C41', marginInline:'2px', color:'white'}}
                          startIcon={<CloudDownload />}
                  >Enregistrer</Button>
                </Grid>
              </Grid>
            </Card>
            <Grid container alignItems="center" direction="column">
              <Grid item>
                <Typography variant="h6" style={{ padding: 10 }}>
                  Tags
                </Typography>
              </Grid>
              <Grid>
                <Chip
                  style={{
                    marginInline: 2,
                    color: "white",
                    backgroundColor: "#252C41",
                  }}
                  label="Long à lire"
                ></Chip>
                <Chip
                  style={{
                    marginInline: 2,
                    color: "white",
                    backgroundColor: "#252C41",
                  }}
                  label="Anglais"
                ></Chip>
                <Chip
                  style={{
                    marginInline: 2,
                    color: "white",
                    backgroundColor: "#252C41",
                  }}
                  label="Communication"
                ></Chip>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;
