import { Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

import React, { useContext, useState } from "react";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { AppContext } from "../Contexts/AppContext";
import Axios from "axios";

function LockButton({ row }) {
  const [loading, setLoading] = useState(false);
  const { rows, setRows } = useContext(AppContext);

  const handleLockChange = (row) => {
    setLoading(true);
    Axios.put(process.env.REACT_APP_API_URL + "/users/" + row.id + ".json", {
      status: row.status === "locked" ? "active" : "locked",
    })
      .then((resp) => {
        setLoading(false);
        setRows(
          rows.map((r) =>
            r.id === row.id
              ? {
                  ...row,
                  status: row.status === "locked" ? "active" : "locked",
                }
              : r
          )
        );
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Button
        onClick={() => handleLockChange(row)}
        color={row.status === "locked" ? "secondary" : "primary"}
        endIcon={
          loading ? (
            <CircularProgress
              color={row.status === "locked" ? "secondary" : "primary"}
              size={25}
            />
          ) : row.status === "locked" ? (
            <LockOutlinedIcon />
          ) : (
            <LockOpenOutlinedIcon />
          )
        }
      >
        {row.status === "locked" ? "Locked" : "Active"}
      </Button>
    </>
  );
}

export default LockButton;
