import {
    Avatar,
    ListItemAvatar,
    ListItemText,
    ListItem,
  } from "@material-ui/core";
  import React from "react";
  import { Typography } from "@material-ui/core";
  function Comment({comment}) {

    
    return(
        <ListItem alignItems="flex-start">
        <ListItemAvatar>
        <Avatar alt={comment.userId.name}/>
        </ListItemAvatar>
        <ListItemText
        primary={comment.userId.name}
        secondary={
            <React.Fragment>
            <Typography
                component="span"
                variant="body2"
                color="textPrimary"
            >
                {comment.date}
            </Typography>
            {comment.content}
            </React.Fragment>
        }
        />
        </ListItem>
    )
}

export default Comment;