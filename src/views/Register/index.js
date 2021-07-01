import React from 'react';

// css import
import './Register.scss';

// material ui components
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const Register = () => {
  return (
    <div className='Register__container'>
      <Container
        component='main'
        maxWidth='xs'
        className='Register__form-container'
      >
        <CssBaseline />
        <div>
          <Typography
            component='h1'
            variant='h5'
            className='Register__form-title'
          >
            Sign up
          </Typography>
          <form noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='fname'
                  name='firstName'
                  variant='standard'
                  required
                  fullWidth
                  id='firstName'
                  label='First Name'
                  autoFocus
                  aria-required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant='standard'
                  required
                  fullWidth
                  id='lastName'
                  label='Last Name'
                  name='lastName'
                  autoComplete='lname'
                  aria-required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='standard'
                  required
                  fullWidth
                  id='username'
                  label='Username'
                  name='username'
                  autoComplete='username'
                  aria-required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='standard'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  aria-required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='standard'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                  aria-required
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              disableElevation
              color='primary'
              className='Register__form-button'
            >
              Sign Up
            </Button>
            <Grid container justify='flex-end' className='Register__form-link'>
              <Grid item>
                <Typography variant='body2'>
                  Already have an account?{' '}
                  <Link href='/login' variant='body2'>
                    Sign in
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}></Box>
      </Container>
    </div>
  );
};

export default Register;
