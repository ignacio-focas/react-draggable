import React from "react";
import { Input } from "semantic-ui-react";

function TagInfo(props) {
  const { id, label, value } = props;

  return <Input id={id} label={label} readOnly defaultValue={value} />;
}

export default TagInfo;
