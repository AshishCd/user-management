"use client";

import React, { useEffect, useState } from 'react';
import { IUserData } from './interfaces/interface';
import axios from 'axios';
import styles from "./page.module.css";
import { Maintable } from './components/mainTable';
import { AddEditFormModal } from './components/addEditFormModal';
import { Modal } from './components/Modal/modal';

interface IHomeProps { }

const Home: React.FunctionComponent<IHomeProps> = () => {
    const [userData, setUserData] = useState<IUserData[]>([]);
    const [open, setOpen] = useState(false);
    const [modalType, setModalType] = useState<string>("");

    const handleClickOpen = (id: number, type: string) => {
        setOpen(true);
        setModalType(type);
    };

    const handleClose = () => {
        setOpen(false);
        setModalType("");
    };

    const handleDelete = (id: number, type: string) => {
        setOpen(true);
        setModalType(type);
    }

    useEffect(() => {
        function fetchUserData() {
            axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
                console.log(res);
                setUserData(res.data);
            });
        }
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
            <Modal handleClose={handleClose} open={open} type={modalType} />
        </main>
    )
};

export default Home;