import React from "react";

import {
  Card,
  Grid,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Divider,
  ListItem,
  List,
} from "@material-ui/core";
import { Typography } from "@material-ui/core";

function CommentArea() {
  return (
    <div>
      {/* Comment area */}
      <Grid>
        <Typography>18 comments</Typography>
        <Card raised style={{ marginBlock: "20px" }}>
          <List>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="John H" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="John H"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      02/03/2020
                    </Typography>
                    {
                      " — Best storyline ever, i already read this book 2 times and i’m not going to stop. A must have"
                    }
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Dekaa" src="/static/images/avatar/2.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Dekka"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      20/03/2020
                    </Typography>
                    {" —Sympa le livre!"}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Aymeric"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      31/03/2020
                    </Typography>
                    {" — C'est si bien que ça ?"}
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>
        </Card>
      </Grid>
    </div>
  );
}
export default CommentArea;
