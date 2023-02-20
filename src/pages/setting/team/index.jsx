import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	SET_TEAMMATES, REMOVE_ITEM_IN_TEAMMATES,
	LOADING
} from '@store/actions';

import {
	Box, Typography, Button, Divider,
	alpha,
} from '@mui/material';

import {
	AddCircleOutlined as AddIcon, SearchOutlined as SearchIcon, CancelOutlined as CancelIcon, Close,
} from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

import MemberInfoBox, { AccountInfoBox } from './MemberInfoBox';
import { parseJSON } from '@utils';


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
	addBtn: {
		padding: '0.25rem 0.5rem !important',
		borderRadius: '0.25rem !important',
		marginTop: '1.5rem !important',
	},

	ownerSection: {
		// '& > *:not(:first-child)': {
		// 	marginTop: '1rem',
		// },
	},
	adminTeamSection: {},
	fieldTeamSection: {},
}));
export default function ManageTeamPage(props) {
	const classes = useStyles(props);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [forceRerender, setForceRerender] = useState(100);
	const userData = useSelector(state => state.user)
	const all_team_members = useSelector(state => state.teammates);

	const adminListRef = useRef([]);
	const fieldTeamListRef = useRef([]);

	const _forceRerender = () => setForceRerender(forceRerender + 1);
	const _getAllTeammates = () => {
		dispatch(LOADING(true));
		axios.get('/team_members').then(res => {
			if (!res.data.team_members) {
				alert('Getting TEAM members data Error!');
				return;
			}
			let all_list = res.data.team_members.map(each => ({
				id: each.id,
				name: each.name,
				email: each.email,
				initialText: each.initial_text,
				initialColorHex: each.initial_color,
				role: each.role === 1 ? 'admin' : 'field_team',
				permissions: parseJSON(each.permissions)
			}));
			dispatch(SET_TEAMMATES(all_list));
			dispatch(LOADING(false));
		}).catch(err => console.log(err));
	}

	useEffect(() => {
		if (all_team_members.length === 0) _getAllTeammates();
	}, []);
	useEffect(() => {
		if (all_team_members.length === 0) return;

		adminListRef.current = [];
		fieldTeamListRef.current = [];
		all_team_members.map(each => {
			const each_data = {
				id: each.id, name: each.name, email: each.email,
				initialText: each.initialText, initialColorHex: each.initialColorHex
			};
			if (each.role === 'admin')
				adminListRef.current.push(each_data);
			else if (each.role === 'field_team')
				fieldTeamListRef.current.push(each_data);
		});
		_forceRerender();
	}, [all_team_members]);

	const handleDeleteMember = (id) => {
		if (!confirm(`Do you really want to delete this item ?   ID: ${id}`)) return;
		axios.delete(`/team_members/${id}`).then(res => {
			if (res.data.affectedRows) {
				dispatch(REMOVE_ITEM_IN_TEAMMATES(id));
			}
		});
	}


	return (
		<div className={classes.root}>
			<div className={classes.ownerSection}>
				<Typography variant='h4'>Owner</Typography>
				<Divider />
				<PermissionText flag={true}>
					create and manage everything, including billing.
				</PermissionText>
				<AccountInfoBox data={userData} />
			</div>

			<div className={classes.adminTeamSection}>
				<Typography variant='h5'>Admin team</Typography>
				<Divider />
				<PermissionText flag={true} text="create and manage all jobs, paperwork and assign work to the field team." />
				<PermissionText flag={false} text="manage billing or cancel the account." />

				<Button className={classes.addBtn} onClick={() => navigate('/setting/team/new', { state: { role: 'admin' } })} color="secondary">
					<AddIcon />
					<p className='ml-2'>Add someone to your admin team</p>
				</Button>
				{adminListRef.current.map(each => (
					<MemberInfoBox key={each.id} data={each} admin={true}
						onEdit={() => navigate(`/setting/team/${each.id}`)}
						onDelete={handleDeleteMember}
					/>
				))}
			</div>

			<div className={classes.fieldTeamSection}>
				<Typography variant='h5'>Field team</Typography>
				<Divider />
				<PermissionText flag={true} text="view job sheets, events and tasks they've been assigned, receive a daily email with their schedule." />
				<PermissionText flag={false} text="create or update jobs or paperwork, or see any costs or pricing." />

				<Button className={classes.addBtn} onClick={() => navigate('/setting/team/new', { state: { role: 'field_team' } })} color="secondary">
					<AddIcon />
					<p className='ml-2'>Add someone to your field team</p>
				</Button>

				{fieldTeamListRef.current && fieldTeamListRef.current.map(each => (
					<MemberInfoBox key={each.id} data={each} admin={false}
						onEdit={() => navigate(`/setting/team/${each.id}`)}
						onDelete={handleDeleteMember}
					/>
				))}
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
		background: alpha(theme.palette.success.light, 0.1),
		'& .permission-title': {
			color: theme.palette.success.dark,
		},
	},
	cant: {
		background: alpha(theme.palette.error.light, 0.1),
		'& .permission-title': {
			color: theme.palette.error.dark,
		},
	},
}))
const PermissionText = (props) => {
	const classes = usePermissionTextStyles(props);
	const { flag, text, ...others } = props;

	return (
		<div className={clsx(classes.permission, !flag ? classes.cant : classes.can)}>
			<Typography className='permission-title' variant='subtitle1'>
				{!flag ? 'Can\'t... ' : 'Can... '}
			</Typography>
			<Typography className='permission-text' variant='body2'>
				{text}
			</Typography>
		</div>
	);
}





