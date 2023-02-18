import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	SET_LABOURS, ADD_ITEM_IN_LABOURS, UPDATE_ITEM_IN_LABOURS, REMOVE_ITEM_IN_LABOURS,
	LOADING
} from '@store/actions';

import { Collapse, Button, List, ListItem, Typography } from '@mui/material';
import { AddOutlined as AddIcon, SearchOutlined as SearchIcon, CancelOutlined as CancelIcon } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

import LabourBox from './LabourBox';
import { _generateNewID } from '@utils/price';

const useStyles = makeStyles(theme => ({
	root: {
	},
	itemDataBox: {
		maxWidth: '40vw',
		[theme.breakpoints.down('md')]: {
			maxWidth: 'none',
		}
	},
	dataList: {
		padding: '0 !important',
		border: `1px solid ${theme.palette.divider}`,
		borderRadius: '0.25rem',
		color: theme.palette.primary.main,
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
	labourItem: {
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
	}
}));

let initailItemData = { id: _generateNewID(), title: '', price: '0', per: '', markup: '0' };
export default function LabourPage(props) {
	const classes = useStyles(props);
	const dispatch = useDispatch();
	const labours = useSelector(state => state.labours);

	const [searchText, setSearchText] = useState('');
	const [showList, setShowList] = useState([]);

	const [showAddBox, setShowAddBox] = useState(false);
	const [showUpdateBox, setShowUpdateBox] = useState(false);
	const [newItemData, setNewItemData] = useState(initailItemData);
	const [updateItemData, setUpdateItemData] = useState(initailItemData);

	const _getAllLabours = async () => {
		dispatch(LOADING(true));
		axios.get('/labours').then(res => {
			console.log(res)
			if (!res.data.labours) {
				alert('Getting LABOUR data Error!');
				return;
			}
			dispatch(SET_LABOURS(res.data.labours));
			dispatch(LOADING(false));
		}).catch(err => console.log(err));
	}
	useEffect(() => {
		if (labours.length === 0) _getAllLabours();
	}, []);
	useEffect(() => {
		// setShowList(labours);
		handleSearch();
	}, [labours]);

	const handleSearch = () => {
		let newShowList = [];
		labours.map(each => {
			if (each.title.includes(searchText) || each.price.toString().includes(searchText) || each.per.includes(searchText)) {
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
	const onAddClick = () => {
		setShowAddBox(true);
		setShowUpdateBox(false);
	}
	const handleAdd = () => {
		axios.post('/labours', newItemData).then(res => {
			if (res.data.affectedRows) {
				dispatch(ADD_ITEM_IN_LABOURS({ ...newItemData, id: res.data.insertId }));

				setShowAddBox(false);
				setNewItemData(initailItemData);
			}
		}).catch(err => {
			if (err.response.status === 400) alert(err.response.data);
			else if (err.response.status === 403) alert(err.response.data);
		});
	};
	const onEditClick = (data) => {
		setUpdateItemData(data);
		setShowAddBox(false);
		setShowUpdateBox(true);
	};
	const handleUpdate = () => {
		axios.put(`/labours/${updateItemData.id}`, updateItemData).then(res => {
			if (res.data.affectedRows) {
				dispatch(UPDATE_ITEM_IN_LABOURS(updateItemData));

				setShowUpdateBox(false);
			}
		}).catch(err => {
			if (err.response.status === 400) alert(err.response.data);
			else if (err.response.status === 403) alert(err.response.data);
		});
	};


	return (
		<>
			<div>
				<Collapse className='mb-4' in={showAddBox}>
					<LabourBox className={classes.itemDataBox}
						itemData={newItemData} setItemData={setNewItemData}
						saveBtnTitle="Add this labour rates" handleSave={handleAdd}
						handleDiscard={() => setShowAddBox(false)}
					/>
				</Collapse>
				{!showAddBox ?
					<Button className='px-4 py-1 mb-4 rounded' onClick={onAddClick} variant="contained">
						<AddIcon />
						<p className='ml-2'>Add a labour rates</p>
					</Button>
					:
					""
				}
				<Collapse className='mb-4' in={showUpdateBox}>
					<LabourBox className={classes.itemDataBox}
						itemData={updateItemData} setItemData={setUpdateItemData}
						saveBtnTitle="Update this labour rates" handleSave={handleUpdate}
						handleDiscard={() => setShowUpdateBox(false)}
					/>
				</Collapse>
				{!showUpdateBox ?
					(
						showList.length > 0 &&
						<List className={clsx(classes.dataList, 'mb-4')}>
							<ListItem key='search-bar' className={classes.searchBar}>
								<SearchIcon onClick={() => handleSearch()} style={{ cursor: 'pointer' }} />
								<input placeholder='Seach material...' type='text'
									value={searchText} onChange={e => setSearchText(e.target.value)}
									onKeyDown={e => e.key === "Enter" ? handleSearch() : null}
								/>
								<CancelIcon onClick={() => setSearchText('')} style={{ cursor: 'pointer' }} />
							</ListItem>
							{
								showList.map(each => (
									<ListItem className={classes.labourItem} key={each.id}>
										<div className='flex flex-col'>
											<Typography variant="subtitle1">{each.title}</Typography>
											<Typography variant='caption'>{each.brand}</Typography>
										</div>
										<div style={{ flexGrow: 1 }} />
										<div className='flex flex-col text-right'>
											<Typography variant="subtitle2">${each.price}</Typography>
											<Typography variant='caption'>{each.per ? `per ${each.per}` : ''} {each.markup > 0 ? `(+${each.markup}%)` : `(${each.markup}%)`}</Typography>
										</div>
										<div className={classes.actionBar}>
											<Button className='rounded' variant="outlined" onClick={() => onEditClick(each)}>
												Edit
											</Button>
											<Button className='rounded' variant="outlined" color='error' onClick={() => handleDelete(each.id)}>
												Delete
											</Button>
										</div>
									</ListItem>
								))
							}
						</List>
					)
					:
					''
				}

				{showList.length === 0 && <Typography variant='overline'>No data</Typography>}
			</div>
		</>
	)
}
