import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  SET_CUSTOMERS, REMOVE_ITEM_IN_CUSTOMERS,
  LOADING
} from '@store/actions';

import { Box, Paper, Divider, Collapse, Button, IconButton, List, ListItem, Typography } from '@mui/material';
import { AddOutlined as AddIcon, SearchOutlined as SearchIcon, CancelOutlined as CancelIcon, EditOutlined, DeleteOutlined } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

import { parseJSON } from '@utils';



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
  customerItem: {
    '&:not(:first-child)': {
      borderTop: `1px solid ${theme.palette.divider}`,
    },
    '& > *:not(:first-child)': {
      marginLeft: '1rem',
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
    '& .MuiIconButton-root': {
      margin: '0 0.5rem',
      border: `1px solid`,
      // borderColor: theme.palette.secondary.main,
      // color: theme.palette.secondary.main,
      [theme.breakpoints.down('md')]: {
        margin: '0.25rem 0',
      },
    },
  }
}));

export default function CustomerPage(props) {
  const classes = useStyles(props);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const all_customers = useSelector(state => state.customers);

  const [searchText, setSearchText] = useState('');
  const [showList, setShowList] = useState([]);


  const _getAllCustomers = () => {
    dispatch(LOADING(true));
    axios.get('/customers').then(res => {
      if (!res.data.customers) {
        alert('Getting CUSTOMER data Error!');
        return;
      }
      let all_list = res.data.customers.map(each => ({
        ...each,
        contact_info_list: parseJSON(each.contact_info_list),
        extra_info_list: parseJSON(each.extra_info_list),
      }));
      dispatch(SET_CUSTOMERS(all_list));
      dispatch(LOADING(false));
    }).catch(err => console.log(err));
  }
  useEffect(() => {
    if (all_customers.length === 0) _getAllCustomers();
  }, []);
  useEffect(() => {
    // setShowList(customers);
    handleSearch();
  }, [all_customers]);

  const handleSearch = () => {
    let newShowList = [];
    all_customers.map(each => {
      if (each.full_name.includes(searchText) || each.friendly_name.includes(searchText) || each.company_name.includes(searchText) || each.address.toString().includes(searchText) || each.post_code.includes(searchText))
        newShowList.push(each);
    });
    setShowList(newShowList);
  };
  const handleDelete = (id) => {
    if (!confirm(`Do you really want to delete this item ?   ID: ${id}`)) return;
    axios.delete(`/customers/${id}`).then(res => {
      if (res.data.affectedRows) {
        dispatch(REMOVE_ITEM_IN_CUSTOMERS(id));
      }
    });
  };

  return (
    <div className={classes.root}>
      <div className='flex justify-between'>
        <Typography variant='h5'>Customers</Typography>
        <Button className='px-4 py-1 mb-4 rounded' onClick={() => navigate('/customer/new')} variant="contained">
          <AddIcon />
          <p className='ml-2'>New customer</p>
        </Button>
      </div>

      {showList.length > 0 &&
        <List className={clsx(classes.dataList, 'mb-4')}>
          <>
            <div className={classes.searchBar}>
              <IconButton style={{ cursor: 'pointer' }} disableRipple disableFocusRipple >
                <SearchIcon />
              </IconButton>
              <input placeholder='Seach material...' type='text'
                value={searchText} onChange={e => setSearchText(e.target.value)}
                onKeyDown={e => e.key === "Enter" ? handleSearch() : null}
              />
              <IconButton onClick={() => setSearchText('')} style={{ cursor: 'pointer' }}>
                <CancelIcon />
              </IconButton>
            </div>
            <ListItem className={clsx(classes.customerItem, 'py-0')}>
              {showList.length} customers
            </ListItem>
          </>
          {
            showList.map(each => (
              <ListItem className={classes.customerItem} key={each.id}>
                <div className='flex flex-col'>
                  <Typography variant='h5'>Friendly name: {each.friendly_name} <Typography variant='caption'>Full name: {each.full_name}</Typography></Typography>
                  <Typography variant='body2' color="text.secondary">Company: {each.company_name}</Typography>
                  <Typography variant='body2' color="text.secondary">Address: {each.address} <Typography variant='caption'>Postcode: {each.post_code}</Typography></Typography>
                </div>
                <div style={{ flexGrow: 1 }} />
                <div className='flex flex-col self-end'>
                  <div className='flex flex-col'>
                    <Typography variant="subtitle2">Contact Info</Typography>
                    <div className='flex items-baseline justify-end'>
                      <Typography className='ml-6' variant="overline">{each.contact_info_list[0]?.type.toUpperCase()}: </Typography>
                      <Typography className='ml-2' variant="caption">{each.contact_info_list[0]?.data}</Typography>
                    </div>
                  </div>
                  <div className='flex flex-col'>
                    <Typography variant='subtitle2'>Extra Info</Typography>
                    <div className='flex items-baseline justify-end'>
                      <Typography className='ml-6' variant="overline">{each.extra_info_list[0]?.type}: </Typography>
                      <Typography className='ml-2' variant="caption">{each.extra_info_list[0]?.data}</Typography>
                    </div>
                  </div>
                </div>
                <div className={classes.actionBar}>
                  {/* <Button className='rounded' variant="outlined" onClick={() => navigate(`/customer/${each.id}`)}>
                    Edit
                  </Button>
                  <Button className='rounded' variant="outlined" color='error' onClick={() => handleDelete(each.id)}>
                    Delete
                  </Button> */}
                  <IconButton onClick={() => navigate(`/customer/${each.id}`)}>
                    <EditOutlined />
                  </IconButton>
                  <IconButton color='error' onClick={() => handleDelete(each.id)}>
                    <DeleteOutlined />
                  </IconButton>
                </div>
              </ListItem>
            ))}
        </List>
      }

      {showList.length === 0 && <Typography variant='overline'>No data</Typography>}
    </div>
  )
}
