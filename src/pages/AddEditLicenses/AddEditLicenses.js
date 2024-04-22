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
    const { mode, id, licenseType, state, licenseClass, status } = props.location.state;

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
    const [effectiveDate, setEffectiveDate] = useState();
    const [expirationDate, setExpirationDate] = useState();
    useEffect(() => {

        // setPeople(null);
        // fetch(`api/Auth/GetPeopleSearch?searchParams=${searchInput}`)
        //     .then(response => response.json())
        //     .then(data => {
        //         //console.log(data);
        //         setPeople(data);
        //         setSearchData(data?.licenses?.data?.$values);
        //         //setSearchData(data?.licenses?.data);

        //     })
        //     .catch(error => {               
        //         console.error('Error fetching data: ', error);
        //     });

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

    const inputStyling = {
        color: "red"
    };
    return (
        <>
            <Container sx={{ height: "100%", width: "100%", marginTop: "62px", marginBottom: "100px" }}>
                <h2>{currentMode}</h2>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Stack>
                            <form style={{ maxWidth: "400px" }}>
                                <Stack>
                                    <FormControl sx={{ m: 2 }} variant="standard">
                                        <FormLabel id="licenseType" sx={formLabelStyling}>
                                            License Type:
                                        </FormLabel>
                                        <Select
                                            fullWidth
                                            labelId="license-type-select-label"
                                            id="license-type-select-label"
                                            error={!!errors.licenseType && !watchAllFields.licenseType}
                                            value={
                                                watchAllFields.licenseType ? watchAllFields.licenseType : ""
                                            }
                                            label="License Type"
                                            {...register("licenseType", { required: true })}
                                            className="selectWrapper"
                                        // onChange={handleChange}
                                        >
                                            {licenseType &&
                                                licenseType.Data &&
                                                licenseType.Data ? (
                                                licenseType.Data.map((type) => {
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
                                        <FormLabel id="licenseClass" sx={formLabelStyling}>
                                            License Class:
                                        </FormLabel>
                                        <Select
                                            fullWidth
                                            labelId="license-class-select-label"
                                            id="license-class-select-label"
                                            error={!!errors.licenseClass && !watchAllFields.licenseClass}
                                            value={
                                                watchAllFields.licenseClass ? watchAllFields.licenseClass : ""
                                            }
                                            label="License Class"
                                            {...register("licenseClass", { required: true })}
                                            className="selectWrapper"
                                        // onChange={handleChange}
                                        >
                                            {licenseClass &&
                                                licenseClass.Data &&
                                                licenseClass.Data ? (
                                                licenseClass.Data.map((type) => {
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
                                        <FormLabel id="state" sx={formLabelStyling}>
                                            State:
                                        </FormLabel>
                                        <Select
                                            fullWidth
                                            labelId="state-select-label"
                                            id="state-select-label"
                                            error={!!errors.state && !watchAllFields.state}
                                            value={
                                                watchAllFields.state ? watchAllFields.state : ""
                                            }
                                            label="state"
                                            {...register("state", { required: true })}
                                            className="selectWrapper"
                                        // onChange={handleChange}
                                        >
                                            {state &&
                                                state.Data &&
                                                state.Data ? (
                                                state.Data.map((type) => {
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
                                        <FormLabel id="linesOfAuthority" sx={formLabelStyling}>
                                            Lines of Authority:
                                        </FormLabel>
                                        <FormGroup>
                                            <FormControlLabel control={<Checkbox defaultChecked />} label="Property" />
                                            <FormControlLabel control={<Checkbox />} label="Auto" />
                                            <FormControlLabel control={<Checkbox />} label="Casualty" />
                                            <FormControlLabel control={<Checkbox />} label="Multiple Lines" />
                                        </FormGroup>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoItem label="Effective Date"
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
                                                            value={effectiveDate}
                                                            onChange={(e) => setEffectiveDate(e.target.value)}
                                                        />
                                                    )}
                                                />
                                            </DemoItem>

                                            <DemoItem label="Expiration Date"
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
                                        </LocalizationProvider>
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
                            </form>
                        </Stack>
                    </Grid>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Grid item xs={12} sm={6} md={4}>
                        <Stack>
                            <FormControl>
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
                            </FormControl>
                        </Stack>

                    </Grid>

                </Grid>

            </Container>
        </>
    )
}