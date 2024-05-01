import useTheme from '@mui/system/useTheme';
import React, { useState, useEffect, forwardRef, useRef, useImperativeHandle } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import { FORM_MODES } from "../../helpers/Constants";
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
import { ReturnFullDateTimeOrString } from '../../helpers/Common';
const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = useState(config);

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

export default function CustomTable({ data, columns, sortableColumns, pageSize, routing, tabData }) {
    //  var arr = [data?.licenses?.data];
    var arr = [tabData];
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const handleEdit = (mode, id) => {
        history.push({ pathname: routing, state: { id: id, mode: mode } });
    };
    const { items, requestSort, sortConfig } = useSortableData(arr);
    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }

        return sortConfig.key === name ? sortConfig.direction : undefined;
    };
    const keys1 = Object.keys(typeof (items[0]) === 'undefined' || items[0] === null ? "" : items[0].$values[0] ?? "") ?? null;



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
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {typeof (items[0]) === 'undefined' || items[0] === null ? (
                                <>
                                    <tr>
                                        <td colspan={columns.length + 1}>
                                            <Alert severity="info" sx={{ fontSize: "15px", columnSpan: 'all' }}>
                                                No record was found.
                                            </Alert>

                                        </td>
                                    </tr>
                                </>
                            )
                                :
                                (
                                    <>
                                        {items[0].$values.map((item, index) => (
                                            <tr key={index}>
                                                {keys1.map((key, innerIndex) => (
                                                    (innerIndex > 1 &&
                                                        <>
                                                            <td key={key}>{ReturnFullDateTimeOrString(item[key])}</td>
                                                        </>
                                                    )
                                                ))}
                                                <td data-name="status"><EditIcon sx={{ "&:hover": { color: "blue" } }} onClick={() => handleEdit(FORM_MODES.edit, item.id)}></EditIcon></td>
                                            </tr>
                                        ))}

                                    </>
                                )
                            }
                        </tbody>
                    </table>

                    <div id="wrapper">
                        <div id="left-column">
                            <AddBoxOutlinedIcon onClick={() => handleEdit(FORM_MODES.add, data.id)} />
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
