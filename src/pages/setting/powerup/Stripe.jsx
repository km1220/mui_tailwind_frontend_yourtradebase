import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, alpha } from '@mui/material';
import { makeStyles } from '@mui/styles';

import BadgeComponent from '@components/BadgeComponent';
import StripeLogo from '@assets/imgs/payment/stripe-logo.png';

const useStyles = makeStyles(theme => ({
	root: {
		width: '60vw',
		'& .tutor-box': {
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			background: alpha(theme.palette.secondary.main, 0.1),
			padding: '1rem 2rem',
			borderRadius: '0.5rem',
			'& .tutor-info': {
				flexGrow: 1,
				display: 'flex',
				flexDirection: 'column',
				'& > *:not(:last-child)': {
					marginBottom: '0.5rem',
				},
			},
			'& .tutor-video': {
				// flexBasis: '25%',
				maxWidth: '35%',
				'& > img': {
					height: '100%',
				},
			},
		},
	},
	connectionBox: {
		display: 'flex',
		border: `1px solid ${theme.palette.divider}`,
		borderRadius: '1rem',
		padding: '2.5rem',
		'& .logo': {
			marginRight: '2.5rem',
			'& > img': {
				maxWidth: '100%',
				height: 'auto',
			},
		},
		'& > .payment-section': {
			'& > div:first-child > *:not(:last-child)': {
				marginBottom: '0.5rem',
			},
		},
	},
	connectBtn: {
		'&.MuiButton-root': {
			margin: '1.5rem 0 !important',
			borderRadius: '0.5rem',
			fontSize: '1.5rem',
		}
	},
}));


export default function StripePage(props) {
	const classes = useStyles(props);


	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const handleConnect = () => {
		window.open(`https://connect.stripe.com/oauth/v2/authorize?client_id=ca_G87Oo4jcTzCnyHv9XHIu15qHwFqLOo8M&scope=read_write&redirect_uri=https%3A%2F%2Fgo.yourtradebase.com%2Fstripe%2Fsession%2Fcallback&response_type=code`);
	};
	return (
		<div className={classes.root}>
			<Typography variant='h5'>Take online payments</Typography>
			<br />
			<div className='tutor-box'>
				<div className='tutor-info'>
					<Typography variant='h6'>Now your customers can pay by card</Typography>
					<ul style={{ listStyle: 'disc', marginLeft: '1.75rem' }}>
						<li><Typography variant='body1'>Take instant online card payments</Typography></li>
						<li><Typography variant='body1'>Get your money quickly and securely</Typography></li>
						<li><Typography variant='body1'>Choose which invoices can be paid this way</Typography></li>
					</ul>
					<Typography className='ml-2' to='' component={Link} variant="body2" color='info.dark'>Learn more about how card payments work</Typography>
				</div>
				<div className='tutor-video'>
					<img src='https://embed-ssl.wistia.com/deliveries/7e3558239fadb82953d9d9dfcf22f6c1.webp?image_crop_resized=640x360' />
				</div>
			</div>
			<br />
			<div className={classes.connectionBox}>
				<div className='logo'>
					<img src={StripeLogo} />
				</div>
				<div className='payment-section'>
					<div>
						<Typography variant='h5'>Connect to Stripe for super-easy card payments</Typography>
						<Typography variant='subtitle1'>Only pay a small percentage of your invoice total:</Typography>
						<ul style={{ listStyle: 'disc', marginLeft: '3rem' }}>
							<li><Typography variant='body1'>1.9% + 20p for UK and EU cards</Typography></li>
							<li><Typography variant='body1'>1.9% + 20p for UK and EU cards</Typography></li>
						</ul>
					</div>
					<Button className={classes.connectBtn} color="secondary" variant='contained'
						onClick={handleConnect}
					>
						Connect to Stripe
					</Button>
					<BadgeComponent className="mb-4" text={`I've got a Stripe account, how do I connect it?`} />
					<BadgeComponent text={`What's Stripe and how do I get started?`} />
				</div>
			</div>
		</div>
	);
};