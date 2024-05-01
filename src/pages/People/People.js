/** @format */

import { AddCircleOutline } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import BasicTabs from "./CustomTabPanel";
import HeaderInfo from "./HeaderInfo";

export default function PeoplePage() {
  const isMobile = useMediaQuery("(max-width:768px)");
  const queryClient = new QueryClient();

  const person = {
    pilotId: 123456,
    firstName: "Bruce",
    lastName: "Wayne",
    email: "mail@mail.com",
    phone: "555-555-5555",
    address: "1234 Wayne Manor",
    ssn: "123-45-6789",
    npnId: 123456,
    viewSSN: true,
    status: "Active",
    ceCredits: "1/2",
    availability: "Deployed",
    licenses: {
      data: {
        $values: [
          {
            licenseNumber: "123456",
            state: "Alabama",
            licenseType: "Pilot",
            expirationDate: "12/12/2022",
          },
        ],
      },
    },
  };

  return (
    <>
      <Helmet>
        <title> People Search | Pilot Insider App </title>
      </Helmet>
      <Box
        sx={{
          width: isMobile ? "100%" : "80%",
        }}
      >
        <QueryClientProvider client={queryClient}>
          <HeaderInfo person={person} />
          <Box
            sx={{
              border: "1px solid gray",
              borderRadius: "16px",
              padding: "12px",
            }}
          >
            <BasicTabs {...person} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingX: "12px",
              }}
            >
              <Button sx={{ color: "black", width: "32px", minWidth: "0px" }}>
                <AddCircleOutline fontSize="large" />
              </Button>
              <Typography>Active/Pending License: 5</Typography>
            </Box>
          </Box>
        </QueryClientProvider>
      </Box>
    </>
  );
}
