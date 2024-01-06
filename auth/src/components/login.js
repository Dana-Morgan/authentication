import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { Grid, Paper, Typography,Button } from '@mui/material';
import AuthFormInputs from './shared/AuthFormInputs';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => {
      // FIREBASE login logic
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