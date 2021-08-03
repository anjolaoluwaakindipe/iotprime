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
  const [field9, setField9] = useState('');
  const [fieldUnit9, setFieldUnit9] = useState('');
  const [field10, setField10] = useState('');
  const [fieldUnit10, setFieldUnit10] = useState('');
  const [field11, setField11] = useState('');
  const [fieldUnit11, setFieldUnit11] = useState('');
  const [field12, setField12] = useState('');
  const [fieldUnit12, setFieldUnit12] = useState('');
  const [field13, setField13] = useState('');
  const [fieldUnit13, setFieldUnit13] = useState('');
  const [field14, setField14] = useState('');
  const [fieldUnit14, setFieldUnit14] = useState('');
  const [field15, setField15] = useState('');
  const [fieldUnit15, setFieldUnit15] = useState('');
  const [field16, setField16] = useState('');
  const [fieldUnit16, setFieldUnit16] = useState('');
  const [field17, setField17] = useState('');
  const [fieldUnit17, setFieldUnit17] = useState('');
  const [field18, setField18] = useState('');
  const [fieldUnit18, setFieldUnit18] = useState('');
  const [field19, setField19] = useState('');
  const [fieldUnit19, setFieldUnit19] = useState('');
  const [field20, setField20] = useState('');
  const [fieldUnit20, setFieldUnit20] = useState('');
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
      fieldUnit8,
      field9,
      fieldUnit9,
      field10,
      fieldUnit10,
      field11,
      fieldUnit11,
      field12,
      fieldUnit12,
      field13,
      fieldUnit13,
      field14,
      fieldUnit14,
      field15,
      fieldUnit15,
      field16,
      fieldUnit16,
      field17,
      fieldUnit17,
      field18,
      fieldUnit18,
      field19,
      fieldUnit19,
      field20,
      fieldUnit20
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
        <TextField
          className='CreateProject__textfield'
          variant='outlined'
          margin='normal'
          fullWidth
          name='field9'
          label='field 9 name'
          autoComplete='current-password'
          value={field9}
          onChange={(e) => onChange(e, setField9)}
        />
        <TextField
          className='CreateProject__textfield'
          variant='outlined'
          margin='normal'
          fullWidth
          name='fieldUnit9'
          label='field 9 unit'
          autoComplete='current-password'
          value={fieldUnit9}
          onChange={(e) => onChange(e, setFieldUnit9)}
        />
        <TextField
          className='CreateProject__textfield'
          variant='outlined'
          margin='normal'
          fullWidth
          name='field10'
          label='field 10 name'
          autoComplete='current-password'
          value={field10}
          onChange={(e) => onChange(e, setField10)}
        />
        <TextField
          className='CreateProject__textfield'
          variant='outlined'
          margin='normal'
          fullWidth
          name='fieldUnit10'
          label='field 10 unit'
          autoComplete='current-password'
          value={fieldUnit10}
          onChange={(e) => onChange(e, setFieldUnit10)}
        />
        <TextField
          className='CreateProject__textfield'
          variant='outlined'
          margin='normal'
          fullWidth
          name='field11'
          label='field 11 name'
          autoComplete='current-password'
          value={field11}
          onChange={(e) => onChange(e, setField11)}
        />
        <TextField
          className='CreateProject__textfield'
          variant='outlined'
          margin='normal'
          fullWidth
          name='fieldUnit11'
          label='field 11 unit'
          autoComplete='current-password'
          value={fieldUnit11}
          onChange={(e) => onChange(e, setFieldUnit11)}
        />
        <TextField
          className='CreateProject__textfield'
          variant='outlined'
          margin='normal'
          fullWidth
          name='field12'
          label='field 12 name'
          autoComplete='current-password'
          value={field12}
          onChange={(e) => onChange(e, setField12)}
        />
        <TextField
          className='CreateProject__textfield'
          variant='outlined'
          margin='normal'
          fullWidth
          name='fieldUnit12'
          label='field 12 unit'
          autoComplete='current-password'
          value={fieldUnit12}
          onChange={(e) => onChange(e, setFieldUnit12)}
        />
        <TextField
          className='CreateProject__textfield'
          variant='outlined'
          margin='normal'
          fullWidth
          name='field13'
          label='field 13 name'
          autoComplete='current-password'
          value={field13}
          onChange={(e) => onChange(e, setField13)}
        />
        <TextField
          className='CreateProject__textfield'
          variant='outlined'
          margin='normal'
          fullWidth
          name='fieldUnit13'
          label='field 13 unit'
          autoComplete='current-password'
          value={fieldUnit13}
          onChange={(e) => onChange(e, setFieldUnit13)}
        />
        <TextField
          className='CreateProject__textfield'
          variant='outlined'
          margin='normal'
          fullWidth
          name='field14'
          label='field 14 name'
          autoComplete='current-password'
          value={field14}
          onChange={(e) => onChange(e, setField14)}
        />
        <TextField
          className='CreateProject__textfield'
          variant='outlined'
          margin='normal'
          fullWidth
          name='fieldUnit14'
          label='field 14 unit'
          autoComplete='current-password'
          value={fieldUnit14}
          onChange={(e) => onChange(e, setFieldUnit14)}
        />
        <TextField
          className='CreateProject__textfield'
          variant='outlined'
          margin='normal'
          fullWidth
          name='field15'
          label='field 15 name'
          autoComplete='current-password'
          value={field15}
          onChange={(e) => onChange(e, setField15)}
        />
        <TextField
          className='CreateProject__textfield'
          variant='outlined'
          margin='normal'
          fullWidth
          name='fieldUnit15'
          label='field 15 unit'
          autoComplete='current-password'
          value={fieldUnit15}
          onChange={(e) => onChange(e, setFieldUnit15)}
        />
        <TextField
          className='CreateProject__textfield'
          variant='outlined'
          margin='normal'
          fullWidth
          name='field16'
          label='field 16 name'
          autoComplete='current-password'
          value={field16}
          onChange={(e) => onChange(e, setField16)}
        />
        <TextField
          className='CreateProject__textfield'
          variant='outlined'
          margin='normal'
          fullWidth
          name='fieldUnit16'
          label='field 16 unit'
          autoComplete='current-password'
          value={fieldUnit16}
          onChange={(e) => onChange(e, setFieldUnit16)}
        />
        <TextField
          className='CreateProject__textfield'
          variant='outlined'
          margin='normal'
          fullWidth
          name='field17'
          label='field 17 name'
          autoComplete='current-password'
          value={field17}
          onChange={(e) => onChange(e, setField17)}
        />
        <TextField
          className='CreateProject__textfield'
          variant='outlined'
          margin='normal'
          fullWidth
          name='fieldUnit17'
          label='field 17 unit'
          autoComplete='current-password'
          value={fieldUnit17}
          onChange={(e) => onChange(e, setFieldUnit17)}
        />
        <TextField
          className='CreateProject__textfield'
          variant='outlined'
          margin='normal'
          fullWidth
          name='field18'
          label='field 18 name'
          autoComplete='current-password'
          value={field18}
          onChange={(e) => onChange(e, setField18)}
        />
        <TextField
          className='CreateProject__textfield'
          variant='outlined'
          margin='normal'
          fullWidth
          name='fieldUnit18'
          label='field 18 unit'
          autoComplete='current-password'
          value={fieldUnit18}
          onChange={(e) => onChange(e, setFieldUnit18)}
        />
        <TextField
          className='CreateProject__textfield'
          variant='outlined'
          margin='normal'
          fullWidth
          name='field19'
          label='field 19 name'
          autoComplete='current-password'
          value={field19}
          onChange={(e) => onChange(e, setField19)}
        />
        <TextField
          className='CreateProject__textfield'
          variant='outlined'
          margin='normal'
          fullWidth
          name='fieldUnit19'
          label='field 19 unit'
          autoComplete='current-password'
          value={fieldUnit19}
          onChange={(e) => onChange(e, setFieldUnit19)}
        />
        <TextField
          className='CreateProject__textfield'
          variant='outlined'
          margin='normal'
          fullWidth
          name='field20'
          label='field 20 name'
          autoComplete='current-password'
          value={field20}
          onChange={(e) => onChange(e, setField20)}
        />
        <TextField
          className='CreateProject__textfield'
          variant='outlined'
          margin='normal'
          fullWidth
          name='fieldUnit20'
          label='field 20 unit'
          autoComplete='current-password'
          value={fieldUnit20}
          onChange={(e) => onChange(e, setFieldUnit20)}
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
