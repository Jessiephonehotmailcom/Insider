import useTheme from '@mui/system/useTheme';
import React, { useState, useEffect, forwardRef, useRef, useImperativeHandle } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';

import './Table.css';
import { useStoreState, useStoreActions } from 'easy-peasy';
import {
    Alert,
    Backdrop,
    Card,
    Grid,
    CircularProgress,
    Table,
    Stack,
    Paper,
    Avatar,
    Button,
    Popover,
    Checkbox,
    TableRow,
    MenuItem,
    TableBody,
    TableHead,
    TableCell,
    Container,
    Typography,
    IconButton,
    TableContainer,
    TablePagination,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { useHistory } from 'react-router-dom';

const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = React.useState(config);

    const sortedItems = React.useMemo(() => {
        let sortableItems = [...items];
        if (sortConfig !== null) {
            if (sortableItems[0] !== null) {
                sortableItems[0].$values.sort((a, b) => {
                    if (a[sortConfig.key] < b[sortConfig.key]) {
                        return sortConfig.direction === 'ascending' ? -1 : 1;
                    }
                    if (a[sortConfig.key] > b[sortConfig.key]) {
                        return sortConfig.direction === 'ascending' ? 1 : -1;
                    }
                    return 0;

                });
            }
        }
        return sortableItems;
    }, [items, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === 'ascending'
        ) {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return { items: sortedItems, requestSort, sortConfig };
};

export default function CustomTable({ data, columns, sortableColumns, pageSize }) {
    var arr = [data?.licenses?.data];
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const goToAddEditLicenses = (mode, licenseId = null) => {
        history.push({ pathname: '/AddEditLicenses', state: { id: licenseId, mode: mode } });
    };
    const { items, requestSort, sortConfig } = useSortableData(arr);
    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }

        return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    return (
        <body>
            <section>
                <div class="container">
                    <table>
                        <thead>
                            <tr>
                                {columns.map((value) => {
                                    return (
                                        <th>
                                            <button
                                                type="button"
                                                onClick={() => requestSort(value.id)}
                                                className={getClassNamesFor(value.id)}
                                            >{value.label}</button></th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {typeof (items[0]) === 'undefined' || items[0] === null ? (
                                <>
                                    <div>
                                        <Alert severity="info" sx={{ fontSize: "15px" }}>
                                            No record was found.
                                        </Alert>
                                    </div>
                                </>
                            )
                                :
                                (
                                    <>
                                        {items[0].$values.map((value) => {
                                            return (
                                                <tr key={value.id}>
                                                    <td data-name="licenseNumber">{value.licenseNumber}</td>
                                                    <td data-name="state">{value.state}</td>
                                                    <td data-name="licenseType">{value.licenseType}</td>
                                                    <td data-name="status">{value.status}</td>
                                                    <td data-name="status"><EditIcon sx={{ "&:hover": { color: "blue" } }} onClick={() => goToAddEditLicenses('edit', value.licenseNumber)}></EditIcon></td>
                                                </tr>
                                            );
                                        })}
                                    </>
                                )
                            }
                        </tbody>
                    </table>
                    <div id="wrapper">
                        <div id="left-column">
                            <AddBoxOutlinedIcon onClick={() => goToAddEditLicenses('add')} />
                        </div>
                        <div id="right-column">
                            <Button variant="contained">Active/Pending Licenses: {data.activePendingLicenses}</Button>
                            
                        </div>
                    </div>
                </div>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </section>
        </body>
    );
}
