import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Link, Typography, Avatar } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { NotListedLocation } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  centered: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80%",
  },
  large: {
    width: theme.spacing(25),
    height: theme.spacing(25),
    backgroundColor: "#D3D3D347",
    margin: "20px",
  },
  medium: {
    width: theme.spacing(11),
    height: theme.spacing(11),
  },
}));

function NotFound() {
  const history = useHistory();
  const classes = useStyles();
  return (
    <div className="App">
      <Box className={classes.centered}>
        <Avatar className={classes.large}>
          <NotListedLocation className={classes.medium}></NotListedLocation>
        </Avatar>
        <Box textAlign="start">
          <Typography variant="h1" color="secondary" paragraph>
            404
          </Typography>
          <Typography variant="h4" color="secondary">
            Sorry, this page does not exist
          </Typography>
		  <br />
        <Link color="primary" onClick={() => history.push("/")}>
          Go to homepage
        </Link>
        </Box>
      </Box>
    </div>
  );
}

export default withRouter(NotFound);
