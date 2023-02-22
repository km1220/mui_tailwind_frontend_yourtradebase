import _ from 'lodash';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	SET_USER_NOTIFICATIONS, SET_TEAMMATES,
	LOADING, SET_ALERT
} from '@store/actions';

import { List, ListItem, Typography, Divider } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

import BadgeComponent from '@components/BadgeComponent';
import NotificationCard from './NotificationCard';
import { parseJSON } from '@utils';


const useStyles = makeStyles(theme => ({
	root: {
		'& > *:not(:first-child)': {
			marginTop: '1rem',
		},
		'& b.tags': {
			color: theme.palette.success.main,
		},
	},
	dataList: {
		padding: '0 !important',
		border: `1px solid ${theme.palette.divider}`,
		borderRadius: '0.25rem',
		color: theme.palette.primary.main,
	},
}));


export default function NotificationsPage(props) {
	const classes = useStyles(props);
	const dispatch = useDispatch();
	const userData = useSelector(state => state.user);
	const notifications = useSelector(state => state.notifications);
	const all_team_members = useSelector(state => state.teammates);


	const _getMyNotifications = () => {
		dispatch(LOADING(true));
		axios.get(`/notifications/${userData.id}`).then(res => {
			if (!res.data) {
				alert('Getting NOTIFICATIONs data Error!');
				return;
			}
			const result = res.data;
			let newNotifications = {
				quoteAccepted: parseJSON(result.quote_accepted) || [],
				onlinePaymentReceived: parseJSON(result.online_payment_received) || [],
				quoteReplyReceived: parseJSON(result.quote_reply_received) || [],
				invoiceReplyReceived: parseJSON(result.invoice_reply_received) || [],
				jobReplyReceived: parseJSON(result.job_reply_received) || [],
				customerReplyReceived: parseJSON(result.customer_reply_received) || [],
				fieldTeamCreatesNote: parseJSON(result.field_team_creates_a_note) || [],
				fieldTeamUploadsFile: parseJSON(result.field_team_uploads_a_file) || [],
				fieldTeamCapturesJobSignature: parseJSON(result.field_team_captures_a_job_signature) || [],
			};
			dispatch(SET_USER_NOTIFICATIONS(newNotifications));
			dispatch(LOADING(false));
		}).catch(err => console.log(err));
	}

	const _getAllMyTeammates = () => {
		dispatch(LOADING(true));
		axios.get(`/team_members`, { params: { user_id: userData.id } }).then(res => {
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
		const hasAnyValue = _.some(notifications, e => !_.isEmpty(e));
		if (!hasAnyValue) _getMyNotifications();
		if (all_team_members.length === 0) _getAllMyTeammates();
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const handleDataChage = (newData, targetKey) => {
		let buffData = { ...notifications, [targetKey]: newData };
		let newNotificationData = {
			quote_accepted: JSON.stringify(buffData.quoteAccepted),
			online_payment_received: JSON.stringify(buffData.onlinePaymentReceived),
			quote_reply_received: JSON.stringify(buffData.quoteReplyReceived),
			invoice_reply_received: JSON.stringify(buffData.invoiceReplyReceived),
			job_reply_received: JSON.stringify(buffData.jobReplyReceived),
			customer_reply_received: JSON.stringify(buffData.customerReplyReceived),
			field_team_creates_a_note: JSON.stringify(buffData.fieldTeamCreatesNote),
			field_team_uploads_a_file: JSON.stringify(buffData.fieldTeamUploadsFile),
			field_team_captures_a_job_signature: JSON.stringify(buffData.fieldTeamCapturesJobSignature)
		}

		dispatch(LOADING(true));
		axios.put(`/notifications/${userData.id}`, newNotificationData).then(res => {
			if (res.data.affectedRows) {
				dispatch(SET_USER_NOTIFICATIONS(buffData));
				dispatch(LOADING(false));
				dispatch(SET_ALERT({ type: 'success', message: 'Update successfully!' }));
			}
		}).catch(err => {
			dispatch(LOADING(false));
			dispatch(SET_ALERT({ type: 'error', message: err.response.data }));
		});

	};
	// const handleDelete = (id) => {
	// 	if (!confirm(`Do you really want to delete this item ?   ID: ${id}`)) return;
	// 	axios.delete(`/templates/email/${id}`).then(res => {
	// 		if (res.data.affectedRows) {
	// 			dispatch(REMOVE_ITEM_IN_TEMPLATE_EMAILS(id));
	// 		}
	// 	});
	// };

	return (
		<div className={classes.root}>
			<div>
				<Typography variant='h5'>Who receives notifications?</Typography>
				<Typography variant='body1'>Choose which admin team members are notified when certain actions happen.</Typography>
				<Typography variant='body1'><LockOutlined fontSize='1' /> Only account owners can make changes to notifications.</Typography>
				<BadgeComponent text='More about notifications' style={{ margin: '0', marginTop: '0.5rem' }} />
			</div>

			<List className={classes.dataList}>
				{_.map(notifications, (eachMemberList, key) => (
					<NotificationCard key={key} notificationData={eachMemberList} handleDataChage={newData => handleDataChage(newData, key)} />
				))}
			</List>
		</div >
	)
}