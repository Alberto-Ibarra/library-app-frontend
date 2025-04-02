import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, MenuItem } from '@mui/material';
import axios from 'axios';

const RegisterUser = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        role: 'user' // Default role is 'user'
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('https://library-app-production-8775.up.railway.app/api/auth/register', formData);
            setSuccess('User registered successfully');
            setFormData({ firstname: '', lastname: '', email: '', password: '', role: 'user' });
        } catch (err) {
            setError('Failed to register user');
        }
    };

    return (
        <Box sx={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.default'
        }}>
            <Paper sx={{ p: 4, width: 350, textAlign: 'center' }}>
                <Typography variant="h5" gutterBottom>
                    Register New User
                </Typography>
                <form onSubmit={handleRegister}>
                    <TextField
                        label="First Name"
                        name="firstname"
                        fullWidth
                        margin="normal"
                        value={formData.firstname}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Last Name"
                        name="lastname"
                        fullWidth
                        margin="normal"
                        value={formData.lastname}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        select
                        label="Role"
                        name="role"
                        fullWidth
                        margin="normal"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <MenuItem value="User">User</MenuItem>
                        <MenuItem value="Admin">Admin</MenuItem>
                    </TextField>
                    {error && <Typography color="error" variant="body2">{error}</Typography>}
                    {success && <Typography color="success.main" variant="body2">{success}</Typography>}
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Register User
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default RegisterUser;
