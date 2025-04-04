import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

const BookCopies = () => {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        
        axios.get('https://library-app-production-8775.up.railway.app/api/bookcopies/copies' , {
            headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        })
            .then(response => {
                console.log(response);
                setBooks(response.data);
            })
            .catch(error => {
                console.error('Error fetching book copies', error);
            });
    }, []);

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
            setBooks((prevBooks) => prevBooks.filter(book => book.id !== selectedBook.id));
            setConfirmDeleteOpen(false);
            setSelectedBook(null);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>
                Book Copies Page
            </Typography>
            <TableContainer component={Paper} sx={{ width: '100%', mx: 'auto', p: 2}}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#3E6B48', color: '#F5F5F5' }}>
                            <TableCell sx={{ color: '#F5F5F5' }}><strong>Id</strong></TableCell>
                            <TableCell sx={{ color: '#F5F5F5' }}><strong>Title</strong></TableCell>
                            <TableCell sx={{ color: '#F5F5F5' }}><strong>Available</strong></TableCell>
                            <TableCell sx={{ color: '#F5F5F5' }}><strong>Location</strong></TableCell>
                            <TableCell sx={{ color: '#F5F5F5' }}><strong>Condition</strong></TableCell>
                            <TableCell sx={{ color: '#F5F5F5' }}><strong>Year Published</strong></TableCell>
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
                                <TableCell>{book.yearpublished}</TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
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

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={confirmDeleteOpen}
                onClose={() => setConfirmDeleteOpen(false)}
            >
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this book?
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

export default BookCopies;
