import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handelError, handelSuccess } from '../utils';
import { Circles } from "react-loader-spinner"; // Install this package: npm install react-loader-spinner

function AdminHome() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const navigate = useNavigate();

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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/adminProducts`, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      const result = await response.json();
      setIsLoading(false); // Show loader

      setProducts(result);
    } catch (error) {
      handelError('Failed to fetch products');
      setIsLoading(false); // Show loader

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
      {/* Show loader */}
      {isLoading && (
        <div className="flex justify-center items-center mt-[20px]">
          <Circles
            height="50"
            width="50"
            color="#6B46C1"
            ariaLabel="loading"
          />
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default AdminHome;
