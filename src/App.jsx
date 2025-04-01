import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import BookCopies from './pages/BookCopies';
import Books from './pages/Books';
import Patrons from './pages/Patrons';
import Users from './pages/Users';
import Box from '@mui/material/Box';

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Routes>
            <Route path="/book-copies" element={<BookCopies />} />
            <Route path="/books" element={<Books />} />
            <Route path="/patrons" element={<Patrons />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
