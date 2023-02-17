import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  SET_QUOTES, REMOVE_ITEM_IN_QUOTES,
  LOADING
} from '@store/actions';

import { Box, Paper, Divider, Collapse, Button, IconButton, List, ListItem, Typography } from '@mui/material';
import { AddOutlined as AddIcon, SearchOutlined as SearchIcon, CancelOutlined as CancelIcon } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

import { parseJSON } from '@utils/price';


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
  quoteItem: {
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

export default function QuotePage(props) {
  const classes = useStyles(props);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const all_quotes = useSelector(state => state.quotes);

  const [searchText, setSearchText] = useState('');
  const [showList, setShowList] = useState([]);


  const _getAllQuotes = async () => {
    dispatch(LOADING(true));
    axios.get('/quotes').then(res => {
      if (!res.data.quotes) {
        alert('Getting Price list data Error!');
        return;
      }
      let all_list = res.data.quotes.map(each => ({
        ...each,
        pricelist_data_list: parseJSON(each.pricelist_data_list),
      }));
      dispatch(SET_QUOTES(all_list));
      dispatch(LOADING(false));
    }).catch(err => console.log(err));
  }
  useEffect(() => {
    if (all_quotes.length === 0) _getAllQuotes();
  }, []);
  useEffect(() => {
    // setShowList(quotes);
    handleSearch();
  }, [all_quotes]);

  const handleSearch = () => {
    let newShowList = [];
    all_quotes.map(each => {
      if (each.company_name.includes(searchText) || each.building_number.toString().includes(searchText) || each.post_code.includes(searchText) || each.email.includes(searchText) || each.phone.includes(searchText))
        newShowList.push(each);
    });
    setShowList(newShowList);
  };
  const handleDelete = (id) => {
    if (!confirm(`Do you really want to delete this item ?   ID: ${id}`)) return;
    axios.delete(`/quotes/${id}`).then(res => {
      if (res.data.affectedRows) {
        dispatch(REMOVE_ITEM_IN_QUOTES(id));
      }
    });
  };

  return (
    <div className={classes.root}>
      <div className='flex justify-between'>
        <Typography variant='h5'>Quotes</Typography>
        <Button className='px-4 py-1 mb-4 rounded' onClick={() => navigate('/quote/new')} variant="contained">
          <AddIcon />
          <p className='ml-2'>New quote</p>
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
            <ListItem className={clsx(classes.quoteItem, 'py-0')}>
              {showList.length} quotes
            </ListItem>
          </>
          {
            showList.map(each => (
              <ListItem className={classes.quoteItem} key={each.id}>
                <div className='flex flex-col'>
                  <Typography variant="subtitle1">Company: {each.company_name}</Typography>
                  <Typography variant='body2'>Building number: {each.building_number} <Typography variant='caption'>Postcode: {each.post_code}</Typography></Typography>
                </div>
                <div style={{ flexGrow: 1 }} />
                <div className='flex flex-col self-end'>
                  <Typography variant="caption">Email: {each.email}</Typography>
                  <Typography variant='caption'>Phone: {each.phone}</Typography>
                </div>
                <div className={classes.actionBar}>
                  <Button className='rounded' variant="outlined" onClick={() => navigate(`/quote/${each.id}`)}>
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
