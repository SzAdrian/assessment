import { TableCell, TableRow } from "@material-ui/core";
import React from "react";

function Rows({ page, rowsPerPage, rows, headers }) {
  return (
    <>
      {(rowsPerPage > 0
        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : rows
      ).map((row) => {
        return (
          <TableRow key={row.id}>
            {headers.map((header) => (
              <TableCell key={row.id + header.property}>
                <div>
                  {header.type === "date"
                    ? new Date(row[header.property]).toUTCString().slice(0, -7)
                    : row[header.property]}
                </div>
              </TableCell>
            ))}
          </TableRow>
        );
      })}
    </>
  );
}

export default Rows;
