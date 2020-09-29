import { TableCell, TableRow } from "@material-ui/core";
import React from "react";
import Skeleton from "react-loading-skeleton";

function SkeletonRows({ columnCount, rowCount }) {
  return [...Array(rowCount)].map((elementInArray, rIndex) => (
    <TableRow key={rIndex}>
      {[...Array(columnCount)].map((elementInArray, cIndex) => (
        <TableCell key={"" + rIndex + cIndex}>
          <Skeleton key={"skeleton" + rIndex + cIndex} height={55} />
        </TableCell>
      ))}
      <TableCell align="center">
        <Skeleton circle={true} height={40} width={40} />
      </TableCell>
    </TableRow>
  ));
}

export default SkeletonRows;
