import React, { useEffect } from 'react';
import { Typography, Button, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';

import BadgeComponent from '@components/BadgeComponent';
import XeroLogo from '@assets/imgs/payment/xero-logo.png';

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


export default function XeroPage(props) {
  const classes = useStyles(props);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleConnect = () => {
    window.open(`https://login.xero.com/identity/user/login?ReturnUrl=%2Fidentity%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3DEB4763BD2CA247FE89D2515E1DD78244%26redirect_uri%3Dhttps%253A%252F%252Fgo.yourtradebase.com%252Fxero%252Fsession%252Fcallback%26response_type%3Dcode%26scope%3Daccounting.transactions%2520accounting.contacts%2520accounting.settings.read%2520offline_access`);
  };
  return (
    <div className={classes.root}>
      <Typography variant='h5'>Connect to Xero</Typography>
      <div className={classes.connectionBox}>
        <div className='logo'>
          <img src={XeroLogo} />
        </div>
        <div className='payment-section'>
          <div>
            <Typography variant='h5'>You're not connected to Xero</Typography>
            <Typography variant='body1'>Connect to Xero and all the invoices and payments you create in YourTradebase will be kept in sync with your Xero account.</Typography>
            <BadgeComponent text={`Learn more about connecting to Xero`} />
          </div>
          <Divider style={{ margin: '2rem 0' }} />
          <Button className={classes.connectBtn} color="secondary" variant='contained'
            onClick={handleConnect}
          >
            Connect to Xero
          </Button>
        </div>
      </div>
    </div>
  );
};