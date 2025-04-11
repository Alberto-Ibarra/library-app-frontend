import React, {useEffect, useState} from 'react'
import { Modal, Box, TextField, Button, Typography, MenuItem } from '@mui/material';

export default function EditBookCopyModal({open, handleClose, bookData, handleSave}) {
    const [formData, setFormData] = useState({
        location: '',
        bookcondition: ''
    });

    useEffect(() => {
        if(bookData){
            setFormData({
                location: bookData.location || '',
                bookcondition: bookData.bookcondition || ''
            });
        }
    }, [bookData]);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSave({...bookData, ...formData});
        handleClose();
    }

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
                <Typography variant='h6'>Edit Book Copy</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField 
                    select 
                    fullWidth 
                    margin="normal" 
                    label="Location" 
                    name="location" 
                    value={formData.location}
                    onChange={handleChange}
                    >
                        {[...Array(12)].map((_, i) => (
                            <MenuItem key={i} value={`Aisle ${i+1}`}>{`Aisle ${i+1}`}</MenuItem>
                        ))}
                    </TextField>
                    <TextField 
                    select 
                    fullWidth 
                    margin="normal" 
                    label="Condition" 
                    name="bookcondition" 
                    value={formData.bookcondition}
                    onChange={handleChange}
                    >
                        {['New', 'Good', 'Fair', 'Poor'].map((condition, i) => (
                            <MenuItem key={i} value={condition}>{condition}</MenuItem>
                        ))}
                    </TextField>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Button variant="contained" color="primary" type="submit">Save</Button>
                        <Button variant="outlined" color="secondary" onClick={handleClose}>Cancel</Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
}