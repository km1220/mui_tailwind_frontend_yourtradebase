import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RESET_USER_INFO, RESET_USER_REMINDERS } from '@store/actions';

import { Button, Typography, Divider, Select, MenuItem, Avatar, Popover, List, ListItemButton, ListItemIcon, ListItemText, Collapse } from '@mui/material';
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
import BadgeComponent from '@components/BadgeComponent';
import MUIRichTextEditor from "mui-rte";




const useStyles = makeStyles(theme => ({
	root: {
		'& > div': {
			display: 'flex',
			flexDirection: 'column',
		},
		'& > div:not(:last-child)': {
			marginBottom: '2.5rem',
		},
	},
	muiEditorRoot: { width: '100%' },
}));

export default function InvoiceDetailsPage(props) {
	const classes = useStyles(props);
	const dispatch = useDispatch();
	const userData = useSelector(state => state.user);

	const handleSave = () => { }

	return (
		<div className={classes.root}>
			<div>
				<Typography variant='h5'>Invoice details</Typography>
				<Divider />
				<Typography variant='subtitle2'>Changes to invoice details are shared with all team members.</Typography>
			</div>
			<div>
				<div className='mb-4'>
					<Typography variant='subtitle1'>Default invoice title</Typography>
					<ItemComponent>
						<input
						/>
					</ItemComponent>
					<Typography variant='body2' color="text.secondary">e.g. Invoice, Receipt, Bill...</Typography>
				</div>
				<div className='mb-4'>
					<Typography variant='subtitle1'>Invoice prefix</Typography>
					<ItemComponent className='w-fit'>
						<input
						/>
					</ItemComponent>
					<Typography variant='body2' color="text.secondary">e.g. for invoice ref: ABC001 enter ABC</Typography>
				</div>
				<div>
					<Typography variant='subtitle1'>Invoice next number</Typography>
					<ItemComponent className='w-fit'>
						<input
						/>
					</ItemComponent>
					<Typography variant='body2' color="text.secondary">The next invoice you create will have this number</Typography>
				</div>
				<div>
					<Typography variant='subtitle1'>How many days before payment due?</Typography>
					<ItemComponent className='w-fit'>
						<input
						/>
					</ItemComponent>
					<Typography variant='body2' color="text.secondary">0 = due immediately.</Typography>
					<Typography variant='body2' color="text.secondary">TIP: You can also set days until invoice due per customer.</Typography>
				</div>
			</div>

			<div>
				<BadgeComponent text='Learn more'>
					<Typography variant='h5'>Construction industry scheme (CIS) settings</Typography>
				</BadgeComponent>
				<Typography variant='subtitle2'>Turn on CIS for invoices?</Typography>
				<Select
					className='w-auto input-label'
					sx={{ borderRadius: '0.25rem' }} size='small'
				>
					<MenuItem value='email'>Email</MenuItem>
				</Select>
			</div>
			<div>
				<BadgeComponent text='Learn more'>
					<Typography variant='h5'>VAT reverse charge</Typography>
				</BadgeComponent>
				<Typography variant='subtitle2'>Apply VAT reverse charge to invoices?</Typography>
				<Select
					className='w-auto input-label'
					sx={{ borderRadius: '0.25rem' }} size='small'
				>
					<MenuItem value='email'>Email</MenuItem>
				</Select>
			</div>

			<div>
				<div className='mb-6'>
					<Typography variant='h5'>Invoice text</Typography>
					<Divider />
				</div>
				<div className='mb-6'>
					<Typography variant='subtitle1'>Your default invoice notes</Typography>
					<MUIRichTextEditor label="Type something here..."
						onSave={val => console.log(val)}
					/>
					<Typography variant='body2' color="text.secondary">Changes to notes only apply to invoices you create, and are not shared with team members.</Typography>
				</div>
				<div>
					<Typography variant='subtitle1'>Company default invoice terms</Typography>
					<MUIRichTextEditor label="Type something here..."

					/>
					<Typography variant='body2' color="text.secondary">Changes to terms will be shared with all team members.</Typography>
				</div>
			</div>
		</div>
	)
}
