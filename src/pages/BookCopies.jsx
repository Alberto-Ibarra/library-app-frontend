import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Typography, Box, Button, TextField, MenuItem
} from '@mui/material';
import EditBookCopyModal from '../components/bookCopies/EditBookCopyModal';
import BookCopiesTable from '../components/bookCopies/BookCopyTable';
import ConfirmDeleteDialog from '../components/bookCopies/ConfirmDeleteDialog';
import AddBookCopyDialog from '../components/bookCopies/AddBookCopyDialog';
import CheckoutModal from '../components/bookCopies/CheckoutModal';

const BookCopies = () => {
    const [books, setBooks] = useState([]);
    const [availableBooks, setAvailableBooks] = useState([]);
    const [loadingBooks, setLoadingBooks] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
    const [filterStatus, setFilterStatus] = useState('all'); // NEW
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
    };

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
        setSelectedBook(book);
        setCheckoutModalOpen(true);
    };

    const handleConfirmCheckout = async (patronId, pin) => {
        try {
            const token = localStorage.getItem('authToken');
            const payload = {
                patronid: patronId,
                bookcopyid: selectedBook.id,
                pin: pin
            };
            const response = await axios.post(
                `https://library-app-production-8775.up.railway.app/api/checkout/checkout/${patronId}/${selectedBook.id}`,
                payload,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            console.log('Checkout successful:', response.data);
            setCheckoutModalOpen(false);
            setSelectedBook(null);
            fetchBookCopies();
        } catch (error) {
            console.error('Error during checkout:', error);
        }
    };

    const handleReturn = async (book) => {
        console.log(book);
        console.log(book.id);
        
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.put(
                `https://library-app-production-8775.up.railway.app/api/checkout/return/${book.id}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            
            console.log('Return successful:', response.data);
            fetchBookCopies(); 
        } catch (error) {
            console.error('Error returning book:', error);
        }
    };

    const filteredBooks = books.filter(book => {
        const matchesSearch = book.title?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter =
            filterStatus === 'all' ||
            (filterStatus === 'available' && book.isavailable) ||
            (filterStatus === 'checkedOut' && !book.isavailable);

        return matchesSearch && matchesFilter;
    });

    return (
        <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h4">Book Copies Page</Typography>
                <Button variant="contained" onClick={() => setAddDialogOpen(true)}>Add New Copy</Button>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
                <TextField
                    label="Search by title"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ maxWidth: 300 }}
                />
                <TextField
                    label="Filter"
                    select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    sx={{ width: 180 }}
                >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="available">Available</MenuItem>
                    <MenuItem value="checkedOut">Checked Out</MenuItem>
                </TextField>
            </Box>

            <BookCopiesTable
                books={filteredBooks}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
                handleCheckout={handleCheckout}
                handleReturn={handleReturn}
            />

            {selectedBook && (
                <EditBookCopyModal
                    open={open}
                    handleClose={() => setOpen(false)}
                    bookData={selectedBook}
                    handleSave={handleSave}
                />
            )}

            <ConfirmDeleteDialog
                confirmDeleteOpen={confirmDeleteOpen}
                handleDeleteConfirm={handleDeleteConfirm}
                setConfirmDeleteOpen={setConfirmDeleteOpen}
            />

            <AddBookCopyDialog
                addDialogOpen={addDialogOpen}
                setAddDialogOpen={setAddDialogOpen}
                availableBooks={availableBooks}
                loadingBooks={loadingBooks}
                setNewBookData={setNewBookData}
                newBookData={newBookData}
                handleAddNewBookCopy={handleAddNewBookCopy}
            />

            <CheckoutModal
                open={checkoutModalOpen}
                handleClose={() => setCheckoutModalOpen(false)}
                handleCheckout={handleConfirmCheckout}
            />
        </Box>
    );
};

export default BookCopies;
