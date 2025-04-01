import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log('Logging in with:', data);
        
        // 🔽 Replace with your API call for authentication
        const isAuthenticated = data.email === "admin@library.com" && data.password === "test123";

        if (isAuthenticated) {
        localStorage.setItem('authToken', 'dummyToken'); // Store authentication token
        navigate('/book-copies'); // Redirect after login
        } else {
        alert("Invalid email or password");
        }
    };

    return (
        <Box sx={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'
        }}>
        <Paper sx={{ padding: 4, maxWidth: 400, width: '100%', textAlign: 'center' }} elevation={3}>
            <Typography variant="h5" gutterBottom>Login</Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                fullWidth
                label="Email"
                margin="normal"
                {...register("email", { required: "Email is required" })}
                error={!!errors.email}
                helperText={errors.email?.message}
            />

            <TextField
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                {...register("password", { required: "Password is required" })}
                error={!!errors.password}
                helperText={errors.password?.message}
            />

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                Login
            </Button>
            </form>
        </Paper>
        </Box>
    );
};

export default Login;
