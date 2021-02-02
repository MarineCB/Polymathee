import logo from './logo.svg';
import './App.css';
import { Button, Card, FormControl, Grid, TextField,Chip, IconButton, InputAdornment, List  } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { Typography } from '@material-ui/core';
import {Add, CloudUpload} from '@material-ui/icons'
function App() {

  return (
    <div className="App">
      <div className="Center-cards">
        <img src={logo} className="App-logo" alt="logo" />
        <Card raised="true" style={{ borderRadius: 30 }}>
        <FormControl style={{margin:20}}>
          <Grid container justify="left">
            <Typography style={{marginLeft: 10}}>Inscription </Typography>
          </Grid>
          <Grid spacing={2}>
            <TextField style={{padding: 10}} placeholder="Nom">Nom</TextField>
            <TextField style={{padding: 10}} placeholder="Prenom"></TextField>
          </Grid>
            <TextField style={{padding: 10}} placeholder="Identifiant"></TextField>
            <TextField style={{padding: 10}} placeholder="Mot de passe"></TextField>
            <TextField style={{padding: 10}} placeholder="Addresse mail"></TextField>
            <TextField style={{padding: 10}} placeholder="Confirmer addresse mail"></TextField>
            <Link style={{ fontSize: 17}} >Se connecter</Link>
            <Grid container justify="flex-end">
            <Button style={{ borderRadius: 50, width: '50px', color: 'white', backgroundColor: "#252C41"}}>OK</Button>
            </Grid>
        </FormControl>
        </Card>
        <Card raised="true" style={{ borderRadius: 10, marginTop: 20 }}>
        <FormControl style={{margin:20}}>
          <Grid container justify="left">
            <Typography style={{marginLeft: 10}}>Créer une publication </Typography>
          </Grid>
            <TextField style={{padding: 10}} placeholder="Titre"></TextField>
            <TextField style={{padding: 10}} placeholder="Description"></TextField>
          <Grid container>
            <Grid style={{paddingInline: 10}}>
              <Typography style={{padding: 10}} >Tag principal</Typography>
              <Card style={{padding: 30}}>
              <Chip style={{marginInline:2, backgroundColor: '#528FF8'}} label="Maths"></Chip>
              <Chip style={{marginInline:2, backgroundColor: '#528FF8'}} label="Biologie"></Chip>
            </Card>
            </Grid>
            <Grid>
              <Typography style={{padding: 10}} >Tags supplémentaires</Typography>
              <Card style={{padding: 30}}>
                <Grid > 
                <Chip style={{marginInline:2, backgroundColor: '#528FF8'}} label="EFREI"></Chip>
                <Chip style={{marginInline:2, backgroundColor: '#528FF8'}}  label="Long à lire"></Chip>
                </Grid>
                <div>
        <TextField
        style= {{margin:30}}
          id="outlined-adornment-amount"
          variant="outlined"
          label="Ajouter un nouveau tag"
          InputProps={{
            startAdornment: <InputAdornment position="start">+</InputAdornment>,
          }}
        />
                </div>
              </Card>
            </Grid>
          </Grid>
            <Button
        variant="contained"
        color="default"
        style = {{margin: 20}}
        startIcon={<CloudUpload />}
      >Ajouter une pièce jointe </Button>
            <Grid container justify="center" style={{marginTop:20}}>
              <Button style={{ borderRadius: 50, marginInline:2 ,color: 'white', backgroundColor: "#528FF8", textTransform:'none'}}>Enregistrer</Button>
              <Button style={{ borderRadius: 50, marginInline:2 ,color: 'white', backgroundColor: "#528FF8", textTransform:'none'}}>Publier</Button>
            </Grid>
        </FormControl>
        </Card>
        <Grid direction='column' container style={{background:'#116466'}}>
          <Typography style={{fontSize:30}}>Publications</Typography>
          <Card>
          </Card>
          <List>
            <Card style={{padding:10, margin:20}}>
              <Grid container item direction='row'>
                <Grid item xs={3}>
                  <Button variant="contained"/>
                </Grid>
                <Grid item xs={3}>
                  <Button variant="contained"/>
                </Grid>
                <Grid item xs={3}>
                  <Button variant="contained"/>
                </Grid>
              </Grid>
            </Card>
            <Card style={{padding:10, margin:20}}>
              <Grid container item>
              <Grid item xs={3}>
                <Typography >Efrei Formal Modelling</Typography>
                </Grid>
                <Grid item xs={3}>
                <Typography>Sauvegarder un brouillon</Typography>
                </Grid>
                <Grid item xs={3}>
                <Button variant="contained" style={{background:'orange'}}/>
                <Button variant="contained" style={{background:'white'}}/>
                <Button variant="contained" style={{background:'white'}}/>
                </Grid>
              </Grid>
            </Card>
          </List>
          <Typography  style={{fontSize:30}}>Favoris</Typography>
          <Card>
          </Card>
        </Grid>
        <p>
          Edit <code>src/App.js</code> and save to reload.
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
    </div>
  );
}


export default App;
