/** @format */

import { AddCircleOutline, Edit } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { FORM_MODES } from "../../helpers/Constants";

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

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort, columns, sortableColumns } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead sx={{ backgroundColor: "#9d9c9c", padding: "1px" }}>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align="right"
            sortDirection={orderBy === column.id ? order : false}
            sx={{
              border: "1px solid gray",
            }}
          >
            {sortableColumns.includes(column.id) ? (
              <TableSortLabel
                active={orderBy === column.id}
                direction={orderBy === column.id ? order : "asc"}
                onClick={createSortHandler(column.id)}
              >
                {column.label}
                {orderBy === column.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              <Typography fontSize="14px">{column.label}</Typography>
            )}
          </TableCell>
        ))}
        <TableCell
          align="right"
          sx={{
            border: "1px solid gray",
          }}
        >
          <Typography fontSize="14px">Actions</Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

export default function CustomTable({
  data,
  columns,
  sortableColumns,
  pageSize,
  routing,
  tabData,
}) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);
  const rows = tabData?.$values ?? [];
  const history = useHistory();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (mode, id) => {
    history.push({ pathname: routing, state: { id: id, mode: mode } });
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              columns={columns}
              sortableColumns={sortableColumns}
            />
            <TableBody>
              {rows.length === 0 ? (
                <TableRow
                  tabIndex={-1}
                  sx={{
                    cursor: "pointer",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  <TableCell colSpan={columns.length + 1}>
                    <Alert severity="info" sx={{ fontSize: "15px" }}>
                      No record was found.
                    </Alert>
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {visibleRows.map((item, index) => {
                    return (
                      <TableRow
                        tabIndex={-1}
                        key={item.id}
                        sx={{
                          cursor: "pointer",
                          backgroundColor: index % 2 ? "#d8d8d8" : "#f0f0f0",
                        }}
                      >
                        {columns.map((column, index) => (
                          <TableCell
                            key={index}
                            component="th"
                            scope="row"
                            align="right"
                            sx={{
                              border: "1px solid gray",
                            }}
                          >
                            <Typography fontSize="20px">
                              {item[`${column.id}`]}
                            </Typography>
                          </TableCell>
                        ))}
                        <TableCell
                          align="right"
                          sx={{
                            border: "1px solid gray",
                          }}
                        >
                          <Button
                            sx={{ color: "black" }}
                            onClick={() => handleEdit(FORM_MODES.edit, item.id)}
                          >
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
                </>
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

      <Box
        sx={{
          marginTop: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingX: "12px",
        }}
      >
        <Button
          sx={{ color: "black", width: "32px", minWidth: "0px" }}
          onClick={() => handleEdit(FORM_MODES.add, data.id)}
        >
          <AddCircleOutline fontSize="large" />
        </Button>
        <Typography>
          Active/Pending License: {data.activePendingLicenses}
        </Typography>
      </Box>
    </Box>
  );
}
