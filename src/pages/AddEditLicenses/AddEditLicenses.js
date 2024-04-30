import React, { useState, useEffect, forwardRef, useRef, useImperativeHandle } from "react";
import { CardHeader, FormHelperText, RadioGroup, FormGroup, Checkbox, TextField, Radio, FormControlLabel, CardContent, OutlinedInput, CardActions, Select, MenuItem, FormControl, FormLabel, InputLabel, Typography, Card, Grid, Box, Container, Divider, Button } from '@mui/material';
import { Skeleton, Stack } from '@mui/material';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PropTypes from 'prop-types';
import MainCard from '../../components/MainCard/MainCard';
import { ParseValidDate } from '../../helpers/Common';
import './AddEditLicenses.css';
import { useForm } from "react-hook-form";
import { styled, useTheme } from '@mui/material/styles';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateField } from '@mui/x-date-pickers/DateField';
import { FORM_MODES } from "../../helpers/Constants";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

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
    const { mode, id } = props.location.state || '';

    let currentMode = mode + " License";
    const [topBackgroundColor, setTopBackgroundColor] = useState({
        css: { backgroundColor: "#fff" },
    });
    const [bottomBackgroundColor, setBottomBackgroundColor] = useState({
        css: { backgroundColor: "#fff" },
    });
    const [status, setStatus] = useState(undefined);
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
    const [licenseClassId, setLicenseClassId] = useState(null);
    const [licenseTypeId, setLicenseTypeId] = useState(null);
    const [catcode, setCatcode] = useState(null);
    const [stateId, setStateId] = useState(null);
    const [licenseNumber, setlicenseNumber] = useState(null);
    const [organizationId, setOrganizationId] = useState(null);
    const [licenseStatusId, setLicenseStatusId] = useState(null);
    const [lineOfAuthorityId, setlineOfAuthorityId] = useState(null);
    const [isLinesOfAuthorityChecked, setIsLinesOfAuthorityChecked] = useState([]);
    const [open, setOpen] = useState(false);
    const handleClose = () => {
      setOpen(false);
    };
    const handleOpen = () => {
      setOpen(true);
    };
    const getLicense = async () => {
        handleOpen();
        await fetch(`/api/License/GetLicenseAELById?id=${id}`)
            .then(response => response.json())
            .then(data => {
                setCurrentPageData([data]);
                setLocalEffectiveDate(ParseValidDate(data.effectiveDate));
                setExpirationDate(ParseValidDate(data.expirationDate));
                setAffiliationEffectiveDate(ParseValidDate(data.affiliationEffectiveDate));
                setAffiliationExpirationDate(ParseValidDate(data.affiliationExpirationDate));
                setMvrCertifiedDateByHR(ParseValidDate(data.hrmvrcertifiedDate));
                setMedicalCertificationExpiredDate(ParseValidDate(data.medicalCertificationExpiredDate));
                setNotificationSentToInsuranceCoDate(ParseValidDate(data.insuranceCompanyNotificationDate));
                setLicenseClassId(parseInt(data.licenseClassId));
                setLicenseTypeId(parseInt(data.licenseTypeId));
                setOrganizationId(parseInt(data.organizationId));
                setCatcode(parseInt(data.catcode));
                setlicenseNumber(data.licenseNumber || "");
                setStateId(parseInt(data.stateId));
                setLicenseStatusId(parseInt(data.licenseStatusId));
                setAffiliationEntity(data.affiliationEntity);
                setAffiliationNumber(data.affiliationNumber);
                setlineOfAuthorityId(data.lineOfAuthorityId);
                setIsLinesOfAuthorityChecked(data.linesOfAuthority.$values);
                setCdlReceived(data.cdlReceived);
            })
            .catch(error => {
                console.error('Error fetching License data: ', error);
            });
            handleClose();
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
    }

    const onSubmit = (data, e) => {
        e.preventDefault();
        (mode === FORM_MODES.edit) ? editLicense() : addLicense();
    }

    const addLicense = () => {
        fetch(`/api/License/CreateLicenseAEL?personId=${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(currentPageData[0])
        })
            .then(response => response.json())
            .then(data => {
                setStatus({ type: 'success' });
            })
            .catch(error => {
                setStatus({ type: 'error', error });
            });
    }
    const editLicense = () => {
        fetch(`/api/License/EditAELicense?licenseId=${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(currentPageData[0])
        })
            .then(response => response.json())
            .then(data => {
                setStatus({ type: 'success' });
            })
            .catch(error => {
                setStatus({ type: 'error', error });
            });
    }
    const onError = (errors, e) => {
        e.preventDefault();
        alert("I am unable to save now");
    }
    const handleCdlReceived = (event, newValue) => {
        let currentCdlReceived = newValue;
        setCdlReceived(currentCdlReceived);
        const tempCurrentPageData = [...currentPageData];
        tempCurrentPageData[0].cdlReceived = currentCdlReceived;
        setCurrentPageData(tempCurrentPageData);
    };
    const licenseTypeOnChange = (event, newValue) => {
        let currentLicenseTypeId = event.target.value;
        setLicenseTypeId(currentLicenseTypeId);
        const tempCurrentPageData = [...currentPageData];
        tempCurrentPageData[0].licenseClassId = currentLicenseTypeId;
        setCurrentPageData(tempCurrentPageData);
    };
    const licenseClassOnChange = (event, newValue) => {
        let currentLicenseClassId = event.target.value;
        setLicenseClassId(currentLicenseClassId);
        const tempCurrentPageData = [...currentPageData];
        tempCurrentPageData[0].licenseClassId = currentLicenseClassId;
        setCurrentPageData(tempCurrentPageData);
    };
    const stateOnChange = (event, newValue) => {
        let currentStateId = event.target.value;
        setStateId(currentStateId);
        const tempCurrentPageData = [...currentPageData];
        tempCurrentPageData[0].stateId = currentStateId;
        setCurrentPageData(tempCurrentPageData);
    };
    const licenseStatusOnChange = (event, newValue) => {
        let currentLicenseStatusId = event.target.value;
        setLicenseStatusId(currentLicenseStatusId);
        const tempCurrentPageData = [...currentPageData];
        tempCurrentPageData[0].licenseStatusId = currentLicenseStatusId;
        setCurrentPageData(tempCurrentPageData);
    };
    const linesOfAuthorityOnChange = (index, newId, currentValue) => {
        let oldValue = isLinesOfAuthorityChecked.find((element) => {
            return element.id === newId;
        }).isChecked;
        const tempCurrentPageData = [...currentPageData];
        let updatedIsLinesOfAuthorityChecked = UpdateIsLinesOfAuthorityChecked(newId, currentValue, oldValue);
        setIsLinesOfAuthorityChecked(updatedIsLinesOfAuthorityChecked);
        tempCurrentPageData[0].linesOfAuthority.$values = updatedIsLinesOfAuthorityChecked;
        setCurrentPageData(tempCurrentPageData);
    };
    const licenseNumberOnChange = (e) => {
        setlicenseNumber(e);
        const tempCurrentPageData = [...currentPageData];
        tempCurrentPageData[0].licenseNumber = e;
        setCurrentPageData(tempCurrentPageData);
    }
    const catcodeOnChange = (e) => {
        setCatcode(e);
        const tempCurrentPageData = [...currentPageData];
        tempCurrentPageData[0].catcode = e;
        setCurrentPageData(tempCurrentPageData);
    }
    const organizationsOnChange = (event, newValue) => {
        let organizationId = event.target.value;
        setStateId(organizationId);
        const tempCurrentPageData = [...currentPageData];
        tempCurrentPageData[0].organizationId = organizationId;
        setCurrentPageData(tempCurrentPageData);
    };
    const affiliationEntityOnChange = (e) => {
        setAffiliationEntity(e.target.value);
        const tempCurrentPageData = [...currentPageData];
        tempCurrentPageData[0].affiliationEntity = e.target.value;
        setCurrentPageData(tempCurrentPageData);
    }
    function UpdateIsLinesOfAuthorityChecked(newId, currentValue, oldValue) {
        for (let i = 0; i < isLinesOfAuthorityChecked.length; i++) {
            if (isLinesOfAuthorityChecked[i].id === newId && currentValue != oldValue) {
                isLinesOfAuthorityChecked[i].isChecked = !isLinesOfAuthorityChecked[i].isChecked;
            }
            else if (isLinesOfAuthorityChecked[i].id === newId && currentValue != oldValue) {
                isLinesOfAuthorityChecked[i].isChecked = true;
            }
        }
        return isLinesOfAuthorityChecked;
    };

    return (
        <>
            <Container sx={{ height: "100%", width: "100%", marginTop: "62px", marginBottom: "100px" }}>
                <h2>{currentMode}</h2>
                {currentPageData?.map((row, index) => {
                    const {
                        $id,
                        licenseClasses,
                        licenseTypes,
                        linesOfAuthority,
                        states,
                        licenseStatuses
                    } = row;
                    return (
                        <form onSubmit={handleSubmit(onSubmit, onError)}>
                            {status?.type === 'success' &&
                                <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                                    Save successfully!
                                </Alert>}
                            {status?.type === 'error' && (
                                <Alert variant="filled" severity="error">
                                    Error occurs!
                                </Alert>
                            )}
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Stack style={{ maxWidth: "400px" }}>

                                            <FormControl required sx={{ m: 2 }} variant="standard">
                                                <FormLabel id="licenseNumber" sx={formLabelStyling}>
                                                    License Number:
                                                </FormLabel>
                                                <TextBox type="text"
                                                    value={licenseNumber}
                                                    size="small"
                                                    onChange={(e) => licenseNumberOnChange(e.target.value)}
                                                />
                                            </FormControl>
                                            <FormControl required sx={{ m: 2 }} variant="standard">
                                                <FormLabel id="licenseType" sx={formLabelStyling}>
                                                    License Type:
                                                </FormLabel>
                                                <select
                                                    name="licenseType"
                                                    fullWidth
                                                    labelId="license-type-select-label"
                                                    id="license-type-select-label"
                                                    value={licenseTypeId}
                                                    label="License Type"
                                                    {...register("licenseType", { required: true })}
                                                    className="selectWrapper"
                                                    required
                                                    onChange={licenseTypeOnChange}
                                                >
                                                    <option aria-label="Select.." value="" >Select ..</option>
                                                    {licenseTypes &&
                                                        licenseTypes.$values &&
                                                        licenseTypes.$values && (
                                                            licenseTypes.$values.map((type) => {
                                                                return (
                                                                    <option
                                                                        key={type.id}
                                                                        value={type.id}
                                                                    >
                                                                        {type.name}
                                                                    </option>
                                                                );
                                                            })
                                                        )}
                                                </select>
                                                {errors.licenseType && <span role="alert">{errors.licenseType?.message}</span>}
                                            </FormControl>
                                            <FormControl required sx={{ m: 2 }} variant="standard">
                                                <FormLabel id="licenseClass" sx={formLabelStyling}>
                                                    License Class:
                                                </FormLabel>
                                                <select
                                                    fullWidth
                                                    labelId="license-class-select-label"
                                                    id="license-class-select-label"
                                                    value={licenseClassId}
                                                    label="License Class"
                                                    {...register("licenseClass", { required: true })}
                                                    className="selectWrapper"
                                                    onChange={licenseClassOnChange}
                                                >
                                                    <option aria-label="Select.." value="" >Select ..</option>
                                                    {licenseClasses &&
                                                        licenseClasses.$values &&
                                                        licenseClasses.$values && (
                                                            licenseClasses.$values.map((type) => {
                                                                return (
                                                                    <option
                                                                        key={type.id}
                                                                        value={type.id}
                                                                    >
                                                                        {type.name}
                                                                    </option>
                                                                );
                                                            })
                                                        )}
                                                </select>
                                                {errors.licenseClass && <span role="alert">{errors.licenseClass?.message}</span>}
                                            </FormControl>
                                            <FormControl required sx={{ m: 2 }} variant="standard">
                                                <FormLabel id="state" sx={formLabelStyling}>
                                                    State:
                                                </FormLabel>
                                                <select
                                                    fullWidth
                                                    labelId="state-select-label"
                                                    id="state-select-label"
                                                    value={stateId}
                                                    defaultValue=""
                                                    label="state"
                                                    {...register("state", { required: true })}
                                                    className="selectWrapper"
                                                    onChange={stateOnChange}
                                                >
                                                    <option aria-label="Select.." value="" >Select ..</option>
                                                    {states &&
                                                        states.$values &&
                                                        states.$values && (
                                                            states.$values.map((type) => {
                                                                return (
                                                                    <option
                                                                        key={type.id}
                                                                        value={type.id}
                                                                    >
                                                                        {type.name}
                                                                    </option>
                                                                );
                                                            })
                                                        )}
                                                </select>
                                                {errors.state && <span role="alert">{errors.state?.message}</span>}
                                            </FormControl>

                                            <FormControl sx={{ m: 2 }} variant="standard">
                                                <FormLabel id="catcode" sx={formLabelStyling}>
                                                    Cat Completed:
                                                </FormLabel>
                                                <TextBox type="text"
                                                    value={catcode}
                                                    size="small"
                                                    onChange={(e) => catcodeOnChange(e.target.value)}
                                                />
                                            </FormControl>

                                            <FormControl sx={{ m: 2 }} variant="standard">
                                                <FormLabel id="linesOfAuthority" sx={formLabelStyling}>
                                                    Lines of Authority:
                                                </FormLabel>
                                                <FormGroup>
                                                    {linesOfAuthority && linesOfAuthority.$values &&
                                                        (linesOfAuthority.$values.map((type, index) => {
                                                            return (
                                                                <>
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                checked={isLinesOfAuthorityChecked[index]?.isChecked}
                                                                                onChange={() => linesOfAuthorityOnChange(index, type.id, !isLinesOfAuthorityChecked[index]?.isChecked)} />}
                                                                        label={type.name} />
                                                                </>
                                                            )
                                                        }))
                                                    }
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
                                                }}    >
                                                <DatePicker
                                                    value={localEffectiveDate}
                                                    onChange={(newValue) => setLocalEffectiveDate(newValue)}
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
                                                    value={expirationDate}
                                                    onChange={(newValue) => setExpirationDate(newValue)}
                                                />

                                            </DemoItem>
                                            <FormControl sx={{ m: 2 }} variant="standard">
                                                <FormLabel id="licenseStatus" sx={formLabelStyling}>
                                                    Status:
                                                </FormLabel>
                                                <select
                                                    fullWidth
                                                    labelId="licenseStatus-select-label"
                                                    id="licenseStatus-select-label"
                                                    value={licenseStatusId}
                                                    label="licenseStatus"
                                                    className="selectWrapper"
                                                    onChange={licenseStatusOnChange}
                                                >
                                                    <option aria-label="Select.." value="" />
                                                    {(licenseStatuses &&
                                                        licenseStatuses.$values &&
                                                        licenseStatuses.$values) && (
                                                            licenseStatuses.$values.map((type) => {
                                                                return (
                                                                    <option
                                                                        key={type.id}
                                                                        value={type.id}
                                                                    >
                                                                        {type.name}
                                                                    </option>
                                                                );
                                                            })
                                                        )}
                                                </select>
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
                                                onChange={(e) => affiliationEntityOnChange(e)}
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
                                                }}
                                            >
                                                <DatePicker
                                                    value={affiliationEffectiveDate}
                                                    onChange={(newValue) => setAffiliationEffectiveDate(newValue)}
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
                                                }}
                                            >
                                                <DatePicker
                                                    value={affiliationExpirationDate}
                                                    onChange={(newValue) => setAffiliationExpirationDate(newValue)}
                                                />
                                            </DemoItem>

                                            <FormControl sx={{ m: 2 }} variant="standard">
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
                                                    value={medicalCertificationExpiredDate}
                                                    onChange={(newValue) => setMedicalCertificationExpiredDate(newValue)}
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
                                                    value={mvrCertifiedDateByHR}
                                                    onChange={(newValue) => setMvrCertifiedDateByHR(newValue)}
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
                                                    value={notificationSentToInsuranceCoDate}
                                                    onChange={(newValue) => setNotificationSentToInsuranceCoDate(newValue)}
                                                />
                                            </DemoItem>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                size="medium"
                                                // onClick={handleSave}
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
                        </form>

                    )
                })}
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                    onClick={handleClose}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Container >

        </>
    )
}
