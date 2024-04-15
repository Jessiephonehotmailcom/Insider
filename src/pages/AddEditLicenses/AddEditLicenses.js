import React, { useState, useEffect, forwardRef, useRef, useImperativeHandle } from "react";
import { Select, MenuItem, FormControl, InputLabel, Typography, Grid, Box, Container, Divider, Button } from '@mui/material';

export default function AddEditLicenses(props) {
    const { mode, id } = props.location.state;
    const [topBackgroundColor, setTopBackgroundColor] = useState({
        css: { backgroundColor: "#fff" },
    });
    const [bottomBackgroundColor, setBottomBackgroundColor] = useState({
        css: { backgroundColor: "#fff" },
    });
    return (
        <>
            <Container sx={{ height: "100%", width: "100%", marginTop: "62px", marginBottom: "100px" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={5}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: "0px", alignItems: "flex-start", marginTop: 5, marginRight: 5 }}>
                            <FormControl fullWidth>
                                <InputLabel id="select-template-name-dropdown">
                                    Left
                                </InputLabel>
                            </FormControl>
                        </Box>                       
                    </Grid>
                    <Divider orientation="vertical" flexItem />
                    <Grid item xs={12} md={5}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: "15px", alignItems: "flex-start", marginTop: 5, marginRight: 5 }}>
                            <FormControl fullWidth>
                                <InputLabel id="select-template-name-dropdown">
                                    Right
                                </InputLabel>
                            </FormControl>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: 5, marginRight: 5 }}>
                A
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}