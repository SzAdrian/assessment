import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function EditButton({ handleClose, uid }) {
  const history = useHistory();
  const handleClick = (e) => {
    handleClose();
    history.push("/edit/" + uid);
  };
  return (
    <Button onClick={handleClick} color="primary" endIcon={<EditIcon />}>
      Edit
    </Button>
  );
}

export default EditButton;
