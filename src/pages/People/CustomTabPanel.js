import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CustomTable from '../../sections/SearchTable/CustomTable';
let licensesTabHeader = [
    { id: 'licenseNumber', label: 'License Number', alignRight: false },
    { id: 'state', label: 'State', alignRight: false },
    { id: 'licenseType', label: 'License Type', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
];
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
    console.log("pxxxxxxxxxxxxxxxxxx" + props.licenses?.data?.$values[0]?.licenseNumber)
    
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
                <CustomTable data={props} columns={licensesTabHeader} sortableColumns={['licenseNumber', 'state']} pageSize={5} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                Certifications
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                Deployments
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
                RIRS Actions
            </CustomTabPanel>
            <CustomTabPanel value={value} index={4}>
                Notes
            </CustomTabPanel>
        </Box>
    );
}
