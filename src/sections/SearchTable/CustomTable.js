/** @format */

import { Edit } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import * as React from "react";

function createData(id, licenseNumber, state, licenseType, status) {
  return {
    id,
    licenseNumber,
    state,
    licenseType,
    status,
  };
}

const rows = [
  createData(1, 7423949, "FL", "Adjuster License", "Pending"),
  createData(2, 7423949, "TX", "Adjuster License", "Active"),
  createData(3, 7423949, "AL", "Adjuster License", "Pending"),
  createData(4, 7423949, "NY", "Adjuster License", "Expired"),
  createData(5, 7423949, "IL", "Adjuster License", "Pending"),
  createData(6, 7423949, "NV", "Adjuster License", "Pending"),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "licenseNumber",
    disablePadding: true,
    label: "License Number",
  },
  {
    id: "state",
    disablePadding: true,
    label: "State",
  },
  {
    id: "licenseType",
    disablePadding: true,
    label: "License Type",
  },
  {
    id: "status",
    disablePadding: true,
    label: "Status",
  },
  {
    id: "action",
    disablePadding: true,
    label: "Action",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead sx={{ backgroundColor: "#9d9c9c", padding: "1px" }}>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="right"
            padding="none"
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              paddingRight: "12px",
              paddingLeft: "12px",
              paddingTop: "4px",
              paddingBottom: "4px",
              border: "1px solid gray",
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function CustomTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%" }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{
                      cursor: "pointer",
                      backgroundColor: index % 2 ? "#d8d8d8" : "#f0f0f0",
                    }}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      align="right"
                      sx={{
                        border: "1px solid gray",
                      }}
                    >
                      <Typography fontSize="20px">
                        {row.licenseNumber}
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        border: "1px solid gray",
                      }}
                    >
                      <Typography fontSize="20px">{row.state}</Typography>
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        border: "1px solid gray",
                      }}
                    >
                      <Typography fontSize="20px">{row.licenseType}</Typography>
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        border: "1px solid gray",
                      }}
                    >
                      <Typography fontSize="20px">{row.status}</Typography>
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        border: "1px solid gray",
                      }}
                    >
                      <Button sx={{ color: "black" }}>
                        <Edit />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
