import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";
import { TableFooter, TablePagination } from "@material-ui/core";
import SkeletonRows from "./SkeletonRows";
import Headers from "./Headers";
import Rows from "./Rows";

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

export default function UserList() {
  console.log("render");
  const [rows, setRows] = useState(null);
  const [page, setPage] = useState(0);
  const [headers, setHeaders] = useState([]);
  const ROWS_PER_PAGE = 10;

  const createHeader = (label, property, type) => {
    return { label, property, type };
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    setHeaders([
      createHeader("First Name", "first_name", "text"),
      createHeader("Last Name", "last_name", "text"),
      createHeader("Created At", "created_at", "date"),
    ]);
    //this is my solution to get around the CORS policy issues
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

  return (
    <>
      <TableContainerStyle component={Paper}>
        <Table stickyHeader size="small" aria-label="sticky table">
          <TableHead>
            <Headers headers={headers} />
          </TableHead>
          {rows == null ? (
            <TableBody>
              <SkeletonRows columnCount={headers.length} rowCount={30} />
            </TableBody>
          ) : (
            <>
              <TableBody>
                <Rows
                  page={page}
                  rowsPerPage={ROWS_PER_PAGE}
                  headers={headers}
                  rows={rows}
                />
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    id="table-pagination"
                    rowsPerPageOptions={[]}
                    count={rows.length}
                    rowsPerPage={ROWS_PER_PAGE}
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
