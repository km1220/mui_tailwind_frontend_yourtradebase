import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SET_MATERIALS, ADD_ITEM_IN_MATERIALS, UPDATE_ITEM_IN_MATERIALS, REMOVE_ITEM_IN_MATERIALS } from '@store/actions';

import { Box, Paper, Divider, Collapse, Button, List, ListItem, Typography } from '@mui/material';
import { AddCircleOutlineOutlined as AddIcon, SearchOutlined as SearchIcon, CancelOutlined as CancelIcon } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

import MaterialBox from './MaterialBox';
import { _generateNewID } from '@utils';

const useStyles = makeStyles(theme => ({
	root: {
	},
	itemDataBox: {
		maxWidth: '40vw',
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

let initailItemData = { id: _generateNewID(), product_code: '', title: '', price: '0.00', foreach: '', markup: '0.00', brand: '', category_id: 1 };
export default function MaterialPage(props) {
	const classes = useStyles(props);
	const dispatch = useDispatch();
	const materials = useSelector(state => state.materials);

	const [searchText, setSearchText] = useState('');
	const [showList, setShowList] = useState([]);

	const [showAddBox, setShowAddBox] = useState(false);
	const [showUpdateBox, setShowUpdateBox] = useState(false);
	const [newItemData, setNewItemData] = useState(initailItemData);
	const [updateItemData, setUpdateItemData] = useState(initailItemData);

	const _getAllMaterials = async () => {
		const res = await axios.get('/materials');
		console.log(res)
		if (!res.data.materials) {
			alert('Getting Price list data Error!');
			return;
		}
		dispatch(SET_MATERIALS(res.data.materials));
	}
	useEffect(() => {
		if (materials.length === 0) _getAllMaterials();
	}, []);
	useEffect(() => {
		// setShowList(materials);
		handleSearch();
	}, [materials]);

	const handleSearch = () => {
		let newShowList = [];
		materials.map(each => {
			if (each.product_code.includes(searchText) || each.title.includes(searchText) || each.price.toString().includes(searchText) || each.foreach.includes(searchText) || each.brand.includes(searchText)) {
				newShowList.push(each);
			}
		});
		setShowList(newShowList);
	};
	const handleDelete = (id) => {
		if (!confirm(`Do you really want to delete this item ?   ID: ${id}`)) return;
		axios.delete(`/materials/${id}`).then(res => {
			if (res.data.affectedRows) {
				dispatch(REMOVE_ITEM_IN_MATERIALS(id));
			}
		});
	};
	const onAddClick = () => {
		setShowAddBox(true);
		setShowUpdateBox(false);
	}
	const handleAdd = () => {
		axios.post('/materials', newItemData).then(res => {
			if (res.data.affectedRows) {
				dispatch(ADD_ITEM_IN_MATERIALS({ ...newItemData, id: res.data.insertId }));

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
		axios.put(`/materials/${updateItemData.id}`, updateItemData).then(res => {
			if (res.data.affectedRows) {
				dispatch(UPDATE_ITEM_IN_MATERIALS(updateItemData));

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
					<MaterialBox className={classes.itemDataBox}
						itemData={newItemData} setItemData={setNewItemData}
						saveBtnTitle="Add this material" handleSave={handleAdd}
						handleDiscard={() => setShowAddBox(false)}
					/>
				</Collapse>
				{!showAddBox ?
					<Button className='mb-4' onClick={onAddClick} variant="contained">
						<AddIcon />
						<p className='ml-2'>Add a material</p>
					</Button>
					:
					""
				}
				<Collapse className='mb-4' in={showUpdateBox}>
					<MaterialBox className={classes.itemDataBox}
						itemData={updateItemData} setItemData={setUpdateItemData}
						saveBtnTitle="Update this material" handleSave={handleUpdate}
						handleDiscard={() => setShowUpdateBox(false)}
					/>
				</Collapse>
				{!showUpdateBox ?
					<List className={clsx(classes.dataList, 'mb-4')}>
						<ListItem key='search-bar' className={classes.searchBar}>
							<SearchIcon onClick={() => handleSearch()} style={{ cursor: 'pointer' }} />
							<input placeholder='Seach material...' type='text'
								value={searchText} onChange={e => setSearchText(e.target.value)}
								onKeyDown={e => e.key === "Enter" ? handleSearch() : null}
							/>
							<CancelIcon onClick={() => setSearchText('')} style={{ cursor: 'pointer' }} />
						</ListItem>
						{showList.length > 0 && showList.map((each, index) => (
							<ListItem className={classes.priceItem} key={each.id}>
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
						))}
					</List>
					:
					''
				}
			</div>
		</>
	)
}
