import React, { useState, useEffect, forwardRef, useRef, useImperativeHandle } from "react";
import { CardHeader, FormHelperText, RadioGroup, FormGroup, Checkbox, TextField, Radio, FormControlLabel, CardContent, OutlinedInput, CardActions, Select, MenuItem, FormControl, FormLabel, InputLabel, Typography, Card, Grid, Box, Container, Divider, Button } from '@mui/material';
import { Skeleton, Stack } from '@mui/material';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import MainCard from '../../components/MainCard/MainCard';
import './AddEditLicenses.css';
import { useForm } from "react-hook-form";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { styled, useTheme } from '@mui/material/styles';

const TextBox = styled(TextField)(() => ({
    '& fieldset': {
        borderRadius: '36px',
        height: '40px',
        marginTop: '5px'
    },
}));

export default function AddEditLicenses(props) {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm();
    const watchAllFields = watch();
    const { mode, id, state, licenseClass, status } = props.location.state;

    let currentMode = mode + " License";
    const [topBackgroundColor, setTopBackgroundColor] = useState({
        css: { backgroundColor: "#fff" },
    });
    const [bottomBackgroundColor, setBottomBackgroundColor] = useState({
        css: { backgroundColor: "#fff" },
    });


    const [startDate, setStartDate] = useState();
    const [affiliationEntity, setAffiliationEntity] = useState();
    const [affiliationNumber, setAffiliationNumber] = useState();
    const [localEffectiveDate, setLocalEffectiveDate] = useState();
    const [expirationDate, setExpirationDate] = useState();
    const [affiliationEffectiveDate, setAffiliationEffectiveDate] = useState();
    const [affiliationExpirationDate, setAffiliationExpirationDate] = useState();
    const [medicalCertificationExpiredDate, setMedicalCertificationExpiredDate] = useState();
    const [mvrCertifiedDateByHR, setMvrCertifiedDateByHR] = useState();
    const [cdlReceived, setCdlReceived] = useState();
    const [notificationSentToInsuranceCoDate, setNotificationSentToInsuranceCoDate] = useState();
    const [currentPageData, setCurrentPageData] = useState([]);

    const getLicense = async () => {
        await fetch(`/api/License/GetLicenseAELById?id=${id}`)
            .then(response => response.json())
            .then(data => {
                setCurrentPageData([data]);
                const date = "2000-01-31T12:59-0500";
                setLocalEffectiveDate(date);
            })
            .catch(error => {
                console.error('Error fetching License data: ', error);
            });

    };

    useEffect(() => {
        getLicense();
    }, [id]);


    const formLabelStyling = {
        color: "rgb(0, 0, 0)",
        maxWidth: 200,
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden",

    };

    const textfieldStyling = {
        "& label": {
            //display: "none",
            //visibility: "hidden",
            //whiteSpace: "normal",
            color: "secondary.main",
            width: 100,
            "&.Mui-focused": {
                marginLeft: 0
                //display: "none"
            }
        }
        // "& legend": {
        //   display: "none"
        // }
    };

    const handleSave = () => {


    };
    const handleCdlReceived = () => {


    };

    return (
        <>
            <Container sx={{ height: "100%", width: "100%", marginTop: "62px", marginBottom: "100px" }}>
                <h2>{currentMode}</h2>
               
                    <form >
                        {/* <label>xxx       {currentPageData[0]?.licenseTypes?.$values[0].$id}  xxx</label> 
                        <label>--------------------------</label>   
                        {currentPageData[0]?.licenseTypes?.$values.map((currentPageDataRow, index) => {
return (
<>                            <label>yyy {currentPageDataRow.$id}yyyy</label>
</>
)
                        })}  */}

                        {currentPageData?.map((row, index) => {
                            const {
                                $id,
                                //affiliationEffectiveDate,
                                // affiliationEntity,
                                // affiliationExpirationDate,
                                // affiliationNumber,
                                // cdlReceived,
                                effectiveDate,
                                // expirationDate,
                                // insuranceCompanyNOtificationDate,
                                licenseClass,
                                licenseClasses,
                                licenseClassId,
                                // licenseStatus,
                                // licenseStatusId,
                                // licenseStatuses,
                                licenseType,
                                licenseTypeId,
                                licenseTypes,
                                linesOfAuthority,
                                // medicalCertificationExpirationDate,
                                state,
                                states,
                                stateId
                            } = row;
                            return (
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Stack style={{ maxWidth: "400px" }}>

                                            <FormControl required sx={{ m: 2 }} variant="standard">
                                                <FormLabel id="licenseType" sx={formLabelStyling}>
                                                    License Type:{effectiveDate}
                                                </FormLabel>
                                                <Select
                                                    fullWidth
                                                    labelId="license-type-select-label"
                                                    id="license-type-select-label"
                                                    error={!!errors.licenseType && !watchAllFields.licenseType}
                                                    value={licenseTypeId}
                                                    label="License Type"
                                                    {...register("licenseType", { required: true })}
                                                    className="selectWrapper"
                                                    required
                                                // onChange={handleChange}
                                                >
                                                    {licenseTypes &&
                                                        licenseTypes.$values &&
                                                        licenseTypes.$values ? (
                                                        licenseTypes.$values.map((type) => {
                                                            return (
                                                                <MenuItem
                                                                    key={type.item1}
                                                                    value={type.item1}
                                                                >
                                                                    {type.item2}
                                                                </MenuItem>
                                                            );
                                                        })
                                                    ) : (
                                                        <MenuItem value="">select..</MenuItem>
                                                    )}
                                                </Select>
                                            </FormControl>
                                            <FormControl required sx={{ m: 2 }} variant="standard">
                                                <FormLabel id="licenseClass" sx={formLabelStyling}>
                                                    License Class:
                                                </FormLabel>
                                                <Select
                                                    fullWidth
                                                    labelId="license-class-select-label"
                                                    id="license-class-select-label"
                                                    error={!!errors.licenseClass && !watchAllFields.licenseClass}
                                                    value={licenseClassId}
                                                    label="License Class"
                                                    {...register("licenseClass", { required: true })}
                                                    className="selectWrapper"
                                                // onChange={handleChange}
                                                >
                                                    {licenseClasses &&
                                                        licenseClasses.$values &&
                                                        licenseClasses.$values ? (
                                                        licenseClasses.$values.map((type) => {
                                                            return (
                                                                <MenuItem
                                                                    key={type.item1}
                                                                    value={type.item1}
                                                                >
                                                                    {type.item2}
                                                                </MenuItem>
                                                            );
                                                        })
                                                    ) : (
                                                        <MenuItem value="">select..</MenuItem>
                                                    )}
                                                </Select>
                                            </FormControl>
                                            <FormControl required sx={{ m: 2 }} variant="standard">
                                                <FormLabel id="state" sx={formLabelStyling}>
                                                    State:
                                                </FormLabel>
                                                <Select
                                                    fullWidth
                                                    labelId="state-select-label"
                                                    id="state-select-label"
                                                    error={!!errors.state && !watchAllFields.state}
                                                    value={stateId}
                                                    label="state"
                                                    {...register("state", { required: true })}
                                                    className="selectWrapper"
                                                // onChange={handleChange}
                                                >
                                                    {states &&
                                                        states.$values &&
                                                        states.$values ? (
                                                        states.$values.map((type) => {
                                                            return (
                                                                <MenuItem
                                                                    key={type.item1}
                                                                    value={type.item1}
                                                                >
                                                                    {type.item2}
                                                                </MenuItem>
                                                            );
                                                        })
                                                    ) : (
                                                        <MenuItem value="">select..</MenuItem>
                                                    )}
                                                </Select>
                                            </FormControl>
                                            <FormControl required sx={{ m: 2 }} variant="standard">
                                                <FormLabel id="linesOfAuthority" sx={formLabelStyling}>
                                                    Lines of Authority:
                                                </FormLabel>
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox defaultChecked />} label="Property" />
                                                    <FormControlLabel control={<Checkbox />} label="Auto" />
                                                    <FormControlLabel control={<Checkbox />} label="Casualty" />
                                                    <FormControlLabel control={<Checkbox />} label="Multiple Lines" />
                                                </FormGroup>
                                            </FormControl>

                                            <DemoItem label="Effective Date:"
                                                sx={{
                                                    '& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root': {
                                                        '& fieldset': {
                                                            marginTop: 1,
                                                            borderRadius: 36,
                                                            height: '45px'
                                                        },
                                                    },
                                                }}                               >
                                                <DatePicker
                                                    //  value={localEffectiveDate}
                                                     onChange={(newValue) => {
                                                        setLocalEffectiveDate(newValue);
                                                      }}
                                                      renderInput={(params) => <TextField {...params} />}
                                                />
                                            </DemoItem>

                                            <DemoItem label="Expiration Date:"
                                                sx={{
                                                    '& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root': {
                                                        '& fieldset': {
                                                            marginTop: 1,
                                                            borderRadius: 36,
                                                            height: '45px'
                                                        },
                                                    },
                                                }}                               >
                                                <DatePicker
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            value={expirationDate}
                                                            onChange={(e) => setExpirationDate(e.target.value)}

                                                        />
                                                    )}
                                                />
                                            </DemoItem>

                                            <FormControl sx={{ m: 2 }} variant="standard">
                                                <FormLabel id="status" sx={formLabelStyling}>
                                                    Status:
                                                </FormLabel>
                                                <Select
                                                    fullWidth
                                                    labelId="status-select-label"
                                                    id="status-select-label"
                                                    error={!!errors.status && !watchAllFields.status}
                                                    value={
                                                        watchAllFields.status ? watchAllFields.status : ""
                                                    }
                                                    label="status"
                                                    {...register("status", { required: true })}
                                                    className="selectWrapper"
                                                // onChange={handleChange}
                                                >
                                                    {status &&
                                                        status.Data &&
                                                        status.Data ? (
                                                        status.Data.map((type) => {
                                                            return (
                                                                <MenuItem
                                                                    key={type.Id}
                                                                    value={type.Id}
                                                                >
                                                                    {type.Name}
                                                                </MenuItem>
                                                            );
                                                        })
                                                    ) : (
                                                        <MenuItem value="">select..</MenuItem>
                                                    )}
                                                </Select>
                                            </FormControl>
                                        </Stack>
                                    </Grid>
                                    <Divider orientation="vertical" variant="middle" flexItem />
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Stack>
                                            <FormLabel id="affiliationentity" sx={formLabelStyling}>
                                                Affiliation Entity:
                                            </FormLabel>
                                            <TextBox type="text"
                                                value={affiliationEntity}
                                                size="small"
                                                onChange={(e) => setAffiliationEntity(e.target.value)}
                                            />
                                            <FormLabel id="affiliationentity" sx={formLabelStyling}>
                                                Affiliation Number:
                                            </FormLabel>
                                            <TextBox type="text"
                                                value={affiliationNumber}
                                                size="small"
                                                onChange={(e) => setAffiliationNumber(e.target.value)}
                                            />
                                            <DemoItem label="Affiliation Effective Date:"
                                                sx={{
                                                    '& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root': {
                                                        '& fieldset': {
                                                            marginTop: 1,
                                                            borderRadius: 36,
                                                            height: '45px'
                                                        },
                                                    },
                                                }}                               >
                                                <DatePicker
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            value={affiliationEffectiveDate}
                                                            onChange={(e) => setAffiliationEffectiveDate(e.target.value)}
                                                        />
                                                    )}
                                                />
                                            </DemoItem>

                                            <DemoItem label="Affiliation Expiration Date:"
                                                sx={{
                                                    '& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root': {
                                                        '& fieldset': {
                                                            marginTop: 1,
                                                            borderRadius: 36,
                                                            height: '45px'
                                                        },
                                                    },
                                                }}                               >
                                                <DatePicker
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            value={affiliationExpirationDate}
                                                            onChange={(e) => setAffiliationExpirationDate(e.target.value)}

                                                        />
                                                    )}
                                                />
                                            </DemoItem>

                                            <FormControl required sx={{ m: 2 }} variant="standard">
                                                <FormGroup>
                                                    <FormControlLabel control={
                                                        <Checkbox
                                                            checked={cdlReceived}
                                                            onChange={handleCdlReceived}
                                                        />} label="Received Copy of CDL" />

                                                </FormGroup>
                                            </FormControl>

                                            <DemoItem label="Medical Certification Exp Date:"
                                                sx={{
                                                    '& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root': {
                                                        '& fieldset': {
                                                            marginTop: 1,
                                                            borderRadius: 36,
                                                            height: '45px'
                                                        },
                                                    },
                                                }}
                                            >
                                                <DatePicker
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            value={medicalCertificationExpiredDate}
                                                            onChange={(e) => setMedicalCertificationExpiredDate(e.target.value)}

                                                        />
                                                    )}
                                                />
                                            </DemoItem>
                                            <DemoItem label="MVR Certified by HR:"
                                                sx={{
                                                    '& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root': {
                                                        '& fieldset': {
                                                            marginTop: 1,
                                                            borderRadius: 36,
                                                            height: '45px'
                                                        },
                                                    },
                                                }}
                                            >
                                                <DatePicker
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            value={mvrCertifiedDateByHR}
                                                            onChange={(e) => setMvrCertifiedDateByHR(e.target.value)}

                                                        />
                                                    )}
                                                />
                                            </DemoItem>
                                            <DemoItem label="Notification sent to Insurance Co:"
                                                sx={{
                                                    '& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root': {
                                                        '& fieldset': {
                                                            marginTop: 1,
                                                            borderRadius: 36,
                                                            height: '45px'
                                                        },
                                                    },
                                                }}
                                            >
                                                <DatePicker
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            value={notificationSentToInsuranceCoDate}
                                                            onChange={(e) => setNotificationSentToInsuranceCoDate(e.target.value)}
                                                        />
                                                    )}
                                                />
                                            </DemoItem>
                                            <Button
                                                variant="contained"
                                                size="medium"
                                                onClick={handleSave}
                                                sx={{ boxShadow: 2 }}
                                                style={{
                                                    borderRadius: 35,
                                                    backgroundColor: "#32688E",
                                                    padding: "8px 16px",
                                                    fontSize: "12px"
                                                }}
                                            >
                                                Save
                                            </Button>
                                        </Stack>
                                    </Grid>
                                </Grid>
                                </LocalizationProvider>
                            )
                        })}
                    </form>
                
            </Container >
        </>
    )
}