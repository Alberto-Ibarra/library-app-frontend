import React from 'react';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button, Box, Chip
} from '@mui/material';

const BookCopiesTable = ({ books, onEdit, onDelete, handleCheckout, handleReturn, onViewDetails }) => {
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
                        {/* <TableCell sx={{ color: '#F5F5F5' }}><strong>Action</strong></TableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {books.map((book, index) => (
                        <TableRow key={book.id} sx={{ backgroundColor: index % 2 === 0 ? '#E6EAE4' : '#F8F6F2' }}>
                            <TableCell>{book.id}</TableCell>

                            <TableCell>
                                <Button
                                    onClick={() => onViewDetails(book)}
                                    sx={{
                                    textTransform: 'none',
                                    padding: 0,
                                    minWidth: 'auto',
                                    color: 'primary.main',
                                    textDecoration: 'underline',
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                        textDecoration: 'underline',
                                        cursor: 'pointer',
                                    },
                                    }}
                                >
                                    {book.title}
                                </Button>
                            </TableCell>

                            <TableCell>
                                <Chip
                                    label={book.isavailable ? 'Yes' : 'No'}
                                    color={book.isavailable ? 'success' : 'error'}
                                    variant="outlined"
                                    size="small"
                                />
                            </TableCell>
                            <TableCell>{book.location}</TableCell>
                            <TableCell>{book.bookcondition}</TableCell>
                            {/* <TableCell>
                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                    {book.isavailable ? (
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            size="small"
                                            onClick={() => handleCheckout(book)}
                                        >
                                            CheckOut
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="contained"
                                            color="success"
                                            size="small"
                                            onClick={() => handleReturn(book)}
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
                            </TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default BookCopiesTable;
