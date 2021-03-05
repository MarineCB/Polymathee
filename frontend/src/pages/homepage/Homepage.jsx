import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Card,
  Grid,
  Slide,
  Typography,
  Fab,
  Button,
  Divider,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { useEffect, useContext } from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { makeStyles } from "@material-ui/core/styles";
import PublicationList from "../../components/publication/PublicationList";
import CompletionTagArea from "../../components/tag/CompletionTagsArea";
import { PublicationContext } from "../../store/PublicationContext";

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

  const [Publications, SetPublications] = useContext(PublicationContext);
  const [tags, _setTags] = React.useState([]);
  const [users, _setUsers] = React.useState([]);
  const [order, setOrder] = React.useState("");

  const setTags = (tag) => {
    if (tags.filter(e => e.label === tag.label).length === 0) _setTags([...tags,tag]);
  };

  const setUsers = (user) => {
    if (users.filter(e => e.label === user.label).length === 0) _setUsers([...users,user]);
  };

  const handleChange = (event) => {
    setOrder(event.target.value);
    if (event.target.value === "like") {
      SetPublications(
        Publications.sort(function (a, b) {
          return b.likeNumber - a.likeNumber;
        })
      );
    } else if (event.target.value === "date") {
      Publications.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
    }
  };

  const Search = async () => {
    let tagslabel = [];
    let userslabel = [];
    setOrder("date");
    tags.forEach((element) => {
      tagslabel.push(element.label);
    });
    users.forEach((element) => {
      userslabel.push(element.label);
    });
    const tagsString = tagslabel.join(",");
    const usersString = userslabel.join(",");
    let url = "api/publications/filter/%7Buser_name%7D/%7Btags%7D?";
    if (userslabel !== undefined && usersString !== "")
      url += "user_name=" + usersString;
    if (tagsString !== undefined && tagsString !== "")
      url += "&tags=" + tagsString;
    const response = await axios.get(url);
    SetPublications(response.data);
    //ApplyChange()
  };

  useEffect(() => {}, [Publications]);

  return (
    <Grid style={{ maxHeight: "10vh" }} container justify="center">
      <Box
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
            <CompletionTagArea
              tags={tags}
              setTags={setTags}
              tagSize="small"
              label="Filtrer par tag"
              url="api/publication/tags"
            />
            <br />
            <Divider />
            <CompletionTagArea
              tags={users}
              setTags={setUsers}
              tagSize="small"
              label="Filtrer par utilisateur"
              url="api/users"
            />
            <br />
            <Divider />
            <Box p={3} minWidth="70%">
              <FormLabel component="legend">Order by</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={order}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="date"
                  control={<Radio size="small" />}
                  label="Date"
                />
                <FormControlLabel
                  value="like"
                  control={<Radio size="small" />}
                  label="Like"
                />
              </RadioGroup>
            </Box>
            <Box my={4} textAlign="center">
              <Button
                onClick={Search}
                size="small"
                variant="contained"
                color="secondary"
              >
                Rechercher
              </Button>
            </Box>
          </Card>
        </Slide>
      </Box>
      <Box flexGrow={1} maxWidth="60%">
        <PublicationList />
      </Box>
    </Grid>
  );
}

export default withRouter(Homepage);
