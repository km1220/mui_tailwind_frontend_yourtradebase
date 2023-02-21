import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
	SET_TEMPLATE_EMAILS, REMOVE_ITEM_IN_TEMPLATE_EMAILS,
	LOADING
} from '@store/actions';

import { Button, IconButton, List, ListItem, Typography, Divider } from '@mui/material';
import { AddOutlined as AddIcon, EditOutlined, DeleteOutlined } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

import BadgeComponent from '@components/BadgeComponent';
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
	emailTemplateItem: {
		'&:not(:first-child)': {
			borderTop: `1px solid ${theme.palette.divider}`,
		},
		'& > *:not(:first-child)': {
			marginLeft: '1rem',
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
	}
}));

export default function EmailTemplatePage(props) {
	const classes = useStyles(props);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const email_templates = useSelector(state => state.email_templates);


	const _getAllEmailTemplates = () => {
		dispatch(LOADING(true));
		axios.get('/templates/email').then(res => {
			if (!res.data.email_templates) {
				alert('Getting Price list data Error!');
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
		if (email_templates.length === 0) {
			_getAllEmailTemplates();
		}
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

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
				<Typography variant='h5'>Your email templates</Typography>
				<Typography variant='body1' color='text.secondary'>Email templates make it really quick to write the emails you regularly send.</Typography>
				<BadgeComponent text='View tags'>
					<Typography variant='body1' color='text.secondary'>Use <b className='tags'>{`{{tags}}`}</b> to add details to emails automatically.</Typography>
				</BadgeComponent>
			</div>

			<Button className='px-4 py-1 rounded' onClick={() => navigate('/setting/template/email/new')} variant="contained" >
				<AddIcon />Add a price list item
			</Button>

			{email_templates.length > 0 &&
				<List className={clsx(classes.dataList, 'mb-4')}>
					{
						email_templates.map(each => (
							<ListItem className={classes.emailTemplateItem} key={each.id}>
								<div className='flex flex-col grow'>
									<Typography variant="h6">{each.name}</Typography>
									<Typography variant="body1">{each.subject}</Typography>
								</div>

								<div className={classes.actionBar}>
									<IconButton onClick={() => navigate(`/setting/template/email/${each.id}`)}>
										<EditOutlined />
									</IconButton>
									{/* <IconButton color='error' onClick={() => handleDelete(each.id)}>
										<DeleteOutlined />
									</IconButton> */}
								</div>
							</ListItem>
						))
					}
				</List>
			}

			{email_templates.length === 0 && <Typography variant='overline'>No data</Typography>}
		</div>
	)
}
