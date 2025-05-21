import React from 'react';
import { useFormik } from 'formik';
import { createRoot } from 'react-dom/client';
import supabase from '../supabase-client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Link from '@mui/material/Link'; 

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Required';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length > 15) {
    errors.password = 'Password must be 15 characters or less';
  }

  return errors;
};

const Register = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const { email, password } = values;
      const { error } = await supabase.auth.signUp({ email, password });

      if (error) {
        alert('An error occurred: ' + error.message);
      } else {
        alert('Successful registration, check your email to proceed.');
        resetForm();
      }

      setSubmitting(false);
    },
  });

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: 'background.paper',
          minWidth: 300,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ margin: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" marginBottom={2}>
          Register
        </Typography>

        <form noValidate onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            name="email"
            label="Email Address"
            type="email"
            autoComplete="email"
            autoFocus
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            margin="normal"
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Box sx={{ textAlign: 'right', marginTop: 1 }}>
            <Link href="/login" variant="body2">
              Already have an account? Log in
            </Link>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="success"
            disabled={formik.isSubmitting}
            sx={{ marginTop: 3, marginBottom: 2 }}
          >
            Sign Up
          </Button>
        </form>
      </Box>
    </>
  );
};

export default Register;