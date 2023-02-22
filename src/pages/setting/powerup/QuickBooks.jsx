import React, { useEffect } from 'react';
import { Typography, Button, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';

import BadgeComponent from '@components/BadgeComponent';
import QuickBooksLogo from '@assets/imgs/payment/quickbooks-logo.png';

const useStyles = makeStyles(theme => ({
  root: {
    width: '60vw',
    "& > *:not(:last-child)": {
      marginBottom: '2rem',
    },
  },
  connectionBox: {
    display: 'flex',
    flexDirection: 'column',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '1rem',
    padding: '2rem',
    '& .logo': {
      marginBottom: '1.5rem',
      '& > img': {
        maxWidth: '100%',
        height: 'auto',
      },
    },
    '& > .payment-section': {
      '& > div:first-child > *:not(:last-child)': {
        marginBottom: '1rem',
      },
    },
  },
  connectBtn: {
    '&.MuiButton-root': {
      borderRadius: '0.5rem',
      fontSize: '1.5rem',
    }
  },
}));


export default function QuickBooksPage(props) {
  const classes = useStyles(props);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={classes.root}>
      <Typography variant='h5'>Connect to QuickBooks</Typography>
      <div className={classes.connectionBox}>
        <div className='logo'>
          <img src={QuickBooksLogo} />
        </div>
        <div className='payment-section'>
          <div>
            <Typography variant='h5'>You're not connected to QuickBooks</Typography>
            <Typography variant='body1'>Connect to QuickBooks and all the invoices and payments you create in YourTradebase will be kept in sync with your QuickBooks account.</Typography>
            <BadgeComponent text={`Learn more about connecting to QuickBooks`} />
          </div>
          <Divider style={{ margin: '2rem 0' }} />
          <Button className={classes.connectBtn} color="secondary" variant='contained'>
            Connect to QuickBooks
          </Button>
        </div>
      </div>
    </div>
  );
};