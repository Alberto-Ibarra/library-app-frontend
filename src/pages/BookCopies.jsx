import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Typography, Paper, Box, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Dialog, DialogTitle, DialogContent,
    DialogContentText, DialogActions, Button, TextField, FormControlLabel, Checkbox,
    CircularProgress
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import EditBookCopyModal from '../components/modals/EditBookCopyModal';

const BookCopies = () => {
    const [books, setBooks] = useState([]);
    const [availableBooks, setAvailableBooks] = useState([]);
    const [loadingBooks, setLoadingBooks] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [newBookData, setNewBookData] = useState({
        bookid: null,
        location: '',
        bookcondition: '',
        isavailable: true
    });

    const aisles = Array.from({ length: 12 }, (_, i) => `Aisle ${i + 1}`);
    const conditions = ['New', 'Good', 'Fair', 'Poor'];

    useEffect(() => {
        fetchBookCopies();
        fetchAvailableBooks();
    }, []);

    const fetchBookCopies = () => {
        const token = localStorage.getItem('authToken');
        axios.get('https://library-app-production-8775.up.railway.app/api/bookcopies/copies', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(response => setBooks(response.data))
            .catch(error => console.error('Error fetching book copies', error));
    };

    const fetchAvailableBooks = async () => {
        try {
            setLoadingBooks(true);
            const token = localStorage.getItem('authToken');
            const res = await axios.get('https://library-app-production-8775.up.railway.app/api/books/books', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAvailableBooks(res.data);
        } catch (error) {
            console.error('Error fetching available books:', error);
        } finally {
            setLoadingBooks(false);
        }
    };

    const handleDeleteClick = (book) => {
        setSelectedBook(book);
        setConfirmDeleteOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            const token = localStorage.getItem('authToken');
            await axios.delete(`https://library-app-production-8775.up.railway.app/api/bookcopies/copies/${selectedBook.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setBooks(prev => prev.filter(book => book.id !== selectedBook.id));
            setConfirmDeleteOpen(false);
            setSelectedBook(null);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleAddNewBookCopy = async () => {
        if (!newBookData.bookid) {
            console.log("Book ID is required.");
            return;
        }
    
        try {
            console.log(newBookData);
            
            const token = localStorage.getItem('authToken');
            await axios.post(
                'https://library-app-production-8775.up.railway.app/api/bookcopies/copies',
                newBookData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchBookCopies();
            setAddDialogOpen(false);
            setNewBookData({ bookid: null, location: '', bookcondition: '', isavailable: true });
        } catch (error) {
            console.error('Error adding book copy:', error);
        }
    };

    const handleEditClick = (book) => {
        setSelectedBook(book);
        setOpen(true);
    }

    const handleSave = async (updatedBookCopy) => {
        try {
            const token = localStorage.getItem('authToken');
            await axios.put(
                `https://library-app-production-8775.up.railway.app/api/bookcopies/copies/${updatedBookCopy.id}`,
                updatedBookCopy,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setBooks((prevBooks) =>
                prevBooks.map((book) =>
                    book.id === updatedBookCopy.id ? updatedBookCopy : book
                )
            );
            setOpen(false);
            setSelectedBook(null);
        } catch (error) {
            console.error('Error saving book copy:', error);
        }
    };

    return (
        <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h4">Book Copies Page</Typography>
                <Button variant="contained" onClick={() => setAddDialogOpen(true)}>Add New Copy</Button>
            </Box>

            <TableContainer component={Paper} sx={{ width: '100%', mx: 'auto', p: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#3E6B48', color: '#F5F5F5' }}>
                            <TableCell sx={{ color: '#F5F5F5' }}><strong>Id</strong></TableCell>
                            <TableCell sx={{ color: '#F5F5F5' }}><strong>Title</strong></TableCell>
                            <TableCell sx={{ color: '#F5F5F5' }}><strong>Available</strong></TableCell>
                            <TableCell sx={{ color: '#F5F5F5' }}><strong>Location</strong></TableCell>
                            <TableCell sx={{ color: '#F5F5F5' }}><strong>Condition</strong></TableCell>
                            <TableCell sx={{ color: '#F5F5F5' }}><strong>Action</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {books.map((book, index) => (
                            <TableRow key={book.id} sx={{ backgroundColor: index % 2 === 0 ? '#E6EAE4' : '#F8F6F2' }}>
                                <TableCell>{book.id}</TableCell>
                                <TableCell>{book.title}</TableCell>
                                <TableCell>{book.isavailable ? 'Yes' : 'No'}</TableCell>
                                <TableCell>{book.location}</TableCell>
                                <TableCell>{book.bookcondition}</TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Button variant="contained" color="primary" size="small" onClick={() => handleEditClick(book)}>
                                            Edit
                                        </Button>
                                        <Button variant="contained" color="error" size="small" onClick={() => handleDeleteClick(book)}>
                                            Delete
                                        </Button>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Edit modal*/}
            {selectedBook && (
                <EditBookCopyModal open={open} handleClose={() => setOpen(false)} bookData={selectedBook} handleSave={handleSave}/>
            )}

            {/* Delete Confirmation Dialog */}
            <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to delete this book?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDeleteOpen(false)}>Cancel</Button>
                    <Button onClick={handleDeleteConfirm} color="error" variant="contained">Delete</Button>
                </DialogActions>
            </Dialog>

            {/* Add New Copy Dialog */}
            <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} fullWidth maxWidth="xs">
                <DialogTitle>Add New Book Copy</DialogTitle>
                <DialogContent>
                <Autocomplete
                    options={availableBooks}
                    getOptionLabel={(option) => option.title || ''}
                    loading={loadingBooks}
                    onChange={(event, newValue) => {
                        console.log('Selected Book:', newValue);
                        setNewBookData((prevData) => ({
                            ...prevData,
                            bookid: newValue ? newValue.bookid : null
                        }));
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Select Book Title"
                            margin="dense"
                            fullWidth
                            required
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        {loadingBooks ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </>
                                ),
                            }}
                        />
                    )}
                />

                    <Autocomplete
                        options={aisles}
                        onChange={(e, newValue) => setNewBookData({ ...newBookData, location: newValue || '' })}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Location (Aisle)"
                                margin="dense"
                                fullWidth
                            />
                        )}
                    />
                    <Autocomplete
                        options={conditions}
                        onChange={(e, newValue) => setNewBookData({ ...newBookData, bookcondition: newValue || '' })}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Condition"
                                margin="dense"
                                fullWidth
                            />
                        )}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={newBookData.isavailable}
                                onChange={(e) => setNewBookData({ ...newBookData, isavailable: e.target.checked })}
                            />
                        }
                        label="Available"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleAddNewBookCopy} variant="contained">Add</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default BookCopies;
