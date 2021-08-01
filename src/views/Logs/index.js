import React, { useEffect, useState } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getProjectLogs, deleteSpecificLog } from '../../services/log.services';
import { MdMarkunread } from 'react-icons/md';
import { VscMailRead } from 'react-icons/vsc';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import Truncate from 'react-truncate';

import Typography from '@material-ui/core/Typography';

import './Logs.scss';

function Logs() {
  const tokenStorage = JSON.parse(localStorage.getItem('token'));
  const isLogged = useSelector((state) => state.auth.isLogged);
  const { projectID } = useParams();
  const history = useHistory();
  const [logs, setLogs] = useState();

  const handleDeleteLog = async (projectID, logID) => {
    await deleteSpecificLog(tokenStorage.token, projectID, logID);
    setLogs((prevstate) => ({
      success: prevstate.success,
      data: logs.data.filter((log) => log._id !== logID),
    }));
  };

  useEffect(() => {
    const startUp = async () => {
      const logFolder = await getProjectLogs(projectID);
      setLogs(logFolder);
      console.log(logFolder);
    };
    startUp();
  }, []);

  if (!isLogged) {
    return <Redirect to='/login' />;
  }
  return (
    <div className='Dashboard-component'>
      <Typography variant='h3' className='Logs__header'>
        Logs
      </Typography>
      {logs?.data && logs?.data.length !== 0 ? (
        logs?.data.map((log) => (
          <div className='Logs__container' key={log._id}>
            <div
              className='Logs__message'
              onClick={() => {
                history.push(`/log/${log.projectID}/${log._id}`);
              }}
            >
              <Truncate lines={2} ellipsis={<span>...</span>}>
                {log.message}
              </Truncate>
            </div>
            <div className='Logs__data'>
              {new Date(log.timeStamp).toLocaleString()}
            </div>
            <div className='Logs__read'>
              {log.isRead ? <VscMailRead /> : <MdMarkunread />}
            </div>
            <div
              className='Logs__delete'
              onClick={() => handleDeleteLog(log.projectID, log._id)}
            >
              <RiDeleteBin6Fill />
            </div>
          </div>
        ))
      ) : (
        <Typography>No Logs available</Typography>
      )}
    </div>
  );
}

export default Logs;
