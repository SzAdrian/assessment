import { TableCell, TableRow } from "@material-ui/core";
import React from "react";

function Headers({ headers }) {
  return (
    <TableRow>
      {headers.map((header, i) => (
        <TableCell key={i} align="right">
          {header.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

export default Headers;
