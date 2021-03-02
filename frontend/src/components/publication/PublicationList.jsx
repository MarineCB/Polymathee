import React from "react";
import { withRouter } from "react-router-dom";
import {
  Box,
  Card,
  Typography,
  ListItemText,
  ListItem,
  List,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";




const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  sticky: {
    position: "fixed",
    left: 0,
    justify: "center",
    direction: "column",
    backgroundColor: theme.color,
    display: "flex",
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

function PublicationList({ publications }) {
  const classes = useStyles();
  
  //const pdfFile;
  const listItems = publications.map((publication, index) => (
    <Box key={index} m={2}>
      <Card>
        <ListItem>
          <ListItemText
            primary={publication.title}
            secondary={
              <React.Fragment>
                {publication.date}
                <br />
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {publication.description}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      </Card>
    </Box>
  ));
  return <List>{listItems}</List>;
}

export default withRouter(PublicationList);
