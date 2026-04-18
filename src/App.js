import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Signin from './components/Signin';
import GetProducts from './components/GetProducts';
import About from './components/About';
import AddProduct from './components/AddProduct';
import MakePayment from './components/MakePayment';
import NotFound from './components/NotFound';
import Admin from './components/Admin';
import Users from './components/Users';
import UpdateProduct from './components/UpdateProduct';
import Cart from './components/Cart';
import Orders from './components/Orders';
import Profile from './components/Profile';

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
        <div className="site-shell">
          <Navbar />

          <main className="app-main">
            <Routes>
              <Route path="/" element={<GetProducts />} />
              <Route path="/about" element={<About />} />
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
                path="/admin"
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
                path="/admin/update_product"
                element={
                  <ProtectedRoute>
                    <UpdateProduct />
                  </ProtectedRoute>
                }
              />
              <Route path="/make_payment" element={<MakePayment />} />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <footer className="site-footer">
            <div className="container d-flex flex-column flex-lg-row justify-content-between gap-2">
              <p className="mb-0">
                <strong>Fixit Kenya</strong> supplies dependable tools, parts, and checkout flows for builders, technicians, and workshop teams.
              </p>
              <p className="mb-0">&copy; {new Date().getFullYear()} All rights reserved.</p>
            </div>
          </footer>
        </div>
      </div>
    </Router>
  );
}

export default App;
