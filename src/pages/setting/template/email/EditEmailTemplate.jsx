import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	SET_TEMPLATE_EMAILS, UPDATE_ITEM_IN_TEMPLATE_EMAILS,
	LOADING, SET_ALERT
} from '@store/actions';

import { Button, Typography, Divider, Select, MenuItem, Avatar, Popover, List, ListItemButton, ListItemIcon, ListItemText, Collapse } from '@mui/material';
// import { createTheme } from '@mui/material';
import { makeStyles, styled, useTheme, ThemeProvider } from '@mui/styles';

import ItemComponent from '@components/price_list/ItemComponent';
import BadgeComponent from '@components/BadgeComponent';
import MUIRichTextEditor from "mui-rte";

import { parseJSON } from '@utils';


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

const initialData = {
	// name: '',
	subject: '', body: '', attachedFileList: ''
};
export default function EditEmailTemplate(props) {
	const { id: paramID } = useParams();
	const classes = useStyles(props);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const email_templates = useSelector(state => state.email_templates);
	const [editTargetData, setEditTargetData] = useState(initialData);


	const _getAllEmailTemplates = () => {
		dispatch(LOADING(true));
		axios.get('/templates/email').then(res => {
			if (!res.data.email_templates) {
				alert('Getting EMAIL Templates data Error!');
				return;
			}
			let all_list = res.data.email_templates.map(each => ({
				...each,
				attachedFileList: parseJSON(each.attached_file_list),
			}));
			dispatch(SET_TEMPLATE_EMAILS(all_list));
			dispatch(LOADING(false));
		}).catch(err => console.log(err));
	};
	useEffect(() => {
		if (email_templates.length === 0) _getAllEmailTemplates();
	}, []);
	useEffect(() => {
		if (email_templates.length === 0) return;
		const targetData = email_templates.filter(e => e.id === Number(paramID))[0];
		if (!targetData)
			navigate('/templates/email');
		else
			setEditTargetData(targetData);
	}, [email_templates]);

	const handleUpdate = () => {
		const updateTemplate = {
			...editTargetData,
			attached_file_list: JSON.stringify(editTargetData.attachedFileList)
		}
		axios.put(`/templates/email/${editTargetData.id}`, updateTemplate).then(res => {
			if (res.data.affectedRows) {
				dispatch(UPDATE_ITEM_IN_TEMPLATE_EMAILS(editTargetData));
				navigate('/setting/template/email');
				dispatch(SET_ALERT({ type: 'success', message: 'Updated successfully!' }));
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
				<Typography variant='h5'>Edit this email template</Typography>
				<BadgeComponent text='View tags'>
					<Typography variant='body1'>Use <b className='tags'>{`{{tags}}`}</b> to add details to emails automatically.</Typography>
				</BadgeComponent>
			</div>

			{/* <div className=''>
				<Typography variant='subtitle1'>Template name</Typography>
				<Typography variant='body1'>Choose a helpful name to identify this template.</Typography>
				<ItemComponent>
					<input
						value={newData.name} onChange={e => setNewData({ ...newData, name: e.target.value })}
					/>
				</ItemComponent>
				<Typography variant='body2' color="text.secondary">For example: Sending a quote</Typography>
			</div> */}
			<div className=''>
				<Typography variant='subtitle1'>Message subject</Typography>
				<ItemComponent>
					<input placeholder='Please sign off your project'
						value={editTargetData.subject} onChange={e => setEditTargetData({ ...editTargetData, subject: e.target.value })}
					/>
				</ItemComponent>
				<Typography variant='body2' color="text.secondary">{`For example: Here's your quotation from {{company_name}}`}</Typography>
			</div>
			<div className=''>
				<Typography variant='subtitle1'>Message body</Typography>
				<Typography variant='body1'>Write your message here. We’ll automatically add your email signature at the end.</Typography>

				<MUIRichTextEditor label="Type something here..."
					value={editTargetData.body} onSave={val => setEditTargetData({ ...editTargetData, body: val })}
				/>

				<Typography variant='body2' color="text.secondary">e.g. Invoice, Receipt, Bill...</Typography>
			</div>

			<div className='flex justify-center mt-6'>
				<Button className='mx-4 rounded' color="secondary" variant="contained" onClick={handleUpdate}>Save template</Button>
				<Button className='mx-4 rounded' color="disabled" variant="outlined" onClick={() => { navigate('/setting/template/email') }}>Discard</Button>
			</div>
		</div>
	)
}
