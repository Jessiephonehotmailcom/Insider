/** @format */

import { Close, Edit, Save } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Popover,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";

const HeaderInfo = ({ person }) => {
  const isMobile = useMediaQuery("(max-width:768px)");
  const [viewSSN, setViewSSN] = useState(false);
  const [NPNId, setNPNId] = useState(person?.npnId || "");
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setNPNId(person?.npnId);
    setAnchorEl(null);
  };

  const handleNPNIdSave = async () => {
    await fetch(
      `/api/Person/UpdateNPNNumber?npn=${NPNId}&id=${person.pilotId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setNPNId(NPNId);
      })
      .catch((error) => console.error("Error updating NPNId:", error));
    setAnchorEl(null);
  };

  return (
    <>
      {!isMobile && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "32px",
          }}
        >
          <Box
            sx={{
              width: "60%",
              display: "flex",
              paddingRight: "4px",
            }}
          >
            <Box
              sx={{
                background:
                  "linear-gradient(135deg, rgba(89,116,148,1) 36%, rgba(125,132,145,1) 70%);",
                paddingLeft: "16px",
                paddingTop: "24px",
                paddingBottom: "24px",
                paddingRight: "52px",
                borderBottomLeftRadius: "24px",
                borderBottomRightRadius: "128px",
              }}
            >
              <Typography fontSize="36px" color="white" lineHeight="1">
                Bruce Wayne
              </Typography>
              <Typography fontSize="20px" color="white" textAlign="right">
                90999
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "2px",
              }}
            >
              <Typography fontSize="18px" color="#2d2d2d">
                bwayne@mail.com
              </Typography>
              <Typography fontSize="18px" color="##2d2d2d">
                (555)853-2355
              </Typography>
              <Typography fontSize="18px" color="##2d2d2d">
                4892 Yosemite Dr. Mobile, AL 33424
              </Typography>
            </Box>
          </Box>
          <Divider
            orientation="vertical"
            flexItem
            color="black"
            sx={{
              marginTop: "8px",
            }}
          />
          <Box
            sx={{
              width: "40%",
              paddingLeft: "32px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "8px",
              marginBottom: "8px",
              marginTop: "8px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid gray",
                paddingBottom: "8px",
              }}
            >
              <Typography fontSize="24px" fontWeight="bold" sx={{ flex: "2" }}>
                Details
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flex: "3",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ flex: "2" }}>
                  SSN: {viewSSN ? person?.ssn : "XXXX-XXX-XXXX"}
                </Typography>
                {person?.viewSSN && (
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ marginRight: "32px", backgroundColor: "#335d81" }}
                    onClick={() => setViewSSN(!viewSSN)}
                  >
                    {!viewSSN ? "View SSN" : "Hide SSN"}
                  </Button>
                )}
              </Box>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ flex: "2" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Typography>NPN ID: 123456</Typography>
                  <Edit sx={{ fontSize: "20px" }} onClick={handleClick} />
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                  >
                    <Box sx={{ padding: "8px" }}>
                      <TextField
                        inputProps={{
                          style: { padding: 5 },
                        }}
                        value={NPNId || ""}
                        onChange={(event) => setNPNId(event.target.value)}
                      />
                      <Box sx={{ marginTop: "4px" }}>
                        <Button
                          variant="outlined"
                          color="error"
                          sx={{ marginRight: "2px" }}
                          onClick={handleClose}
                        >
                          <Close sx={{ fontSize: "14px" }} />
                          <Typography fontSize="12px">Cancel</Typography>
                        </Button>
                        <Button variant="outlined" onClick={handleNPNIdSave}>
                          <Save sx={{ fontSize: "14px" }} />
                          <Typography fontSize="12px">Save</Typography>
                        </Button>
                      </Box>
                    </Box>
                  </Popover>
                </Box>
              </Box>

              <Typography sx={{ flex: "3" }}>CE Credits: 1/2</Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Typography sx={{ flex: "2" }}>Status: Active</Typography>
              <Typography sx={{ flex: "3" }}>Availability: Deployed</Typography>
            </Box>
          </Box>
        </Box>
      )}

      {isMobile && (
        <Box sx={{ marginBottom: "16px" }}>
          <Accordion sx={{ backgroundColor: "#f0f0f0" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Box
                sx={{
                  background:
                    "linear-gradient(135deg, rgba(89,116,148,1) 36%, rgba(125,132,145,1) 70%);",
                  paddingLeft: "8px",
                  paddingTop: "12px",
                  paddingBottom: "12px",
                  paddingRight: "40px",
                  borderBottomLeftRadius: "24px",
                  borderBottomRightRadius: "128px",
                  marginBottom: "8px",
                }}
              >
                <Typography fontSize="24px" color="white" lineHeight="1">
                  Bruce Wayne
                </Typography>
                <Typography fontSize="18px" color="white" textAlign="right">
                  90999
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                sx={{
                  display: "flex",
                  flex: 1,
                  flexDirection: "column",
                  gap: "2px",
                }}
              >
                <Typography fontSize="14px" color="#2d2d2d">
                  bwayne@mail.com
                </Typography>
                <Typography fontSize="14px" color="##2d2d2d">
                  (555)853-2355
                </Typography>
                <Typography fontSize="14px" color="##2d2d2d">
                  4892 Yosemite Dr. Mobile, AL 33424
                </Typography>
              </Box>
              <Divider sx={{ marginTop: "8px", marginBottom: "8px" }} />
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ flex: "2" }} fontSize="14px" color="##2d2d2d">
                  SSN: {viewSSN ? person?.ssn : "XXXX-XXX-XXXX"}
                </Typography>
                {person?.viewSSN && (
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ backgroundColor: "#335d81" }}
                    onClick={() => setViewSSN(!viewSSN)}
                  >
                    <Typography fontSize="12px">
                      {!viewSSN ? "View SSN" : "Hide SSN"}
                    </Typography>
                  </Button>
                )}
              </Box>
              <Divider sx={{ marginTop: "8px", marginBottom: "8px" }} />
              <Box
                sx={{
                  display: "flex",
                  flex: 1,
                  flexDirection: "column",
                  gap: "2px",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <Typography fontSize="14px" color="#2d2d2d">
                    NPN ID: 123456
                  </Typography>
                  <Edit sx={{ fontSize: "16px" }} onClick={handleClick} />
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                  >
                    <Box sx={{ padding: "8px" }}>
                      <TextField
                        inputProps={{
                          style: { padding: 5 },
                        }}
                        value={NPNId || ""}
                        onChange={(event) => setNPNId(event.target.value)}
                      />
                      <Box sx={{ marginTop: "4px" }}>
                        <Button
                          variant="outlined"
                          color="error"
                          sx={{ marginRight: "2px" }}
                          onClick={handleClose}
                        >
                          <Close sx={{ fontSize: "14px" }} />
                          <Typography fontSize="12px">Cancel</Typography>
                        </Button>
                        <Button variant="outlined" onClick={handleNPNIdSave}>
                          <Save sx={{ fontSize: "14px" }} />
                          <Typography fontSize="12px">Save</Typography>
                        </Button>
                      </Box>
                    </Box>
                  </Popover>
                </Box>
                <Typography fontSize="14px" color="##2d2d2d">
                  CE Credits: 1/2
                </Typography>
                <Typography fontSize="14px" color="##2d2d2d">
                  Status: Active
                </Typography>
                <Typography fontSize="14px" color="##2d2d2d">
                  Availability: Deployed
                </Typography>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
      )}
    </>
  );
};

export default HeaderInfo;
