import _ from 'lodash';
import axios from 'axios';
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SET_USER_INFO, LOADING, SET_ALERT } from '@store/actions';

import { AddCircleOutlined as AddIcon, AddOutlined, SearchOutlined as SearchIcon, CancelOutlined as CancelIcon, DeleteOutlined as DeleteIcon } from '@mui/icons-material';
import {
	Divider, Typography, Button, Checkbox,
	alpha
} from '@mui/material';
import { makeStyles } from '@mui/styles';
// import clsx from 'clsx';

// import * as EmailValidator from 'email-validator';
import ItemComponent from '@components/price_list/ItemComponent';

import MUIRichTextEditor from "mui-rte";
// import spacetime from "spacetime";
import TimezoneSelect, { allTimezones } from "react-timezone-select";

import { parseJSON } from '@utils';





const useStyles = makeStyles(theme => ({
	root: {
		'& > *:not(:first-child)': {
			marginTop: '3rem',
		},
		'& > div:not(:first-child)': {
			display: 'flex',
			flexDirection: 'column'
		},

		'& > div.upgrade-block': {
			background: alpha(theme.palette.secondary.dark, 0.1),
			padding: '1.5rem',
			borderRadius: '0.5rem',
		},
	},

	addBtn: {
		padding: '0.25rem 0.5rem !important',
		borderRadius: '0.25rem !important',
		marginTop: '0.5rem !important',
	},
}));

const initialData = {
	id: 0, name: '', email: '', // password: '',
	fromName: '', reply2email: '', sign: ``,
	TZ: Intl.DateTimeFormat().resolvedOptions().timeZone,
	// lastLoginAt: 'spacetime.now()',
}
export default function ProfilePage(props) {
	const classes = useStyles(props);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userData = useSelector(state => state.user);

	const [profileData, setProfileData] = useState(initialData);

	useEffect(() => {
		return () => {
			setProfileData(initialData);
		}
	}, []);
	useEffect(() => {
		setProfileData({ ...profileData, ...userData });
	}, [userData])


	// useMemo(() => {
	// 	const tzValue = profileData.TZ.value ?? profileData.TZ;
	// 	setNewData({ ...profileData, lastLoginAt: profileData.lastLoginAt.goto(tzValue) });
	// }, [profileData.TZ]);
	const isInfoChanged = () => {
		console.log('====   ===', profileData, userData)
		if (_.isEqual(userData, profileData))
			return false;
		else
			return true;
	};


	const handleSave = () => {
		const updateProfileData = {
			name: profileData.name, email: profileData.email,
			from_name: profileData.fromName, reply_to_email: profileData.reply2email,
			signature: profileData.sign, timezone: JSON.stringify(profileData.TZ)
		}

		dispatch(LOADING(true));
		axios.put(`/user_profiles/${userData.id}`, updateProfileData)
			.then(res => {
				console.log(res);
				if (res.data.affectedRows) {
					dispatch(SET_USER_INFO({ ...userData, ...profileData }));
					dispatch(LOADING(false));
					dispatch(SET_ALERT({ type: 'success', message: 'Update your personal information successfully!' }));
				}
			}).catch(err => {
				dispatch(LOADING(false));
				dispatch(SET_ALERT({ type: 'error', message: err.response.data }));
			});
	};

	return (
		<div className={classes.root}>
			<div>
				<div className='flex justify-between'>
					<Typography variant='h5'>Your details</Typography>
					<div className='flex justify-center'>
						{isInfoChanged() ?
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
						<input value={profileData.name} onChange={e => setProfileData({ ...profileData, name: e.target.value })} />
					</ItemComponent>
				</div>
				<br />
				<div>
					<Typography variant='subtitle1'>Email address</Typography>
					<ItemComponent>
						<input value={profileData.email} onChange={e => setProfileData({ ...profileData, email: e.target.value })} />
					</ItemComponent>
					<Typography variant="caption">Use this email address to log in.</Typography>
				</div>
			</div>
			<div>
				<div>
					<Typography variant='h5'>Sending emails</Typography>
					<Divider />
					<Typography variant="caption">Use these settings when sending emails from Individual:</Typography>
				</div>
				<br />
				<div>
					<Typography variant='subtitle1'>'From' name</Typography>
					<ItemComponent>
						<input value={profileData.fromName} onChange={e => setProfileData({ ...profileData, fromName: e.target.value })} />
					</ItemComponent>
					<Typography variant="caption">The name your customer sees when you send them emails.</Typography>
				</div>
				<br />
				<div>
					<Typography variant='subtitle1'>Send email replies (and bcc) to</Typography>
					<ItemComponent>
						<input type="email" value={profileData.reply2email} onChange={e => setProfileData({ ...profileData, reply2email: e.target.value })} />
					</ItemComponent>
					<Typography variant="caption">Where should we send customer replies and bcc?</Typography>
				</div>
				<br />
				<div>
					<Typography variant='subtitle1'>Your email signature</Typography>
					<MUIRichTextEditor label="Type your signature here..."
						value={profileData.sign}
						onSave={val => setProfileData({ ...profileData, sign: val })}
					/>
				</div>
			</div>
			<div className='upgrade-block'>
				<Typography variant="body1"><span style={{ color: '#0000ff' }}>Upgrade</span> to turn branding off.</Typography>
				<div className='flex items-center'>
					<Checkbox className='py-0' defaultChecked />
					<Typography variant='body1'>Display "Individual uses YourTradebase" when sending emails</Typography>
				</div>
			</div>
			<div>
				<Typography variant='h5'>Your timezone</Typography>
				<Divider />
				<Typography variant='subtitle1'>Timezone</Typography>

				<TimezoneSelect
					value={profileData.TZ} onChange={tzVal => setProfileData({ ...profileData, TZ: tzVal })}
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