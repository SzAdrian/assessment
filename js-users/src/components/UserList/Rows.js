import { TableCell, TableRow } from "@material-ui/core";
import React from "react";
import MoreMenu from "./MoreMenu";

function Rows({ page, rowsPerPage, rows, headers, setRows }) {
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
                    ? new Date(row[header.property]).toLocaleDateString() +
                      " " +
                      new Date(row[header.property]).toLocaleTimeString()
                    : row[header.property]}
                </div>
              </TableCell>
            ))}
            <TableCell key={row.id + "more-menu-cell"} className="lock">
              <MoreMenu key={row.id + "more-menu"} row={row} />
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
}

export default Rows;
