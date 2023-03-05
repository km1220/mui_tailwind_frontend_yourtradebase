import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
	SET_JOBS, SET_CUSTOMERS, SET_INVOICES,
	LOADING
} from '@store/actions';

import { Button, List, ListItem, Typography, Divider, CircularProgress } from '@mui/material';
import { AddOutlined as AddIcon, SearchOutlined as SearchIcon, CancelOutlined as CancelIcon } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

import { formatDate } from '@utils';



const useStyles = makeStyles(theme => ({
	invoiceItem: {
		width: '200px',
		height: '250px',
		// minWidth: '180px',
		// minHeight: '250px',
		display: 'flex',
		flexDirection: 'column',
		border: `1px solid ${theme.palette.divider}`,
		borderRadius: '1rem',
		margin: '0.5rem 0',
		'&:not(:last-child)': {
			marginRight: '2rem',
		},
		'& > div': {
			width: '100%',
			padding: '1.25rem 1rem',
			'&:first-child': {
				paddingBottom: '0.25rem',
			},
			'&:last-child': {
				paddingTop: '0.25rem',
			},
		}
	},
}));

export default function InvoiceCard(props) {
	const classes = useStyles(props);
	const { invoiceData, customerData, jobData } = props;

	const dueDate = new Date(invoiceData.due_date);
	const timeFlow = dueDate - new Date();

	const dueColor = timeFlow > 0 ? 'warning.main' : 'error.main';
	const dueDays = new Date(Math.abs(timeFlow)).getDate();
	const dueText = timeFlow > 0 ? `${dueDays} days overdue` : `Draft started ${dueDays} days before`;



	return (
		<div className={classes.invoiceItem} key={invoiceData.id}>
			<div className='flex flex-col'>
				<Typography variant="subtitle1" color={dueColor}>Invoice {invoiceData.id}</Typography>
				<Typography variant='body2' color={dueColor}>{dueText}</Typography>
				{/* <div className='flex items-baseline'>
				<Typography variant='body1' color='tertiary.dark'>Unopened</Typography>
				<b className='mx-4'> · </b>
				<Typography variant='subtitle2' color='tertiary.dark'>Due A Reminder</Typography>
			</div> */}
				<Typography variant='body1' color='tertiary.dark'>Unopened · <Typography variant='subtitle2' color='tertiary.dark'>Due A Reminder</Typography></Typography>

			</div>
			<Divider />
			<div className='relative flex flex-col self-start justify-start grow'>
				<Typography variant="subtitle1">Mr {customerData?.full_name}</Typography>
				<Typography variant="body1">Job #{jobData?.id} - {jobData?.title}</Typography>
				<Typography variant="body1">{jobData?.site_address}</Typography>

				<Typography className='absolute bottom-2 right-3' color={dueColor} variant="h6">£ {invoiceData.total_price}</Typography>
			</div>
		</div >
	);
}
