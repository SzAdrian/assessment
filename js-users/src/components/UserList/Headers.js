import { TableCell, TableRow } from "@material-ui/core";
import React from "react";

function Headers({ headers }) {
  return (
    <TableRow>
      {headers.map((header, i) => (
        <TableCell key={i}>{header.label}</TableCell>
      ))}
      <TableCell></TableCell>
    </TableRow>
  );
}

export default Headers;
