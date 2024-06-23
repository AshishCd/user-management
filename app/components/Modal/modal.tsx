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

interface IModalProps {
    handleClose: () => void;
    open: boolean;
    type: string;
    addRecordToExistingTable: (record: IUserData) => void;
    currentUser: IUserData | null;
    editExistingRecord: (values: { name: string, username: string, email: string }) => void;
};

export const Modal: React.FunctionComponent<IModalProps> = ({ handleClose, open, type, addRecordToExistingTable, currentUser, editExistingRecord }) => {
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
        if (type === "delete") {
            return (
                <div>{"delete"}</div>
            )
        } else {
            return <AddEditFormModal editExistingRecord={editExistingRecord} currentUser={currentUser} addRecordToExistingTable={addRecordToExistingTable} type={type} />
        }
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
            </Dialog>
        </div>
    )
}