import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Signin from './components/Signin';
import GetProducts from './components/GetProducts';
import AddProduct from './components/AddProduct';
import MakePayment from './components/MakePayment';
import NotFound from './components/NotFound';
import Admin from './components/Admin';
import Users from './components/Users';
import UpdateProduct from './components/UpdateProduct';

function App() {
  // Protected Route wrapper component
  const ProtectedRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      return <Navigate to="/signin" replace />;
    }
    return children;
  };

  return (
    <Router>
      <div className="App min-vh-100 d-flex flex-column">
        <Navbar />

        <main className="flex-grow-1 py-4">
          <Routes>
            <Route path="/" element={<GetProducts />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            
            
            <Route
              path="/addproduct"
              element={
                <ProtectedRoute>
                  <AddProduct />
                </ProtectedRoute>
              }
            />

            <Route 
              path='/admin'
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/users"
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              }
            />

            <Route
              path='/admin/update_product'
              element={
                <ProtectedRoute>
                  <UpdateProduct />
                </ProtectedRoute>
              }
            />

            <Route path="/make_payment" element={<MakePayment />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <footer className="bg-dark text-white text-center py-3 mt-auto">
          <div className="container">
            <p className="mb-0">&copy; {new Date().getFullYear()} Fixit Kenya – Quality Tools & Hardware</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;