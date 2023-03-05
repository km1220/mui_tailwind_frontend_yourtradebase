import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
	SET_JOBS, SET_CUSTOMERS, SET_INVOICES,
	LOADING
} from '@store/actions';

import { Button, Typography, Divider, CircularProgress } from '@mui/material';
import { AddOutlined as AddIcon, SearchOutlined as SearchIcon, CancelOutlined as CancelIcon } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

import InvoiceCard from './InvoiceCard';

import { limitDecimal, parseJSON } from '@utils';


const useStyles = makeStyles(theme => ({
	root: {
		width: '80vw',
		padding: '2rem',
		'& > *:not(:first-child)': {
			marginTop: '2rem',
		},
	},

	infoSection: {
		display: 'flex',
		'& > *:not(:first-child)': {
			marginLeft: '3rem',
		},
	},

	searchBar: {
		display: 'flex',
		padding: '1rem 1.5rem',
		color: theme.palette.neutral[400],
		border: `1px solid ${theme.palette.divider}`,
		borderRadius: '0.5rem',
		'& input': {
			flexGrow: 1,
			color: theme.palette.common.black,
		},
		'& > *:not(:first-child)': {
			marginLeft: '1rem',
		},
	},

	dataList: {
		display: ' flex',
		padding: '0 !important',
		flexWrap: 'wrap',
		// border: `1px solid ${theme.palette.divider}`,
		// borderRadius: '0.25rem',
		color: theme.palette.primary.main,
	},
}));

export default function InvoicePage(props) {
	const classes = useStyles(props);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const all_invoices = useSelector(state => state.invoices);
	const all_jobs = useSelector(state => state.jobs);
	const all_customers = useSelector(state => state.customers);

	const [searchText, setSearchText] = useState('');
	const [showDraftList, setShowDraftList] = useState([]);
	const [showOverdueList, setShowOverdueList] = useState([]);



	const _getAllInvoices = () => {
		dispatch(LOADING(true));
		axios.get('/invoices').then(res => {
			if (!res.data.invoices) {
				alert('Getting INVOICE data Error!');
				return;
			}
			dispatch(SET_INVOICES(res.data.invoices));
			dispatch(LOADING(false));
		}).catch(err => console.log(err));
	};
	const _getAllJobs = () => {
		dispatch(LOADING(true));
		axios.get('/jobs').then(res => {
			if (!res.data.jobs) {
				alert('Getting JOB data Error!');
				return;
			}
			dispatch(SET_JOBS(res.data.jobs));
			dispatch(LOADING(false));
		}).catch(err => console.log(err));
	};
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
	};
	const _getCustomerByID = (id) => all_customers.filter(e => e.id === id)[0];
	const _getJobByID = (id) => all_jobs.filter(e => e.id === id)[0];


	useEffect(() => {
		if (all_invoices == null) _getAllInvoices();
		if (all_jobs == null) _getAllJobs();
		if (all_customers.length === 0) _getAllCustomers();
	}, []);
	useEffect(() => {
		// setShowList(invoices);
		handleSearch();
	}, [all_invoices]);


	const handleSearch = () => {
		let newShowDraftList = [];
		let newShowOverdueList = [];
		all_invoices?.map(each => {
			const dueDate = new Date(each.due_date);
			const timeFlow = dueDate - new Date();

			if (each.reference.includes(searchText) || each.notes.includes(searchText) || each.term.includes(searchText))
				timeFlow > 0 ? newShowDraftList.push(each) : newShowOverdueList.push(each);
		});
		setShowDraftList(newShowDraftList);
		setShowOverdueList(newShowOverdueList);
	};

	let draftPrice = 0;
	let overduePrice = 0;
	showDraftList.map(e => draftPrice += e.total_price);
	showOverdueList.map(e => overduePrice += e.total_price);
	draftPrice = limitDecimal(draftPrice);
	overduePrice = limitDecimal(overduePrice);

	return (
		<div className={classes.root}>
			<div className='flex justify-between'>
				<Typography variant='h4'>Invoices</Typography>
				<Button className='px-4 py-1 rounded' onClick={() => navigate('/invoice/new')} variant="contained">
					<AddIcon />
					<p className='ml-2'>New invoice</p>
				</Button>
			</div>

			<div className={classes.infoSection}>
				<div className='flex flex-col'>
					<Typography variant='h6' color="warning.main">£ {draftPrice}</Typography>
					<Typography variant='subtitle1' color="warning.main">{showDraftList.length} draft →</Typography>
				</div>
				<div className='flex flex-col'>
					<Typography variant='h6' color="error.main">£ {overduePrice}</Typography>
					<Typography variant='subtitle1' color="error.main">{showOverdueList.length} overdue →</Typography>
				</div>
				<div className='flex flex-col'>
					<Typography variant='h6' color="info.main">£ 0</Typography>
					<Typography variant='subtitle1' color="info.main">0 sent →</Typography>
				</div>
				<Divider orientation="vertical" flexItem />
				<div className='flex items-center justify-center'>
					<CircularProgress variant="determinate" color="success" thickness={7} value={65} />
					<div className='flex flex-col ml-2'>
						<Typography variant='h6' color="success.dark">No paid invoices</Typography>
						<Typography variant='subtitle1'>in last 30 days →</Typography>
					</div>
				</div>
			</div>

			<div className={classes.searchBar}>
				<SearchIcon onClick={() => handleSearch()} style={{ cursor: 'pointer' }} />
				<input placeholder='Search ...' type='text'
					value={searchText} onChange={e => setSearchText(e.target.value)}
					onKeyDown={e => e.key === "Enter" ? handleSearch() : null}
				/>
				<CancelIcon onClick={() => setSearchText('')} style={{ cursor: 'pointer' }} />
			</div>

			{showDraftList.length > 0 &&
				<div>
					<Typography variant='subtitle1'>{showDraftList.length} draft invoice worth £{0}</Typography>
					<div className={clsx(classes.dataList)}>
						{
							showDraftList.map((each, index) => {
								const eachCustomer = _getCustomerByID(each.customer_id);
								const eachJob = _getJobByID(each.job_id);
								return <InvoiceCard key={index} invoiceData={each} customerData={eachCustomer} jobData={eachJob} />;
							})
						}
					</div>
				</div>
			}
			{showOverdueList.length > 0 &&
				<div>
					<Typography variant='subtitle1'>{showOverdueList.length} draft invoice worth £{0}</Typography>
					<div className={clsx(classes.dataList)}>
						{
							showOverdueList.map((each, index) => {
								const eachCustomer = _getCustomerByID(each.customer_id);
								const eachJob = _getJobByID(each.job_id);
								return <InvoiceCard key={index} invoiceData={each} customerData={eachCustomer} jobData={eachJob} />;
							})
						}
					</div>
				</div>
			}

			{showDraftList.length === 0 && showOverdueList.length === 0 && <Typography variant='overline'>No data</Typography>}
		</div>
	)
}
