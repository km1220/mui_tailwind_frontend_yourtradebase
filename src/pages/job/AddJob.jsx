import axios from 'axios';
import React, { useState, useEffect } from 'react';
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
import { AddCircleOutlined as AddIcon, SearchOutlined as SearchIcon, CancelOutlined as CancelIcon, PersonOutlined } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

import ItemComponent from '@components/price_list/ItemComponent';

import { parseJSON } from '@utils';



const useStyles = makeStyles(theme => ({
	root: {
		width: '55vw',
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
	customerItem: {
		padding: '0.75rem 1.5rem !important',
		'&:not(:first-child)': {
			borderTop: `1px solid ${theme.palette.divider}`,
		},
		'& > *:not(:first-child)': {
			marginLeft: '1rem',
		},
	},


	addNewJobSection: {
		'& > *:not(:first-child)': {
			marginTop: '1.5rem',
		},
	},
	infoBox: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'baseline',
		padding: '0.5rem 1.5rem',
		borderRadius: '0.25rem',
		background: alpha(theme.palette.success.light, 0.1),

		'& .permission-text': {
			color: theme.palette.common.black,
			marginLeft: '0.5rem',
		},
	},
	statusSection: {
		'& > div.status-wrapper': {
			display: 'flex',
			justifyContent: 'space-between',
			[theme.breakpoints.down('md')]: {
				flexDirection: 'column',
			},

			'& > div.radio-item-box': {
				flexGrow: 1,
				display: 'flex',
				border: `1px solid ${theme.palette.divider}`,
				borderRadius: '0.5rem',
				padding: '0.75rem',
				margin: '0.5rem',
				cursor: 'pointer',
				'& > div.radio-content': {},

				'&.selected': {
					backgroundColor: alpha(theme.palette.secondary.light, 0.1),
					border: `1px solid ${theme.palette.secondary.dark}`,
					color: theme.palette.secondary.dark,
				},
			},
		},
	},
}));

const initialData = {
	job_id: 0,
	title: '',
	status: 'possible',
	site_address: '',
	site_postcode: '',
	customer_id: 0
};
export default function CustomerPage(props) {
	const classes = useStyles(props);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const all_jobs = useSelector(state => state.jobs);
	const all_customers = useSelector(state => state.customers);
	const [selectedCustomer, setSelectedCustomer] = useState();

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


	const onJobStatusChange = val => setNewJobData({ ...newJobData, status: val });
	const onSelectCustomer = (id) => {
		setNewJobData({ ...newJobData, customer_id: id });
		setSelectedCustomer(_getCustomerByID(id))
	}

	const handleAdd = () => {
		dispatch(LOADING(true));
		axios.post('/jobs', newJobData).then(res => {
			if (res.data.affectedRows) {
				dispatch(ADD_ITEM_IN_JOBS({ ...newJobData, id: newJobData.job_id }));
				navigate('/job');
				dispatch(LOADING(false));
				dispatch(SET_ALERT({ type: 'success', message: 'Add successfully!' }));
			}
		}).catch(err => {
			// if (err.response.status === 400) alert(err.response.data);
			// else if (err.response.status === 403) alert(err.response.data);
			dispatch(LOADING(false));
			console.log(err)
			dispatch(SET_ALERT({ type: 'error', message: err.response.data }));
		});
	};


	return (
		<div className={classes.root}>
			{!selectedCustomer ?
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
						<List className={clsx(classes.dataList, 'mb-4')}>
							{
								all_customers.map(each => (
									<ListItem className={classes.customerItem} key={each.id}>
										<div className='flex flex-col cursor-pointer' onClick={() => onSelectCustomer(each.id)}>
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
				:
				<div className={classes.addNewJobSection}>
					<div>
						<Typography variant='subtitle2'>
							<PersonOutlined />
							Mr {selectedCustomer.full_name}
						</Typography>
						<Typography variant='h5'>Add new job details</Typography>

					</div>
					<div className={classes.infoBox}>
						<Typography className='' variant='subtitle1'>
							Every quote, invoice, and event is linked to a job.
						</Typography>
						<Typography className='' variant='body1' color="text.secondary">
							You can track the status of all your jobs, add notes, view related paperwork and send messages via the 'Jobs' section.
						</Typography>
					</div>

					<div>
						<Typography variant='subtitle1'>Job number</Typography>
						<ItemComponent className='w-1/5'>
							#
							<input className='ml-1' type='number'
								value={newJobData.job_id} onChange={e => setNewJobData({ ...newJobData, job_id: Number(e.target.value) })}
							/>
						</ItemComponent>
					</div>
					<div>
						<Typography variant='subtitle2'>Job title <Typography variant="caption">(optional)</Typography></Typography>
						<Typography variant="caption">To easily identify what this job is for…</Typography>
						<ItemComponent>
							<input
								placeholder='e.g. Boiler install'
								value={newJobData.title} onChange={e => setNewJobData({ ...newJobData, title: e.target.value })}
							/>
						</ItemComponent>
					</div>
					<div className={classes.statusSection}>
						<Typography variant='h6'>What's the status of the job?</Typography>

						<div className='status-wrapper'>
							<div className={clsx("radio-item-box", newJobData.status === "possible" ? 'selected' : '')}
								onClick={() => onJobStatusChange("possible")}
							>
								<Radio id='readio-input-possible' checked={newJobData.status === "possible"} color="secondary" />
								<div className="radio-content">
									<Typography className='' variant='subtitle2'>Possible job</Typography>
									<Typography className='' variant='body1'>We’d like to win the work.</Typography>
								</div>
							</div>

							<div className={clsx("radio-item-box", newJobData.status === "won" ? 'selected' : '')}
								onClick={() => onJobStatusChange("won")}
							>
								<Radio id='readio-input-field-team' checked={newJobData.status === "won"} color="secondary" />
								<div className="radio-content">
									<Typography className='' variant='subtitle2'>Won job</Typography>
									<Typography className='' variant='body1'>We’ve already won the work.</Typography>
								</div>
							</div>
						</div>
					</div>

					<Typography variant='h6'>What's the site address?</Typography>
					<div className='px-8'>
						<div>
							<Typography variant='subtitle1'>Site address</Typography>
							<ItemComponent className="w-3/5">
								<textarea value={newJobData.site_address} onChange={e => setNewJobData({ ...newJobData, site_address: e.target.value })} />
							</ItemComponent>
						</div>
						<div>
							<Typography variant='subtitle1'>Site postcode</Typography>
							<ItemComponent className="w-1/5">
								<input value={newJobData.site_postcode} onChange={e => setNewJobData({ ...newJobData, site_postcode: e.target.value })} />
							</ItemComponent>
						</div>
					</div>


					<div className='flex justify-center mt-6'>
						<Button className='mx-4 rounded' color="secondary" variant="contained" onClick={handleAdd}>Save job</Button>
						<Button className='mx-4 rounded' color="disabled" variant="outlined" onClick={() => navigate('/job')}>Cancel</Button>
					</div>
				</div>
			}
		</div>
	)
}
