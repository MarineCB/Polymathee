import React from "react";

import {
  Chip,
} from "@material-ui/core";

function Tag(props) {
  return (
    <Chip
      style={{ margin: "2px" }}
      variant={props.variant}
      onDelete={props.onDelete}
      color={props.color || "secondary"}
      label={props.label || "outlined"}
    ></Chip>
  );
}

export default Tag;
