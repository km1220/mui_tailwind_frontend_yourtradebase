import _ from 'lodash';
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import {
  Collapse, Button, IconButton, Switch, Avatar, Tooltip, List, ListItem, Typography, Divider,
  darken,
} from '@mui/material';
import { EditOutlined, AccountCircleOutlined } from '@mui/icons-material';
import { makeStyles, styled } from '@mui/styles';
import clsx from 'clsx';

import BadgeComponent from '@components/BadgeComponent';



const AutoIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 19.5a4.5 4.5 0 0 0-4.5-4.5 4.28 4.28 0 0 0-.875.1.249.249 0 0 1-.275-.133L14.934 8.13a.249.249 0 0 1 .056-.3 4.5 4.5 0 1 0-5.98 0 .252.252 0 0 1 .057.3l-3.418 6.834a.248.248 0 0 1-.275.132A4.263 4.263 0 0 0 4.5 15a4.5 4.5 0 1 0 4.333 5.684.249.249 0 0 1 .241-.184h5.852a.25.25 0 0 1 .241.184A4.5 4.5 0 0 0 24 19.5zm-8.833-1.184a.249.249 0 0 1-.241.184H9.074a.25.25 0 0 1-.241-.184 4.482 4.482 0 0 0-1.343-2.15.249.249 0 0 1-.056-.3l3.417-6.834a.249.249 0 0 1 .275-.133 3.951 3.951 0 0 0 1.749 0 .252.252 0 0 1 .275.133l3.416 6.834a.249.249 0 0 1-.056.3 4.482 4.482 0 0 0-1.343 2.149z"></path></svg>

const useStyles = makeStyles(theme => ({
  root: {
    width: '60vw',
    '& > .auto-msg-header': { marginBottom: '2.5rem' },
    '& > .auto-msg-content': {
      '& > *:not(:last-child)': { marginBottom: '1rem' },
    },

    '& b.tags': {
      color: theme.palette.success.main,
    },
  },
  dataList: {
    padding: '0 !important',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '0.25rem',
    color: theme.palette.primary.main,
    '& > *:not(:last-child)': { borderBottom: `1px solid ${theme.palette.divider}` },
    '& > *': { padding: '1rem' },

    '& .title-bar': {
      display: 'flex',
    },
    '& .auto-message-item': {
      display: 'flex',
      alignItems: 'center',
      color: theme.palette.tertiary.light,
      background: darken(theme.palette.background.default, 0.075),
      '& svg': {
        fill: theme.palette.tertiary.light,
        width: '1.25rem',
        height: '1.25rem',
        marginRight: '1rem',
      },
    },
  },
}));

export default function AutoMsgsPage(props) {
  const classes = useStyles(props);
  const { notificationData, handleDataChage, ...others } = props;
  const userData = useSelector(state => state.user);
  const all_team_members = useSelector(state => state.teammates);

  return (
    <div className={classes.root}>
      <div className='auto-msg-header'>
        <Typography variant='h5'>Auto-messages</Typography>
        <Typography variant='body1'>Save time by automatically sending personalised messages to your customers at exactly the right time.</Typography>
        <BadgeComponent text='More about notifications' style={{ margin: '0', marginTop: '0.5rem' }} />
      </div>

      <div className='auto-msg-content'>
        <Typography variant='h5'>Auto-messages for quotes</Typography>
        <List className={classes.dataList}>
          <div className='title-bar'>
            <Typography className='grow' variant='subtitle1'>When a quote has been emailed</Typography>
            <Button className='px-1 py-0 rounded-md' variant='outlined' size='small'>Edit</Button>
          </div>

          <div className='auto-message-item'>
            <AutoIcon />
            <Typography className='grow' variant='subtitle1'>Then after 7 days at 3PM we'll send email template Sending a quote follow-up</Typography>
          </div>
          <div className='auto-message-item'>
            <AutoIcon />
            <Typography className='grow' variant='subtitle1'>Then after 7 days at 3PM we'll send email template Sending a quote follow-up</Typography>
          </div>
        </List>

        <List className={classes.dataList}>
          <div className='title-bar'>
            <Typography className='grow' variant='subtitle1'>When a quote has been accepted</Typography>
            <Button className='px-1 py-0 rounded-md' variant='outlined' size='small'>Edit</Button>
          </div>

          <div className='auto-message-item'>
            <AutoIcon />
            <Typography className='grow' variant='subtitle1'>Then on the same day after 15 minutes we'll send email template Sending a thank you for accepting a quote</Typography>
          </div>
        </List>

        <List className={classes.dataList}>
          <div className='title-bar'>
            <Typography className='grow' variant='subtitle1'>When a quote has been declined</Typography>
            <Typography className='grow' variant='body1'>No auto-messages set up</Typography>
            <Button className='px-1 py-0 rounded-md' variant='outlined' size='small'>Edit</Button>
          </div>
        </List>
      </div>
    </div>
  )
}
