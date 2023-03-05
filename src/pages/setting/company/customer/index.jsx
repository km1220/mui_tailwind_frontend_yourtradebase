import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	SET_CUSTOMER_EXTRA_INFOS, ADD_ITEM_IN_CUSTOMER_EXTRA_INFOS, UPDATE_ITEM_IN_CUSTOMER_EXTRA_INFOS, REMOVE_ITEM_IN_CUSTOMER_EXTRA_INFOS,
	LOADING
} from '@store/actions';

import { Collapse, Button, IconButton, List, ListItem, Typography, Divider } from '@mui/material';
import { AddOutlined as AddIcon, SearchOutlined as SearchIcon, CancelOutlined as CancelIcon, EditOutlined, DeleteOutlined } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

import ExtraInfoBox from './ExtraInfoBox';
import BadgeComponent from '@components/BadgeComponent';
import { _generateNewID } from '@utils';

const useStyles = makeStyles(theme => ({
	root: {
		'& > *:not(:first-child, .MuiCollapse-root.MuiCollapse-hidden)': {
			marginTop: '1rem',
		},
	},
	itemDataBox: {
		// 
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
	extraInfoItem: {
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

let initailItemData = { id: _generateNewID(), data: '' };
export default function ExtraCustomerInfoPage(props) {
	const classes = useStyles(props);
	const dispatch = useDispatch();
	const all_extra_infos = useSelector(state => state.customer_extra_infos);

	const [searchText, setSearchText] = useState('');
	const [showList, setShowList] = useState([]);

	const [showAddBox, setShowAddBox] = useState(false);
	const [showUpdateBox, setShowUpdateBox] = useState(false);
	const [newItemData, setNewItemData] = useState(initailItemData);
	const [updateItemData, setUpdateItemData] = useState(initailItemData);

	const _getAllExtraCustomerInfos = () => {
		dispatch(LOADING(true));
		axios.get('/customer/extra_infos').then(res => {
			if (!res.data.extra_infos) {
				alert('Getting Extra Infos data Error!');
				return;
			}
			dispatch(SET_CUSTOMER_EXTRA_INFOS(res.data.extra_infos));
			dispatch(LOADING(false));
		}).catch(err => console.log(err));
	}
	useEffect(() => {
		if (all_extra_infos.length === 0) _getAllExtraCustomerInfos();
	}, []);
	useEffect(() => {
		// setShowList(all_extra_infos);
		handleSearch();
	}, [all_extra_infos]);

	console.log('all_extra_infos', all_extra_infos);

	const handleSearch = () => {
		let newShowList = [];
		all_extra_infos?.map(each => {
			if (each.data.includes(searchText)) {
				newShowList.push(each);
			}
		});
		setShowList(newShowList);
	};
	const handleDelete = (id) => {
		if (!confirm(`Do you really want to delete this item ?   ID: ${id}`)) return;
		axios.delete(`/customer/extra_infos/${id}`).then(res => {
			if (res.data.affectedRows) {
				dispatch(REMOVE_ITEM_IN_CUSTOMER_EXTRA_INFOS(id));
			}
		});
	};
	const onAddClick = () => {
		setShowAddBox(true);
		setShowUpdateBox(false);
	}
	const handleAdd = () => {
		axios.post('/customer/extra_infos', newItemData).then(res => {
			if (res.data.affectedRows) {
				dispatch(ADD_ITEM_IN_CUSTOMER_EXTRA_INFOS({ ...newItemData, id: res.data.insertId }));

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
		axios.put(`/customer/extra_infos/${updateItemData.id}`, updateItemData).then(res => {
			if (res.data.affectedRows) {
				dispatch(UPDATE_ITEM_IN_CUSTOMER_EXTRA_INFOS(updateItemData));

				setShowUpdateBox(false);
			}
		}).catch(err => {
			if (err.response.status === 400) alert(err.response.data);
			else if (err.response.status === 403) alert(err.response.data);
		});
	};


	return (
		<div className={classes.root}>
			<div>
				<Typography variant='h5'>Extra customer info</Typography>
				<Typography variant='body1'>Extra customer info lets you store custom details about your customers.</Typography>
				<BadgeComponent text='Find out how'>
					<Typography variant='body1'>This info can be added when you create/edit a customer and is shown in the customer's profile.</Typography>
				</BadgeComponent>
			</div>
			<Collapse in={showAddBox}>
				<ExtraInfoBox className={classes.itemDataBox}
					itemData={newItemData} setItemData={setNewItemData}
					saveBtnTitle="Add this labour rates" handleSave={handleAdd}
					handleDiscard={() => setShowAddBox(false)}
				/>
			</Collapse>
			{!showAddBox ?
				<Button className='px-4 py-1 rounded' onClick={onAddClick} variant="contained">
					<AddIcon />
					<p className='ml-2'>Add some extra customer info</p>
				</Button>
				:
				""
			}
			<Collapse in={showUpdateBox}>
				<ExtraInfoBox className={classes.itemDataBox}
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
							<input placeholder='Search material...' type='text'
								value={searchText} onChange={e => setSearchText(e.target.value)}
								onKeyDown={e => e.key === "Enter" ? handleSearch() : null}
							/>
							<CancelIcon onClick={() => setSearchText('')} style={{ cursor: 'pointer' }} />
						</ListItem>
						{
							showList.map(each => (
								<ListItem className={classes.extraInfoItem} key={each.id}>
									<div className='flex flex-col'>
										<Typography variant="subtitle1">{each.data}</Typography>
										<Typography variant='caption'>Text field</Typography>
									</div>
									<div style={{ flexGrow: 1 }} />

									<div className={classes.actionBar}>
										<IconButton onClick={() => onEditClick(each)}>
											<EditOutlined />
										</IconButton>
										<IconButton color='error' onClick={() => handleDelete(each.id)}>
											<DeleteOutlined />
										</IconButton>
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
	)
}
