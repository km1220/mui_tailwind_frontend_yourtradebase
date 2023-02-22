import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ADD_ITEM_IN_TEMPLATE_EMAILS } from '@store/actions';

import { Button, Typography, Divider, Select, MenuItem, Avatar, Popover, List, ListItemButton, ListItemIcon, ListItemText, Collapse } from '@mui/material';
// import { createTheme } from '@mui/material';
import { makeStyles, styled, useTheme, ThemeProvider } from '@mui/styles';

import ItemComponent from '@components/price_list/ItemComponent';
import BadgeComponent from '@components/BadgeComponent';
import MUIRichTextEditor from "mui-rte";




const useStyles = makeStyles(theme => ({
	root: {
		padding: '3rem',
		'& > div:not(:last-child)': {
			display: 'flex',
			flexDirection: 'column',
			marginBottom: '2rem',
		},
	}
}));

const initialData = { name: '', subject: '', body: '', attachedFileList: '' };
export default function AddEmailTemplate(props) {
	const classes = useStyles(props);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [newData, setNewData] = useState(initialData);

	const handleAdd = () => {
		const newTemplate = {
			...newData,
			attached_file_list: JSON.stringify(newData.attachedFileList)
		}
		axios.post('/templates/email', newTemplate).then(res => {
			if (res.data.affectedRows) {
				dispatch(ADD_ITEM_IN_TEMPLATE_EMAILS({ ...newData, id: res.data.insertId }));
				navigate('/setting/template/email');
				dispatch(SET_ALERT({ type: 'success', message: 'Add successfully!' }));
			}
		}).catch(err => {
			// if (err.response.status === 400) alert(err.response.data);
			// else if (err.response.status === 403) alert(err.response.data);
			console.log(err);
			dispatch(SET_ALERT({ type: 'error', message: err.response.data }));
		});
	};


	return (
		<div className={classes.root}>
			<div>
				<Typography variant='h5'>New email template</Typography>
				<BadgeComponent text='View tags'>
					<Typography variant='body1'>Use <b className='tags'>{`{{tags}}`}</b> to add details to emails automatically.</Typography>
				</BadgeComponent>
			</div>

			<div className=''>
				<Typography variant='subtitle1'>Template name</Typography>
				<Typography variant='body1'>Choose a helpful name to identify this template.</Typography>
				<ItemComponent>
					<input
						value={newData.name} onChange={e => setNewData({ ...newData, name: e.target.value })}
					/>
				</ItemComponent>
				<Typography variant='body2' color="text.secondary">For example: Sending a quote</Typography>
			</div>
			<div className=''>
				<Typography variant='subtitle1'>Message subject</Typography>
				<ItemComponent>
					<input
						value={newData.subject} onChange={e => setNewData({ ...newData, subject: e.target.value })}
					/>
				</ItemComponent>
				<Typography variant='body2' color="text.secondary">{`For example: Here's your quotation from {{company_name}}`}</Typography>
			</div>
			<div className=''>
				<Typography variant='subtitle1'>Message body</Typography>
				<Typography variant='body1'>Write your message here. We’ll automatically add your email signature at the end.</Typography>

				<MUIRichTextEditor label="Type something here..."
					value={newData.body} onSave={val => setNewData({ ...newData, body: val })}
				/>

				<Typography variant='body2' color="text.secondary">e.g. Invoice, Receipt, Bill...</Typography>
			</div>

			<div className='flex justify-center mt-6'>
				<Button className='mx-4 rounded' color="secondary" variant="contained" onClick={handleAdd}>Add this email template</Button>
				<Button className='mx-4 rounded' color="disabled" variant="outlined" onClick={() => { navigate('/setting/template/email') }}>Discard</Button>
			</div>
		</div>
	)
}
