import React, { useState } from 'react';
import { Box, Button, TextField, Typography, MenuItem } from '@mui/material';
import axios from 'axios';

const AddPatronForm = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        status: 'active',
        pin: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData(prev => ({
        ...prev,
        [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('authToken');

        try {
        await axios.post('https://library-app-production-8775.up.railway.app/api/patrons/addpatron', formData, {
            headers: {
            Authorization: `Bearer ${token}`
            }
        });
        if (onSuccess) onSuccess();
        setFormData({
            firstname: '',
            lastname: '',
            email: '',
            status: 'active',
            pin: ''
        });
        alert("Patron added successfully!");
        } catch (error) {
            if (error.response?.status === 409) {
                setErrorMessage("A patron with this email already exists.");
            } else {
                setErrorMessage("Failed to add patron.");
            }
            console.error("Error adding patron:", error);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 3, maxWidth: 500, mx: 'auto' }}>
        <Typography variant="h5" mb={2}>Add New Patron</Typography>
        <TextField
            fullWidth
            label="First Name"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            margin="normal"
            required
        />
        <TextField
            fullWidth
            label="Last Name"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            margin="normal"
            required
        />
        <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            type="email"
            required
        />
        <TextField
            fullWidth
            select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            margin="normal"
        >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
        </TextField>
        <TextField
            fullWidth
            label="PIN"
            name="pin"
            type="password"
            value={formData.pin}
            onChange={handleChange}
            margin="normal"
            required
            slotProps={{
                input: { maxLength: 6 }
            }}
        />

        {/* Error Message */}
        {errorMessage && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {errorMessage}
            </Typography>
        )}

        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Add Patron
        </Button>
        </Box>
    );
};

export default AddPatronForm;
