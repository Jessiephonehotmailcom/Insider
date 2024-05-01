/** @format */

import { Typography, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { styled } from "@mui/material/styles";
import * as React from "react";
import {
  CERTIFICATIONS_TAB_HEADER,
  DEPLOYMENT_TAB_HEADER,
  LICENSES_TAB_HEADER,
  NOTES_TAB_HEADER,
  RIRS_ACTIONS_TAB_HEADER,
} from "../../helpers/Constants";
import CustomCard from "../../sections/CustomCard";
import CustomTable from "../../sections/SearchTable/CustomTable";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: "16px" }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const StyledTabs = styled(Tabs)(() => ({
  "& .Mui-selected": {
    background:
      "linear-gradient(180deg, rgba(191,191,191,1) 36%, rgba(170,178,190,1) 70%);",
    borderRadius: "8px",
  },
  backgroundColor: "#d8d9da",
  borderRadius: "8px",
  border: "1px solid gray",
}));

export default function BasicTabs(props) {
  const [value, setValue] = React.useState(0);
  const isMobile = useMediaQuery("(max-width:768px)");
  const isDesktop = !isMobile;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <StyledTabs
          variant="scrollable"
          textColor="inherit"
          value={value}
          onChange={handleChange}
          aria-label="basic StyledTabs example"
          TabIndicatorProps={{
            style: { display: "none" },
          }}
        >
          <Tab
            label={<Typography fontSize="12px">Licenses</Typography>}
            {...a11yProps(0)}
          />
          <Tab
            label={<Typography fontSize="12px">Certifications</Typography>}
            {...a11yProps(1)}
          />
          <Tab
            label={<Typography fontSize="12px">Deployments</Typography>}
            {...a11yProps(2)}
          />
          <Tab
            label={<Typography fontSize="12px">RIRS Actions</Typography>}
            {...a11yProps(3)}
          />
          <Tab
            label={<Typography fontSize="12px">Notes</Typography>}
            {...a11yProps(4)}
          />
        </StyledTabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {isDesktop && (
          <CustomTable
            data={props}
            columns={LICENSES_TAB_HEADER}
            sortableColumns={["licenseNumber", "state"]}
            pageSize={5}
            routing="/AddEditLicenses"
            tabData={props?.licenses?.data}
          />
        )}

        {isMobile && (
          <CustomCard
            data={props}
            columns={LICENSES_TAB_HEADER}
            pageSize={5}
            routing="/AddEditLicenses"
            tabData={props?.licenses?.data}
          />
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {isDesktop && (
          <CustomTable
            data={props}
            columns={CERTIFICATIONS_TAB_HEADER}
            sortableColumns={[
              "certificationName",
              "dateCompleted",
              "dateExpired",
            ]}
            pageSize={5}
            routing="/AddEditCertifications"
            tabData={props?.certifications?.data}
          />
        )}

        {isMobile && (
          <CustomCard
            data={props}
            columns={CERTIFICATIONS_TAB_HEADER}
            pageSize={5}
            routing="/AddEditCertifications"
            tabData={props?.certifications?.data}
          />
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {isDesktop && (
          <CustomTable
            data={props}
            columns={DEPLOYMENT_TAB_HEADER}
            sortableColumns={[
              "deploymentId",
              "deploymentState",
              "dateArrived",
              "dateReleased",
              "compliant",
            ]}
            pageSize={5}
            routing="/AddEditDeployments"
            tabData={props?.deployments?.data}
          />
        )}

        {isMobile && (
          <CustomCard
            data={props}
            columns={DEPLOYMENT_TAB_HEADER}
            pageSize={5}
            routing="/AddEditDeployments"
            tabData={props?.deployments?.data}
          />
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        {isDesktop && (
          <CustomTable
            data={props}
            columns={RIRS_ACTIONS_TAB_HEADER}
            sortableColumns={[
              "state",
              "reason",
              "penalty",
              "actionDate",
              "effectiveDate",
            ]}
            pageSize={5}
            routing="/AddEditRIRActions"
            tabData={props?.rirActions?.data}
          />
        )}

        {isMobile && (
          <CustomCard
            data={props}
            columns={RIRS_ACTIONS_TAB_HEADER}
            pageSize={5}
            routing="/AddEditRIRActions"
            tabData={props?.rirActions?.data}
          />
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        {isDesktop && (
          <CustomTable
            data={props}
            columns={NOTES_TAB_HEADER}
            sortableColumns={[
              "state",
              "reason",
              "penalty",
              "actionDate",
              "effectiveDate",
            ]}
            pageSize={5}
            routing="/AddEditNotes"
            tabData={props?.personeNotes?.data}
          />
        )}

        {isMobile && (
          <CustomCard
            data={props}
            columns={NOTES_TAB_HEADER}
            pageSize={5}
            routing="/AddEditNotes"
            tabData={props?.personeNotes?.data}
          />
        )}
      </CustomTabPanel>
    </Box>
  );
}
