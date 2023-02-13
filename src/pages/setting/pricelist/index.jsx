import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { SET_PRICE_LISTS, REMOVE_ITEM_IN_PRICE_LISTS } from '@store/actions';

import { Button, List, ListItem, Typography } from '@mui/material';
import { AddOutlined as AddIcon, SearchOutlined as SearchIcon, CancelOutlined as CancelIcon } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';


const useStyles = makeStyles(theme => ({
	root: {
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
	priceListItem: {
		// '&.MuiListItem-root': {
		// 	padding: '0.5rem 1.5rem',
		// 	[theme.breakpoints.down('md')]: {
		// 		padding: '0.25rem 0.5rem',
		// 	},
		// },

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

export default function PriceListPage(props) {
	const classes = useStyles(props);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { price_lists } = useSelector(state => state);

	const [searchText, setSearchText] = useState('');
	const [showList, setShowList] = useState([]);

	const _getAllPriceLists = async () => {
		const res = await axios.get('/price_lists');
		if (!res.data.price_lists) {
			alert('Getting Price list data Error!');
			return;
		}
		let all_list = res.data.price_lists.map(each => ({
			...each,
			material_list: JSON.parse(each.material_list),
			labour_list: JSON.parse(each.labour_list),
		}));
		dispatch(SET_PRICE_LISTS(all_list));
	}

	useEffect(() => {
		if (price_lists.length === 0) {
			_getAllPriceLists();
		}
	}, []);
	useEffect(() => {
		// setShowList(price_lists);
		handleSearch();
	}, [price_lists]);

	const handleSearch = () => {
		let newShowList = [];
		price_lists.map(each => {
			if (each.title.includes(searchText) || each.content.includes(searchText) || each.price.toString().includes(searchText)) {
				newShowList.push(each);
			}
		});
		setShowList(newShowList);
	};
	const handleDelete = (id) => {
		if (!confirm(`Do you really want to delete this item ?   ID: ${id}`)) return;
		axios.delete(`/price_lists/${id}`).then(res => {
			if (res.data.affectedRows) {
				dispatch(REMOVE_ITEM_IN_PRICE_LISTS(id));
			}
		});
	};

	return (
		<>
			<div>
				<Button className='px-4 py-1 mb-4 rounded' onClick={() => navigate('/setting/price_list/new')} variant="contained" >
					<AddIcon />Add a price list item
				</Button>
				<br />
				{showList.length > 0 &&
					<List className={clsx(classes.dataList, 'mb-4')}>
						<ListItem key='search-bar' className={classes.searchBar}>
							<SearchIcon onClick={() => handleSearch()} style={{ cursor: 'pointer' }} />
							<input placeholder='Seach price list...' type='text'
								value={searchText} onChange={e => setSearchText(e.target.value)}
								onKeyDown={e => e.key === "Enter" ? handleSearch() : null}
							/>
							<CancelIcon onClick={() => setSearchText('')} style={{ cursor: 'pointer' }} />
						</ListItem>
						{
							showList.map(each => (
								<ListItem className={classes.priceListItem} key={each.id}>
									<div className='flex flex-col'>
										<Typography variant="subtitle1">{each.title}</Typography>
										<Typography variant='caption'>{each.content}</Typography>
									</div>
									<div style={{ flexGrow: 1 }} />
									<div className='flex flex-col text-right'>
										<Typography variant="subtitle2">${each.price}</Typography>
										<Typography variant='caption'>
											{
												each.material_list.length > 0 ?
													(each.material_list.length === 1 ? '1 material' : `${each.material_list.length} materials`)
													: 'No Material'
											},
										</Typography>
										<Typography variant='caption'>
											{
												each.labour_list.length > 0 ?
													(each.labour_list.length === 1 ? '1 labour' : `Includes ${each.labour_list.length} labours`)
													: 'No labour'
											}
										</Typography>
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
							))
						}
					</List>
				}

				{showList.length === 0 && <Typography variant='overline'>No data</Typography>}
			</div>
		</>
	)
}
