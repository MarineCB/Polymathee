import React from "react";

import {
  Card,
  Grid,
  Divider,
  List,
  IconButton,
  Button,
  InputAdornment,
  Box,
  FormControl,
  OutlinedInput,
} from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { useEffect } from "react";
import Comment from "../commentArea/Comment";
import axios from "axios";
import {  ErrorOutlineRounded, Send } from "@material-ui/icons";
const MAX_COMMENT_LENGTH = 500;
let TEST_USER_ID = 2;






/**
 * Sorting function for the comments
 * @param {JSON} a - comment 
 * @param {JSON} b - comment
 */
const upvoteSort = (a,b)=>parseFloat(b.upvote) - parseFloat(a.upvote)


function sendComment(publicationId, personalCom, comments, setComments) {
  console.log("Sending comment ....");

  const data = {
    "commentary-date": Date.now(),
    commentary_content: personalCom,
    commentary_downvote: 0,
    commentary_report: 0,
    commentary_upvote: 0,
    publication_id: publicationId,
    user_id: TEST_USER_ID,
  };

  const POST_COMMENT_URL = "/api/commentary";
  axios
    .post(POST_COMMENT_URL, data)
    .then((res) => {
      // Resync comments
      loadComments(publicationId, setComments);
    })
    .catch((e) => {
      alert("Comment send fail");
      console.error(e);
    });
}

function loadComments(publicationId, setComments) {
  const COMMENTS_FOR_PUB_URL = "/api/comments/" + publicationId;
  axios
    .get(COMMENTS_FOR_PUB_URL)
    .then((c) => {
      console.log(c.data);
      setComments(c.data);
    })
    .catch((e) => {
      console.error(e);
    });
}

function CommentArea({ publicationId, userId }) {
  const [comments, setComments] = React.useState([]);
  const [personalCom, setPersonalCom] = React.useState("");

  if (!userId) {
    console.warn(
      "Using mock user id because no id was provided " + TEST_USER_ID
    );
  }
  useEffect(() => {
    loadComments(publicationId, setComments);
  }, [publicationId]);
  return (
    <div>
      {/* Comment area */}
      {publicationId !== undefined ? (
        <Grid style={{ margin: "20px" }}>
          <Card raised style={{ marginBlock: "20px" }}>
            <Grid container justify="center" alignItems="center">
              <Box width="100%" m={2}>
                <FormControl fullWidth variant="outlined">
                  <OutlinedInput
                    color="secondary"
                    value={personalCom}
                    style={{ minWidth: "250px" }}
                    multiline
                    placeholder="Réagir à cette publication"
                    onChange={(e) => {
                      if (e.target.value.length < MAX_COMMENT_LENGTH) {
                        setPersonalCom(e.target.value);
                      }
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                         onClick={() => {
                          sendComment(
                            publicationId,
                            personalCom,
                            comments,
                            setComments
                          );
                          setPersonalCom("");
                        }}
                          disabled={personalCom.length === 0}
                          aria-label="send comment"
                        >
                          <Send 
                          
                          />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Box>
              <Box display={personalCom.length > 0 ? "block" : "none"}>
                <Button
                  style={{ marginRight: "5px" }}
                  variant="contained"
                  endIcon={<Send />}
                  color="secondary"
                  onClick={() => {
                    sendComment(
                      publicationId,
                      personalCom,
                      comments,
                      setComments
                    );
                    setPersonalCom("");
                  }}
                >
                  Publier ce commentaire
                </Button>
                <Button
                  style={{ marginRight: "5px" }}
                  variant="outlined"
                  onClick={() => {
                    setPersonalCom("");
                  }}
                  color="primary"
                >
                  Annuler
                </Button>
              </Box>
            </Grid>
            <Grid container justify="flex-start">
              <Box m={2}>
                <Typography variant="h6">
                  {comments.length} commentaire{comments.length > 1 ? "s" : ""}
                </Typography>
              </Box>
            </Grid>
            <List>
              {comments.sort(upvoteSort).map((curCommentData, index) => (
                <div>
                  <Comment
                    key={curCommentData.id}
                    comment={curCommentData}
                    loadComments={loadComments}
                    publicationId={publicationId}
                    setComments={setComments}
                    userId={TEST_USER_ID}
                  />
                  {index < comments.length - 1 ? (
                    <Divider variant="inset" component="li" />
                  ) : (
                    <div />
                  )}
                </div>
              ))}
            </List>
          </Card>
        </Grid>
      ) : (
        <Card raised style={{ marginBlock: "20px", padding: "30px" }}>
          <ErrorOutlineRounded color="error" />
          <Typography>Erreur de chargement des commentaires</Typography>
        </Card>
      )}
    </div>
  );
}
export default CommentArea;
