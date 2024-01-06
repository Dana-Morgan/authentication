// ResetPassword.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { Grid, Paper, Typography, FormControl, InputLabel, Input, Button } from '@mui/material';
import { sendPasswordResetEmail } from 'firebase/auth'; 
import { auth } from './firebase'; 

const ResetPassword = () => {
  const [resetSuccess, setResetSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: async (values) => {
      try {
        await sendPasswordResetEmail(auth, values.email);
        setResetSuccess(true);
      } catch (error) {
        console.error('Error resetting password:', error.message);
      }
    },
  });

  return (
    <Grid container justifyContent="center" alignItems="center" height="100vh">
      <Grid item>
        <Paper elevation={3} style={{ padding: 20, maxWidth: 400, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Reset Password
          </Typography>
          {resetSuccess ? (
            <div>
              <Typography variant="body2">
                Password reset email sent. Please check your email.
              </Typography>
              <Link to="/">Back to Login</Link>
            </div>
          ) : (
            <form onSubmit={formik.handleSubmit}>
              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                  type="email"
                  id="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="email"
                />
              </FormControl>
              <Button variant="contained" color="primary" type="submit">
                Reset Password
              </Button>
            </form>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ResetPassword;
