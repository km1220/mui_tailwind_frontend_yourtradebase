import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
	Box, Paper, Divider, Typography, Button, Checkbox, RadioGroup, Radio, FormControl, FormLabel, FormControlLabel,
	alpha,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
// import clsx from 'clsx';


const useStyles = makeStyles(theme => ({
	root: {
		'& > div:not(:first-child)': {
			'& > *:not(:first-child)': {
				marginTop: '0.5rem',
			},
		},

		'& #free-trial-box': {
			background: alpha(theme.palette.success.main, 0.2),
			padding: '2rem',
			borderRadius: '1rem',
		},
	},
}));


export default function ManageAccountPage(props) {
	const classes = useStyles(props);
	// const dispatch = useDispatch();

	return (
		<div className={classes.root}>
			<Typography variant='h4'>Manage your account</Typography>
			<Divider /> <br />
			<div id='free-trial-box'>
				<Typography variant='h5'>You're on a Free Trial</Typography>
				<Typography variant='h6'>You have unlimited access to all features until 5 March.</Typography>
				<div className='flex flex-col justify-center items-center my-8'>
					<p style={{ fontSize: '3rem' }}>🎁</p>
					<Typography variant='h6'>Our gift to you: <b>3 months for the price of 1</b></Typography>
					<Typography variant='body1'>£8.25 for 3 months, then £25 per month</Typography>
				</div>
				<div className='flex justify-center'>
					<Button className='rounded' color="secondary" variant="contained" onClick={() => { }}>Upgrade to YourTradebase Unlimited</Button>
				</div>

				<div className='flex justify-center items-baseline'>
					<Typography variant='body1'>Change or cancel your plan at anytime.</Typography>
					<Typography className='ml-2' variant='subtitle1'>Got questions?</Typography>
					<Typography className='ml-2' to='' component={Link} variant="subtitle2" color='info.dark'>Ask away</Typography>
				</div>
			</div>

			<div className='mt-8 p-4'>
				<Typography variant='h5'>Cancel your account and delete all data</Typography>
				<Typography variant='body1'>If you would like to cancel your account and have all your data deleted, we'll be sorry to see you go.</Typography>
				<Typography to='' component={Link} variant="body2" color='error'>I would like to cancel my account →</Typography>
			</div>
		</div>
	);
};