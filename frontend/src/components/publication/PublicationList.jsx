import React, {useContext} from "react";
import { withRouter } from "react-router-dom";
import {
  Box,
  Card,
  Typography,
  ListItemText,
  ListItem,
  List,
  Grid,
} from "@material-ui/core";
import { Favorite, GetApp } from "@material-ui/icons";
import Tag from "../tag/Tag";
import { makeStyles } from "@material-ui/core/styles";
import { PublicationContext } from "../../store/PublicationContext";

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

function extractContent(s) {
  var span = document.createElement("span");
  span.innerHTML = s;
  return span.textContent;
}

function PublicationList() {
  const classes = useStyles();

  const [Publications] = useContext(PublicationContext);
  const listItems = Publications.map((publication, index) => {
    const tags = publication.tags.split(",");

    return (
      <Box flexGrow={1} key={index} m={2}>
        <Card style={{ cursor: "pointer" }}>
          <ListItem>
            <ListItemText
              primary={publication.title}
              secondary={
                <React.Fragment>
                  {new Date(publication.date).toLocaleDateString() +" "+ new Date(publication.date).toLocaleTimeString()}
                </React.Fragment>
              }
            />
          </ListItem>
          <Box
            px={2}
            mt={0}
            maxWidth="100%"
            whiteSpace="nowrap"
            my={1}
            textOverflow="ellipsis"
            overflow="hidden"
            textAlign="start"
          >
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
              {extractContent(publication.content)}
            </Typography>
          </Box>
          <Box p={2}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              {publication.userId.name}
              <Box>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <Favorite />
                  {publication.likeNumber}
                </Grid>
              </Box>
              <Box>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <GetApp />
                  {publication.downloadNumber}
                </Grid>
              </Box>
              <Box>
                {tags.map((t, index) => (
                  <Tag
                    key={`${t}${index}`}
                    label={t}
                    tagSize="small"
                    variant="default"
                  />
                ))}
              </Box>
            </Grid>
          </Box>
        </Card>
      </Box>
    );
  });
  return <List>{listItems}</List>;
}

export default withRouter(PublicationList);
