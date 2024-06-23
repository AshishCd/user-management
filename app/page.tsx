"use client";

import React, { useEffect, useState } from 'react';
import { IUserData } from './interfaces/interface';
import axios from 'axios';
import styles from "./page.module.css";
import { Maintable } from './components/mainTable';
import { AddEditFormModal } from './components/AddEditForm/addEditFormModal';
import { Modal } from './components/Modal/modal';
import { Constants } from '@/util/constants';

interface IHomeProps { }

const Home: React.FunctionComponent<IHomeProps> = () => {
    const [userData, setUserData] = useState<IUserData[]>([]);
    const [open, setOpen] = useState(false);
    const [modalType, setModalType] = useState<string>("");
    const [currentUser, setCurrentUser] = useState<IUserData | null>(null);

    const handleClickOpen = (type: string, id?: number | undefined) => {
        setOpen(true);
        setModalType(type);
        if (type === Constants.EDIT) {
            filterCurrentUser(id as number);
        }
    };

    const filterCurrentUser = (id: number) => {
        const filtredUser = userData?.filter((user) => {
            return user.id === id;
        });
        const currentUser = filtredUser?.[0];
        setCurrentUser(currentUser);
    }

    const handleClose = () => {
        setOpen(false);
        setModalType("");
        setCurrentUser(null);
    };

    const handleDelete = (id: number, type: string) => {
        setOpen(true);
        setModalType(type);
    }

    const fetchUserData = () => {
        axios.get(Constants.GETURL).then((res) => {
            console.log(res);
            setUserData(res.data);
        });
    }

    const addRecordToExistingTable = (record: IUserData) => {
        record.id = userData[userData.length - 1].id + 1;
        const records = [...userData, record];
        setUserData(records);
    };

    const editExistingRecord = (values: { name: string, username: string, email: string }) => {
        const { name, email, username } = values;
        const updatedUserData = [...userData];
        const existingUserIndex = updatedUserData.findIndex((user) => user.id === currentUser?.id);

        if (existingUserIndex !== -1) {
            updatedUserData[existingUserIndex] = {
                ...updatedUserData[existingUserIndex],
                name,
                username,
                email,
            };
            setUserData(updatedUserData);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const rows = userData?.map((data) => {
        return {
            id: data.id,
            name: data.name,
            username: data.username,
            email: data.email,
        }
    })

    return (
        <main className={styles.main}>
            <div className={styles.mainHeader}>{"User Management System"}</div>
            <Maintable handleClickOpen={handleClickOpen} handleDelete={handleDelete} rows={rows} />
            <Modal editExistingRecord={editExistingRecord} currentUser={currentUser} addRecordToExistingTable={addRecordToExistingTable} handleClose={handleClose} open={open} type={modalType} />
        </main>
    )
};

export default Home;