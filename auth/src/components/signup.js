// SignUpForm.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import {
  Grid, Paper, Typography, Button, FormControl, InputLabel, Input, FormHelperText, InputAdornment, IconButton
} from '@mui/material';
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { auth } from './firebase';
import Swal from 'sweetalert2';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { validationSchema } from './validation/valid';

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await validationSchema.validate(values, { abortEarly: false });
        const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
        const user = userCredential.user;
        console.log('User signed up successfully:', user);

        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'User signed up successfully',
        });
      } catch (error) {
        if (error.name === 'ValidationError') {
          console.error('Validation Error:', error.errors);
          return;
        }

        console.error('Error signing up:', error.message);

        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'This account has already been registered',
        });
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
            Sign Up
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <FormControl fullWidth margin="normal" error={formik.touched.email && Boolean(formik.errors.email)}>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                type="email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="email"
              />
              <FormHelperText>{formik.touched.email && formik.errors.email}</FormHelperText>
            </FormControl>
            <FormControl fullWidth margin="normal" error={formik.touched.password && Boolean(formik.errors.password)}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText>{formik.touched.password && formik.errors.password}</FormHelperText>
            </FormControl>
            <Button variant="contained" color="primary" type="submit">
              Sign Up
            </Button>
          </form>
          <Typography variant="body2" style={{ marginTop: 10 }}>
            Already have an account? <Link to="/">Login</Link>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SignUpForm;
