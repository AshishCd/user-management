import { ChangeEvent } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from "./mainTable.module.css";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IUserData } from '../interfaces/interface';
import { Button, TableSortLabel, TextField } from '@mui/material';
import { Constants } from '@/util/constants';

interface IMainTableProps {
    rows: IUserData[];
    handleClickOpen: (type: string, id?: number) => void;
    handleDelete: (type: string, id: number,) => void;
    orderBy: string;
    handleRequestSort: (property: keyof IUserData) => void;
    order: string;
    searchTerm: string;
    handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Maintable: React.FunctionComponent<IMainTableProps> = ({ rows, handleClickOpen, handleDelete, orderBy, handleRequestSort, order, searchTerm, handleSearchChange }) => {
    return (
        <div>
            <TableContainer component={Paper} sx={{ width: '100%', maxWidth: '800px', margin: 'auto', minWidth:'800px'}}>
            <div className={styles.tableHeader}>
                <TextField
                    label="Search by name"
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{ margin: '16px' }}
                    size='small'
                />
                <Button variant="outlined" onClick={() => handleClickOpen(Constants.ADD)}>{"Add Record"}</Button></div>
                <Table sx={{ minWidth: 750 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell key={'id'}>
                                <TableSortLabel
                                    active={orderBy === 'id'}
                                    direction={'asc'}
                                    onClick={() => handleRequestSort('id')}
                                >
                                    {"Id"}
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="left">{"Name"}</TableCell>
                            <TableCell align="left">{"UserName"}</TableCell>
                            <TableCell align="left">{"Email"}</TableCell>
                            <TableCell align="center">{"Edit"}</TableCell>
                            <TableCell align="center">{"Delete"}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="left">{row.username}</TableCell>
                                <TableCell align="left">{row.email}</TableCell>
                                <TableCell align="left" className={styles.tbIcon}>
                                    <Button variant="text" onClick={() => handleClickOpen("edit", row.id)}>
                                        <EditIcon />
                                    </Button>
                                </TableCell>
                                <TableCell align="center" className={styles.tbIcon}>
                                    <Button variant="text" onClick={() => handleDelete("delete", row.id)}>
                                        <DeleteIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}