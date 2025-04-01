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

const BookCopies = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get('https://library-app-production-8775.up.railway.app/api/bookcopies/copies')
            .then(response => {
                console.log(response);
                setBooks(response.data);
            })
            .catch(error => {
                console.error('Error fetching book copies', error);
            });
    }, []);

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>
                Book Copies Page
            </Typography>
            <TableContainer component={Paper} sx={{ width: '90%', mx: 'auto', p: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Title</strong></TableCell>
                            <TableCell><strong>Available</strong></TableCell>
                            <TableCell><strong>Location</strong></TableCell>
                            <TableCell><strong>Condition</strong></TableCell>
                            <TableCell><strong>Year Published</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {books.map((book) => (
                            <TableRow key={book.id}>
                                <TableCell>{book.title}</TableCell>
                                <TableCell>{book.isavailable ? 'Yes' : 'No'}</TableCell>
                                <TableCell>{book.location}</TableCell>
                                <TableCell>{book.bookcondition}</TableCell>
                                <TableCell>{book.yearpublished}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default BookCopies;
