import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Typography, Box, Button, Dialog, DialogTitle, DialogContent
} from '@mui/material';
import PatronTable from '../components/patrons/PatronTable';
import CheckedOutBooksDialog from '../components/patrons/CheckedOutBooksDialog';
import AddPatronForm from '../components/patrons/AddPatronForm';

const Patrons = () => {
    const [patrons, setPatrons] = useState([]);
    const [selectedPatron, setSelectedPatron] = useState(null);
    const [checkedOutBooks, setCheckedOutBooks] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [openAddDialog, setOpenAddDialog] = useState(false);

    const fetchPatrons = async () => {
        const token = localStorage.getItem('authToken');
        try {
            const response = await axios.get('https://library-app-production-8775.up.railway.app/api/patrons/patrons', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPatrons(response.data);
        } catch (error) {
            console.error('Error fetching Patrons', error);
        }
    };

    useEffect(() => {
        fetchPatrons();
    }, []);

    const handleViewCheckedOut = async (patron) => {
        setSelectedPatron(patron);
        const token = localStorage.getItem('authToken');
        
        try {
            const res = await axios.get(`https://library-app-production-8775.up.railway.app/api/checkout/patron/${patron.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCheckedOutBooks(res.data);
            setOpenDialog(true);
        } catch (error) {
            console.error("Failed to fetch checked out books", error);
        }
    };

    const handleCloseCheckedOut = () => {
        setOpenDialog(false);
        setSelectedPatron(null);
        setCheckedOutBooks([]);
    };

    const handleOpenAdd = () => setOpenAddDialog(true);
    const handleCloseAdd = () => setOpenAddDialog(false);

    return (
        <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4">
                    Patrons
                </Typography>
                <Button variant="contained" color="primary" onClick={handleOpenAdd}>
                    Add Patron
                </Button>
            </Box>

            <PatronTable
                patrons={patrons}
                onViewCheckedOut={handleViewCheckedOut}
            />

            <CheckedOutBooksDialog
                handleClose={handleCloseCheckedOut}
                selectedPatron={selectedPatron}
                checkedOutBooks={checkedOutBooks}
                openDialog={openDialog}
            />

            <Dialog open={openAddDialog} onClose={handleCloseAdd} maxWidth="sm" fullWidth>
                <DialogTitle>Add New Patron</DialogTitle>
                <DialogContent>
                    <AddPatronForm
                        onSuccess={() => {
                            fetchPatrons();
                            handleCloseAdd();
                        }}
                    />
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default Patrons;
