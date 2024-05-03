import React, { useCallback, useState, useEffect, forwardRef, useRef, useImperativeHandle } from "react";
import { Input, Autocomplete, CardHeader, FormHelperText, RadioGroup, FormGroup, Checkbox, TextField, Radio, FormControlLabel, CardContent, OutlinedInput, CardActions, Select, MenuItem, FormControl, FormLabel, InputLabel, Typography, Card, Grid, Box, Container, Divider, Button } from '@mui/material';
import { Skeleton, Stack } from '@mui/material';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PropTypes from 'prop-types';
import MainCard from '../../components/MainCard/MainCard';
import { IsNullOrEmpty, ParseValidDate } from '../../helpers/Common';
import './AddEditNotes.css';
import { useForm, Controller } from "react-hook-form";
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
const DropDown = styled(Select)(() => ({
    borderRadius: 36,
}));
export default function AddEditNotes(props) {
    const {
        register,
        unregister,
        handleSubmit,
        reset,
        control,
        watch,
        clearErrors,
        setError,
        trigger,
        formState: { errors },
    } = useForm();
    const watchAllFields = watch();
    const maxLength = 5000;
    const { mode, id } = props.location.state || '';

    let currentMode = mode + " Note";
    const [topBackgroundColor, setTopBackgroundColor] = useState({
        css: { backgroundColor: "#fff" },
    });
    const [bottomBackgroundColor, setBottomBackgroundColor] = useState({
        css: { backgroundColor: "#fff" },
    });
    const [value, setValue] = useState("");

    const [currentPageData, setCurrentPageData] = useState([]);
    const [licenseClassId, setLicenseClassId] = useState(null);
    const [noteCategoryId, setNoteCategoryId] = useState(null);
    const [stateId, setStateId] = useState(null);
    const [licenseStatusId, setLicenseStatusId] = useState(null);
    const [noteContent, setNoteContent] = useState('');
    const [isLinesOfAuthorityChecked, setIsLinesOfAuthorityChecked] = useState([]);
    const [status, setStatus] = useState(undefined);

    const getNote = async () => {
        handleOpen();
        await fetch(`/api/PersonNote/GetPersonNoteById?id=${id}`)
            .then(response => response.json())
            .then(data => {
                setCurrentPageData([data]);
                setNoteCategoryId(parseInt(data.noteCategoryId));
                setStateId(parseInt(data.stateId));
                setNoteContent(data.noteContent || '');
                setValue(maxLength - data.noteContent?.length);

                // errors.stateId= null;
                // clearErrors("stateId");
                // unregister("stateId");
            })
            .catch(error => {
                console.error('Error fetching License data: ', error);
            });
        handleClose();
    };

    useEffect(() => {
        getNote();
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
            color: "secondary.main",
            width: 100,
            "&.Mui-focused": {
                marginLeft: 0
            }
        }
    }

    const onSubmit = (data, e) => {
        e.preventDefault();
        handleOpen();
        (mode === FORM_MODES.edit) ? editNote() : addNote(data);
        handleClose();
    }

    const addNote = (data) => {
        currentPageData[0].noteCategoryId = data.noteCategoryId;
        currentPageData[0].stateId = data.stateId;
        currentPageData[0].personId = id;
        fetch(`/api/PersonNote/CreatePersonNote`, {
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
    const editNote = () => {
        fetch(`/api/PersonNote/UpdatePersonNote`, {
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
    //    if(noteCategoryId != null && stateId !=null)
    //    {
      
       
    //     clearErrors();
    //     unregister();
    //    }
    }
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <>
            <Container sx={{ height: "100%", width: "100%", marginTop: "62px", marginBottom: "100px" }}>
                <h2>{currentMode}</h2>
                {currentPageData?.map((row, index) => {
                    const {
                        $id,
                        allNoteCategories,
                        allStates
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
                                            <FormControl required variant="standard">
                                                <FormLabel id="category" sx={formLabelStyling}>
                                                    Category:
                                                </FormLabel>
                                                <FormInputDropdown name="noteCategoryId"
                                                    control={control} options={allNoteCategories} register={register} errors={errors}
                                                    currentPageData={currentPageData} setCurrentPageData={setCurrentPageData}
                                                    requiredName="noteCategoryId" requiredPhrase="Category is required!" initialValue={noteCategoryId||""}
                                                    optionId="id" optionName="name" unregister={unregister} clearErrors={clearErrors}
                                                    setOrgValue={setNoteCategoryId} mode={mode}
                                                >
                                                </FormInputDropdown>
                                            </FormControl>
                                            <FormLabel required id="state" sx={formLabelStyling}>
                                                State:
                                            </FormLabel>
                                            <FormInputDropdown name="stateId"
                                                control={control} options={allStates} register={register} errors={errors}
                                                currentPageData={currentPageData} setCurrentPageData={setCurrentPageData}
                                                requiredName="stateId" requiredPhrase="State is required!" initialValue={stateId||""}
                                                optionId="id" optionName="name" setError={setError} trigger={trigger} unregister={unregister} clearErrors={clearErrors}
                                                setOrgValue={setStateId} mode={mode}
                                            >
                                            </FormInputDropdown>
                                            <FormLabel required id="noteContent" sx={formLabelStyling}>
                                                Content:
                                            </FormLabel>
                                            <LimitedTextarea trigger={trigger} setError={setError} rows={10} unregister={unregister} columns={10} limit={5} value={noteContent} setNoteContent={setNoteContent} name="noteContent" errors={errors} errorsContent={errors.content} register={register} control={control} error clearErrors={clearErrors} currentPageData={currentPageData} setCurrentPageData={setCurrentPageData} />
                                            <div style={{ marginTop: '50px' }}></div>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                size="medium"
                                                sx={{ boxShadow: 2 }}
                                                style={{
                                                    borderRadius: '35px',
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

export const FormInputDropdown = ({
    name,
    control,
    label,
    options,
    register,
    errors,
    initialValue,
    currentPageData,
    setCurrentPageData,
    requiredName,
    requiredPhrase,
    optionId,
    optionName,
    mode,
    trigger, setError, unregister, clearErrors, setOrgValue
}) => {
    const generateSingleOptions = () => {
        return options.$values.map((option) => {
            return (
                <MenuItem key={option[optionId]} value={option[optionId]}>
                    {option[optionName]}
                </MenuItem>
            );
        });
    };
    const [content, setContent] = useState(initialValue);
    const setFormattedContent = (event) => {
        setContent(event);
        setOrgValue(event);
        // if (!IsNullOrEmpty(content)) {
        //     errors[name] = null;
        //     clearErrors(name);
        //     unregister(name);

        // }
        const tempCurrentPageData = [...currentPageData];
        currentPageData[0][optionId] = event;
        setCurrentPageData(tempCurrentPageData);
        return event;
    };

    useEffect(() => {
        const tempCurrentPageData = [...currentPageData];
        currentPageData[0][optionId] = content;
        setCurrentPageData(tempCurrentPageData);
        // if (!IsNullOrEmpty(content)) {
        //     errors[name] = null;
        //     clearErrors(name);
        //     unregister(name);
        // }
    }, [content]);

    // useEffect(() => {       
    //     if (!IsNullOrEmpty(content)) {
    //         errors[name] = null;
    //         clearErrors(name);
    //         unregister(name);
    //     }
    // }, []);


   



    return (
        <>
            <FormControl size={"small"}>
                <Controller
                defaultValue={content}
                    render={({ field: { onChange, value },
                        fieldState,
                    }) => (
                        <React.Fragment>
                            <DropDown
                                labelId={`${name}_label`}
                                label={name}
                              
                                onChange={onChange}
                                value={value}
                                
                                error={!!fieldState.error}
                            >
                                {generateSingleOptions()}
                            </DropDown>
                            {/* {fieldState.error ? (
                                <FormHelperText error>{fieldState.error?.message}</FormHelperText>
                            ) : null} */}
                             {errors?.[name] && <p>{errors?.[name].message}</p>}
                        </React.Fragment>
                    )}
                    control={control}
                    name={name}
                    rules={{ required: requiredPhrase }}
                />
            </FormControl>
        </>
    );
};


//-------------------------- Mulit Text field ----------------------------------------//
const LimitedTextarea = ({ trigger, setError, rows, cols, value, limit, name, register, unregister, control, errors, setNoteContent, currentPageData, setCurrentPageData, clearErrors }) => {
    const [content, setContent] = useState(value.slice(0, limit));

    const setFormattedContent = useCallback(
        text => {
            setContent(text.slice(0, limit));
            if (text.length > 0) {
                errors[name] = null;
                clearErrors(name);
                errors.noteContent = null;
                unregister(name);
            }
            else {

                // setError(name, { type: 'required', message: 'Content is required!' });
                // trigger(name);
            }
            const tempCurrentPageData = [...currentPageData];
            tempCurrentPageData[0][name] = text.slice(0, limit);
            setCurrentPageData(tempCurrentPageData);
            setNoteContent(text.slice(0, limit));
        },
        [limit, setContent]
    );
    const { ref, ...inputProps } = register(name, {
        required: "Content is required!"
    });
    useEffect(() => {
        if (content.length > 0) {
            clearErrors(name);
            errors[name] = null;
            errors.noteContent = null;

        }
    }, [content]);

    return (
        <>
            <Controller
                name={name}
                control={control}
                render={({
                    field: { onChange, value = content },
                    fieldState: { error },
                    formState,
                }) => (
                    <TextField
                        helperText={error ? error.message : null}
                        error={!!error}
                        onChange={event => {
                            setFormattedContent(event.target.value);
                        }}
                        inputRef={ref}
                        value={value}
                        fullWidth
                        rows={rows}
                        cols={cols} multiline
                        InputProps={{ sx: { borderRadius: 5 } }}
                        variant="outlined"
                    />
                )}
            />
            <p>
                {content.length}/Max Word Count:{limit}
            </p>
            {errors?.message && <span role="alert">{errors?.message}</span>}
        </>
    );
};