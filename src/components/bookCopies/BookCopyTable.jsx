import React from 'react';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button, Box
} from '@mui/material';

const BookCopiesTable = ({ books, onEdit, onDelete, onCheckout, onReturn }) => {
    return (
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
                                    {book.isavailable ? (
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            size="small"
                                            onClick={() => onCheckout(book)}
                                        >
                                            CheckOut
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="contained"
                                            color="success"
                                            size="small"
                                            onClick={() => onReturn(book)}
                                        >
                                            Return
                                        </Button>
                                    )}
                                    <Button variant="contained" color="primary" size="small" onClick={() => onEdit(book)}>
                                        Edit
                                    </Button>
                                    <Button variant="contained" color="error" size="small" onClick={() => onDelete(book)}>
                                        Delete
                                    </Button>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default BookCopiesTable;
