import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RESET_USER_INFO, RESET_USER_REMINDERS } from '@store/actions';

import { Button, Typography, Divider, Avatar, Popover, List, ListItemButton, ListItemIcon, ListItemText, Collapse } from '@mui/material';
// import { createTheme } from '@mui/material';
import { makeStyles, styled, useTheme, ThemeProvider } from '@mui/styles';
import {
	HomeOutlined, WcOutlined, DraftsOutlined, WorkOutline,
	DescriptionOutlined, CalendarMonthOutlined, FormatListBulletedOutlined,
	LogoutOutlined, AccountCircleOutlined, SettingsOutlined, GroupOutlined,
	DeleteOutlined, AddOutlined,
} from '@mui/icons-material';
import clsx from 'clsx';

import ItemComponent from '@components/price_list/ItemComponent';




const useStyles = makeStyles(theme => ({
	root: {
		'& > *:not(:first-child)': {
			marginTop: '2.5rem',
		},
		'& > div': {
			display: 'flex',
			flexDirection: 'column',
		},

		'& .input-control:not(:last-child)': {
			marginBottom: '0.5rem',
		},
	},
}));

export default function CompanyTax(props) {
	const classes = useStyles(props);
	const dispatch = useDispatch();
	const userData = useSelector(state => state.user);


	const isInfoChanged = () => {
		// console.log('====   ===', profileData, userData)
		// if (_.isEqual(userData, profileData))
		// 	return false;
		// else
		return true;
	};
	const handleSave = () => { }

	return (
		<div className={classes.root}>
			<div>
				<div className='relative'>
					<Typography variant='h5'>Company name</Typography>
					{isInfoChanged() ?
						<Button className='mx-2 rounded absolute right-0 top-0 h-full' color="success" variant="contained" onClick={handleSave}>Save</Button>
						: ''
					}
				</div>
				<Typography variant='subtitle2'>Company name</Typography>
				<ItemComponent>
					<input
					// value={oldPwd} onChange={e => setOldPwd(e.target.value)} 
					/>
				</ItemComponent>
			</div>
			<div>
				<Typography variant='h5'>Tax settings</Typography>
				<div className='input-control'>
					<Typography variant='subtitle2'>Tax label</Typography>
					<ItemComponent>
						<input defaultValue='VAT'
						/>
					</ItemComponent>
				</div>
				<div className='input-control'>
					<Typography variant='subtitle2'>Tax rates</Typography>
					<div className='flex flex-col w-fit'>
						<div className='input-control flex'>
							<ItemComponent className='w-fit'>
								<input
								/>%
							</ItemComponent>
							<Button variant='outlined' color='error' sx={{ width: 'fit-content' }}><DeleteOutlined /></Button>
						</div>
						<div className='input-control flex'>
							<ItemComponent className='w-fit'>
								<input
								/>%
							</ItemComponent>
							<Button variant='outlined' color='error' sx={{ width: 'fit-content' }}><DeleteOutlined /></Button>
						</div>

						<Button variant='outlined'
							sx={{ width: '100%', color: 'success.dark', px: 1.5, py: 0.5, borderColor: 'success.dark', borderRadius: 0.5 }}
						>
							<AddOutlined />Add another tax rate
						</Button>
					</div>
				</div>
			</div>

			<div >
				<Typography variant='h5'>Currency</Typography>
				<Typography variant='subtitle2'>Currency</Typography>
				<ItemComponent>
					<select
					/>
				</ItemComponent>
			</div>
			<div>
				<Typography variant='h5'>Business address</Typography>
				<div className='input-control'>
					<Typography variant='subtitle2'>Address</Typography>
					<ItemComponent>
						<input
						/>
					</ItemComponent>
				</div>
				<div className='input-control'>
					<Typography variant='subtitle2'>Postcode</Typography>
					<ItemComponent>
						<input
						/>
					</ItemComponent>
				</div>
				<div className='input-control'>
					<Typography variant='subtitle2'>Country</Typography>
					<ItemComponent>
						<select
						/>
					</ItemComponent>
				</div>
			</div>

			<div>
				<Typography variant='h5'>Business contact details</Typography>
				<div className='input-control'>
					<Typography variant='subtitle2'>Telephone no.</Typography>
					<ItemComponent>
						<input
						/>
					</ItemComponent>
				</div>
				<div className='input-control'>
					<Typography variant='subtitle2'>Mobile no.</Typography>
					<ItemComponent>
						<input
						/>
					</ItemComponent>
				</div>
				<div className='input-control'>
					<Typography variant='subtitle2'>Contact fax</Typography>
					<ItemComponent>
						<input
						/>
					</ItemComponent>
				</div>
				<div className='input-control'>
					<Typography variant='subtitle2'>Contact email</Typography>
					<ItemComponent>
						<input
						/>
					</ItemComponent>
				</div>
				<div className='input-control'>
					<Typography variant='subtitle2'>Website</Typography>
					<ItemComponent>
						<input
						/>
					</ItemComponent>
				</div>
			</div>

			<div>
				<Typography variant='h5'>Company numbers</Typography>
				<div className='input-control'>
					<Typography variant='subtitle2'>Company Registration Number</Typography>
					<ItemComponent>
						<input placeholder='e.g. 12345678'
						/>
					</ItemComponent>
				</div>
				<div className='input-control'>
					<Typography variant='subtitle2'>Vat number</Typography>
					<ItemComponent>
						<input placeholder='e.g. GB 12 345 678'
						/>
					</ItemComponent>
				</div>
			</div>
		</div>
	)
}
