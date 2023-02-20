
import axios from 'axios';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SET_USER_REMINDERS, SET_ALERT } from '@store/actions';

import {
  Divider, Typography, Button, Checkbox, RadioGroup, Radio, FormControl, FormLabel, FormControlLabel,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
// import clsx from 'clsx';


const useStyles = makeStyles(theme => ({
  root: {
    '& > div:not(:first-child, :last-child)': {
      marginBottom: '2.5rem',
    },
    '& > div:not(:last-child)': {
      display: 'flex',
      flexDirection: 'column',
    },

    '& .change-target-email': {
      color: theme.palette.primary.main,
      textDecoration: 'underline',
    },
  },
}));


export default function ReminderPage(props) {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const { user_data, reminders_data } = useSelector(state => ({ user_data: state.user, reminders_data: state.reminders }));


  const [quoteUnsent, setQuoteUnsent] = useState(7);
  const [quoteNeedFollowUp, setQuoteNeedFollowUp] = useState(7);
  const [invoiceUnsent, setInvoiceUnsent] = useState(7);
  const [invoiceOverdue, setInvoiceOverdue] = useState(7);
  const [summaryDailyEmail, setSummaryDailyEmail] = useState(true);
  const [summaryWeeklyEmail, setSummaryWeeklyEmail] = useState(true);
  const [allUnsubscribe, setAllUnsubscribe] = useState(false);


  const _getUserReminders = () => {
    axios.get(`/reminders/${user_data.id}/`).then(res => {
      console.log(res);
      if (!res.data.id) {
        alert('Getting REMINDERs data Error!');
        return;
      }
      let resultData = {
        id: res.data.id,
        quoteUnsent: res.data.quote_unsent, quoteNeedFollowUp: res.data.quote_need_follow_up,
        invoiceUnsent: res.data.invoice_unsent, invoiceOverdue: res.data.invoice_overdue,
        summaryDailyEmail: res.data.summary_daily_email ? true : false,
        summaryWeeklyEmail: res.data.summary_weekly_email ? true : false,
        allUnsubscribe: res.data.all_unsubscribe ? true : false
      };
      dispatch(SET_USER_REMINDERS(resultData));
    }).catch(err => console.log(err));
  }
  useEffect(() => {
    _getUserReminders();
  }, [])
  useEffect(() => {
    setQuoteUnsent(reminders_data.quoteUnsent);
    setQuoteNeedFollowUp(reminders_data.quoteNeedFollowUp);
    setInvoiceUnsent(reminders_data.invoiceUnsent);
    setInvoiceOverdue(reminders_data.invoiceOverdue);
    setSummaryDailyEmail(reminders_data.summaryDailyEmail);
    setSummaryWeeklyEmail(reminders_data.summaryWeeklyEmail);
    setAllUnsubscribe(reminders_data.allUnsubscribe);
  }, [reminders_data]);
  console.log('remindersData', reminders_data);

  const handleChangeReminders = () => {
    const updateData = {
      quote_unsent: quoteUnsent, quote_need_follow_up: quoteNeedFollowUp,
      invoice_unsent: invoiceUnsent, invoice_overdue: invoiceOverdue,
      summary_daily_email: summaryDailyEmail, summary_weekly_email: summaryWeeklyEmail, all_unsubscribe: allUnsubscribe
    }

    axios.put(`/reminders/${user_data.id}`, updateData)
      .then(res => {
        console.log(res);
        if (res.data.affectedRows) {
          let resultData = {
            ...reminders_data,
            quoteUnsent: quoteUnsent, quoteNeedFollowUp: quoteNeedFollowUp,
            invoiceUnsent: invoiceUnsent, invoiceOverdue: invoiceOverdue,
            summaryDailyEmail: summaryDailyEmail ? true : false,
            summaryWeeklyEmail: summaryWeeklyEmail ? true : false,
            allUnsubscribe: allUnsubscribe ? true : false
          };
          dispatch(SET_USER_REMINDERS(resultData));
          dispatch(SET_ALERT({ type: 'success', message: 'Saved successfully!' }));
        }
      }).catch(err => {
        dispatch(SET_ALERT({ type: 'error', message: err.response.data }));
      });
  };

  return (
    <div className={classes.root}>
      <Typography variant='body1'>Email reminders are being sent to: {user_data.email}.
        <Typography className='change-target-email ml-2' to='/setting/profile' component={Link} variant="subtitle2">
          Change your email address
        </Typography>
      </Typography>
      <br />
      <div id='quote-section'>
        <Typography variant='h5'>Quote reminders</Typography>
        <Divider />
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            <Typography variant='body1'>Email me a reminder for unsent quotes...</Typography>
          </FormLabel>
          <RadioGroup value={quoteUnsent}>
            <FormControlLabel value={0} control={<Radio />} label={
              <Typography variant='subtitle1'>Never</Typography>
            } onChange={e => {
              if (e.target.checked) setQuoteUnsent(0);
            }} />
            <FormControlLabel value={3} control={<Radio />} label={
              <Typography variant='subtitle1'>3 days after it was created</Typography>
            } onChange={e => {
              if (e.target.checked) setQuoteUnsent(3);
            }} />
            <FormControlLabel value={7} control={<Radio />} label={
              <Typography variant='subtitle1'>7 days after it was created</Typography>
            } onChange={e => {
              if (e.target.checked) setQuoteUnsent(7);
            }} />
          </RadioGroup>
        </FormControl>
        <br />
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            <Typography variant='body1'>Email me a reminder for quotes needing follow up...</Typography>
          </FormLabel>
          <RadioGroup value={quoteNeedFollowUp}>
            <FormControlLabel value={0} control={<Radio />} label={
              <Typography variant='subtitle1'>Never</Typography>
            } onChange={e => {
              if (e.target.checked) setQuoteNeedFollowUp(0);
            }} />
            <FormControlLabel value={3} control={<Radio />} label={
              <Typography variant='subtitle1'>3 days after it was sent</Typography>
            } onChange={e => {
              if (e.target.checked) setQuoteNeedFollowUp(3);
            }} />
            <FormControlLabel value={7} control={<Radio />} label={
              <Typography variant='subtitle1'>7 days after it was sent</Typography>
            } onChange={e => {
              if (e.target.checked) setQuoteNeedFollowUp(7);
            }} />
          </RadioGroup>
        </FormControl>
      </div>
      <div id='invoice-section'>
        <Typography variant='h5'>Invoice reminders</Typography>
        <Divider />
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            <Typography variant='body1'>Email me a reminder for unsent invoices...</Typography>
          </FormLabel>
          <RadioGroup value={invoiceUnsent}>
            <FormControlLabel value={0} control={<Radio />} label={
              <Typography variant='subtitle1'>Never</Typography>
            } onChange={e => {
              if (e.target.checked) setInvoiceUnsent(0);
            }} />
            <FormControlLabel value={3} control={<Radio />} label={
              <Typography variant='subtitle1'>3 days after it was created</Typography>
            } onChange={e => {
              if (e.target.checked) setInvoiceUnsent(3);
            }} />
            <FormControlLabel value={7} control={<Radio />} label={
              <Typography variant='subtitle1'>7 days after it was created</Typography>
            } onChange={e => {
              if (e.target.checked) setInvoiceUnsent(7);
            }} />
          </RadioGroup>
        </FormControl>
        <br />
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            <Typography variant='body1'>Email me a reminder for overdue invoices...</Typography>
          </FormLabel>
          <RadioGroup value={invoiceOverdue}>
            <FormControlLabel value={0} control={<Radio />} label={
              <Typography variant='subtitle1'>Never</Typography>
            } onChange={e => {
              if (e.target.checked) setInvoiceOverdue(0);
            }} />
            <FormControlLabel value={3} control={<Radio />} label={
              <Typography variant='subtitle1'>3 days after payment was due</Typography>
            } onChange={e => {
              if (e.target.checked) setInvoiceOverdue(3);
            }} />
            <FormControlLabel value={7} control={<Radio />} label={
              <Typography variant='subtitle1'>7 days after payment was due</Typography>
            } onChange={e => {
              if (e.target.checked) setInvoiceOverdue(7);
            }} />
          </RadioGroup>
        </FormControl>
      </div>
      <div className='daily-email-summary'>
        <Typography variant="h5">Daily email summary</Typography>
        <Divider />
        <div className='flex items-center'>
          <Checkbox className='p-0 pr-2' size='small'
            checked={summaryDailyEmail} onChange={e => setSummaryDailyEmail(e.target.checked)}
          />
          <Typography variant='body1'>Send me a daily email of my tasks and events which are due</Typography>
        </div>
      </div>
      <div className='weekly-email-summary'>
        <Typography variant="h5">Weekly email summary</Typography>
        <Divider />
        <div className='flex items-center'>
          <Checkbox className='p-0 pr-2' size='small'
            checked={summaryWeeklyEmail} onChange={e => setSummaryWeeklyEmail(e.target.checked)}
          />
          <Typography variant='body1'>Send me a weekly email summary of my tasks and paperwork</Typography>
        </div>
      </div>
      <div className='unsubscribe-from-all'>
        <Typography variant="h5">Unsubscribe from all</Typography>
        <Divider />
        <div className='flex items-center'>
          <Checkbox className='p-0 pr-2' size='small'
            checked={allUnsubscribe} onChange={e => setAllUnsubscribe(e.target.checked)}
          />
          <Typography variant='body1'>Check to unsubscribe from all YourTradebase emails</Typography>
        </div>
      </div>

      <div className='flex justify-center'>
        <Button className='mx-4 rounded' color="secondary" variant="contained" onClick={handleChangeReminders}>Save reminders</Button>
      </div>
    </div >
  )
}