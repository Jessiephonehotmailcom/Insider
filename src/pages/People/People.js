/** @format */

import { Alert, Backdrop, Box, CircularProgress } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import BasicTabs from "./CustomTabPanel";
import HeaderInfo from "./HeaderInfo";

export default function PeoplePage() {
  const isMobile = useMediaQuery("(max-width:768px)");
  const queryClient = new QueryClient();
  const people = useStoreState((state) => state.people);
  const getPeople = useStoreActions((actions) => actions.people.getPeople);
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState(null);
  const noData = typeof person === "undefined" || person === null;

  // TODO: remove this
  const mockPerson = {
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
    activePendingLicenses: 5,
    licenses: {
      data: {
        $values: [
          {
            id: 1,
            licenseNumber: "7423949",
            state: "FL",
            licenseType: "Adjuster License",
            status: "Pending",
          },
          {
            id: 2,
            licenseNumber: "7423949",
            state: "TX",
            licenseType: "Adjuster License",
            status: "Active",
          },
          {
            id: 3,
            licenseNumber: "7423949",
            state: "TX",
            licenseType: "Adjuster License",
            status: "Pending",
          },
          {
            id: 4,
            licenseNumber: "7423949",
            state: "TX",
            licenseType: "Adjuster License",
            status: "Pending",
          },
          {
            id: 5,
            licenseNumber: "7423949",
            state: "TX",
            licenseType: "Adjuster License",
            status: "Pending",
          },
          {
            id: 6,
            licenseNumber: "7423949",
            state: "TX",
            licenseType: "Adjuster License",
            status: "Pending",
          },
        ],
      },
    },
    certifications: {
      data: {
        $values: [
          {
            id: 1,
            certificationName: "Certification 1",
            dateCompleted: "2021-10-01",
            dateExpired: "2022-10-01",
          },
          {
            id: 2,
            certificationName: "Certification 2",
            dateCompleted: "2021-10-01",
            dateExpired: "2022-10-01",
          },
          {
            id: 3,
            certificationName: "Certification 3",
            dateCompleted: "2021-10-01",
            dateExpired: "2022-10-01",
          },
        ],
      },
    },
  };

  useEffect(() => {
    try {
      getPeople({ accessToken: "test" }).then((result) => {
        if (result === "") {
          setLoading(false);
        } else {
          setPerson(result);
          // TODO: remove this
          setPerson(mockPerson);
          setLoading(false);
        }
      });
    } catch (ex) {
      alert("fail");
      setLoading(false);
    }
  }, [people]);

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
        {noData ? (
          <>
            <Alert severity="info" sx={{ fontSize: "15px", marginTop: "8px" }}>
              No record was found.
            </Alert>
          </>
        ) : (
          <>
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
              </Box>
            </QueryClientProvider>
          </>
        )}
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </>
  );
}
