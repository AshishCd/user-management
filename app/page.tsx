"use client";

import React, { ChangeEvent, useEffect, useState } from 'react';
import { IUserData, Order } from './interfaces/interface';
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
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof IUserData>('id');
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleClickOpen = (type: string, id?: number | undefined) => {
        setOpen(true);
        setModalType(type);
        if (type === Constants.EDIT) {
            filterCurrentUser(id as number);
        }
    };

    const handleRequestSort = (property: keyof IUserData) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const filteredUserData = userData.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedUserData = [...filteredUserData].sort((a, b) => {
        if (a[orderBy] < b[orderBy]) {
            return order === 'asc' ? -1 : 1;
        }
        if (a[orderBy] > b[orderBy]) {
            return order === 'asc' ? 1 : -1;
        }
        return 0;
    });

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

    const handleDelete = (type: string, id: number) => {
        setOpen(true);
        setModalType(type);
        filterCurrentUser(id as number);
    }

    const fetchUserData = () => {
        axios.get(Constants.GETURL).then((res) => {
            setUserData(res.data);
        });
    }

    const deleteExistingRecord = () => {
        const existingRecords = [...userData];
        const filteredRecords = existingRecords.filter((record) => {
            return record.id !== currentUser?.id
        });
        if (currentUser?.id as number > 10) {
            setUserData(filteredRecords);
        }
        axios.delete(`${Constants.GETURL}/:${currentUser?.id}`).then((res) => {
            //this is just a fake API, it won't actually delete the record that mean passing the ID which is unknow to it will fail the API call
            if (res.status == 200) {
                setUserData(filteredRecords);
            };
        }).catch((error) => console.log(error));
        handleClose();
    };

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

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

    const rows = sortedUserData?.map((data) => {
        return {
            id: data.id,
            name: data.name,
            username: data.username,
            email: data.email,
        }
    });

    return (
        <main className={styles.main}>
            <div className={styles.mainHeader}>{"User Management System"}</div>
            <Maintable
                order={order}
                orderBy={orderBy}
                handleRequestSort={handleRequestSort}
                handleClickOpen={handleClickOpen}
                handleDelete={handleDelete}
                rows={rows}
                searchTerm={searchTerm}
                handleSearchChange={handleSearchChange}
            />
            <Modal
                editExistingRecord={editExistingRecord}
                currentUser={currentUser}
                addRecordToExistingTable={addRecordToExistingTable}
                handleClose={handleClose}
                open={open}
                type={modalType}
                deleteExistingRecord={deleteExistingRecord}
            />
        </main>
    )
};

export default Home;