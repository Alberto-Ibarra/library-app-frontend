import React from 'react'
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
const PatronTable = ({patrons}) => {
    return (
        <TableContainer component={Paper} sx={{ width: '100%', mx: 'auto', p: 2}}>
            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: '#3E6B48', color: '#F5F5F5' }}>
                        <TableCell sx={{ color: '#F5F5F5' }}><strong>Id</strong></TableCell>
                        <TableCell sx={{ color: '#F5F5F5' }}><strong>First Name</strong></TableCell>
                        <TableCell sx={{ color: '#F5F5F5' }}><strong>Last Name</strong></TableCell>
                        <TableCell sx={{ color: '#F5F5F5' }}><strong>First Name</strong></TableCell>
                        <TableCell sx={{ color: '#F5F5F5' }}><strong>Status</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {patrons.map((patron, index) => (
                        <TableRow key={patron.id} sx={{ backgroundColor: index % 2 === 0 ? '#E6EAE4' : '#F8F6F2' }}>
                            <TableCell>{patron.id}</TableCell>
                            <TableCell>{patron.firstname}</TableCell>
                            <TableCell>{patron.lastname}</TableCell>
                            <TableCell>{patron.email}</TableCell>
                            <TableCell>{patron.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default PatronTable
