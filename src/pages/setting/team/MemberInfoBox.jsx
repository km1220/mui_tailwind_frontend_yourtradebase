
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SET_ALERT } from '@store/actions';
import {
	Typography, IconButton, Avatar, Divider,
	Popover, List, ListItemButton, ListItemIcon, ListItemText,
	alpha,
} from '@mui/material';
import {
	MoreHorizOutlined as MoreIcon, EditOutlined as EditIcon, DeleteOutlined as DeleteIcon,
	EmailOutlined as ResetMailIcon
} from '@mui/icons-material';
import { makeStyles, styled } from '@mui/styles';
import clsx from 'clsx';

import spacetime from 'spacetime';
import AvatarColorList from './avatarColors.js';

import { formatDate } from '@utils';




const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const MemberActionList = styled(List)({
	'& .MuiListItemButton-root': {
		padding: '0.25rem 1.25rem',
	},
	'& .MuiListItemIcon-root': {
		minWidth: 0,
		marginRight: '1rem',
	},
	'& .MuiSvgIcon-root': {
		fontSize: '1.25rem',
	},
});
const useInfoBoxStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		alignItems: 'center',
		padding: '2rem 1rem 2rem 2.5rem',
		border: `1px solid ${theme.palette.divider}`,
		borderRadius: '0.5rem',
		background: alpha(theme.palette.background.paper, 0.4),
		boxShadow: `0 0.05rem 0.25rem 0 ${theme.palette.common.grey}`,
		'& .account-avatar': {
			marginRight: '1.5rem',
		},
		'& .account-content': {
			display: 'flex',
			flexDirection: 'column',
		},

		'&.admin': {},
		'&.field-team': {},
	}
}))

const MemberInfoBox = (props) => {
	const classes = useInfoBoxStyles(props);
	const dispatch = useDispatch();
	const { className, data, admin = false, onEdit = () => { }, onDelete = () => { }, style, ...others } = props;
	const { id, name, email, initialText, initialColorHex, lastLoginAt } = data;
	const lastLoginAtDate = lastLoginAt && spacetime(lastLoginAt).unixFmt('yyyy.MM.dd h:mm a');
	let avatarColor = initialColorHex || AvatarColorList[0][0];
	const role = admin ? 'admin' : 'field-team';

	const [showActionPopover, setShowActionPopover] = useState(false);

	return (
		<div id={`member-${role}-${id}`} className={clsx(classes.root, role, className)}
			style={{ backgroundColor: alpha(avatarColor, 0.05), ...style }}
			{...others}
		>
			<Avatar className="account-avatar" sx={{ backgroundColor: avatarColor }}>{initialText}</Avatar>
			<div className="account-content">
				<Typography className='' variant='subtitle1'>Name: {name}</Typography>
				{email &&
					<Typography className='' variant='body1'>Email Address: {email}</Typography>
				}
				{lastLoginAtDate &&
					<Typography className='' variant='body1'>Last signed in {lastLoginAtDate}</Typography>
				}
			</div>
			<div style={{ flexGrow: 1 }} />
			<IconButton className='action-bar-btn' onClick={() => setShowActionPopover(true)}>
				<MoreIcon />
			</IconButton>

			<Popover
				open={showActionPopover}
				anchorEl={document.querySelector(`#member-${role}-${id} .action-bar-btn`)}
				onClose={() => setShowActionPopover(false)}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			>
				<MemberActionList style={{ padding: 0 }}>
					{email &&
						<>
							<ListItemButton onClick={() => dispatch(SET_ALERT({ type: 'success', message: `Password reset instructions sent to ${email}!` }))}>
								<ListItemIcon> <ResetMailIcon /> </ListItemIcon>
								<ListItemText primary="Send reset password email" />
							</ListItemButton>
							<Divider />
						</>
					}
					<ListItemButton onClick={() => onEdit(id)}>
						<ListItemIcon> <EditIcon /> </ListItemIcon>
						<ListItemText primary="Edit" />
					</ListItemButton>
					<ListItemButton onClick={() => onDelete(id)}>
						<ListItemIcon> <DeleteIcon color='error' /> </ListItemIcon>
						<ListItemText primary="Remove member" primaryTypographyProps={{ color: 'error' }} />
					</ListItemButton>
				</MemberActionList>
			</Popover>
		</div >
	)
}
export const AccountInfoBox = (props) => {
	const classes = useInfoBoxStyles(props);
	const { className, data, ...others } = props;
	const {
		id, name, email, // initialText, initialColorHex
		lastLoginAt
	} = data;
	const lastLoginAtDate = lastLoginAt && spacetime(lastLoginAt).unixFmt('yyyy.MM.dd h:mm a');

	return (
		<div className={clsx(classes.root, className)} {...others}>
			<Avatar className="account-avatar">EV</Avatar>
			<div className="account-content">
				<Typography className='' variant='subtitle1'>{name}</Typography>
				<Typography className='' variant='body1'>{email}</Typography>
				{lastLoginAtDate &&
					<Typography className='' variant='body1'>Last signed in {lastLoginAtDate}</Typography>
				}
			</div>
		</div>
	)
};

export default MemberInfoBox;