/** @format */

import { AddCircleOutline } from "@mui/icons-material";
import { Alert, Box, Button, Divider, Grid, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { ReturnFullDateTimeOrString } from "../helpers/Common";
import { FORM_MODES } from "../helpers/Constants";

const CustomCard = ({ data, columns, pageSize, routing, tabData }) => {
  const [page, setPage] = useState(0);
  const rows = tabData?.$values ?? [];
  const history = useHistory();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleEdit = (mode, id) => {
    history.push({ pathname: routing, state: { id: id, mode: mode } });
  };

  const visibleRows = useMemo(
    () => rows.slice(page * pageSize, page * pageSize + pageSize),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, pageSize]
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {visibleRows.length === 0 && (
        <Alert severity="info" sx={{ fontSize: "15px" }}>
          No record was found.
        </Alert>
      )}
      {visibleRows.map((item) => (
        <Box
          key={item.id}
          sx={{
            backgroundColor: "white",
            padding: "12px",
            borderRadius: "12px",
          }}
          onClick={() => handleEdit(FORM_MODES.edit, item.id)}
        >
          <Grid container spacing={2}>
            {columns.map((column, index) => (
              <Grid item xs={6} key={index}>
                <Typography variant="h7">
                  {ReturnFullDateTimeOrString(item[`${column.id}`])}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#335d81" }}
          onClick={() => handleChangePage(null, page - 1)}
          disabled={page === 0}
        >
          Prev
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#335d81" }}
          onClick={() => handleChangePage(null, page + 1)}
          disabled={visibleRows.length < pageSize}
        >
          Next
        </Button>
      </Box>
      <Divider />
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
};
export default CustomCard;
