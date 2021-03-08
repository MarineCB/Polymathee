import {
  Avatar,
  ListItemAvatar,
  ListItemText,
  ListItem,
} from "@material-ui/core";
import React from "react";
import {
  IconButton,
  Typography,
  Grid,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@material-ui/core";
import {
  ThumbUp,
  ThumbDown,
  MoreVert,
  Delete,
  Flag,
  ThumbDownAltOutlined,
  ThumbUpAltOutlined,
} from "@material-ui/icons";
import axios from "axios";

function deleteComment(commentId, loadComments, publicationId, setComments) {
  const URL_DELETE_COMMENT = "/api/comment";
  axios
    .delete(URL_DELETE_COMMENT + "/" + commentId)
    .then((res) => {
      // Resync comments
      loadComments(publicationId, setComments);
    })
    .catch((e) => {
      alert("Fail delete comment");
      console.error(e);
    });
}

function voteComment(
  publicationId,
  userId,
  commentId,
  setDisliked,
  setLiked,
  vote
) {
  const URL_VOTE_COMMENT = "/api/vote";
  axios
    .post(URL_VOTE_COMMENT, {
      commentary_id: commentId,
      user_id: userId,
      vote: vote,
    })
    .then((res) => {
      // Resync comments like appearance
      setLiked(vote);
      setDisliked(!vote);
    })
    .catch((e) => {
      console.error(e);
    });
}

function Comment({
  comment,
  loadComments,
  publicationId,
  setComments,
  userId,
  reportAction
}) {
  const isAuthor = Boolean(userId === comment.userId.id);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [reportDisabled, setReportDisabled] = React.useState(false);
  const [liked, setLiked] = React.useState(false); // Like Button appearance
  const [disliked, setDisliked] = React.useState(false); // Dislike Button appearance
  const OpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const d = new Date(comment.date);
  const CloseMenu = () => {
    setAnchorEl(null);
  };
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
              {d.toLocaleDateString() + " " + d.toLocaleTimeString()}
              <br />
            </Typography>
            {comment.content}
          </React.Fragment>
        }
      />

      <Grid alignItems="center" container justify="flex-end">
        <Typography>{comment.upvote}</Typography>
        <Grid>
          {liked ? (
            <IconButton style={{ marginRight: "20px", marginLeft: "5px" }}>
              <ThumbUp />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => {
                voteComment(
                  publicationId,
                  userId,
                  comment.id,
                  setDisliked,
                  setLiked,
                  true
                );
              }}
              style={{ marginRight: "20px", marginLeft: "5px" }}
            >
              <ThumbUpAltOutlined />
            </IconButton>
          )}
        </Grid>
        <Typography>{comment.downvote}</Typography>
        <Grid style={{ marginRight: "20px", marginLeft: "5px" }}>
          {disliked ? (
            <IconButton>
              <ThumbDown />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => {
                voteComment(
                  publicationId,
                  userId,
                  comment.id,
                  setDisliked,
                  setLiked,
                  false
                );
              }}
            >
              <ThumbDownAltOutlined />
            </IconButton>
          )}
        </Grid>
        <IconButton
          onClick={OpenMenu}
          style={{ marginRight: "20px", marginLeft: "5px" }}
        >
          <MoreVert />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={CloseMenu}
        >
          <MenuItem
            disabled={reportDisabled}
            onClick={async () => {
              CloseMenu();
              reportAction()
              setReportDisabled(true);
            }}
          >
            <ListItemIcon>
              <Flag fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">
              Signaler comme innappropié
            </Typography>
          </MenuItem>
          <MenuItem
            disabled={!isAuthor}
            onClick={() =>
              deleteComment(
                comment.id,
                loadComments,
                publicationId,
                setComments
              )
            }
          >
            <ListItemIcon>
              <Delete fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Supprimer</Typography>
          </MenuItem>
        </Menu>
      </Grid>
    </ListItem>
  );
}

export default Comment;
