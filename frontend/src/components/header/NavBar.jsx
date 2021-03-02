import { withRouter } from "react-router-dom";
import { Toolbar, Grid, Typography, AppBar } from "@material-ui/core";
import logo from "./logo.png";
import { useHistory } from "react-router-dom";

function NavBar() {
  const history = useHistory();
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <img src={logo} alt="Logo" height={35} />
          <Grid
            style={{ position: "absolute", left: "0%" }}
            container
            justify="center"
          >
            <Typography variant="h6" onClick={() => history.push("/")}>
              Polymathée
            </Typography>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(NavBar);
