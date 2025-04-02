import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Layout from './components/Layout';
import BookCopies from './pages/BookCopies';
import Books from './pages/Books';
import Patrons from './pages/Patrons';
import Users from './pages/Users';
import Login from './pages/auth/Login';
import RegisterUser from './pages/auth/RegisterUser';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes (Inside Layout) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              <Route path="/book-copies" element={<BookCopies />} />
              <Route path="/books" element={<Books />} />
              <Route path="/patrons" element={<Patrons />} />
            </Route>
          </Route>

          {/* Admin Protected Route */}
          <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
            <Route path="/" element={<Layout/>}>
              <Route path="/users" element={<Users />} />
              <Route path="/register" element={<RegisterUser />} />
            </Route>
          </Route>

          {/* Catch-all Route */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
