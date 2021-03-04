import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Grid,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import Tag from "./Tag";

function CompletionTagsArea(props) {
  let tags = props.tags;
  let setTags = props.setTags;
  // eslint-disable-next-line
  const [text,setText] = React.useState("");

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await axios.get("api/publication/tags");
      const tags = response.data;
      if (active) {
        setOptions(Object.keys(tags).map((index) => tags[index]));
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Box p={2}>
      <Grid container>
        {tags.map((t, index) => (
          <Tag
            key={`${t.label}${index}`}
            label={t.label}
            tagSize={props.tagSize}
            onDelete={() => {
              setTags(tags.filter((ct) => ct.label !== t.label));
            }}
          />
        ))}
      </Grid>
      <div>
        <Autocomplete
          style={{ marginTop: 30 }}
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          onChange={(event) => {
            if (
              event.target.textContent !== "" &&
              event.target.textContent !== undefined
            ) {
              setText(event.target.textContent);
              setTags([...tags, { label: event.target.textContent }]);
              setText("");
            }
          }}
          getOptionSelected={(option, value) => option === value}
          getOptionLabel={(option) => option}
          options={options}
          loading={loading}
          renderInput={(params) => (
            <TextField
              {...params}
              InputLabelProps={{
                shrink: true,
              }}
              label={props.label}
              color="secondary"
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
      </div>
    </Box>
  );
}

export default withRouter(CompletionTagsArea);
