import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import { TableFooter, TablePagination } from "@material-ui/core";

const TableContainerStyle = styled(TableContainer)`
  max-height: 100vh;
  table {
    height: 100vh;
  }
  td div,
  th {
    word-break: break-word;
    text-align: center;
  }
  th {
    font-weight: 600;
    font-size: 1.2rem;
  }
  td {
    min-width: 70px;
    width: 300px;
  }

  td div {
    display: flex;
    align-items: center;
    place-content: center;
    overflow: auto;
    width: 100%;
    height: 2.5rem;
    line-height: 1;
    padding: 0.5rem 0;
  }
  tr {
    transition: background-color 0.245s ease;
    :hover {
      background-color: #80808030;
    }
  }
  .MuiTablePagination-root {
    * {
      overflow: hidden;
      width: auto;
    }
  }
`;

export default function BasicTable() {
  const [rows, setRows] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const headers = ["First Name", "Last Name", "Created At"];
  useEffect(() => {
    var x = new XMLHttpRequest();
    x.open(
      "GET",
      "https://cors-anywhere.herokuapp.com/" +
        "http://js-assessment-backend.herokuapp.com/users"
    );
    x.onload = x.onerror = function () {
      setRows(JSON.parse(x.responseText));
    };
    x.send();
  }, []);
  let skeletonRows = [];
  for (let i = 0; i < 50; ++i) {
    skeletonRows.push(
      <TableRow>
        {headers.map(() => (
          <TableCell align="right">
            <Skeleton height={30} />
          </TableCell>
        ))}
      </TableRow>
    );
  }
  return (
    <>
      <TableContainerStyle component={Paper}>
        <Table stickyHeader size="small" aria-label="sticky table">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell align="right">{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          {rows == null ? (
            <TableBody>{skeletonRows}</TableBody>
          ) : (
            <>
              <TableBody>
                {(rowsPerPage > 0
                  ? rows.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : rows
                ).map((row) => (
                  <TableRow key={row.id}>
                    <TableCell align="right">
                      <div>{row["first_name"]}</div>
                    </TableCell>
                    <TableCell align="right">
                      <div>{row["last_name"]}</div>
                    </TableCell>
                    <TableCell align="right">
                      <div>
                        {new Date(row["created_at"]).toUTCString().slice(0, -7)}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    id="table-pagination"
                    rowsPerPageOptions={[]}
                    count={rows.length}
                    rowsPerPage={10}
                    page={page}
                    onChangePage={handleChangePage}
                  />
                </TableRow>
              </TableFooter>
            </>
          )}
        </Table>
      </TableContainerStyle>
    </>
  );
}
