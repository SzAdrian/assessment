import React from "react";
import { useHistory } from "react-router-dom";

import AddIcon from "@material-ui/icons/Add";
import { Fab } from "@material-ui/core";
function AddUserButton() {
  const history = useHistory();
  const handleClick = () => {
    history.push("/new");
  };
  return (
    <Fab
      data-testid="add-user-button"
      onClick={handleClick}
      id="add-user"
      color="primary"
      aria-label="add"
    >
      <AddIcon />
    </Fab>
  );
}

export default AddUserButton;
