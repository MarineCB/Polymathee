import { withRouter } from "react-router-dom";
import { Toolbar, Grid, Typography, AppBar} from '@material-ui/core';
import logo from './logo.png';

function NavBar() {
  return (
    <div>
    <AppBar position="static">
      <Toolbar>
        <img src={logo} alt='Logo' height={35} />
        <Grid style={{position:'absolute', left:'0%'}}
          container
          justify="center"
        >
          <Typography variant="h6" onClick={() => alert("title clicked")}>
            Polymathée
          </Typography>
        </Grid>
      </Toolbar>
    </AppBar>
    </div>
  );
}

export default withRouter(NavBar);
