import logo from './logo.svg';
import './App.css';
import { Button, Card, FormControl, Grid, TextField  } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { Typography } from '@material-ui/core';

function App() {

  return (
    <div className="App">
      <header className="App-header">
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
        <Card raised="true" style={{ marginTop:30, borderRadius: 30 }}>
        <FormControl style={{width:450, margin:20}}>
          <Grid container justify="left">
            <Typography style={{marginLeft: 10}}>Connexion </Typography>
          </Grid>
            <TextField style={{padding: 10}} placeholder="Identifiant"></TextField>
            <TextField style={{padding: 10}} placeholder="Mot de passe"></TextField>

            <Link style={{ fontSize: 17}} >S'inscrire</Link>
            <Grid container justify="flex-end">
            <Link style={{ fontSize: 17}} >Mot de passe oublié ? </Link>
            <Button style={{ borderRadius: 50, width: '50px', color: 'white', backgroundColor: "#252C41"}}>OK</Button>
            </Grid>
        </FormControl>
        </Card>
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
      </header>
    </div>
  );
}


export default App;
