import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Typography, Box} from '@mui/material';
import EditUserModal from '../components/users/EditUserModal';
import UserTable from '../components/users/UserTable';
import ConfirmDeleteDialog from '../components/users/ConfirmDeleteDialog';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [open, setOpen] = useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        axios.get('https://library-app-production-8775.up.railway.app/api/auth', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching users', error));
    }, []);

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setOpen(true);
    };

    const handleDeleteClick = (user) => {
        setSelectedUser(user);
        setConfirmDeleteOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            const token = localStorage.getItem('authToken');
            await axios.delete(`https://library-app-production-8775.up.railway.app/api/auth/delete/${selectedUser.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers((prevUsers) => prevUsers.filter(user => user.id !== selectedUser.id));
            setConfirmDeleteOpen(false);
            setSelectedUser(null);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleSave = async (updatedUser) => {
        try {
            const token = localStorage.getItem('authToken');

            await axios.put(
                `https://library-app-production-8775.up.railway.app/api/auth/updateuser/${updatedUser.id}`,
                updatedUser,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === updatedUser.id ? updatedUser : user
                )
            );
            setOpen(false);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>Users</Typography>
            
            <UserTable
                users={users}
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}
            />

            {/* Edit Modal */}
            {selectedUser && (
                <EditUserModal open={open} handleClose={() => setOpen(false)} userData={selectedUser} handleSave={handleSave} />
            )}

            {/* Delete Confirmation Dialog */}
            <ConfirmDeleteDialog
                confirmDeleteOpen={confirmDeleteOpen}
                setConfirmDeleteOpen={setConfirmDeleteOpen}
                handleDeleteConfirm={handleDeleteConfirm}
            />
        </Box>
    );
};

export default Users;
