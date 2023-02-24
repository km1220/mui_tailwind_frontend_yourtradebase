import _ from 'lodash';
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import {
	Collapse, Button, IconButton, Switch, Avatar, Tooltip, List, ListItem, Typography, Divider,
	alpha
} from '@mui/material';
import { EditOutlined, AccountCircleOutlined } from '@mui/icons-material';
import { makeStyles, styled } from '@mui/styles';
import clsx from 'clsx';

import { stringToColor, stringAvatar } from '@utils';


const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		'&:not(:first-child)': {
			borderTop: `1px solid ${theme.palette.divider}`,
		},
	},
	cardBox: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		'& > *:not(:first-child)': {
			marginLeft: '1rem',
		},

		'& > .info-section': {
			flexBasis: '60%',
			padding: '1rem',
			paddingRight: 0,
		},
		'& > .team-member-section': {
			flexBasis: '30%', flexShrink: 0,
			display: 'flex',
			flexWrap: 'wrap',
			'& > .MuiAvatar-root': {
				margin: '0.5rem',
			},

		},
	},
	actionBar: {
		display: 'flex',
		[theme.breakpoints.down('md')]: {
			flexDirection: 'column'
		},
		'& .MuiButton-root': {
			margin: '0 0.5rem',
			padding: '0.25rem 0.5rem',
			[theme.breakpoints.down('md')]: {
				margin: '0.25rem 0',
				padding: '0.25rem 0.5rem',
			},
		},
		'& .MuiIconButton-root': {
			margin: '0 0.5rem',
			border: `1px solid`,
			[theme.breakpoints.down('md')]: {
				margin: '0.25rem 0',
			},
		},
	},
	editBox: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		padding: '0 1rem',
		'& > *:not(:last-child)': {
			marginBottom: '1rem',
		},
		'& .team-member-list': {
			'& .member-item': {
				// width: 'fit-content',
				display: 'flex',
				'&:not(:first-child)': {
					borderTop: `1px solid ${theme.palette.divider}`,
				},
				'& > *:not(:first-child)': {
					marginLeft: '1rem',
				},

				'& .member-item-content': {
					display: 'flex',
					alignItems: 'baseline',
					flexGrow: 1,
					'& .role-badge': {
						marginLeft: '0.5rem',
					},
				}
			},
		},
	}
}));

const NotificationCard = (props) => {
	const classes = useStyles(props);
	const { notificationData, handleDataChage, ...others } = props;
	const userData = useSelector(state => state.user);
	const all_team_members = useSelector(state => state.teammates);

	const [memberFlags, setFlags] = useState({});
	const [showEdit, setshowEdit] = useState(false);

	const checkMemberExist = (memberData) => notificationData.find(e => e === memberData.id);


	useEffect(() => {
		let buffFlags = {};
		all_team_members?.map(each => {
			buffFlags[each.id] = checkMemberExist(each) ? true : false;
			// console.log(checkMemberExist(each) ? true : false, 'memberStatusList.current', memberStatusList.current);
		});
		setFlags(buffFlags);
	}, []);

	const handleUpdateDone = (e) => {
		let newNotificationData = [];
		_.some(memberFlags, (eachFlag, i) => {
			if (eachFlag === true)
				newNotificationData.push(Number(i));
		});
		handleDataChage(newNotificationData);
		setshowEdit(false);
		// e.target.closest('.MuiListItem-root').previousSibling.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
		// console.log(e.target.closest('.MuiListItem-root').previousSibling)
	};
	return (
		<ListItem className={classes.root}>
			<div className={classes.cardBox}>
				<div className='info-section'>
					<Typography variant="h6">Quote accepted</Typography>
					<Typography variant="body1">Notifications are sent when a customer accepts a quote or estimate online.Notifications are sent when a customer accepts a quote or estimate online.Notifications are sent when a customer accepts a quote or estimate online.Notifications are sent when a customer accepts a quote or estimate online.</Typography>
					<BadgeItem>
						<Typography variant="body1">Notified via</Typography>
						<BadgeItem text='email' />
						<BadgeItem text='in-app' />
					</BadgeItem>
				</div>
				<div className='team-member-section'>
					<Tooltip title={`Notify original sender(${userData.name}) of quote`}>
						<Avatar sx={{ bgcolor: 'transparent', color: 'neutral.400' }} >
							<AccountCircleOutlined sx={{ width: '100%', height: '100%' }} />
						</Avatar>
					</Tooltip>
					{
						all_team_members?.map(each => (
							checkMemberExist(each) ?						// * check whether [each.team_member] is exist in [notificaion_array]
								<Tooltip key={each.id} title={`Notify ${each.name}`}>
									<Avatar sx={{ bgcolor: each.initialColorHex || stringToColor(each.name) }}>
										{each.initialText || stringAvatar(each.name)}
									</Avatar>
								</Tooltip>
								:
								''
						))
					}
				</div>

				<div className={classes.actionBar}>
					<IconButton onClick={() => setshowEdit(!showEdit)}>
						<EditOutlined />
					</IconButton>
					{/* <IconButton color='error' onClick={() => handleDelete(each.id)}>
						<DeleteOutlined />
					</IconButton> */}
				</div>
			</div>
			<Collapse in={showEdit} style={{ width: '100%' }}>
				<div className={classes.editBox}>
					<Typography variant="h6">Who should be notified?</Typography>
					<List className='team-member-list'>
						<ListItem className='member-item'>
							<Avatar sx={{ bgcolor: 'transparent', color: 'neutral.400' }} >
								<AccountCircleOutlined sx={{ width: '100%', height: '100%' }} />
							</Avatar>
							<Typography variant="body1" style={{ flexGrow: 1 }}> Original sender of quote (notified by default) </Typography>
							<Switch size='large' checked style={{ opacity: 0.3 }} color='secondary' />
						</ListItem>
						{
							all_team_members?.map(each =>
								<ListItem key={each.id} className='member-item'>
									{/* <Avatar sx={{ bgcolor: each.initialColorHex || stringToColor(each.name) }}>{stringAvatar(each.name)}</Avatar> */}
									<Avatar sx={{ bgcolor: each.initialColorHex || stringToColor(each.name) }}>
										{each.initialText || stringAvatar(each.name)}
									</Avatar>
									<div className='member-item-content'>
										<Typography variant="body1"> {each.name} </Typography>
										<BadgeItem className={clsx('role-badge', `${each.role}_role`)}
											text={each.role === 'admin' ? 'ADMIN' : 'FIELD TEAM'}
										/>
									</div>
									<Switch size='large'
										checked={memberFlags[each.id] || false}
										onChange={e => setFlags({ ...memberFlags, [each.id]: !memberFlags[each.id] })}
									/>
								</ListItem>

							)
						}
					</List>
					<div className='text-center'>
						<Button className='w-1/3 border-2 rounded' variant="contained" color='secondary' onClick={handleUpdateDone}>
							Done
						</Button>
					</div>
				</div>
			</Collapse>
		</ListItem >
	)
}

NotificationCard.propTypes = {
	notificationData: PropTypes.array,
	handleDataChage: PropTypes.func,
};
NotificationCard.defaultProps = {
	notificationData: [],
	handleDataChage: () => { },
};


export default NotificationCard;



const useBadgeStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		alignItems: 'baseline',
		'& > *:not(:first-child)': { marginLeft: '0.5rem' },

		'& .item-badge': {
			height: 'fit-content',
			fontSize: '0.8rem !important',
			lineHeight: '1 !important',
			borderRadius: '1rem !important',
			padding: '0.1rem 0.5rem !important',
			background: theme.palette.neutral[300],
		},

		'&.admin_role': {
			'& .item-badge': {
				backgroundColor: theme.palette.role.admin,
				color: theme.palette.common.white,
				fontWeight: 600,
			},
		},
		'&.field_team_role': {
			'& .item-badge': {
				backgroundColor: theme.palette.role.fieldTeam,
				color: theme.palette.common.black,
				fontWeight: 400,
			},
		},
	},
}));
const BadgeItem = (props) => {
	const classes = useBadgeStyles(props);
	const { text, className, children, ...others } = props;

	return (
		<div className={clsx(classes.root, className)} {...others}>
			{children}
			{text && <Typography className='item-badge'>{text}</Typography>}
		</div>
	)
}

// const IOSSwitch = styled((props) => (
// 	<Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
// ))(({ theme }) => ({
// 	width: '42px',
// 	height: '26px',
// 	padding: 0,
// 	'& .MuiSwitch-switchBase': {
// 		padding: 0,
// 		margin: 2,
// 		transitionDuration: '300ms',
// 		'&.Mui-checked': {
// 			transform: 'translateX(16px)',
// 			color: '#fff',
// 			'& + .MuiSwitch-track': {
// 				backgroundColor: theme.palette.mode === 'dark' ? theme.palette.success.dark : theme.palette.success.light,
// 				opacity: 1,
// 				border: 0,
// 			},
// 			'&.Mui-disabled + .MuiSwitch-track': {
// 				opacity: 0.5,
// 			},
// 		},
// 		'&.Mui-focusVisible .MuiSwitch-thumb': {
// 			color: theme.palette.success.main,
// 			border: '6px solid #fff',
// 		},
// 		'&.Mui-disabled .MuiSwitch-thumb': {
// 			color:
// 				theme.palette.mode === 'light'
// 					? theme.palette.grey[100]
// 					: theme.palette.grey[600],
// 		},
// 		'&.Mui-disabled + .MuiSwitch-track': {
// 			opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
// 		},
// 	},
// 	'& .MuiSwitch-thumb': {
// 		boxSizing: 'border-box',
// 		width: 22,
// 		height: 22,
// 	},
// 	'& .MuiSwitch-track': {
// 		borderRadius: 26 / 2,
// 		backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
// 		opacity: 1,
// 		transition: theme.transitions.create(['background-color'], {
// 			duration: 500,
// 		}),
// 	},
// }));