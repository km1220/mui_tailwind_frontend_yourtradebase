import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
	SET_JOBS, SET_CUSTOMERS, REMOVE_ITEM_IN_JOBS,
	LOADING
} from '@store/actions';

import { Button, List, ListItem, Typography } from '@mui/material';
import { AddOutlined as AddIcon, SearchOutlined as SearchIcon, CancelOutlined as CancelIcon } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

import { parseJSON } from '@utils';


const useStyles = makeStyles(theme => ({
	root: {
		minWidth: '65vw',
		padding: '2rem',
		'& > *:not(:first-child)': {
			marginTop: '2rem',
		},
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
	jobItem: {
		padding: '1rem 2rem !important',
		'&:not(:first-child)': {
			borderTop: `1px solid ${theme.palette.divider}`,
		},
		'& > *:not(:first-child)': {
			marginLeft: '2rem',
		},
	},
	// actionBar: {
	// 	display: 'flex',
	// 	[theme.breakpoints.down('md')]: {
	// 		flexDirection: 'column'
	// 	},
	// 	'& .MuiButton-root': {
	// 		margin: '0 0.5rem',
	// 		padding: '0.25rem 0.5rem',
	// 		[theme.breakpoints.down('md')]: {
	// 			margin: '0.25rem 0',
	// 			padding: '0.25rem 0.5rem',
	// 		},
	// 	},
	// }
}));

export default function JobPage(props) {
	const classes = useStyles(props);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const all_jobs = useSelector(state => state.jobs);
	const all_customers = useSelector(state => state.customers);

	const [searchText, setSearchText] = useState('');
	const [showList, setShowList] = useState([]);


	const possibleJobs = [];
	const wonJobs = [];
	showList.map(each => {
		if (each.status === "possible") possibleJobs.push(each);
		else if (each.status === "won") wonJobs.push(each);
	});


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
	}
	const _getCustomerByID = (id) => all_customers.filter(e => e.id === id)[0];

	useEffect(() => {
		if (all_jobs == null) _getAllJobs();
		if (all_customers.length === 0) _getAllCustomers();
	}, []);
	useEffect(() => {
		// setShowList(jobs);
		handleSearch();
	}, [all_jobs]);



	const handleSearch = () => {
		let newShowList = [];
		all_jobs?.map(each => {
			if (each.title.includes(searchText) || each.status.includes(searchText) || each.site_address.includes(searchText))
				newShowList.push(each);
		});
		setShowList(newShowList);
	};
	return (
		<div className={classes.root}>
			<div className='flex justify-between'>
				<Typography variant='h4'>Jobs</Typography>
				<Button className='px-4 py-1 rounded' onClick={() => navigate('/job/new')} variant="contained">
					<AddIcon />
					<p className='ml-2'>New job</p>
				</Button>
			</div>
			<div className='flex'>
				<Typography className='mr-8' variant='h6' color='warning.main'>{possibleJobs.length} possible →</Typography>
				<Typography className='mr-8' variant='h6' color='success.main'>{wonJobs.length} won →</Typography>
				<Typography variant='h6' color='tertiary.main'>{wonJobs.length} unscheduled →</Typography>
			</div>

			{showList.length > 0 &&
				<List className={clsx(classes.dataList, 'mb-4')}>
					<>
						<ListItem className={classes.searchBar}>
							<SearchIcon onClick={() => handleSearch()} style={{ cursor: 'pointer' }} />
							<input placeholder='Search ...' type='text'
								value={searchText} onChange={e => setSearchText(e.target.value)}
								onKeyDown={e => e.key === "Enter" ? handleSearch() : null}
							/>
							<CancelIcon onClick={() => setSearchText('')} style={{ cursor: 'pointer' }} />
						</ListItem>
					</>
					{
						showList.map(each => {
							const eachCustomer = _getCustomerByID(each.customer_id);
							console.log('eachCustomer', eachCustomer)
							return (
								<ListItem className={classes.jobItem} key={each.id}>
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
									{/* <div className={classes.actionBar}>
									<Button className='rounded' variant="outlined" onClick={() => navigate(`/job/${each.id}`)}>
										Edit
									</Button>
									<Button className='rounded' variant="outlined" color='error' onClick={() => handleDelete(each.id)}>
										Delete
									</Button>
								</div> */}
									<div className='flex flex-col self-start justify-start text-right'>
										<Typography variant="subtitle1" color='tertiary.dark'>£927.65</Typography>
										<Typography variant="body1">Balance</Typography>
										<Typography className='absolute bottom-4 right-8 whitespace-nowrap' variant="caption" color='error.main'>1 invoice overdue</Typography>
									</div>
								</ListItem>
							)
						})}
				</List>
			}

			{showList.length === 0 && <Typography variant='overline'>No data</Typography>}
		</div>
	)
}
