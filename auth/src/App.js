
import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './components/login.js';
import ResetPassword from './components/resetpass.js'; 
import SignUpForm from './components/signup.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  
  {
    path: '/signup',
    element: <SignUpForm/>
  },

  {
    path: '/resetpass',
    element: <ResetPassword />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
