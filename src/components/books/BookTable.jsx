import React from 'react';
import { Paper, TableContainer, Table, TableHead, TableRow,
        TableCell, TableBody
} from '@mui/material';

const BookTable = ({books}) => {
    return (
        <TableContainer component={Paper} sx={{ width: '100%', mx: 'auto', p: 2 }}>
            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: '#3E6B48', color: '#F5F5F5' }}>
                        <TableCell sx={{ color: '#F5F5F5' }}><strong>Id</strong></TableCell>
                        <TableCell sx={{ color: '#F5F5F5' }}><strong>Title</strong></TableCell>
                        <TableCell sx={{ color: '#F5F5F5' }}><strong>Author</strong></TableCell>
                        <TableCell sx={{ color: '#F5F5F5' }}><strong>Category</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {books.map((book, index) => (
                        <TableRow key={book.id} sx={{ backgroundColor: index % 2 === 0 ? '#E6EAE4' : '#F8F6F2' }}>
                            <TableCell>{book.bookid}</TableCell>
                            <TableCell>{book.title}</TableCell>
                            <TableCell>{book.authorname}</TableCell>
                            <TableCell>{book.category}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default BookTable
