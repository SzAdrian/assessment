import React, { useContext, useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";
import {
  Fab,
  IconButton,
  TableFooter,
  TablePagination,
} from "@material-ui/core";
import SkeletonRows from "./SkeletonRows";
import Headers from "./Headers";
import Rows from "./Rows";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";
import { AppContext } from "../Contexts/AppContext";
import PaginationActions from "./PaginationActions";

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
  .MuiCircularProgress-root {
    display: block;
  }

  tbody td div {
    white-space: break-spaces;
    margin: auto;
    overflow: auto;
    max-width: max-content;
    max-height: 2.5rem;
    line-height: 1;
    padding: 0.5rem 0;
  }
  tr {
    transition: background-color 0.245s ease;
    cursor: pointer;
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
  td {
    position: relative;
  }
  tr.strikethroughed td div {
    color: #c4c4c4;
  }
  .MuiCircularProgress-colorPrimary,
  tr.strikethroughed td .MuiCircularProgress-root {
    color: #3f51b5;
  }

  tr.strikethroughed td:before {
    opacity: 1;
    content: " ";
    position: absolute;
    top: 50%;
    left: 0;
    border-bottom: 1.5px outset #c4c4c4;
    width: 100%;
  }
  tr.strikethroughed td:first-child:before {
    left: auto;
    right: 0;
  }
  tr.strikethroughed td:first-child:before,
  tr.strikethroughed td:nth-last-child(2):before {
    width: 80%;
  }
  td.lock:before {
    display: none;
  }
  td.lock {
    max-height: none;
    text-align: center;
    text-align: -webkit-center;
    text-align: -moz-center;
    width: 100px;
  }

  .MuiFab-root {
    z-index: 500;
    position: absolute;
    left: 2%;
    bottom: 3%;
  }

  .pagination-actions {
    flex-shrink: 0;
  }

  /*desktop first approach*/
  @media only screen and (hover: none) and (pointer: coarse),
    (max-width: 430px) {
    .MuiFab-root {
      position: fixed;
      left: 2%;
      bottom: 1%;
      width: 3rem;
      height: 3rem;
    }
    .MuiTableCell-sizeSmall:last-child {
      padding-right: 0;
    }
    tr,
    td {
      padding: 0.2rem;
      margin: 0;
    }
    tbody td div {
      display: block;
    }

    th {
      padding-right: 3px;
      padding-left: 3px;
    }
  }
`;

export default function UserList() {
  const { rows, setRows } = useContext(AppContext);
  const [page, setPage] = useState(0);
  const [headers, setHeaders] = useState([]);
  const ROWS_PER_PAGE = 10;
  const history = useHistory();
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
        process.env.REACT_APP_API_URL +
        "/users"
    );
    x.onload = x.onerror = function () {
      setRows(JSON.parse(x.responseText));
    };
    x.send();
  }, [setRows]);

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
                  setRows={setRows}
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
                    ActionsComponent={PaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </>
          )}
        </Table>
        <Fab
          onClick={() => history.push("/new")}
          id="add-user"
          color="primary"
          aria-label="add"
        >
          <AddIcon />
        </Fab>
      </TableContainerStyle>
    </>
  );
}
