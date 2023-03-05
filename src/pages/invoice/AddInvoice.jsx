import axios from 'axios';
import React, { lazy, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
	SET_JOBS, SET_CUSTOMERS, ADD_ITEM_IN_JOBS,
	LOADING, SET_ALERT
} from '@store/actions';

import {
	Box, Paper, Divider, Collapse, Button, IconButton, List, ListItem, Typography, Radio,
	alpha
} from '@mui/material';
import { AddCircleOutlined as AddIcon, SearchOutlined as SearchIcon, CancelOutlined as CancelIcon, PersonOutlined, WorkOutline } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

// import AddInvoiceSection from './AddInvoiceSection';
const AddInvoiceSection = lazy(() => import('./AddInvoiceSection'));

import { parseJSON } from '@utils';



const useStyles = makeStyles(theme => ({
	root: {
		minWidth: '55vw',
		padding: '2rem',
	},
	customerDataList: {
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
		cursor: 'pointer',
		padding: '0.75rem 1.5rem !important',
		'&:not(:first-child)': {
			borderTop: `1px solid ${theme.palette.divider}`,
		},
		'& > *:not(:first-child)': {
			marginLeft: '1rem',
		},
	},

	jobDataList: {
		padding: '0 !important',
		border: `1px solid ${theme.palette.divider}`,
		borderRadius: '0.25rem',
		color: theme.palette.primary.main,
	},
	jobItem: {
		cursor: 'pointer',
		padding: '1rem 2rem !important',
		'&:not(:first-child)': {
			borderTop: `1px solid ${theme.palette.divider}`,
		},
		'& > *:not(:first-child)': {
			marginLeft: '2rem',
		},
	},
}));

const initialData = {
	// invoice_id: 0,
	// type: 'invoice',
	// reference: '',
	// create_date: '',
	// due_date: '',
	// notes: '',
	// term: '',
	// price_list_data: '',
	customer_id: 0,
	job_id: 0
};
export default function AddInvoicePage(props) {
	const classes = useStyles(props);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const all_jobs = useSelector(state => state.jobs);
	const all_customers = useSelector(state => state.customers);
	const [selectedCustomer, setSelectedCustomer] = useState();
	const [selectedJob, setSelectedJob] = useState();

	const [newJobData, setNewJobData] = useState(initialData);

	const _getAllJobs = () => {
		dispatch(LOADING(true));
		axios.get('/jobs').then(res => {
			console.log(res)
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
	}
	const _getCustomerByID = (id) => all_customers.filter(e => e.id === id)[0];
	const _getJobByID = (id) => all_jobs.filter(e => e.id === id)[0];


	useEffect(() => {
		if (all_jobs == null) _getAllJobs();
		if (all_customers.length === 0) _getAllCustomers();
	}, []);
	useEffect(() => {
		setNewJobData({
			...newJobData,
			job_id: all_jobs ? all_jobs[all_jobs.length - 1].id + 1 : 1
		});
	}, [all_jobs]);


	const onSelectCustomer = (customer_id) => {
		setNewJobData({ ...newJobData, customer_id: customer_id });
		setSelectedCustomer(_getCustomerByID(customer_id))
	}
	const onSelectJob = (job_id) => {
		setNewJobData({ ...newJobData, job_id: job_id });
		setSelectedJob(_getJobByID(job_id))
	}

	return (
		<div className={classes.root}>
			{!selectedCustomer &&
				<>
					<div className='flex flex-col items-start justify-between'>
						<Typography variant='body1'>New job</Typography>
						<Typography variant='h5'>Who's your customer?</Typography>
						<Button className='px-2 py-1 my-6 rounded' onClick={() => navigate('/customer/new')} color="secondary">
							<AddIcon />
							<p className='ml-2'>Add a new customer</p>
						</Button>
					</div>

					{all_customers.length > 0 &&
						<List className={clsx(classes.customerDataList, 'mb-4')}>
							{all_customers.map(each => (
								<ListItem className={classes.customerItem} key={each.id} onClick={() => onSelectCustomer(each.id)}>
									<div className='flex flex-col'>
										<div className='flex items-baseline mb-2'>
											<Typography className='mr-8' variant='h6'>Friendly name: {each.friendly_name}</Typography>
											<Typography variant='caption'>Full name: {each.full_name}</Typography>
										</div>
										<Typography variant='body2' color="text.secondary">Company: {each.company_name}</Typography>
										<div className='flex items-baseline'>
											<Typography className='mr-8' variant='body2' color="text.secondary">Address: {each.address}</Typography>
											<Typography variant='caption'>Postcode: {each.post_code}</Typography>
										</div>
									</div>
								</ListItem>
							))}
						</List>
					}
					{all_customers.length === 0 && <Typography variant='overline'>No data</Typography>}
				</>
			}
			{
				selectedCustomer && !selectedJob &&
				<>
					<div className='flex flex-col items-start justify-between'>
						<div className='flex'>
							<Typography className='mr-8' variant='body1'>New invoice</Typography>
							<PersonOutlined />
							<Typography variant='body1'>{selectedCustomer.full_name}</Typography>
						</div>
						<Typography variant='h5'>Which job are you invoicing for?</Typography>
						<Button className='px-2 py-1 my-6 rounded' onClick={() => navigate('/customer/new')} color="secondary">
							<AddIcon />
							<p className='ml-2'>Add a new job</p>
						</Button>
					</div>
					<List className={clsx(classes.jobDataList, 'mb-4')}>
						{
							all_jobs.map(each => {
								const eachCustomer = _getCustomerByID(each.customer_id);
								return (
									<ListItem className={classes.jobItem} key={each.id} onClick={() => onSelectJob(each.id)}>
										<div className='flex flex-col'>
											<Typography variant="h6" color='tertiary.dark'>Job #{each.id} - {each.title}</Typography>
											<div className='flex items-baseline'>
												<Typography variant='subtitle2' color={each.status === 'possible' ? 'warning.main' : 'success.main'}>{each.status.toUpperCase()}</Typography>
												<b className='mx-4'> · </b>
												<Typography variant='body1'>Created on 4 February</Typography>
											</div>
											<Typography variant="body1">{eachCustomer?.full_name}</Typography>
											<div className="flex">
												<Typography className='mr-4' variant='body1'>{each.site_address}</Typography>
												<Typography variant='body1'>{each.site_postcode}</Typography>
											</div>
										</div>
										<div style={{ flexGrow: 1 }} />

										<div className='flex flex-col self-start justify-start text-right'>
											<Typography variant="subtitle1" color='tertiary.dark'>£927.65</Typography>
											<Typography variant="body1">Balance</Typography>
											<Typography className='absolute bottom-4 right-8 whitespace-nowrap' variant="caption" color='error.main'>1 invoice overdue</Typography>
										</div>
									</ListItem>
								)
							})}
					</List>
				</>
			}
			{
				selectedCustomer && selectedJob &&
				<div style={{ width: '80vw' }}>
					<div className='flex flex-col items-start justify-between'>
						<div className='flex'>
							<PersonOutlined />
							<Typography className='mr-8' variant='body1'>{selectedCustomer.full_name}</Typography>
							<WorkOutline />
							<Typography variant='body1'>Job #{selectedJob.id} - {selectedJob.title}</Typography>
						</div>
						<Typography variant='h5'>Create invoice</Typography>
					</div>


					<AddInvoiceSection selectedCustomer={selectedCustomer} selectedJob={selectedJob} />
				</div>
			}
		</div>
	)
}