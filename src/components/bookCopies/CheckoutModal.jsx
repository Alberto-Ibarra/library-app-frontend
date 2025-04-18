import React, { useState, useEffect } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Autocomplete } from '@mui/material';
import axios from 'axios';

const CheckoutModal = ({ open, handleClose, handleCheckout }) => {
    const [patronId, setPatronId] = useState('');
    const [pin, setPin] = useState('');
    const [patrons, setPatrons] = useState([]);
    const [selectedPatron, setSelectedPatron] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPatrons = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get('https://library-app-production-8775.up.railway.app/api/patrons/patrons', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPatrons(response.data);
            } catch (error) {
                console.error('Error fetching patrons:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPatrons();
    }, []);

    const handlePatronChange = (event, value) => {
        setSelectedPatron(value);
        if (value) {
            setPatronId(value.id);
        }
    };

    const handleSubmit = async () => {
        if (!patronId || !pin) {
            console.log("Please fill in both patron ID and pin.");
            return;
        }
        
        try {
            await handleCheckout(patronId, pin);
            handleClose();
        } catch (error) {
            console.error('Error during checkout:', error);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
            <DialogTitle>Checkout Book</DialogTitle>
            <DialogContent>
                <Autocomplete
                    options={patrons}
                    getOptionLabel={(option) => `${option.id} - ${option.firstname} ${option.lastname}`}
                    onChange={handlePatronChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Select Patron"
                            variant="outlined"
                            fullWidth
                        />
                    )}
                />
                <TextField
                    label="Enter PIN"
                    variant="outlined"
                    type="password"
                    fullWidth
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    sx={{ mt: 2 }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit} disabled={loading} variant="contained" color="primary">
                    {loading ? 'Checking out...' : 'Checkout'}
                </Button>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CheckoutModal;
