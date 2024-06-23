import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { AddEditFormModal } from "../AddEditForm/addEditFormModal";
import DialogContent from '@mui/material/DialogContent';
import styles from "./modal.module.css";
import { Constants } from '@/util/constants';
import { IUserData } from '@/app/interfaces/interface';
import { DeleteRecord } from '../Delete/deleteRecord';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

interface IModalProps {
    handleClose: () => void;
    open: boolean;
    type: string;
    addRecordToExistingTable: (record: IUserData) => void;
    currentUser: IUserData | null;
    editExistingRecord: (values: { name: string, username: string, email: string }) => void;
    deleteExistingRecord: () => void;
};

export const Modal: React.FunctionComponent<IModalProps> = ({ handleClose, open, type, addRecordToExistingTable, currentUser, editExistingRecord, deleteExistingRecord }) => {
    const getheading = (type: string) => {
        if (type === Constants.ADD) {
            return "Add Records"
        } else if (type === Constants.EDIT) {
            return "Edit Record"
        } else if (type === Constants.DELETE) {
            return "Delete Record"
        }

    };

    const renderContent = () => {
        if (type === Constants.DELETE) {
            return (
                <DeleteRecord record={currentUser} />
            )
        } else if(type === Constants.EDIT || type === Constants.ADD) {
            return <AddEditFormModal editExistingRecord={editExistingRecord} currentUser={currentUser} addRecordToExistingTable={addRecordToExistingTable} type={type} />
        }
    }

    const handleDelete = () => {
        deleteExistingRecord();
    }

    const renderButtonsForDelete = () => {
        return (
            type === Constants.DELETE && <DialogActions>
                <Button color="error" onClick={handleDelete}>
                    Delete
                </Button>
                <Button onClick={handleClose}>
                    Cancel
                </Button>
            </DialogActions>
        )
    }

    return (
        <div className={styles.modalWrapper}>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth={true}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    {getheading(type)}
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    {renderContent()}
                </DialogContent>
                {renderButtonsForDelete()}
            </Dialog>
        </div>
    )
}