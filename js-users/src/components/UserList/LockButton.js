import { Button, IconButton } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

import React, { useContext, useState } from "react";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { AppContext } from "../Contexts/AppContext";

function LockButton({ row }) {
  const [loading, setLoading] = useState(false);
  const { rows, setRows } = useContext(AppContext);

  const handleLockChange = (row) => {
    var x = new XMLHttpRequest();
    x.open(
      "PUT",
      "https://cors-anywhere.herokuapp.com/" +
        process.env.REACT_APP_API_URL +
        "/users/" +
        row.id
    );
    x.setRequestHeader("Content-Type", "application/json");

    x.onload = x.onerror = function () {
      setLoading(false);
      if (Math.floor(x.status / 100) === 2) {
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
      } else {
        console.log(x.responseText);
      }
    };
    x.onloadstart = function () {
      setLoading(true);
    };
    x.send(
      JSON.stringify({ status: row.status === "locked" ? "active" : "locked" })
    );
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
