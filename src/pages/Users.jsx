import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Typography,
    Paper,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import EditUserModal from '../components/modals/EditUserModal';

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
            <TableContainer component={Paper} sx={{ width: '100%', mx: 'auto', p: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#3E6B48', color: '#F5F5F5' }}>
                            <TableCell sx={{ color: '#F5F5F5' }}><strong>Id</strong></TableCell>
                            <TableCell sx={{ color: '#F5F5F5' }}><strong>Role</strong></TableCell>
                            <TableCell sx={{ color: '#F5F5F5' }}><strong>First Name</strong></TableCell>
                            <TableCell sx={{ color: '#F5F5F5' }}><strong>Last Name</strong></TableCell>
                            <TableCell sx={{ color: '#F5F5F5' }}><strong>Email</strong></TableCell>
                            <TableCell sx={{ color: '#F5F5F5' }}><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user, index) => (
                            <TableRow key={user.id || index} sx={{ backgroundColor: index % 2 === 0 ? '#E6EAE4' : '#F8F6F2' }}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>{user.firstname}</TableCell>
                                <TableCell>{user.lastname}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Button variant="contained" color="primary" size="small" onClick={() => handleEditClick(user)}>
                                            Edit
                                        </Button>
                                        <Button variant="contained" color="error" size="small" onClick={() => handleDeleteClick(user)}>
                                            Delete
                                        </Button>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Edit Modal */}
            {selectedUser && (
                <EditUserModal open={open} handleClose={() => setOpen(false)} userData={selectedUser} handleSave={handleSave} />
            )}

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={confirmDeleteOpen}
                onClose={() => setConfirmDeleteOpen(false)}
            >
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this user?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDeleteOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Users;
