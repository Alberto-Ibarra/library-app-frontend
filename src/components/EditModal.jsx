import React, { useEffect, useState } from 'react';
import { Modal, Box, TextField, Button, Typography, MenuItem } from '@mui/material';

const EditModal = ({ open, handleClose, userData, handleSave }) => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        role: ''
    });

    useEffect(() => {
        if (userData) {
            setFormData({
                firstname: userData.firstname || '',
                lastname: userData.lastname || '',
                email: userData.email || '',
                role: userData.role || ''
            });
        }
    }, [userData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSave({ ...userData, ...formData });  // Merge changes with the original user object
        handleClose();
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)', 
                width: 400, 
                bgcolor: 'background.paper', 
                boxShadow: 24, 
                p: 4, 
                borderRadius: 2
            }}>
                <Typography variant="h6" gutterBottom>Edit User</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField fullWidth margin="normal" label="First Name" name="firstname" value={formData.firstname} onChange={handleChange} />
                    <TextField fullWidth margin="normal" label="Last Name" name="lastname" value={formData.lastname} onChange={handleChange} />
                    <TextField fullWidth margin="normal" label="Email" name="email" value={formData.email} onChange={handleChange} />
                    <TextField
                        select
                        label="Role"
                        name="role"
                        fullWidth
                        margin="normal"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value="User">User</MenuItem>
                        <MenuItem value="Admin">Admin</MenuItem>
                    </TextField>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Button variant="contained" color="primary" type="submit">Save</Button>
                        <Button variant="outlined" color="secondary" onClick={handleClose}>Cancel</Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

export default EditModal;
