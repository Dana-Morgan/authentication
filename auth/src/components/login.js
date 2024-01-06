import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import {
  Grid, Paper, Typography, Button
} from '@mui/material';
import AuthFormInputs from './shared/AuthFormInputs';
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from './firebase';
import Swal from 'sweetalert2';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        // Basic email validation
        if (!values.email.trim()) {
          throw new Error('Email is required');
        }

        // Basic password validation
        if (!values.password.trim()) {
          throw new Error('Password is required');
        }

        const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
        const user = userCredential.user;
        console.log('User signed in successfully:', user);
        navigate("/page");
      } catch (error) {
        console.error('Error signing in:', error);
        if (error.code === 'auth/invalid-credential') {
          Swal.fire({
            icon: 'error',
            title: 'cant login',
            text: 'Please check your email and password.',
          });
        }
      }
    },
  });

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" height="100vh">
      <Grid item>
        <Paper elevation={3} style={{ padding: 20, maxWidth: 400, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <AuthFormInputs
              formik={formik}
              showPassword={showPassword}
              handleTogglePassword={handleTogglePassword}
            />
            <Button variant="contained" color="primary" type="submit">
              Login
            </Button>
          </form>
          <Typography variant="body2" style={{ marginTop: 10 }}>
            No Account? <Link to="/signup">Sign up</Link>
          </Typography>
          <Typography variant="body2" style={{ marginTop: 10 }}>
            <Button variant="text" color="primary" component={Link} to="/resetpass">
              Reset Password
            </Button>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
