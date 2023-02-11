import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { SET_LABOURS, REMOVE_ITEM_IN_LABOURS } from '@store/actions';

import {
	Box, Paper, Divider,
	Collapse, Button, List, ListItem, Typography
} from '@mui/material';
import { AddCircleOutlineOutlined as AddIcon, SearchOutlined as SearchIcon, CancelOutlined as CancelIcon } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';


const useStyles = makeStyles(theme => ({
	root: {
	},
	addBox: {
		padding: '1rem',
		border: `1px solid ${theme.palette.common.black}`,
		borderRadius: '0.25rem',
	},
	dataList: {
		padding: '0 !important',
		border: `1px solid ${theme.palette.common.black}`,
		borderRadius: '0.25rem',
	},
	searchBar: {
		display: 'flex',
		color: theme.palette.neutral[400],
		'& input': {
			flexGrow: 1,
			color: theme.palette.common.black,
		},
		'& > *:not(:first-child)': {
			marginLeft: '1rem',
		},
	},
	priceItem: {
		'&:not(:first-child)': {
			borderTop: `1px solid ${theme.palette.common.black}`,
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
	}
}));

export default function MaterialPage(props) {
	const classes = useStyles(props);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const labours = useSelector(state => state.labours);

	const [searchText, setSearchText] = useState('');
	const [showList, setShowList] = useState([]);
	const [showAddBox, setShowAddBox] = useState(false);

	const _getAllMaterials = async () => {
		const res = await axios.get('/labours');
		if (!res.data.labours) {
			alert('Getting Price list data Error!');
			return;
		}
		dispatch(SET_LABOURS(res.data.labours));
	}

	useEffect(() => {
		if (labours.length === 0) {
			_getAllMaterials();
		}
	}, []);
	useEffect(() => {
		// setShowList(labours);
		handleSearch();
	}, [labours]);

	const handleSearch = () => {
		let newShowList = [];
		labours.map(each => {
			if (each.title.includes(searchText) || each.content.includes(searchText)) {
				newShowList.push(each);
			}
		});
		setShowList(newShowList);
	};
	const handleDelete = (id) => {
		if (!confirm(`Do you really want to delete this item ?   ID: ${id}`)) return;
		axios.delete(`/labours/${id}`).then(res => {
			if (res.data.affectedRows) {
				dispatch(REMOVE_ITEM_IN_LABOURS(id));
			}
		});
	};

	return (
		<>
			<div>
				<Button className='mb-4' onClick={() => setShowAddBox(true)} variant="contained" >
					<AddIcon />Add a new labour
				</Button>
				<Collapse className='mb-4' in={showAddBox}>
					<Box className={classes.addBox}>
						dasf
						sdaf
						sadfsdafsad
						asdf
					</Box>
				</Collapse>
				<List className={clsx(classes.dataList, 'mb-4')}>
					<ListItem key='search-bar' className={classes.searchBar}>
						<SearchIcon onClick={() => handleSearch()} style={{ cursor: 'pointer' }} />
						<input placeholder='Seach labour...' type='text'
							value={searchText} onChange={e => setSearchText(e.target.value)}
							onKeyDown={e => e.key === "Enter" ? handleSearch() : null}
						/>
						<CancelIcon onClick={() => setSearchText('')} style={{ cursor: 'pointer' }} />
					</ListItem>
					{showList.length > 0 && showList.map((each, index) => (
						<ListItem className={classes.priceItem} key={each.id}>
							<div className='flex flex-col'>
								<Typography variant="subtitle1">{each.title}</Typography>
								<Typography variant='caption'>{each.content}</Typography>
							</div>
							<div style={{ flexGrow: 1 }} />
							<div className='flex flex-col text-right'>
								<Typography variant="subtitle2">${each.price}</Typography>
							</div>
							<div className={classes.actionBar}>
								<Button className='rounded' variant="outlined"
									onClick={() => navigate(`/setting/price_list/${each.id}`)}
								>Edit</Button>
								<Button className='rounded' variant="outlined" color='error'
									onClick={() => handleDelete(each.id)}
								>
									Delete
								</Button>
							</div>
						</ListItem>
					))}
				</List>
			</div>
		</>
	)
}
