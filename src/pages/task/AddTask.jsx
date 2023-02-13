import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ADD_ITEM_IN_TASKS } from '@store/actions';

import { Box, Divider, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

import ItemComponent from '@components/price_list/ItemComponent';

import { _generateNewID } from '@utils';

const useStyles = makeStyles(theme => ({
  root: {
  },
  inputsContainer: {
    display: 'flex',
    flexDirection: 'column',

    '& > *:not(:first-child)': {
      marginTop: '1rem',
    },
    // [theme.breakpoints.down('md')]: {
    //   flexDirection: 'column',
    //   alignItems: 'center',
    //   '& > *': {
    //     width: '100%',
    //     '&:not(:first-child)': {
    //       marginLeft: '0',
    //       marginTop: '1rem',
    //     }
    //   },
    // },
  },
}));

export default function AddTaskPage(props) {
  const classes = useStyles(props);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [due, setDue] = useState('');
  const [jobId, setJobId] = useState();


  const handleAddTask = () => {
    axios.post('/tasks', { title, desc, due, job_id: 1 }).then(res => {
      if (res.data.affectedRows) {
        dispatch(ADD_ITEM_IN_TASKS({ id: res.data.insertId, title, desc, due, job_id: 1 }));
        navigate('/task');
      }
    }).catch(err => {
      if (err.response.status === 400) alert(err.response.data);
      else if (err.response.status === 403) alert(err.response.data);
    });
  };

  return (
    <>
      <Box className={clsx(classes.root, 'w-2/5 min-h-screen, px-8, py-8')}>
        <Typography variant='h5'>Add a new task</Typography>
        <Divider />

        <div className={clsx(classes.inputsContainer, 'my-4')}>
          <div>
            <Typography variant='subtitle2'>What's the task?</Typography>
            <ItemComponent className="">
              <input placeholder='e.g. Arrange customer survey'
                value={title} onChange={e => setTitle(e.target.value)}
              />
            </ItemComponent>
          </div>
          <div>
            <Typography variant='subtitle2'>Description <Typography variant="caption">(optional)</Typography></Typography>
            <ItemComponent className="">
              <input value={desc} onChange={e => setDesc(e.target.value)} />
            </ItemComponent>
          </div>
          <div className='flex flex-col'>
            <Typography variant='subtitle2'>Due <Typography variant="caption">(optional)</Typography></Typography>
            <Typography variant="caption">We'll send you a reminder the day it's due</Typography>
            <ItemComponent className="w-1/2">
              <input placeholder='Anytime'
                value={due} onChange={e => setDue(e.target.value)}
              />
            </ItemComponent>
          </div>
        </div>
        <Divider />

        <div className='flex justify-center mt-6'>
          <Button className='mx-4 rounded' color="secondary" variant="contained" onClick={handleAddTask}>Add this task</Button>
          <Button className='mx-4 rounded' color="disabled" variant="outlined" onClick={() => navigate('/task')}>Discard</Button>
        </div>
      </Box>
    </>
  )
}
