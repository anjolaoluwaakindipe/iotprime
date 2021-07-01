import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// installed packages
import { Redirect, useHistory } from 'react-router-dom';

// css
import './Login.scss';

// components
import { login, userData } from '../../services/user.services';

// redux actions
import {
  loginUserFailure,
  loginUserSuccess,
} from '../../redux/Auth/authActions';

// material ui components
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  textfield: {
    margin: theme.spacing(1, 0),
  },
  button: {
    margin: theme.spacing(8, 0, 1, 0),
    height: '3rem',
    backgroundColor: theme.palette.primary,
  },
}));

const Login = () => {
  const classes = useStyles();
  const [severity, setSeverity] = useState('error');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const tokenStorage = JSON.parse(localStorage.getItem('token'));
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.auth.isLogged);
  const history = useHistory();

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const loginDetails = await login(email, password);
    console.log(loginDetails);

    loginDetails?.error && setMessage(loginDetails.error);
    loginDetails?.error && setOpen(true);
    loginDetails?.message && setMessage(loginDetails.message);
    loginDetails?.success === true && setSeverity('success');
    loginDetails?.message && setOpen(true);

    if (tokenStorage) {
      await userData(tokenStorage.token)
        .then((data) => {
          if (data.success) {
            dispatch(loginUserSuccess(data.data));

            history.push('/dashboard');
          }
        })
        .catch((error) => {
          console.log(error.message);
          dispatch(loginUserFailure);
        });
    }
  };

  if (isLogged) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Grid container component='main' className='Login__container'>
      <CssBaseline />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        className='Login__form-grid'
      >
        <div className='Login__form-content'>
          <Typography component='h1' variant='h3' className='Login__logo'>
            Prime
          </Typography>
          <Typography component='h1' variant='h5' className='Login__form-title'>
            Sign in
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
          <form
            onSubmit={(e) => {
              onSubmit(e);
            }}
          >
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              className={classes.textfield}
              onChange={onChangeEmail}
              value={email}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              onChange={onChangePassword}
              className={classes.textfield}
              value={password}
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <Button
              type='submit'
              disableElevation
              fullWidth
              className={classes.button}
              variant='contained'
              color='primary'
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs={12} className='Login__form-link'>
                <Typography variant='body2'>
                  Don't have an account?{' '}
                  <Link href='/register' variant='body2'>
                    {' Sign Up'}
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </form>

          <Box mt={5}>
            <Typography variant='body2' color='textSecondary' align='center'>
              {'Copyright © '}
              <Link color='inherit' href='/'>
                Prime
              </Link>{' '}
              {new Date().getFullYear()}
              {'.'}
            </Typography>
          </Box>
        </div>
      </Grid>
      <Grid item xs={false} sm={4} md={7} className='Login__jumbo-grid' />
    </Grid>
  );
};

export default Login;
