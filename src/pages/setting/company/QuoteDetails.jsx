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
}));

export default function QuoteDetailsPage(props) {
	const classes = useStyles(props);
	const dispatch = useDispatch();
	const userData = useSelector(state => state.user);

	const handleSave = () => { }

	return (
		<div className={classes.root}>
			<div>
				<Typography variant='h5'>Quote details</Typography>
				<Divider />
				<Typography variant='subtitle2'>Changes to quote details are shared with all team members.</Typography>
			</div>
			<div>
				<div className='mb-4'>
					<Typography variant='subtitle1'>Default quote title</Typography>
					<ItemComponent>
						<input
						/>
					</ItemComponent>
					<Typography variant='body2' color="text.secondary">e.g. Quotation, Quote, Estimate, Proposal...</Typography>
				</div>
				<div className='mb-4'>
					<Typography variant='subtitle1'>Quote prefix</Typography>
					<ItemComponent className='w-fit'>
						<input
						/>
					</ItemComponent>
					<Typography variant='body2' color="text.secondary">e.g. for quote ref: ABC001 enter ABC</Typography>
				</div>
				<div>
					<Typography variant='subtitle1'>Quote next number</Typography>
					<ItemComponent className='w-fit'>
						<input
						/>
					</ItemComponent>
					<Typography variant='body2' color="text.secondary">The next quote you create will have this number</Typography>
				</div>
			</div>

			<div>
				<div className='mb-6'>
					<Typography variant='h5'>Quote text</Typography>
					<Divider />
				</div>
				<div className='mb-6'>
					<Typography variant='subtitle1'>Your default quote introduction</Typography>
					<MUIRichTextEditor label="Type something here..."
						// value={{"blocks":[{"key":"clh5l","text":"Dear {{friendly_name}},\n  Thank you for asking us to look at your project, here’s our quote for the work. If you’ve got any questions or we can help with anything else, please just get in touch. We’d be very happy to help.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":4,"length":19,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}}
						onSave={val => console.log(val)}
					/>
					<Typography variant='body2' color="text.secondary">Enter {`{{friendly_name}}`} to use the customer's name in your quote.</Typography>
					<Typography variant='body2' color="text.secondary">Changes to the introduction only apply to quotes you create, and are not shared with team members.</Typography>
				</div>
				<div className='mb-6'>
					<Typography variant='subtitle1'>Your default quote notes</Typography>
					<MUIRichTextEditor label="Type something here..."

					/>
					<Typography variant='body2' color="text.secondary">Changes to notes only apply to quotes you create, and are not shared with team members.</Typography>
				</div>
				<div className='mb-6'>
					<Typography variant='subtitle1'>Company default quote terms</Typography>
					<MUIRichTextEditor label="Type something here..."

					/>
					<Typography variant='body2' color="text.secondary">Changes to terms will be shared with all team members.</Typography>
				</div>
				<div>
					<Typography variant='subtitle1'>Company quote acceptance message</Typography>
					<MUIRichTextEditor label="Type something here..."
						// value={{"blocks":[{"key":"clh5l","text":"By accepting you're agreeing to the terms and conditions included with your {{quote_title}}.\nWe'll be in touch to arrange your start date and discuss next steps.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":92,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}}
					/>
					<Typography variant='body2' color="text.secondary">Acceptance message is displayed to customers before they accept your quote online.</Typography>
					<Typography variant='body2' color="text.secondary">Changes to acceptance message will be shared with all team members.</Typography>
					<Typography variant='subtitle2'>Learn more about accepting quotes</Typography>
				</div>
			</div>
		</div>
	)
}
