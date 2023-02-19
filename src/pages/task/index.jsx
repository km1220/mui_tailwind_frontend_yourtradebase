import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  SET_TASKS, REMOVE_ITEM_IN_TASKS,
  LOADING
} from '@store/actions';

import { Button, List, ListItem, Typography } from '@mui/material';
import { AddOutlined as AddIcon, SearchOutlined as SearchIcon, CancelOutlined as CancelIcon } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';


const useStyles = makeStyles(theme => ({
  root: {
    minWidth: '45vw',
    padding: '2rem',
  },
  dataList: {
    padding: '0 !important',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '0.25rem',
    color: theme.palette.primary.main,
  },
  searchBar: {
    display: 'flex',
    color: theme.palette.neutral[400],
    '& input': {
      flexGrow: 1,
      color: theme.palette.common.black,
    },
    '& > *:not(:first-child)': {
      marginLeft: '1rem',
    },
  },
  taskItem: {
    '&:not(:first-child)': {
      borderTop: `1px solid ${theme.palette.divider}`,
    },
    '& > *:not(:first-child)': {
      marginLeft: '2rem',
    },
  },
  actionBar: {
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column'
    },
    '& .MuiButton-root': {
      margin: '0 0.5rem',
      padding: '0.25rem 0.5rem',
      [theme.breakpoints.down('md')]: {
        margin: '0.25rem 0',
        padding: '0.25rem 0.5rem',
      },
    },
  }
}));

export default function TaskPage(props) {
  const classes = useStyles(props);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks);

  const [searchText, setSearchText] = useState('');
  const [showList, setShowList] = useState([]);

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
  };
  useEffect(() => {
    if (tasks.length === 0) _getAllTasks();
  }, []);
  useEffect(() => {
    // setShowList(tasks);
    handleSearch();
  }, [tasks]);

  const handleSearch = () => {
    let newShowList = [];
    tasks.map(each => {
      if (each.title.includes(searchText) || each.desc.toString().includes(searchText) || each.due.includes(searchText))
        newShowList.push(each);
    });
    setShowList(newShowList);
  };
  const handleDelete = (id) => {
    if (!confirm(`Do you really want to delete this item ?   ID: ${id}`)) return;
    axios.delete(`/tasks/${id}`).then(res => {
      if (res.data.affectedRows) {
        dispatch(REMOVE_ITEM_IN_TASKS(id));
      }
    });
  };

  return (
    <div className={classes.root}>
      <div className='flex justify-between'>
        <Typography variant='h5'>Tasks</Typography>
        <Button className='px-4 py-1 mb-4 rounded' onClick={() => navigate('/task/new')} variant="contained">
          <AddIcon />
          <p className='ml-2'>New task</p>
        </Button>
      </div>

      {showList.length > 0 &&
        <List className={clsx(classes.dataList, 'mb-4')}>
          <>
            <ListItem className={classes.searchBar}>
              <SearchIcon onClick={() => handleSearch()} style={{ cursor: 'pointer' }} />
              <input placeholder='Seach material...' type='text'
                value={searchText} onChange={e => setSearchText(e.target.value)}
                onKeyDown={e => e.key === "Enter" ? handleSearch() : null}
              />
              <CancelIcon onClick={() => setSearchText('')} style={{ cursor: 'pointer' }} />
            </ListItem>
            <ListItem className={clsx(classes.taskItem, 'py-0')}>
              {showList.length} tasks
            </ListItem>
          </>
          {
            showList.map(each => (
              <ListItem className={classes.taskItem} key={each.id}>
                <div className='flex flex-col'>
                  <Typography variant="subtitle1">{each.title}</Typography>
                  <Typography variant='caption'>{each.desc}</Typography>
                  <Typography variant='caption'>Due: {each.due} <Typography variant='caption'>Job: {each.id}</Typography></Typography>
                </div>
                <div style={{ flexGrow: 1 }} />
                <div className={classes.actionBar}>
                  <Button className='rounded' variant="outlined" onClick={() => navigate(`/task/${each.id}`)}>
                    Edit
                  </Button>
                  <Button className='rounded' variant="outlined" color='error' onClick={() => handleDelete(each.id)}>
                    Delete
                  </Button>
                </div>
              </ListItem>
            ))}
        </List>
      }

      {showList.length === 0 && <Typography variant='overline'>No data</Typography>}
    </div>
  )
}
