import React from "react";

import {
  Chip,
} from "@material-ui/core";

function Tag(props) {
  return (
    <Chip
      style={{ margin: "2px" }}
      variant={props.variant || "outlined"}
      onDelete={props.onDelete}
      color={props.color || "secondary"}
      label={props.label}
      size={props.tagSize}
    ></Chip>
  );
}

export default Tag;
