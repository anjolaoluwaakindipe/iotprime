import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// css
import './Project.scss';

// redux actions
import { setCurrentProject } from '../../redux/Project/projectaction';

// custom services
import { getAProject } from '../../services/project.services';

// react-icons
import { BiArrowBack } from 'react-icons/bi';

// react icons
import { FiMoreVertical } from 'react-icons/fi';

// material ui
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function ListItemLink(props) {
  return <ListItem button component='a' {...props} />;
}

const Project = () => {
  // variables
  const { projectID } = useParams();
  const dispatch = useDispatch();
  const { currentProject } = useSelector((state) => state.project);
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const tokenStorage = JSON.parse(localStorage.getItem('token'));
  if (!tokenStorage) {
    history.push('/login');
  }

  // functions
  const fieldClickHandler = (projectID, fieldID) => {
    history.push(`/project/${projectID}/graph/${fieldID}`);
  };

  // useEffect
  useEffect(() => {
    const startUp = async () => {
      const currentProjectData = await getAProject(
        projectID,
        tokenStorage.token
      ).catch((err) => console.log(err.message));
      dispatch(setCurrentProject(currentProjectData.data));
      console.log(currentProjectData);
    };
    startUp();
  }, []);

  return (
    <div className='Project__container Dashboard-component'>
      <BiArrowBack
        onClick={() => {
          history.goBack();
        }}
        style={{
          fontSize: '25px',
          marginBottom: '2rem',
          cursor: 'pointer',
          ':hover': { backgroundColor: 'grey' },
        }}
      />

      <Typography variant='h4' className='Project__header'>
        {currentProject?.projectName}
      </Typography>
      <List component='nav' aria-label='secondary mailbox folders'>
        {currentProject.projectFields.map((field) => (
          <ListItem button key={field?._id}>
            <ListItemText
              primary={field?.fieldName}
              onClick={() =>
                fieldClickHandler(currentProject._id, field.fieldName)
              }
            />
            <ListItemSecondaryAction>
              <IconButton
                edge='end'
                aria-label='delete'
                onClick={handleClick}
                aria-controls='simple-menu'
                aria-haspopup='true'
              >
                <FiMoreVertical />
              </IconButton>
              <Menu
                id='simple-menu'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Clear Data</MenuItem>
              </Menu>
            </ListItemSecondaryAction>
            <Divider />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Project;
