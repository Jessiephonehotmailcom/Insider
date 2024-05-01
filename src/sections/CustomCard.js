/** @format */

import { Box, Button, Divider, Typography } from "@mui/material";

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

const CustomCard = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {rows.map((row) => (
        <Box
          key={row.id}
          sx={{
            backgroundColor: "white",
            padding: "12px",
            borderRadius: "12px",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h4">{row.licenseNumber}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h7">{row.state}</Typography>
            <Typography variant="h7">{row.licenseType}</Typography>
            <Typography variant="h7">{row.status}</Typography>
          </Box>
        </Box>
      ))}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="contained" sx={{ backgroundColor: "#335d81" }}>
          Prev
        </Button>
        <Button variant="contained" sx={{ backgroundColor: "#335d81" }}>
          Next
        </Button>
      </Box>
      <Divider />
    </Box>
  );
};
export default CustomCard;
