import React, { useEffect, useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, Typography, Box, CircularProgress, Divider, Grid
} from '@mui/material';
import axios from 'axios';

const BookDetailsDialog = ({
    open,
    handleClose,
    bookId,
    onEdit,
    onDelete,
    onCheckout,
    onReturn
}) => {
    const [bookDetails, setBookDetails] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log("Book ID received by dialog:", bookId);
        if (open && bookId) {
            fetchBookDetails(bookId);
        }
    }, [open, bookId]);


    useEffect(() => {
        if (bookDetails) {
            console.log('Fetched book details:', bookDetails);
        }
    }, [bookDetails]);

    const fetchBookDetails = async (id) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('authToken');
            const response = await axios.get(
                `https://library-app-production-8775.up.railway.app/api/bookcopies/copy/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setBookDetails(response.data);
        } catch (error) {
            console.error('Error fetching book details:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!open) return null;

    const formatDate = (dateStr) =>
        dateStr ? new Date(dateStr).toLocaleString() : 'N/A';

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>📘 Book Copy Details</DialogTitle>
            <DialogContent dividers>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                        <CircularProgress />
                    </Box>
                ) : bookDetails ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {/* Book Information */}
                        <Box>
                            <Typography variant="h6" gutterBottom>Book Information</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <Typography><strong>Title:</strong> {bookDetails.book_title}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography><strong>Author:</strong> {bookDetails.authors}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography><strong>Year Published:</strong> {bookDetails.yearpublished || 'N/A'}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography><strong>Category:</strong> {bookDetails.category || 'N/A'}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography><strong>Condition:</strong> {bookDetails.bookcondition || 'N/A'}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography><strong>Location:</strong> {bookDetails.location || 'N/A'}</Typography>
                                </Grid>
                            </Grid>
                        </Box>

                        <Divider />

                        {/* Availability Section */}
                        <Box>
                            <Typography variant="h6" gutterBottom>Availability</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <Typography><strong>Status:</strong> {bookDetails.status || 'N/A'}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography><strong>Available:</strong> {bookDetails.isavailable ? 'Yes' : 'No'}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography><strong>Copy ID:</strong> {bookDetails.bookcopyid}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography><strong>Checkout Time:</strong> {formatDate(bookDetails.checkouttime)}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography><strong>Returned Time:</strong> {formatDate(bookDetails.returnedtime)}</Typography>
                                </Grid>
                            </Grid>
                        </Box>

                        <Divider />

                        {/* Patron Info */}
                        {bookDetails.firstname && (
                            <Box>
                                <Typography variant="h6" gutterBottom>Patron Information</Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={4}>
                                        <Typography><strong>Name:</strong> {bookDetails.firstname} {bookDetails.lastname}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography><strong>Email:</strong> {bookDetails.email || 'N/A'}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography><strong>Patron ID:</strong> {bookDetails.patronid}</Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        )}
                    </Box>
                ) : (
                    <Typography color="error">Failed to load book details.</Typography>
                )}
            </DialogContent>

            <DialogActions>
                {bookDetails?.isavailable ? (
                    <Button 
                        color="secondary" 
                        variant="contained" 
                        onClick={() => onCheckout({
                            ...bookDetails,
                            id: bookDetails.bookcopyid
                        })}
                    >
                        Checkout
                    </Button>
                ) : (
                    <Button 
                        color="success" 
                        variant="contained" 
                        onClick={() => onReturn({
                            ...bookDetails,
                            id: bookDetails.bookcopyid
                        })}
                    >
                        Return
                    </Button>
                )}
                <Button 
                    color="primary" 
                    variant="contained" 
                    onClick={() => onEdit({
                        ...bookDetails,
                        id: bookDetails.bookcopyid
                    })}
                >
                    Edit
                </Button>
                <Button 
                    color="error" 
                    variant="contained" 
                    onClick={() => onDelete({
                        ...bookDetails,
                        id: bookDetails.bookcopyid
                    })}
                >
                    Delete
                </Button>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>

        </Dialog>
    );
};

export default BookDetailsDialog;
