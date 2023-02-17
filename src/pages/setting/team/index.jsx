import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { SET_PRICE_LISTS, REMOVE_ITEM_IN_PRICE_LISTS } from '@store/actions';

import {
	Box, Typography, Button, List, ListItem, Avatar, Divider,
	alpha,
} from '@mui/material';
import { AddOutlined as AddIcon, SearchOutlined as SearchIcon, CancelOutlined as CancelIcon } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

import { parseJSON } from '@utils/price';


const useStyles = makeStyles(theme => ({
	root: {
		'& > *:not(:first-child)': {
			marginTop: '3rem',
		},
		'& > div': {
			'& > *:not(:first-child, .MuiDivider-root)': {
				marginTop: '1rem',
			},
		},
	},
	ownerSection: {
		// '& > *:not(:first-child)': {
		// 	marginTop: '1rem',
		// },

		'& #account-info-box': {
			display: 'flex',
			alignItems: 'center',
			padding: '1.5rem 3rem',
			border: `1px solid ${theme.palette.divider}`,
			borderRadius: '0.5rem',
			background: alpha(theme.palette.background.paper, 0.4),
			boxShadow: `0 0.25rem 0.5rem 0.1rem ${theme.palette.common.grey}`,
			'& #account-avatar': {
				marginRight: '1.5rem',
			},
			'& #account-content': {
				display: 'flex',
				flexDirection: 'column',
			},
		},
	},
	adminTeamSection: {},
	fieldTeamSection: {},
}));
export default function ManageTeamPage(props) {
	const classes = useStyles(props);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userData = useSelector(state => state.user)

	return (
		<div className={classes.root}>
			<div className={classes.ownerSection}>
				<Typography variant='h5'>Owner</Typography>
				<Divider />
				<PermissionText flag={true}>
					create and manage everything, including billing.
				</PermissionText>
				<div id="account-info-box">
					<Avatar id="account-avatar">EV</Avatar>
					<div id="account-content">
						<Typography className='' variant='subtitle1'>{userData.full_name}</Typography>
						<Typography className='' variant='body1'>{userData.email_addr}</Typography>
						<Typography className='' variant='body1'>Last signed in Today at 04:19</Typography>
					</div>
				</div>
			</div>

			<div className={classes.adminTeamSection}>
				<Typography variant='h5'>Admin team</Typography>
				<Divider />
				<PermissionText flag={true}>
					create and manage all jobs, paperwork and assign work to the field team.
				</PermissionText>
				<PermissionText flag={false}>
					manage billing or cancel the account.
				</PermissionText>
			</div>

			<div className={classes.fieldTeamSection}>
				<Typography variant='h5'>Field team</Typography>
				<Divider />
				<PermissionText flag={true}>
					view job sheets, events and tasks they've been assigned, receive a daily email with their schedule.
				</PermissionText>
				<PermissionText flag={false}>
					create or update jobs or paperwork, or see any costs or pricing.
				</PermissionText>
			</div>
		</div>
	)
}



const usePermissionTextStyles = makeStyles(theme => ({
	permission: {
		display: 'flex',
		alignItems: 'baseline',
		padding: '0.5rem 1.5rem',
		borderRadius: '0.25rem',

		'& .permission-text': {
			color: theme.palette.common.black,
			marginLeft: '0.5rem',
		},
	},
	can: {
		background: alpha(theme.palette.success.light, 0.2),
		'& .permission-title': {
			color: theme.palette.success.dark,
		},
	},
	cant: {
		background: alpha(theme.palette.error.light, 0.2),
		'& .permission-title': {
			color: theme.palette.error.dark,
		},
	},
}))
const PermissionText = (props) => {
	const classes = usePermissionTextStyles(props);
	const { flag, children, ...others } = props;

	return (
		<div className={clsx(classes.permission, !flag ? classes.cant : classes.can)}>
			<Typography className='permission-title' variant='subtitle1'>
				{!flag ? 'Can\'t... ' : 'Can... '}
			</Typography>
			<Typography className='permission-text' variant='body2'>
				{children}
			</Typography>
		</div>
	);
}