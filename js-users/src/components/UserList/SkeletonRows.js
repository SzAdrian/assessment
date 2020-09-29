import { TableCell, TableRow } from "@material-ui/core";
import React from "react";
import Skeleton from "react-loading-skeleton";

function SkeletonRows({ columnCount, rowCount }) {
  return [...Array(rowCount)].map((elementInArray, rIndex) => (
    <TableRow key={rIndex}>
      {[...Array(columnCount)].map((elementInArray, cIndex) => (
        <TableCell key={"" + rIndex + cIndex} align="right">
          <Skeleton key={"skeleton" + rIndex + cIndex} height={55} />
        </TableCell>
      ))}
    </TableRow>
  ));
}

export default SkeletonRows;
