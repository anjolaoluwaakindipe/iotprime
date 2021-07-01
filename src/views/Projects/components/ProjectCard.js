import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// react-icons
import { GrDocumentCsv } from 'react-icons/gr';
import { FiMoreVertical } from 'react-icons/fi';

const useStyles = makeStyles({
  root: {
    borderRadius: '1.2rem',
    paddingBottom: '5px',
    minHeight: '269px',
    width: '255px',
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'column',
    margin: '1.2rem',
    transition: 'transform ease 0.5s',

    '&:hover': {
      transform: 'scale(1.01)',
    },
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
  },
  pos: {
    marginBottom: 12,
    textAlign: 'right',
    fontSize: '12px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 'auto',
    cursor: 'pointer',
  },

  description: {
    fontsize: '14',
  },

  csvButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  csvIcon: {
    marginRight: '5px',
  },

  actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default function ProjectCard({
  name,
  description,
  dateCreated,
  timeCreated,
  onClick,
}) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant='outlined'>
      <CardContent className={classes.content}>
        <Typography className={classes.pos} color='textSecondary'>
          {timeCreated + ' ' + dateCreated}
        </Typography>
        <Typography className={classes.title} variant='h5' component='h2'>
          {name.toUpperCase()}
        </Typography>
        <Typography
          variant='body2'
          component='p'
          className={classes.description}
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button
          size='small'
          variant='outlined'
          color='primary'
          className={classes.csvButton}
          onClick={onClick}
        >
          <GrDocumentCsv className={classes.csvIcon} />
          Download CSV
        </Button>
        <Button>
          <FiMoreVertical />
        </Button>
      </CardActions>
    </Card>
  );
}
