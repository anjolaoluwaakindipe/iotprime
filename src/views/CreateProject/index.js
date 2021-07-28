import React, { useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

// custom services
import { createAProject } from '../../services/project.services';

// css
import './CreateProject.scss';

// material ui
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';

// react-icon
import { BiArrowBack } from 'react-icons/bi';

function CreateProject() {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [field1, setField1] = useState('');
  const [fieldUnit1, setFieldUnit1] = useState('');
  const [field2, setField2] = useState('');
  const [fieldUnit2, setFieldUnit2] = useState('');
  const [field3, setField3] = useState('');
  const [fieldUnit3, setFieldUnit3] = useState('');
  const [field4, setField4] = useState('');
  const [fieldUnit4, setFieldUnit4] = useState('');
  const [field5, setField5] = useState('');
  const [fieldUnit5, setFieldUnit5] = useState('');
  const [field6, setField6] = useState('');
  const [fieldUnit6, setFieldUnit6] = useState('');
  const [field7, setField7] = useState('');
  const [fieldUnit7, setFieldUnit7] = useState('');
  const [field8, setField8] = useState('');
  const [fieldUnit8, setFieldUnit8] = useState('');
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('error');

  const history = useHistory();
  const isLogged = useSelector((state) => state.auth.isLogged);
  const tokenStorage = JSON.parse(localStorage.getItem('token'));

  const onSubmit = async (e) => {
    e.preventDefault();
    const createdProject = await createAProject(
      tokenStorage.token,
      projectName,
      projectDescription,
      field1,
      fieldUnit1,
      field2,
      fieldUnit2,
      field3,
      fieldUnit3,
      field4,
      fieldUnit4,
      field5,
      fieldUnit5,
      field6,
      fieldUnit6,
      field7,
      fieldUnit7,
      field8,
      fieldUnit8
    );

    if (createdProject.error || createdProject?.success === false) {
      createdProject?.error && setMessage(createdProject.error);
      createdProject?.error && setOpen(true);
      createdProject?.message && setMessage(createdProject.message);
      return;
    }

    if (createdProject?.success === true) {
      createdProject?.success === true && setSeverity('success');
      createdProject?.message && setOpen(true);
      console.log(createdProject);
      history.push('/project');
      return;
    }
  };

  const onChange = (e, set) => {
    set(e.target.value);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  if (!isLogged) {
    return <Redirect to='/login' />;
  }

  return (
    <div className='Dashboard-component'>
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
      <BiArrowBack
        onClick={() => {
          history.push('/project');
        }}
        className='CreateProject__back-button'
        style={{
          fontSize: '25px',
          margin: '1rem 0',
          cursor: 'pointer',
          ':hover': { backgroundColor: 'grey' },
        }}
      />
      <Typography variant='h4'>Create a Project</Typography>
      <form
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <TextField
          className='CreateProject__textfield'
          variant='outlined'
          margin='normal'
          required
          fullWidth
          id='projectName'
          label='Name'
          name='projectName'
          autoComplete='projectName'
          autoFocus
          value={projectName}
          onChange={(e) => onChange(e, setProjectName)}
        />
        <TextField
          multiline
          maxRows={6}
          rows={4}
          className='CreateProject__textfield'
          variant='outlined'
          margin='normal'
          required
          fullWidth
          name='projectDescription'
          label='Description'
          id='projectDescription'
          autoComplete='current-password'
          value={projectDescription}
          onChange={(e) => onChange(e, setProjectDescription)}
        />
        <TextField
          className='CreateProject__textfield'
          variant='outlined'
          margin='normal'
          fullWidth
          name='field1'
          label='field 1 name'
          autoComplete='current-password'
          value={field1}
          onChange={(e) => onChange(e, setField1)}
        />
        <TextField
          className='CreateProject__textfield'
          variant='outlined'
          margin='normal'
          fullWidth
          name='fieldUnit1'
          label='field 1 unit'
          autoComplete='current-password'
          value={fieldUnit1}
          onChange={(e) => onChange(e, setFieldUnit1)}
        />

        <TextField
          className='CreateProject__textfield'
          variant='outlined'
          margin='normal'
          fullWidth
          name='field2'
          label='field 2 name'
          autoComplete='current-password'
          value={field2}
          onChange={(e) => onChange(e, setField2)}
        />
        <TextField
          className='CreateProject__textfield'
          variant='outlined'
          margin='normal'
          fullWidth
          name='fieldUnit2'
          label='field 2 unit'
          autoComplete='current-password'
          value={fieldUnit2}
          onChange={(e) => onChange(e, setFieldUnit2)}
        />

        <TextField
          className='CreateProject__textfield'
          variant='outlined'
          margin='normal'
          fullWidth
          name='field3'
          label='field 3 name'
          autoComplete='current-password'
          value={field3}
          onChange={(e) => onChange(e, setField3)}
        />
        <TextField
          className='CreateProject__textfield'
          variant='outlined'
          margin='normal'
          fullWidth
          name='fieldUnit3'
          label='field 3 unit'
          autoComplete='current-password'
          value={fieldUnit3}
          onChange={(e) => onChange(e, setFieldUnit3)}
        />

        <TextField
          className='CreateProject__textfield'
          variant='outlined'
          margin='normal'
          fullWidth
          name='field4'
          label='field 4 name'
          autoComplete='current-password'
          value={field4}
          onChange={(e) => onChange(e, setField4)}
        />
        <TextField
          className='CreateProject__textfield'
          variant='outlined'
          margin='normal'
          fullWidth
          name='fieldUnit4'
          label='field 4 unit'
          autoComplete='current-password'
          value={fieldUnit4}
          onChange={(e) => onChange(e, setFieldUnit4)}
        />

        <TextField
          className='CreateProject__textfield'
          variant='outlined'
          margin='normal'
          fullWidth
          name='field5'
          label='field 5 name'
          autoComplete='current-password'
          value={field5}
          onChange={(e) => onChange(e, setField5)}
        />
        <TextField
          className='CreateProject__textfield'
          variant='outlined'
          margin='normal'
          fullWidth
          name='fieldUnit5'
          label='field 5 unit'
          autoComplete='current-password'
          value={fieldUnit5}
          onChange={(e) => onChange(e, setFieldUnit5)}
        />

        <TextField
          className='CreateProject__textfield'
          variant='outlined'
          margin='normal'
          fullWidth
          name='field6'
          label='field 6 name'
          autoComplete='current-password'
          value={field6}
          onChange={(e) => onChange(e, setField6)}
        />
        <TextField
          className='CreateProject__textfield'
          variant='outlined'
          margin='normal'
          fullWidth
          name='fieldUnit6'
          label='field 6 unit'
          autoComplete='current-password'
          value={fieldUnit6}
          onChange={(e) => onChange(e, setFieldUnit6)}
        />

        <TextField
          className='CreateProject__textfield'
          variant='outlined'
          margin='normal'
          fullWidth
          name='field7'
          label='field 7 name'
          autoComplete='current-password'
          value={field7}
          onChange={(e) => onChange(e, setField7)}
        />
        <TextField
          className='CreateProject__textfield'
          variant='outlined'
          margin='normal'
          fullWidth
          name='fieldUnit7'
          label='field 7 unit'
          autoComplete='current-password'
          value={fieldUnit7}
          onChange={(e) => onChange(e, setFieldUnit7)}
        />
        <TextField
          className='CreateProject__textfield'
          variant='outlined'
          margin='normal'
          fullWidth
          name='field8'
          label='field 8 name'
          autoComplete='current-password'
          value={field8}
          onChange={(e) => onChange(e, setField8)}
        />
        <TextField
          className='CreateProject__textfield'
          variant='outlined'
          margin='normal'
          fullWidth
          name='fieldUnit8'
          label='field 8 unit'
          autoComplete='current-password'
          value={fieldUnit8}
          onChange={(e) => onChange(e, setFieldUnit8)}
        />

        <Button
          type='submit'
          disableElevation
          fullWidth
          variant='contained'
          color='primary'
          className='CreateProject__button'
        >
          Create
        </Button>
      </form>
    </div>
  );
}

export default CreateProject;
