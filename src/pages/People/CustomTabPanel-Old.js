import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CustomTable from '../../sections/SearchTable/CustomTable';
import { LICENSES_TAB_HEADER, CERTIFICATIONS_TAB_HEADER, DEPLOYMENT_TAB_HEADER, RIRS_ACTIONS_TAB_HEADER, NOTES_TAB_HEADER } from "../../helpers/Constants";


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
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    person: PropTypes.array
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs(props) {
    const [value, setValue] = React.useState(0);
    // console.log("pxxxxxxxxxxxxxxxxxx" + props.licenses?.data?.$values[0]?.licenseNumber)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Licenses" {...a11yProps(0)} />
                    <Tab label="Certifications" {...a11yProps(1)} />
                    <Tab label="Deployments" {...a11yProps(2)} />
                    <Tab label="RIRS Actions" {...a11yProps(3)} />
                    <Tab label="Notes" {...a11yProps(4)} />

                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                {/* <Licenses props={value} /> */}
                <CustomTable data={props} columns={LICENSES_TAB_HEADER} sortableColumns={['licenseNumber', 'state']} pageSize={5} routing="/AddEditLicenses" tabData={props?.licenses?.data} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <CustomTable data={props} columns={CERTIFICATIONS_TAB_HEADER} sortableColumns={['certificationName', 'dateCompleted', 'dateExpired']} pageSize={5} routing="/AddEditCertifications" tabData={props?.certifications?.data} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <CustomTable data={props} columns={DEPLOYMENT_TAB_HEADER} sortableColumns={['deploymentId', 'deploymentState', 'dateArrived', 'dateReleased', 'compliant']} pageSize={5} routing="/AddEditDeployments" tabData={props?.deployments?.data} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
                <CustomTable data={props} columns={RIRS_ACTIONS_TAB_HEADER} sortableColumns={['state', 'reason', 'penalty', 'actionDate', 'effectiveDate']} pageSize={5} routing="/AddEditRIRActions" tabData={props?.rirActions?.data} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={4}>
                <CustomTable data={props} columns={NOTES_TAB_HEADER} sortableColumns={['state', 'reason', 'penalty', 'actionDate', 'effectiveDate']} pageSize={5} routing="/AddEditNotes" tabData={props?.personeNotes?.data} />
            </CustomTabPanel>
        </Box>
    );
}
