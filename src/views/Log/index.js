import React, { useEffect, useState } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { readLog, getOneProjectLog } from '../../services/log.services';
import Typography from '@material-ui/core/Typography';

import { BiArrowBack } from 'react-icons/bi';

import './Log.scss';

function Log() {
  const tokenStorage = JSON.parse(localStorage.getItem('token'));
  const isLogged = useSelector((state) => state.auth.isLogged);
  const { projectID, logID } = useParams();
  const history = useHistory();
  const [logs, setLogs] = useState();

  useEffect(() => {
    const startUp = async () => {
      if (tokenStorage) {
        const read = await readLog(tokenStorage.token, projectID, logID);
        const log = await getOneProjectLog(projectID, logID);
        setLogs(log);
      }
    };

    startUp();
  }, []);
  return (
    <div className='Dashboard-component'>
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
      <Typography variant='h3'>Message</Typography>
      <div className='Log__message'>
        <Typography variant='body1'>{logs?.data.message}</Typography>
      </div>
      <div className='Log__timestamp'>
        <Typography variant='subtitle1'>
          {new Date(logs?.data.timeStamp).toLocaleString()}
        </Typography>
      </div>
    </div>
  );
}

export default Log;
