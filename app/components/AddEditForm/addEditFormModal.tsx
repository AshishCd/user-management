import * as React from 'react';
import styles from "./addEditFormModal.module.css";
import { useFormik } from 'formik';
import { Button } from '@mui/material';
import { submitSchema } from '@/schemas';
import axios from 'axios';
import { Constants } from '@/util/constants';
import { IUserData } from '@/app/interfaces/interface';

interface IAddEditFormModalProps {
    type: string;
    addRecordToExistingTable: (record: IUserData) => void;
    currentUser: IUserData | null;
    editExistingRecord: (values: { name: string, username: string, email: string }) => void;
}

export const AddEditFormModal: React.FunctionComponent<IAddEditFormModalProps> = ({ type, addRecordToExistingTable, currentUser, editExistingRecord }) => {
    const [isSuccess, setIsSuccess] = React.useState(false);

    const intialValuesForAdd = {
        name: "",
        username: "",
        email: "",
    };

    const initialValuesForEdit = {
        name: currentUser?.name || "",
        username: currentUser?.username || "",
        email: currentUser?.email || ""
    }

    const initialValues = type === Constants.ADD ? intialValuesForAdd : initialValuesForEdit;

    const addRecord = (values: { name: string, username: string, email: string }) => {
        const { name, email, username } = values;
        const obj = {
            name,
            username,
            email
        }
        axios.post(Constants.POSTURL, obj)
            .then(function (response) {
                addRecordToExistingTable(response.data);
                setIsSuccess(true);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const editRecord = async (values: { name: string, username: string, email: string }) => {
        const { name, email, username } = values;
        const obj = {
            name,
            username,
            email
        }
        try {

            if (currentUser?.id as number > 10) {
                setIsSuccess(true);
                editExistingRecord(values);
            } else {
                await axios.put(`${Constants.GETURL}/${currentUser?.id}`, obj).then((res) => {
                    //this won't work for the custom data we will add
                    if (res.status === 200) {
                        setIsSuccess(true);
                        editExistingRecord(values);
                    }
                });
            }

        } catch (error) {
            console.error('Error updating data:', error);
        };
    }

    const { values, handleBlur, handleSubmit, handleChange, errors, touched, isValid, dirty } = useFormik({
        initialValues,
        validationSchema: submitSchema,
        validateOnChange: true,
        onSubmit: (values, action) => {
            if (type === Constants.ADD) {
                addRecord(values);
                action.resetForm();
            } else if (type === Constants.EDIT) {
                editRecord(values);
            }
        },

    });

    const shoudlDisabled = () => {
        return type !== Constants.EDIT && !(isValid && dirty)
    }

    const renderView = () => {
        if (isSuccess) {
            return <div className={styles.successMessage}>{`Done, your data has been ${type === Constants.EDIT ? "updated" : "added"} succesfully!`}</div>
        } else {
            return (
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputBlock}>
                        <label htmlFor='name' className={styles.inputLabel}>
                            {"Name: "}
                        </label>
                        <div style={{ width: "100%" }}>
                            <input className={styles.inputBox} value={values.name} type='name' name="name" id="name" placeholder='Name' autoComplete='off' onChange={handleChange} onBlur={handleBlur} />
                            {errors.name && touched.name && <p className={styles.error}>{errors.name}</p>}
                        </div>
                    </div>
                    <div className={styles.inputBlock}>
                        <label htmlFor='username' className={styles.inputLabel}>
                            {"User name: "}
                        </label>
                        <div style={{ width: "100%" }}>
                            <input className={styles.inputBox} value={values.username} type='text' name="username" id="username" placeholder='Username' autoComplete='off' onChange={handleChange} onBlur={handleBlur} />
                            {errors.username && touched.username && <p className={styles.error}>{errors.username}</p>}
                        </div>
                    </div>
                    <div className={styles.inputBlock}>
                        <label htmlFor='email' className={styles.inputLabel}>
                            {"Email: "}
                        </label>
                        <div style={{ width: "100%" }}>
                            <input className={styles.inputBox} value={values.email} type='email' name="email" id="email" placeholder='Email' autoComplete='off' onChange={handleChange} onBlur={handleBlur} />
                            {errors.email && touched.email && <p className={styles.error}>{errors.email}</p>}
                        </div>
                    </div>
                    <div className={styles.formSubmit}>
                        <Button disabled={shoudlDisabled()} type='submit' variant="outlined">{"Submit"}</Button>
                    </div>
                </form>
            )
        }
    }

    return (
        <div>
            {renderView()}
        </div>
    );
}