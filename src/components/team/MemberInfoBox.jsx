
import React, { useState } from 'react';
import {
	Typography, IconButton, Avatar, Divider,
	Popover, List, ListItemButton, ListItemIcon, ListItemText,
	Snackbar, Alert as MuiAlert,
	alpha,
} from '@mui/material';

import {
	MoreHorizOutlined as MoreIcon, EditOutlined as EditIcon, DeleteOutlined as DeleteIcon,
	EmailOutlined as ResetMailIcon
} from '@mui/icons-material';
import { makeStyles, styled } from '@mui/styles';
import clsx from 'clsx';




const formatDate = (date_str = '') => {
	let date = new Date(date_str);
	if (date == 'Invalid Date')
		date = new Date();

	return date.toISOString().split("T")[0];
}

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
		boxShadow: `0 0.25rem 0.5rem 0.1rem ${theme.palette.common.grey}`,
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
	const { className, data, admin = false, onEdit = () => { }, onDelete = () => { }, ...others } = props;
	const role = admin ? 'admin' : 'field-team';

	const [showActionPopover, setShowActionPopover] = useState(false);
	const [showSnackbar, setShowSnackbar] = useState(false);


	return (
		<div id={`member-${role}-${data.id}`} className={clsx(classes.root, role, className)} {...others}>
			<Avatar className="account-avatar" sx={{ backgroundColor: data.initial_color }}>{data.initial_text}</Avatar>
			<div className="account-content">
				<Typography className='' variant='subtitle1'>{data.name}</Typography>
				<Typography className='' variant='body1'>{data.email}</Typography>
				<Typography className='' variant='body1'>Last signed in {data.last_login ? data.last_login : formatDate()}</Typography>
			</div>
			<div style={{ flexGrow: 1 }} />
			<IconButton className='action-bar-btn' onClick={() => setShowActionPopover(true)}>
				<MoreIcon />
			</IconButton>

			<Popover
				open={showActionPopover}
				anchorEl={document.querySelector(`#member-${role}-${data.id} .action-bar-btn`)}
				onClose={() => setShowActionPopover(false)}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			>
				<MemberActionList style={{ padding: 0 }}>
					{data.email ?
						<>
							<ListItemButton onClick={() => setShowSnackbar(true)}>
								<ListItemIcon> <ResetMailIcon /> </ListItemIcon>
								<ListItemText primary="Send reset password email" />
							</ListItemButton>
							<Divider />
						</>
						: ''
					}
					<ListItemButton onClick={() => onEdit(data.id)}>
						<ListItemIcon> <EditIcon /> </ListItemIcon>
						<ListItemText primary="Edit" />
					</ListItemButton>
					<ListItemButton onClick={() => onDelete(data.id)}>
						<ListItemIcon> <DeleteIcon color='error' /> </ListItemIcon>
						<ListItemText primary="Remove member" primaryTypographyProps={{ color: 'error' }} />
					</ListItemButton>
				</MemberActionList>
			</Popover>
			<Snackbar open={showSnackbar} autoHideDuration={300000} onClose={() => setShowSnackbar(false)}>
				<Alert severity="success" >Password reset instructions sent to ${data.email}</Alert>
			</Snackbar >
		</div >
	)
}
export const AccountInfoBox = (props) => {
	const classes = useInfoBoxStyles(props);
	const { className, data, ...others } = props;
	return (
		<div className={clsx(classes.root, className)} {...others}>
			<Avatar className="account-avatar">EV</Avatar>
			<div className="account-content">
				<Typography className='' variant='subtitle1'>{data.name}</Typography>
				<Typography className='' variant='body1'>{data.email}</Typography>
				<Typography className='' variant='body1'>Last signed in {data.last_login ? data.last_login : formatDate()}</Typography>
			</div>
		</div>
	)
};

export default MemberInfoBox;