import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handelError, handelSuccess } from '../utils';
import { Circles } from "react-loader-spinner"; // Install this package: npm install react-loader-spinner

function TeacherHome() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false); // Track loading state

  // Fetch logged-in user's name from localStorage on component mount
  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    setLoggedInUser(user);
  }, []);

  // Logout Functionality
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('userRole');
    handelSuccess('User logged out successfully.');

    setTimeout(() => {
      navigate('/mainLogin');
    }, 1000);
  };

  // Fetch products from the server
  const fetchProducts = async () => {
    setIsLoading(true); // Show loader

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/teacherProducts`, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      const result = await response.json();
      setProducts(result);
      setIsLoading(false); // Hide loader

    } catch (error) {
      setIsLoading(false); // Hide loader
      handelError('Failed to fetch products');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Welcome, {loggedInUser}</h1>
      <button
        className="bg-purple-900 border-none text-[20px] text-white rounded-[6px] p-[8px] cursor-pointer my-auto mx-0"
        onClick={handleLogout}
      >
        Logout
      </button>
      <div>
        {products.length > 0 ? (
          products.map((item, index) => (
            <ul key={index}>
              <span>
                {item.name} : {item.price}
              </span>
            </ul>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default TeacherHome;