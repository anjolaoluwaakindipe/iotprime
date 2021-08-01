import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getLogFolder } from '../../services/log.services';

import Typography from '@material-ui/core/Typography';

// css
import './LogFolder.scss';

function LogFolder() {
  const tokenStorage = JSON.parse(localStorage.getItem('token'));
  const isLogged = useSelector((state) => state.auth.isLogged);
  const history = useHistory();
  const [logs, setLogs] = useState();

  useEffect(() => {
    const startUp = async () => {
      if (tokenStorage) {
        const logFolder = await getLogFolder(tokenStorage.token);
        setLogs(logFolder);
        console.log(logFolder);
      }
    };
    startUp();
  }, []);

  if (!isLogged) {
    return <Redirect to='/login' />;
  }
  return (
    <div className='Dashboard-component'>
      <Typography variant='h3' className='LogFolder__header'>
        Projects
      </Typography>
      {logs?.success === true ? (
        logs?.data.map((project) => (
          <div
            className='LogFolder__container'
            onClick={() => {
              history.push(`log/${project._id}`);
            }}
          >
            <div className='LogFolder__Project'>{project.name}</div>
            <div className='LogFolder__unread'>{project.unreadMessages}</div>
          </div>
        ))
      ) : (
        <Typography variant='body1' style={{ marginTop: '2rem' }}>
          No Logs available
        </Typography>
      )}
    </div>
  );
}

export default LogFolder;
