import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Typography, Box, Button
} from '@mui/material';
import EditBookCopyModal from '../components/bookCopies/EditBookCopyModal'
import BookCopiesTable from '../components/bookCopies/BookCopyTable';
import ConfirmDeleteDialog from '../components/bookCopies/ConfirmDeleteDialog';
import AddBookCopyDialog from '../components/bookCopies/AddBookCopyDialog';

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

    const handleCheckout = (book) => {
        console.log('handle checkout triggered');   
    }

    return (
        <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h4">Book Copies Page</Typography>
                <Button variant="contained" onClick={() => setAddDialogOpen(true)}>Add New Copy</Button>
            </Box>

            {/* Book Table */}
            <BookCopiesTable
                books={books}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
                onCheckout={handleCheckout}
            />

            {/* Edit Modal */}
            {selectedBook && (
                <EditBookCopyModal
                    open={open}
                    handleClose={() => setOpen(false)}
                    bookData={selectedBook}
                    handleSave={handleSave}
                />
            )}

            {/* Delete Confirmation Dialog */}
            <ConfirmDeleteDialog
                confirmDeleteOpen={confirmDeleteOpen}
                handleDeleteConfirm={handleDeleteConfirm}
                setConfirmDeleteOpen={setConfirmDeleteOpen}
            />

            {/* Add New Copy Dialog */}
            <AddBookCopyDialog
                addDialogOpen={addDialogOpen}
                setAddDialogOpen={setAddDialogOpen}
                availableBooks={availableBooks}
                loadingBooks={loadingBooks}
                setNewBookData={setNewBookData}
                newBookData={newBookData}
                handleAddNewBookCopy={handleAddNewBookCopy}
            />
        </Box>
    );
};

export default BookCopies;
