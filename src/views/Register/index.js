import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// redux actions
import {
  loginUserFailure,
  loginUserSuccess,
} from '../../redux/Auth/authActions';

// css import
import './Register.scss';

// react-icons
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

// material ui components
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

// services
import { register, login, userData } from '../../services/user.services';

const Register = () => {
  const [severity, setSeverity] = useState('error');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [username, setUserName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const tokenStorage = JSON.parse(localStorage.getItem('token'));
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const onChangeHandler = (e, set) => {
    set(e.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const signUpDetails = await register(
        username,
        email,
        password,
        lastName,
        firstName
      );

      signUpDetails?.error && setMessage(signUpDetails.error);
      signUpDetails?.success === true && setSeverity('error');
      signUpDetails?.error && setOpen(true);

      if (signUpDetails?.success === true) {
        signUpDetails?.message && setMessage(signUpDetails.message);
        signUpDetails?.success === true && setSeverity('success');
        signUpDetails?.message && setOpen(true);

        await login(email, password);

        const token = tokenStorage?.token;

        await userData(token)
          .then((data) => {
            if (data.success) {
              dispatch(loginUserSuccess(data.data));
            }
          })
          .catch((error) => {
            console.log(error.message);
            dispatch(loginUserFailure);
          });

        return history.push('/dashboard');
      }
      console.log(password + ' ' + confirmPassword);
      signUpDetails?.error && setMessage(signUpDetails.error);
      signUpDetails?.success === true && setSeverity('error');
      signUpDetails?.error && setOpen(true);
      return;
    }
    console.log(password + ' ' + confirmPassword);
    setMessage('Make sure password and confirm password are the same!!!');
    setOpen(true);
  };

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
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Alert
              elevation={6}
              variant='filled'
              severity={severity}
              onClose={handleClose}
            >
              {message}
            </Alert>
          </Snackbar>
          <form onSubmit={onSubmit}>
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
                  value={firstName}
                  onChange={(e) => onChangeHandler(e, setFirstName)}
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
                  value={lastName}
                  onChange={(e) => onChangeHandler(e, setLastName)}
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
                  value={username}
                  onChange={(e) => onChangeHandler(e, setUserName)}
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
                  value={email}
                  onChange={(e) => onChangeHandler(e, setEmail)}
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
                  value={password}
                  onChange={(e) => onChangeHandler(e, setPassword)}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='standard'
                  required
                  fullWidth
                  name='confirmPassword'
                  label='Confirm Password'
                  type='password'
                  id='confirm_password'
                  autoComplete='current-password'
                  aria-required
                  value={confirmPassword}
                  onChange={(e) => onChangeHandler(e, setConfirmPassword)}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                      </IconButton>
                    </InputAdornment>
                  }
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
