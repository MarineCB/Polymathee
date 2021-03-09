import {
  Avatar,
  ListItemAvatar,
  ListItemText,
  ListItem,
  Grid,
  Typography,
  Button,
} from "@material-ui/core";
import React from "react";
import axios from "axios";
import { Delete } from "@material-ui/icons";

const GenericCommentArea = ({ comment }) => {
  const comment_date = new Date(comment.date);

  async function deletePublication(commentId) {
    await axios.delete(`/api/comment/${commentId}`);
    window.location.reload();
  }

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar alt={comment.userId.name}>{comment.userId.name[0]}</Avatar>
      </ListItemAvatar>
      <ListItemText
        style={{ minWidth: "150px" }}
        primary={comment.userId.name}
        secondary={
          <React.Fragment>
            <Typography component="span" variant="body2" color="textPrimary">
              {comment_date.toLocaleDateString() +
                " " +
                comment_date.toLocaleTimeString()}
              <br />
            </Typography>
            {comment.content}
          </React.Fragment>
        }
      />
      <Grid alignItems="center" container justify="flex-end">
        <Button
          startIcon={<Delete />}
          onClick={() => {
            deletePublication(comment.id);
          }}
        ></Button>
      </Grid>
    </ListItem>
  );
};

export default GenericCommentArea;
