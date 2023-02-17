import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SET_CUSTOMERS, UPDATE_ITEM_IN_CUSTOMERS } from '@store/actions';

import { AddCircleOutlined as AddIcon, AddOutlined, SearchOutlined as SearchIcon, CancelOutlined as CancelIcon, DeleteOutlined as DeleteIcon } from '@mui/icons-material';
import { Box, Paper, Divider, Typography, Button, IconButton, Dialog, Select, MenuItem } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

import * as EmailValidator from 'email-validator';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

import ItemComponent from '@components/price_list/ItemComponent';
import DraggablePaper from '../setting/DraggablePaper';

import { _generateNewID, limitDecimal, parseJSON } from '@utils/price';




const formatDate = (date_str = '') => {
	let date = new Date(date_str);
	if (date == 'Invalid Date')
		date = new Date();

	return date.toISOString().split("T")[0];
}




const useStyles = makeStyles(theme => ({
	root: {
		width: '45%',
		margin: '2rem',
		padding: '3rem',
		[theme.breakpoints.down('lg')]: {
			width: '60%',
			padding: '1rem 2rem',
		},
		[theme.breakpoints.down('md')]: {
			width: '70%',
			padding: '1rem 2rem',
		},
		[theme.breakpoints.down('sm')]: {
			width: '80%',
			padding: '1rem 2rem',
		},
		'& textarea': {
			resize: 'none',
		}
	},

	addBtn: {
		padding: '0.25rem 0.5rem !important',
		borderRadius: '0.25rem !important',
		marginTop: '0.5rem !important',
	},


	inputsWrapper: {
		display: 'flex',
		flexDirection: 'column',
		'& > *:not(:first-child)': {
			marginTop: '1rem',
		},

		'&.main-info-section': {},
		'&.contact-info-section, &.extra-info-section': {
			'& .input-container': {
				display: 'flex',
				alignItems: 'center',
				[theme.breakpoints.down('sm')]: {
					flexDirection: 'column',
					alignItems: 'start',
				},

				'& .input-label': {
					width: '20%',
					marginRight: '1rem',
					flexShrink: 0,
					// whiteSpace: 'nowrap',
					[theme.breakpoints.down('sm')]: {
						width: 'auto',
						marginRight: 0,
						marginBottom: '0.25rem',
						whiteSpace: 'normal',
					},

					// '& > .MuiSelect-select': {
					// 	paddingTop: 0,
					// 	paddingBottom: 0,
					// 	outline: `none`,
					// 	// outline: `1px solid ${theme.palette.primary.main}`,
					// },
				},
				'& .input-control': {
					display: 'flex',
					flexGrow: 1,
					[theme.breakpoints.down('sm')]: {
						width: '100%',
					},
				},
			},
		},
	},
}));
const initialData = {
	// id: _generateNewID(),
	full_name: '',
	friendly_name: '',
	company_name: '',
	address: '',
	post_code: '',
	contact_info_list: [
		{ type: 'email', data: '' }
	],
	extra_info_list: [
		// { type: 'home', data: 'home address 11' }
	],
	invoice_due_in: formatDate()
}
export default function EditCustomerPage(props) {
	const { id: paramID } = useParams();
	const classes = useStyles(props);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const all_customers = useSelector(state => state.customers);

	const [editData, setEditData] = useState(initialData);
	const [extraInfoTypeModal, setExtraInfoTypeModal] = useState(false);
	const [newExtraInfoType, setNewExtraInfoType] = useState('');



	const _getAllCustomers = async () => {
		const res = await axios.get('/customers');
		if (!res.data.customers) {
			alert('Getting Price list data Error!');
			return;
		}
		let all_list = res.data.customers.map(each => ({
			...each,
			contact_info_list: parseJSON(each.contact_info_list),
			extra_info_list: parseJSON(each.extra_info_list),
			invoice_due_in: formatDate(each.invoice_due_in)
		}));
		dispatch(SET_CUSTOMERS(all_list));
	}
	useEffect(() => {
		if (all_customers.length === 0) _getAllCustomers();
		return () => {
			setEditData(initialData);
		}
	}, []);
	useEffect(() => {
		if (all_customers.length === 0) return;
		const targetData = all_customers.filter(e => e.id === Number(paramID))[0];
		if (!targetData)
			navigate('/customer');
		else
			setEditData(targetData);
	}, [all_customers]);
	console.log(all_customers)

	const onAddContactInfo = () => {
		let newList = editData.contact_info_list;
		newList.push({ type: 'email', data: '' });
		setEditData({ ...editData, contact_info_list: newList });
	};
	const onAddExtraInfo = () => {
		if (!newExtraInfoType) return;
		let newList = editData.extra_info_list;
		newList.push({ type: newExtraInfoType, data: '' });
		setEditData({ ...editData, extra_info_list: newList });
	};
	const onChangeContactInfoType = (index, type_val) => {
		let newList = editData.contact_info_list;
		newList[index] = { ...newList[index], type: type_val };
		setEditData({ ...editData, contact_info_list: newList });
	};
	const onChangeContactInfoData = (index, data_val) => {
		let newList = editData.contact_info_list;
		newList[index] = { ...newList[index], data: data_val };
		setEditData({ ...editData, contact_info_list: newList });
	};
	const onAddExtraInfoType = () => {
		onAddExtraInfo();
		setNewExtraInfoType('');
		setExtraInfoTypeModal(false);
	};
	const onChangeExtraInfo = (index, data_val) => {
		let newList = editData.extra_info_list;
		newList[index] = { ...newList[index], data: data_val };
		setEditData({ ...editData, extra_info_list: newList });
	};
	const onDeleteContactInfo = (index) => {
		let newList = editData.contact_info_list;
		newList.splice(index, 1);
		setEditData({ ...editData, contact_info_list: newList });
	};
	const onDeleteExtraInfo = (index) => {
		let newList = editData.extra_info_list;
		newList.splice(index, 1);
		setEditData({ ...editData, extra_info_list: newList });
	};
	const handleUpdateCustomer = () => {
		const newCustomer = {
			...editData,
			contact_info_list: JSON.stringify(editData.contact_info_list),
			extra_info_list: JSON.stringify(editData.extra_info_list),
		}
		axios.put(`/customers/${editData.id}`, newCustomer).then(res => {
			if (res.data.affectedRows) {
				console.log(newCustomer, editData)
				dispatch(UPDATE_ITEM_IN_CUSTOMERS({ ...editData, id: editData.id }));
				navigate('/customer');
			}
		}).catch(err => {
			if (err.response.status === 400) alert(err.response.data);
			else if (err.response.status === 403) alert(err.response.data);
		});
	};



	const ContactInfoInput = (data, index) => {
		switch (data.type) {
			case 'email':
				return <input value={data.data} onChange={e => onChangeContactInfoData(index, e.target.value)} />;
			case 'home':
			case 'mobile':
			case 'office':
			case 'work':
				return <PhoneInput value={data.data} onChange={val => onChangeContactInfoData(index, val)} />;

			default:
				return <input value={data.data} onChange={e => onChangeContactInfoData(index, e.target.value)} />;
		}
	}
	console.log(editData)

	return (
		<>
			<Paper className={clsx(classes.root, 'min-h-screen')} elevation={4}>
				<Typography variant='h5'>Update a customer</Typography>
				<Divider /> <br />

				<div className={clsx(classes.inputsWrapper, 'main-info-section')}>
					<div>
						<Typography variant='subtitle2'>Full name</Typography>
						<ItemComponent>
							<input placeholder='e.g. Mr & Mrs Smith'
								value={editData.full_name} onChange={e => setEditData({ ...editData, full_name: e.target.value })}
							/>
						</ItemComponent>
					</div>
					<div className='w-3/5'>
						<Typography variant='subtitle2'>Friendly name <Typography variant="caption">(optional)</Typography></Typography>
						<Typography variant="caption">For down-to-earth, day-to-day message</Typography>
						<ItemComponent>
							<input placeholder='e.g. John & Jenny'
								value={editData.friendly_name} onChange={e => setEditData({ ...editData, friendly_name: e.target.value })}
							/>
						</ItemComponent>
					</div>
					<div>
						<Typography variant='subtitle2'>Company name <Typography variant="caption">(optional)</Typography></Typography>
						<ItemComponent>
							<input placeholder="e.g. Smith\'s The Bakers Ltd."
								value={editData.company_name} onChange={e => setEditData({ ...editData, company_name: e.target.value })}
							/>
						</ItemComponent>
					</div>
					<div>
						<Typography variant='subtitle2'>Address</Typography>
						<ItemComponent>
							<textarea placeholder="" rows={2}
								value={editData.address} onChange={e => setEditData({ ...editData, address: e.target.value })}
							/>
						</ItemComponent>
					</div>
					<div className='w-1/3'>
						<Typography variant='subtitle2'>Postcode</Typography>
						<ItemComponent>
							<input placeholder=""
								value={editData.post_code} onChange={e => setEditData({ ...editData, post_code: e.target.value })}
							/>
						</ItemComponent>
					</div>
				</div>


				<div className='mb-8'>
					<Typography variant='h5'>Contact info</Typography>
					<Typography variant="caption">Add as many options as you can - it'll make life easier.</Typography>
					<Divider /> <br />

					<div className={clsx(classes.inputsWrapper, 'contact-info-section')}>
						{
							editData.contact_info_list.map((each, index) => (
								<div key={index}>
									<div className='input-container'>
										<Select
											className='w-auto input-label'
											sx={{ borderRadius: '0.25rem' }} size='small'
											defaultValue='email' value={each.type} onChange={e => onChangeContactInfoType(index, formatDate(e.target.value))}
										>
											<MenuItem value='email'>Email</MenuItem>
											<MenuItem value='home'>Home</MenuItem>
											<MenuItem value='mobile'>Mobile</MenuItem>
											<MenuItem value='office'>Office</MenuItem>
											<MenuItem value='work'>Work</MenuItem>
											<MenuItem value='others'>Others...</MenuItem>
										</Select>
										<div className='input-control'>
											<ItemComponent>
												{ContactInfoInput(each, index)}
											</ItemComponent>
											<IconButton onClick={() => onDeleteContactInfo(index)}>
												<DeleteIcon />
											</IconButton>
										</div>
									</div>
									{each.type === 'email' && each.data !== '' && !EmailValidator.validate(each.data) &&
										<Typography color='error' align='center'>Email is not valid</Typography>
									}
								</div>
							))
						}
					</div>
					<Button className={classes.addBtn} onClick={() => onAddContactInfo()} color="secondary" variant='outlined'>
						<AddIcon />
						<p className='ml-2'>Add more</p>
					</Button>
				</div>

				<div>
					<Typography variant='h5'>Extra info</Typography>
					<Typography variant="caption">What else would you like to keeep track of?</Typography>
					<Divider /> <br />

					<div className={clsx(classes.inputsWrapper, 'extra-info-section')}>
						<div className='input-container'>
							<Typography className='w-auto input-label' variant='subtitle1'>Invoices due in: </Typography>
							<ItemComponent className='w-auto'>
								<input type='date' value={editData.invoice_due_in} onChange={e => setEditData({ ...editData, invoice_due_in: e.target.value })} />
							</ItemComponent>
						</div>
						{
							editData.extra_info_list.map((each, index) => (
								<div key={index} className='input-container'>
									<Typography className='input-label' variant='subtitle1'>
										{each.type}:
									</Typography>
									<div className='input-control'>
										<ItemComponent className=''>
											<input value={each.data} onChange={e => onChangeExtraInfo(index, e.target.value)} />
										</ItemComponent>
										<IconButton onClick={() => onDeleteExtraInfo(index)}>
											<DeleteIcon />
										</IconButton>
									</div>
								</div>
							))
						}
					</div>
					<Button className={classes.addBtn} onClick={e => {
						setExtraInfoTypeModal(true);
						e.target.blur();
					}} color="secondary" variant='outlined'>
						<AddIcon />
						<p className='ml-2'>Add more</p>
					</Button>
				</div>
				<Dialog open={extraInfoTypeModal} PaperComponent={DraggablePaper} onClose={() => setExtraInfoTypeModal(false)} PaperProps={{ style: { width: '60%' } }}>
					<div id="draggable-dialog-title" style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem', paddingBottom: '1rem', cursor: 'move' }}>
						<div>
							<Typography variant='h5'>Choose a name for this extra info</Typography>
							<Typography variant="caption">What extra info do you want to capture for your customers? For example: Referral source</Typography>
						</div>
						<IconButton onClick={() => setExtraInfoTypeModal(false)}
							variant="outlined"
							style={{ position: 'absolute', right: '0.5rem', top: '0.5rem' }}
						>
							<CancelIcon />
						</IconButton>
					</div>
					<Divider />
					<div id="dialog-content" style={{ padding: '1.5rem', paddingTop: '0.5rem' }}>
						<div >
							<ItemComponent>
								<input value={newExtraInfoType}
									onChange={e => setNewExtraInfoType(e.target.value)}
									onKeyDown={e => {
										if (e.key === "Enter") {
											onAddExtraInfoType();
										}
										else if (e.key === "Esc") {
											setExtraInfoTypeModal(false);
										}
										return;
									}}
								/>
							</ItemComponent>
							<Typography variant="caption">This extra info will be available for all of your customers.</Typography>
						</div>
						<Button className={classes.addBtn}
							color="secondary" variant='contained'
							sx={{ py: '0.25rem', borderRadius: '0.25rem' }}
							onClick={() => onAddExtraInfoType()}
						>
							<AddOutlined />
							<p className='ml-2'>Add this item</p>
						</Button>
					</div>
				</Dialog>


				<div className='flex justify-center mt-6'>
					<Button className='mx-4 rounded' color="secondary" variant="contained" onClick={handleUpdateCustomer}>Update this customer</Button>
					<Button className='mx-4 rounded' color="disabled" variant="outlined" onClick={() => navigate('/customer')}>Discard</Button>
				</div>
			</Paper>
		</>
	)
}
