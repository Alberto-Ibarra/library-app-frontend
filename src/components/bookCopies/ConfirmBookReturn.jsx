import React from 'react';
import {
    Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle, Button
} from '@mui/material';

const ConfirmBookReturn = ({ open, handleClose, handleConfirm, patronInfo, book }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Confirm Book Return</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to return this book?
                </DialogContentText>
                {patronInfo && (
                    <DialogContentText sx={{ mt: 2 }}>
                        <strong>Book copy id:</strong> {patronInfo.bookcopyid} <br />
                        <strong>Book:</strong> {book?.book_title} <br />
                        <strong>Checked out by:</strong> {`${patronInfo.firstname} ${patronInfo.lastname}`} <br />
                        <strong>Email:</strong> {patronInfo.email} <br />
                        <strong>Checked out on:</strong> {patronInfo.checkouttime}
                    </DialogContentText>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleConfirm} variant="contained" color="primary">
                    Confirm Return
                </Button>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmBookReturn;
