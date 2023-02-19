import axios from 'axios';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ADD_ITEM_IN_CUSTOMERS } from '@store/actions';

import { AddCircleOutlined as AddIcon, AddOutlined, SearchOutlined as SearchIcon, CancelOutlined as CancelIcon, DeleteOutlined as DeleteIcon } from '@mui/icons-material';
import { Box, Paper, Divider, Typography, Button, IconButton, Dialog, Select, MenuItem } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

import * as EmailValidator from 'email-validator';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import ItemComponent from '@components/price_list/ItemComponent';

import MUIRichTextEditor from "mui-rte";
import spacetime from "spacetime";
import TimezoneSelect, { allTimezones } from "react-timezone-select";

import { _generateNewID } from '@utils';




const formatDate = (date_str = '') => {
	let date = new Date(date_str);
	if (date == 'Invalid Date')
		date = new Date();

	return date.toISOString().split("T")[0];
}



const useStyles = makeStyles(theme => ({
	root: {
		'& > *:not(:first-child)': {
			marginTop: '3rem',
		},
		'& > div:not(:first-child)': {
			display: 'flex',
			flexDirection: 'column'
		},
	},

	addBtn: {
		padding: '0.25rem 0.5rem !important',
		borderRadius: '0.25rem !important',
		marginTop: '0.5rem !important',
	},

}));

const initialData = {
	id: 1,
	name: 'vladmir rudic',
	email: 'vlad******@gmail.com',
	password: '123',

	from_name: 'VR',
	reply_to_email: '2@2.com',
	signature: '<h1>vald rudic, signature !!!</h1>',
	timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
	last_login_at: spacetime.now(),
}
export default function ProfilePage(props) {
	const classes = useStyles(props);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [profileData, setNewData] = useState(initialData);

	const isProfileInfoChanged = () => {
		return true;
	}

	useEffect(() => {
		return () => {
			setNewData(initialData);
		}
	}, []);

	useMemo(() => {
		const tzValue = profileData.timezone.value ?? profileData.timezone;
		setNewData({ ...profileData, last_login_at: profileData.last_login_at.goto(tzValue) });
	}, [profileData.timezone]);
	console.log(profileData)

	const handleSave = () => { };

	return (
		<div className={classes.root}>
			<div>
				<div className='flex justify-between'>
					<Typography variant='h5'>Your details</Typography>
					<div className='flex justify-center'>
						{isProfileInfoChanged() ?
							<Button className='mx-2 px-6 py-0 rounded' color="success" variant="contained" onClick={handleSave}>Save</Button>
							: ''
						}
					</div>
				</div>
				<Divider />
			</div>
			<div>
				<div>
					<Typography variant='subtitle1'>Your name</Typography>
					<ItemComponent>
						<input value={profileData.name} onChange={e => setNewData({ ...profileData, name: e.target.value })} />
					</ItemComponent>
				</div>
				<br />
				<div>
					<Typography variant='subtitle1'>Email address</Typography>
					<ItemComponent>
						<input value={profileData.email} onChange={e => setNewData({ ...profileData, email: e.target.value })} />
					</ItemComponent>
					<Typography variant="caption">Use this email address to log in.</Typography>
				</div>
			</div>
			<div>
				<div>
					<Typography variant='h5'>Sending emails</Typography>
					<Typography variant="caption">Use these settings when sending emails from Individual:</Typography>
				</div>
				<br />
				<div>
					<Typography variant='subtitle1'>'From' name</Typography>
					<ItemComponent>
						<input value={profileData.from_name} onChange={e => setNewData({ ...profileData, from_name: e.target.value })} />
					</ItemComponent>
					<Typography variant="caption">The name your customer sees when you send them emails.</Typography>
				</div>
				<br />
				<div>
					<Typography variant='subtitle1'>Send email replies (and bcc) to</Typography>
					<ItemComponent>
						<input value={profileData.reply_to_email} onChange={e => setNewData({ ...profileData, reply_to_email: e.target.value })} />
					</ItemComponent>
					<Typography variant="caption">Where should we send customer replies and bcc?</Typography>
				</div>
				<br />
				<div>
					<Typography variant='subtitle1'>Your email signature</Typography>
					<MUIRichTextEditor label="Type something here..."
						onSave={val => setNewData({ ...profileData, signature: val })}
					/>
				</div>
			</div>
			<div>
				<Typography variant='h5'>Your timezone</Typography>
				<Typography variant='subtitle1'>Timezone</Typography>

				<TimezoneSelect
					value={profileData.timezone} onChange={tzVal => setNewData({ ...profileData, timezone: tzVal })}
					timezones={{
						...allTimezones,
						"America/Lima": "Pittsburgh",
						"Europe/Berlin": "Frankfurt"
					}}
					styles={{
						control: (baseStyles, state) => ({
							...baseStyles,
							backgroundColor: 'transparent'
						}),
					}}
				/>
			</div>
		</div>
	)
}