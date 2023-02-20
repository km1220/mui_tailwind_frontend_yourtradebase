import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  SET_TASKS, UPDATE_ITEM_IN_TASKS,
  LOADING
} from '@store/actions';

import { Box, Divider, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

import ItemComponent from '@components/price_list/ItemComponent';

import { _generateNewID } from '@utils';

const useStyles = makeStyles(theme => ({
  root: {
  },
  inputsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    '& > *:not(:first-child)': {
      marginTop: '1rem',
    },
  },
}));

export default function EditTaskPage(props) {
  const { id: paramID } = useParams();
  const classes = useStyles(props);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const all_tasks = useSelector(state => state.tasks);

  const [editTargetData, setEditTargetData] = useState({ id: _generateNewID(), title: '', desc: '', due: '', job_id: 0 });

  const _getAllTasks = () => {
    dispatch(LOADING(true));
    axios.get('/tasks').then(res => {
      if (!res.data.tasks) {
        alert('Getting TASK data Error!');
        return;
      }
      dispatch(SET_TASKS(res.data.tasks));
      dispatch(LOADING(false));
    }).catch(err => console.log(err));
  }
  useEffect(() => {
    if (all_tasks.length === 0) _getAllTasks();
  }, []);
  useEffect(() => {
    if (all_tasks.length === 0) return;
    const targetData = all_tasks.filter(e => e.id === Number(paramID))[0];
    if (!targetData)
      navigate('/task');
    else
      setEditTargetData(targetData);
  }, [all_tasks]);

  const handleUpdateTask = () => {
    axios.put(`/tasks/${editTargetData.id}`, editTargetData).then(res => {
      if (res.data.affectedRows) {
        dispatch(UPDATE_ITEM_IN_TASKS(editTargetData));
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
        <Typography variant='h5'>Edit this task</Typography>
        <Divider />

        <div className={clsx(classes.inputsWrapper, 'my-4')}>
          <div>
            <Typography variant='subtitle2'>What's the task?</Typography>
            <ItemComponent>
              <input placeholder='e.g. Arrange customer survey'
                value={editTargetData.title} onChange={e => setEditTargetData({ ...editTargetData, title: e.target.value })}
              />
            </ItemComponent>
          </div>
          <div>
            <Typography variant='subtitle2'>Description <Typography variant="caption">(optional)</Typography></Typography>
            <ItemComponent>
              <input value={editTargetData.desc} onChange={e => setEditTargetData({ ...editTargetData, desc: e.target.value })} />
            </ItemComponent>
          </div>
          <div className='flex flex-col'>
            <Typography variant='subtitle2'>Due <Typography variant="caption">(optional)</Typography></Typography>
            <Typography variant="caption">We'll send you a reminder the day it's due</Typography>
            <ItemComponent className="w-1/2">
              <input placeholder='Anytime'
                value={editTargetData.due} onChange={e => setEditTargetData({ ...editTargetData, due: e.target.value })}
              />
            </ItemComponent>
          </div>
        </div>
        <Divider />

        <div className='flex justify-center mt-6'>
          <Button className='mx-4 rounded' color="secondary" variant="contained" onClick={handleUpdateTask}>Update this task</Button>
          <Button className='mx-4 rounded' color="disabled" variant="outlined" onClick={() => navigate('/task')}>Discard</Button>
        </div>
      </Box>
    </>
  )
}
