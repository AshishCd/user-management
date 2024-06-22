import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from "./table.module.css";
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IUserData } from '../interfaces/interface';
import { Button } from '@mui/material';

interface IMainTableProps {
    rows: IUserData[];
    handleClickOpen: (id: number, type: string) => void;
    handleDelete: (id: number, type: string) => void;
}

export const Maintable: React.FunctionComponent<IMainTableProps> = ({ rows, handleClickOpen, handleDelete }) => {
    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>{"Id"}</TableCell>
                            <TableCell align="left">{"Name"}</TableCell>
                            <TableCell align="left">{"UserName"}</TableCell>
                            <TableCell align="left">{"Email"}</TableCell>
                            <TableCell align="left">{"Edit"}</TableCell>
                            <TableCell align="left">{"Delete"}</TableCell>
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
                                    <Button variant="text" onClick={() => handleClickOpen(row.id, "edit")}>
                                        <EditIcon />
                                    </Button>
                                </TableCell>
                                <TableCell align="center" className={styles.tbIcon}>
                                    <Button variant="text" onClick={() => handleDelete(row.id, "add")}>
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