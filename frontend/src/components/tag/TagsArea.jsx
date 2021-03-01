import React from "react";
import { withRouter } from "react-router-dom";

import { Box, Grid, TextField, InputAdornment } from "@material-ui/core";
import Tag from "./Tag";

function TagsArea(props) {
  let tags = props.tags;
  let setTags = props.setTags;
  const [text, setText] = React.useState("");
  const handleKeyPress = (data) => {
    if (data.event.key === "Enter") {
      setTags([...tags, { label: data.text }]);
      setText("");
    }
  };

  return (
    <Box p={2}>
      <Grid container>
        {tags.map((t, index) =>
        <Tag
          key={`${t.label}${index}`}
          label={t.label}
          tagSize={props.tagSize}
          onDelete={() => {
            setTags(tags.filter((ct) => ct.label !== t.label));
          }}
        />
        )}
      </Grid>
      <div>
        <TextField
          style={{ marginTop: 30 }}
          variant="outlined"
          label={props.label}
          color="secondary"
          inputProps={{ maxLength: 20 }} // we don't want the tags to be too long
          value={text}
          onChange={(event) => {
            setText(event.target.value);
          }}
          onKeyPress={(e) => handleKeyPress({ event: e, text: text })}
          InputProps={{
            startAdornment: <InputAdornment position="start">+</InputAdornment>,
          }}
        />
      </div>
    </Box>
  );
}

export default withRouter(TagsArea);
