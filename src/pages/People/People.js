/** @format */

import { Alert, Backdrop, Box, CircularProgress } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import BasicTabs from "./CustomTabPanel";
import HeaderInfo from "./HeaderInfo";

// import { mockPerson } from "../../helpers/Mock";

export default function PeoplePage() {
  const isMobile = useMediaQuery("(max-width:768px)");
  const queryClient = new QueryClient();
  const people = useStoreState((state) => state.people);
  const getPeople = useStoreActions((actions) => actions.people.getPeople);
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState(null);
  const noData = typeof person === "undefined" || person === null;

  useEffect(() => {
    try {
      getPeople({ accessToken: "test" }).then((result) => {
        if (result === "") {
          setLoading(false);
        } else {
          setPerson(result);
          // setPerson(mockPerson);
          setLoading(false);
        }
      });
    } catch (ex) {
      alert("fail");
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
