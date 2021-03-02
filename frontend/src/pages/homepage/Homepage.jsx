import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import {
  Box,
  Card,
  Grid,
  Slide,
  Typography,
  Fab,
  Button,
  Divider,
} from "@material-ui/core";
import { useCallback, useEffect } from "react";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { makeStyles } from "@material-ui/core/styles";
import PublicationList from "../../components/publication/PublicationList";
import TagsArea from "../../components/tag/TagsArea";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

function Homepage() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [publications, setPublications] = React.useState([]);
  const [tags, setTags] = React.useState([]);
  const [users, setUsers] = React.useState([]);

  const loadPublications = useCallback(() => {
    axios.get("api/publications").then((res) => {
      setPublications(res.data);
    });
  }, []);

  useEffect(() => {
    loadPublications();
  }, [loadPublications]);

  return (
    <Grid style={{ maxHeight: "10vh" }} container justify="center">
      <Box
        zIndex="tooltip"
        position="fixed"
        left={0}
        minWidth="130px"
        maxWidth="200px"
        width="13%"
      >
        {open ? (
          <Fab
            className={classes.margin}
            size="small"
            variant="extended"
            color="secondary"
            onClick={handleDrawerClose}
          >
            <Typography className={classes.margin}>Filtres</Typography>
            <ChevronLeftIcon style={{ color: "white" }} />
          </Fab>
        ) : (
          <Fab
            className={classes.margin}
            size="small"
            variant="extended"
            color="secondary"
            onClick={handleDrawerOpen}
          >
            <Typography className={classes.margin}>Filtres</Typography>
            <ChevronRightIcon style={{ color: "white" }} />
          </Fab>
        )}
        <Slide direction="right" in={open} mountOnEnter unmountOnExit>
          <Card style={{ height: "70vh", overflow: "auto" }} elevation={2}>
                <TagsArea
                  tags={tags}
                  setTags={setTags}
                  tagSize="small"
                  label="Filtrer par tag"
                />
                <br/>
                <Divider />
                <TagsArea
                  tags={users}
                  setTags={setUsers}
                  tagSize="small"
                  label="Filtrer par utilisateur"
                />
                <br/>
                <Divider />
              <Box my={4}>
                <Button variant="contained" color="secondary">
                  Chercher
                </Button>
              </Box>
          </Card>
        </Slide>
      </Box>
      <Box flexGrow={1} maxWidth="60%">
        <PublicationList publications={publications} />
      </Box>
    </Grid>
  );
}

export default withRouter(Homepage);
