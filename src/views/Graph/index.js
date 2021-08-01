import React, { useState, useEffect } from 'react';

// react icons
import { BiArrowBack } from 'react-icons/bi';

// react-router
import { useHistory, useParams } from 'react-router';

// chart js
import 'chartjs-adapter-moment';
import 'moment';
import { Line } from 'react-chartjs-2';

// css imports
import './Graph.scss';

// numeral
import numeral from 'numeral';

// react-redux
import { useSelector } from 'react-redux';

// socket io
import io from 'socket.io-client';

// custom services
import {
  getDataDay,
  getDataWeek,
  getDataYear,
} from '../../services/data.services';

// materialui
import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from '@material-ui/core';

// chartjs options
const options = (state, dataID) => ({
  animations: false,
  plugins: {
    title: {
      display: true,
      text: `Chart for the ${state}`,
    },
    legend: { display: false },
    tooltips: {
      mode: 'index',
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format('+0,0');
        },
      },
    },
  },
  elements: { point: { radius: 3 } },
  maintainAspectRatio: false,

  scales: {
    x: {
      title: {
        display: true,
        text: 'Time',
      },
      type: 'time',
      time: {
        tooltipFormat: 'll HH:mm',
        unit: state === 'today' ? 'hour' : 'day',
        unitStepSize: 'today' ? 3 : 1,
        displayFormats: {
          day: 'MM/DD/YYYY',
        },
      },
    },

    y: {
      stacked: true,
      title: {
        display: true,
        text: dataID,
      },
      ticks: {
        display: true,
        backDropColor: 'rgba(1,1,1,1)',
        major: {
          enabled: true,
        },
      },
    },
  },
});

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: 120,
    alignSelf: 'flex-end',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Graph = () => {
  const { projectID, dataID } = useParams();
  const [data, setData] = useState([]);
  const [dataDate, setDataDate] = useState('today');
  const isLogged = useSelector((state) => state.auth.isLogged);
  const history = useHistory();
  const tokenStorage = JSON.parse(localStorage.getItem('token'));
  const classes = useStyles();

  if (!isLogged || !tokenStorage) {
    history.push('/login');
  }

  const updateChart = async () => {
    if (dataDate === 'today') {
      const resData = await getDataDay(tokenStorage.token, projectID, dataID);
      console.log(resData);

      if (resData.success) {
        const chartFormatData = resData.data.map((data) => ({
          x: new Date(data.dataTimeCreated).toLocaleString(),
          y: data.dataValue,
        }));
        console.log(chartFormatData);
        return setData(chartFormatData);
      }
      return setData([]);
    }
    if (dataDate === 'year') {
      const resData = await getDataYear(tokenStorage.token, projectID, dataID);

      if (resData.success) {
        const chartFormatData = resData.data.map((data) => ({
          x: new Date(data.dataTimeCreated).toLocaleString(),
          y: data.dataValue,
        }));
        console.log(chartFormatData);
        return setData(chartFormatData);
      }

      return setData([]);
    }
    if (dataDate === 'week') {
      const resData = await getDataWeek(tokenStorage.token, projectID, dataID);

      if (resData.success) {
        const chartFormatData = resData.data.map((data) => ({
          x: new Date(data.dataTimeCreated).toLocaleString(),
          y: data.dataValue,
        }));
        console.log(chartFormatData);
        return setData(chartFormatData);
      }
      return setData([]);
    }
  };

  const handleDateChange = (event) => {
    setDataDate(event.target.value);
  };

  useEffect(() => {
    const startup = async () => {
      await updateChart();
    };
    startup();

    const socket = io('/');
    socket.on('connection', () => {
      console.log('connected to socket');
    });
    socket.on(projectID, async () => {
      console.log('data sent');
      await updateChart();
    });

    // const interval = setInterval(async () => {
    //   await startup();
    // }, 5000);
    // return () => clearInterval(interval);
  }, [dataDate]);

  return (
    <div className='Graph__container'>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: '0 3rem',
        }}
      >
        <BiArrowBack
          onClick={() => {
            history.goBack();
          }}
          style={{
            fontSize: '25px',
            margin: '1rem 0',
            cursor: 'pointer',
            ':hover': { backgroundColor: 'grey' },
          }}
        />
        <FormControl className={classes.formControl}>
          <InputLabel id='demo-simple-select-label'>Period</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            onChange={(event) => {
              handleDateChange(event);
            }}
            value={dataDate}
          >
            <MenuItem value={'today'}>Today</MenuItem>
            <MenuItem value={'week'}>Weekly</MenuItem>
            <MenuItem value={'year'}>1 Year Ago</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className='Graph'>
        <Line
          options={options(dataDate, dataID)}
          data={{
            datasets: [
              {
                yAxisID: 'y',
                xAxisID: 'x',
                label: dataID,
                data: data,
                fill: true,
                backgroundColor: 'rgba(204, 16, 15, 0.4)',
                borderColor: '#CC1034',
                borderWidth: 0.4,
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default Graph;
