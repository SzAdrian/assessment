import { IconButton, TableCell, TableRow } from "@material-ui/core";
import React from "react";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Axios from "axios";

function Rows({ page, rowsPerPage, rows, headers, setRows }) {
  const handleLockChange = (row) => {
    setRows(
      rows.map((r) =>
        r.id === row.id
          ? { ...row, status: row.status === "locked" ? "active" : "locked" }
          : r
      )
    );
    Axios.put("http://js-assessment-backend.herokuapp.com/users/" + row.id, {
      status: row.status === "locked" ? "active" : "locked",
    });
  };
  return (
    <>
      {(rowsPerPage > 0
        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : rows
      ).map((row) => {
        return (
          <TableRow
            className={row.status === "locked" ? "strikethroughed" : ""}
            key={row.id}
          >
            {headers.map((header) => (
              <TableCell key={row.id + header.property}>
                <div>
                  {header.type === "date"
                    ? new Date(row[header.property]).toUTCString().slice(0, -7)
                    : row[header.property]}
                </div>
              </TableCell>
            ))}
            <TableCell className="lock">
              <IconButton onClick={() => handleLockChange(row)}>
                {row.status === "locked" ? (
                  <LockOutlinedIcon />
                ) : (
                  <LockOpenOutlinedIcon />
                )}
              </IconButton>
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
}

export default Rows;
