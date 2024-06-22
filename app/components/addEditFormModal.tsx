import * as React from 'react';
import styles from "./addEditFormModal.module.css";

interface IAddEditFormModalProps {

}


export const AddEditFormModal: React.FunctionComponent<IAddEditFormModalProps> = () => {
    return (
        <div>
            <form className={styles.form}>
                <div className={styles.inputBlock}>
                    <label htmlFor='name' className={styles.inputLabel}>
                        {"Name: "}
                    </label>
                    <input className={styles.inputBox} type='name' name="name" id="name" placeholder='Name' autoComplete='off' />
                </div>
                <div className={styles.inputBlock}>
                    <label htmlFor='username' className={styles.inputLabel}>
                        {"Username: "}
                    </label>
                    <input className={styles.inputBox} type='text' name="username" id="username" placeholder='Username' autoComplete='off' />
                </div>
                <div className={styles.inputBlock}>
                    <label htmlFor='email' className={styles.inputLabel}>
                        {"Email: "}
                    </label>
                    <input className={styles.inputBox} type='email' name="email" id="email" placeholder='Email' autoComplete='off' />
                </div>
            </form>
        </div>
    );
}