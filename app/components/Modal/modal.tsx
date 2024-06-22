import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { AddEditFormModal } from "../addEditFormModal";
import DialogContent from '@mui/material/DialogContent';
import styles from "./modal.module.css";

interface IModalProps {
    handleClose: () => void;
    open: boolean;
    type: string;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export const Modal: React.FunctionComponent<IModalProps> = ({
    handleClose, open, type
}) => {
    const getheading = (type: string) => {
        if (type === "add") {
            return "Add Records"
        } else if (type === "edit") {
            return "Edit Record"
        }
        return "Delete Record"
    };

    const renderContent = () => {
        if (type === "delete") {
            return (
                <div>{"delete"}</div>
            )
        } else {
            return <AddEditFormModal />
        }
    }

    return (
        <div className={styles.modalWrapper}>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
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
            </BootstrapDialog>
        </div>
    )
}