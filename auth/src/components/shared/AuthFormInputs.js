// AuthFormInputs.js
import React from 'react';
import { FormControl, InputLabel, Input, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const AuthFormInputs = ({ formik, showPassword, handleTogglePassword }) => {
  const inputs = [
    {
      id: 'email',
      type: 'email',
      placeholder: 'Email',
      value: formik.values.email,
      name: 'email',
    },
    {
      id: 'password',
      type: showPassword ? 'text' : 'password',
      placeholder: 'Password',
      value: formik.values.password,
      name: 'password',
    },
  ];

  return (
    <>
      {inputs.map((input, index) => (
        <FormControl key={index} fullWidth margin="normal">
          <InputLabel htmlFor={input.id}>{input.placeholder}</InputLabel>
          <Input
            type={input.type}
            id={input.id}
            value={input.value}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name={input.name}
            endAdornment={
              input.name === 'password' && (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }
          />
        </FormControl>
      ))}
    </>
  );
};

export default AuthFormInputs;
