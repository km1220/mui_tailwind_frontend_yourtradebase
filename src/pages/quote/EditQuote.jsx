import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	SET_PRICE_LISTS,
	SET_NEW_MATERIAL_LIST, ADD_ITEM_IN_NEW_MATERIAL_LIST,
	SET_NEW_LABOUR_LIST, ADD_ITEM_IN_NEW_LABOUR_LIST,
	SET_QUOTES, UPDATE_ITEM_IN_QUOTES,
	LOADING  
} from '@store/actions';

import { AddCircleOutlined as AddIcon, SearchOutlined as SearchIcon, CancelOutlined as CancelIcon, DeleteOutlined as DeleteIcon, Height as HeightIcon } from '@mui/icons-material';
import { Box, Paper, Divider, Typography, Button, IconButton, Dialog, List, ListItem } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';


import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

import ItemComponent from '@components/price_list/ItemComponent';
import PriceInput from '@components/price_list/PriceInput';
import DecimalInput from '@components/price_list/DecimalInput';
import PriceItem from '@components/price_list/PriceItem';
import MaterialItem from '@components/price_list/MaterialItem';
import LabourItem from '@components/price_list/LabourItem';

import DraggableList from 'react-draggable-list';
import DraggablePaper from '../setting/DraggablePaper';
import MaterialLabourDialog from '../setting/MaterialLabourDialog';

import { _generateNewID, limitDecimal, parseJSON } from '@utils';





const useStyles = makeStyles(theme => ({
	root: {
		width: '60%',
		margin: '2rem',
		padding: '3rem',
		[theme.breakpoints.down('lg')]: {
			width: '100%',
			padding: '1rem 2rem',
		},
	},
	inputsWrapper: {
		display: 'flex',
		flexDirection: 'column',

		'& > *:not(:first-child)': {
			marginTop: '1rem',
		},
	},
	inputsRow: {
		display: 'flex',
		alignItems: 'end',
		'& :not(:first-child)': {
			marginLeft: '1rem',
			marginTop: '0',
		},
		[theme.breakpoints.down('md')]: {
			flexDirection: 'column',
			alignItems: 'center',
			'& > *': {
				width: '100%',
				'&:not(:first-child)': {
					marginLeft: '0',
					marginTop: '1rem',
				},
			},
		},
	},
	priceListItemBox: {
		padding: '1rem 1.5rem',
		'&.drag-selected': {
			background: theme.palette.neutral[300],
			// '& .price-list-item-container': {
			// },
		},
		'& .price-list-item-container': {
			width: '100%',
			display: 'flex',
			[theme.breakpoints.down('md')]: {
				flexDirection: 'column',
				alignItems: 'center',
			},

			'& .section-1': {
				display: 'flex',
				flexDirection: 'column',
				flexGrow: 1,
				padding: '0.75rem 1rem',
				height: 'fit-content',
				[theme.breakpoints.down('md')]: {
					width: '100%',
				},
				'& .input-text': {
					padding: '0.25rem 0',
					fontSize: '0.875rem',
				},
				'& .input-pricelist-title': {
					fontSize: '1.125rem',
					fontWeight: 700,
				},
				'& .input-pricelist-description': {
					resize: 'none',
				}
			},
			'& .section-2': {
				flexBasis: '35%',
				[theme.breakpoints.down('md')]: {
					marginTop: '1rem',
					marginBottom: '1rem',
					minWidth: '80%',
				},
				'& > *': {
					marginLeft: '2rem',
					// marginRight: '2rem',
					'& > .MuiButton-root, .MuiTypography-button': {
						width: '40%',
						padding: '0.25rem 0.5rem',
						[theme.breakpoints.down('md')]: {
							width: '50%',
						},
					}
				},
			},
		},
		'& .action-bar': {
			display: 'flex',
			'& .MuiButton-root': {
				padding: '0 0.5rem',
				borderRadius: '0.2rem',
				// px-2 py-0 rounded
			},
		}
	},

	priceListSearchBar: {
		display: 'flex',
		color: theme.palette.neutral[400],
		border: `1px solid ${theme.palette.divider}`,
		borderRadius: '0.25rem',
		'& input': {
			flexGrow: 1,
			color: theme.palette.common.black,
		},
		'& > *:not(:first-child)': {
			marginLeft: '1rem',
		},
	},
	priceListSelectBox: {
		padding: '0 !important',
		border: `1px solid ${theme.palette.divider}`,
		borderRadius: '0.25rem',
		color: theme.palette.primary.main,
	},
	priceListItem: {
		display: 'flex',
		alignItems: 'center',
		width: '100%',
		'&:not(:first-child)': {
			borderTop: `1px solid ${theme.palette.divider}`,
		},
		'& > *:not(:first-child)': {
			marginLeft: '1rem',
		},

		'& > .info-section-1': {
			flexGrow: 1
		},
		'& > .info-section-2': {
		},
		'& > .add-item-btn': {
			// padding: '0.25rem 0.5rem',
			borderRadius: '0.25rem',
		},
	},
}));


const initailPriceListItem = () => ({
	id: _generateNewID(), title: '', content: '',
	material_list: [], labour_list: [],
	totalMaterial: { price: 0, markup_price: 0 },
	totalLabour: { price: 0, markup_price: 0 },
	price: 0, vat: 0
});
const initialData = {
	// id: _generateNewID(),
	pricelist_data_list: [initailPriceListItem()],
	company_name: "",
	building_number: "",
	post_code: "",
	email: "",
	phone: ""
};
export default function EditQuotePage(props) {
	const { id: paramID } = useParams();
	const classes = useStyles(props);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const all_quotes = useSelector(state => state.quotes);
	const { price_lists } = useSelector(state => state);
	const { material_list, labour_list } = useSelector(state => state.material_labour_list);

	const [forceRerender, setForceRerender] = useState(100);
	const [editData, setEditData] = useState(initialData);

	const [priceListModal, setPriceListModal] = useState(false);
	const [materialModal, setMaterialModal] = useState(false);
	const [labourModal, setLabourModal] = useState(false);

	const allPriceListsRef = useRef(initialData.pricelist_data_list);
	const [selectedIndex, setSelectedPriceListIndex] = useState(0);
	let selectedItem = allPriceListsRef.current[selectedIndex];

	const [searchText, setSearchText] = useState('');
	const [searchedPriceLists, setSearchedPriceLists] = useState([]);


	const _getAllQuotes = () => {
		dispatch(LOADING(true));
		axios.get('/quotes').then(res => {
			if (!res.data.quotes) {
				alert('Getting QUOTE data Error!');
				return;
			}
			let all_list = res.data.quotes.map(each => ({
				...each,
				pricelist_data_list: parseJSON(each.pricelist_data_list),
			}));
			dispatch(SET_QUOTES(all_list));
			dispatch(LOADING(false));
		}).catch(err => console.log(err));
	}
	const _getAllPriceLists = () => {
		dispatch(LOADING(true));
		axios.get('/price_lists').then(res => {
			if (!res.data.price_lists) {
				alert('Getting Price list data Error!');
				return;
			}
			let all_list = res.data.price_lists.map(each => ({
				...each,
				material_list: parseJSON(each.material_list),
				labour_list: parseJSON(each.labour_list),
			}));
			dispatch(SET_PRICE_LISTS(all_list));
			dispatch(LOADING(false));
		}).catch(err => console.log(err));
	};

	const _forceRerender = () => setForceRerender(forceRerender + 1);
	useEffect(() => {
		if (all_quotes.length === 0) _getAllQuotes();
		if (price_lists.length === 0) _getAllPriceLists();
		return () => {
			dispatch(SET_PRICE_LISTS([]));
			dispatch(SET_NEW_MATERIAL_LIST([]));
			dispatch(SET_NEW_LABOUR_LIST([]));
		}
	}, []);
	useEffect(() => {
		if (all_quotes.length === 0) return;
		const targetData = all_quotes.filter(e => e.id === Number(paramID))[0];
		if (!targetData)
			navigate('/quote');
		else
			setEditData(targetData);
	}, [all_quotes]);
	useEffect(() => {
		if (!editData) return;
		if (!editData.pricelist_data_list || editData.pricelist_data_list.length === 0) {
			allPriceListsRef.current = initialData.pricelist_data_list;
		}
		else {
			allPriceListsRef.current = editData.pricelist_data_list;

			dispatch(SET_NEW_MATERIAL_LIST(editData.pricelist_data_list[selectedIndex].material_list));
			dispatch(SET_NEW_LABOUR_LIST(editData.pricelist_data_list[selectedIndex].labour_list));
		}
	}, [editData]);
	useEffect(() => {
		dispatch(SET_NEW_MATERIAL_LIST(selectedItem.material_list));
		dispatch(SET_NEW_LABOUR_LIST(selectedItem.labour_list));
	}, [selectedIndex]);
	useEffect(() => {
		selectedItem.material_list = material_list;		// update [allPriceListsRef].material_list   from redux_store.material_list when material_list is changed
		selectedItem.totalMaterial = calcTotalPrice(material_list);
	}, [material_list, material_list.length]);
	useEffect(() => {
		selectedItem.labour_list = labour_list;		// update [allPriceListsRef].labour_list   from redux_store.labour_list when labour_list is changed
		selectedItem.totalLabour = calcTotalPrice(labour_list);
	}, [labour_list, labour_list.length]);

	useEffect(() => {
		setSearchedPriceLists(price_lists);
	}, [price_lists]);



	const selectedPriceList = (targetID) => {
		const targetIndex = allPriceListsRef.current.findIndex(e => e.id === targetID);
		if (targetIndex !== -1)
			if (targetIndex === selectedIndex) {
				dispatch(SET_NEW_MATERIAL_LIST(selectedItem.material_list));
				dispatch(SET_NEW_LABOUR_LIST(selectedItem.labour_list));
			}
			else
				setSelectedPriceListIndex(targetIndex);
	};
	const onAddBlank = () => {
		let buffList = editData.pricelist_data_list;
		buffList.push(initailPriceListItem());
		setEditData({ ...editData, pricelist_data_list: buffList });
	};
	const onAddFromPriceList = () => {
		setPriceListModal(true);
	};
	const onPriceListItemAdd = (itemData) => {
		const newItem = {
			...itemData,
			id: _generateNewID(),
			totalMaterial: calcTotalPrice(itemData.material_list),
			totalLabour: calcTotalPrice(itemData.labour_list),
			vat: 0
		};
		allPriceListsRef.current.push(newItem);
		setPriceListModal(false);
	};
	const onPriceListItemDelete = (targetID) => {
		for (let i = 0; i < allPriceListsRef.current.length; i++) {
			if (allPriceListsRef.current[i].id === targetID) {
				allPriceListsRef.current.splice(i, 1);
				break;
			}
		}
		_forceRerender();
	};



	const handlePriceListSearch = () => {
		let newShowList = [];
		price_lists.map(each => {
			if (each.title.includes(searchText) || each.content.toString().includes(searchText) || each.price.toString().includes(searchText)) {
				newShowList.push(each);
			}
		});
		setSearchedPriceLists(newShowList);
	};
	const handleUpdateQuote = () => {
		const updateQuote = {
			...editData,
			pricelist_data_list: JSON.stringify(allPriceListsRef.current)
		};
		axios.put(`/quotes/${editData.id}`, updateQuote).then(res => {
			console.log(res)

			if (res.data.affectedRows) {
				dispatch(UPDATE_ITEM_IN_QUOTES({ ...updateQuote, id: editData.id }));

				navigate('/quote');
			}
		}).catch(err => {
			if (err.response.status === 400) alert(err.response.data);
			else if (err.response.status === 403) alert(err.response.data);
		});
	};


	const PriceListItemComponent = ({ item, itemSelected, dragHandleProps, ...others }) => {
		const scale = itemSelected * 0.0001 + 1;
		const shadow = itemSelected * 5 + 1;

		const [forceItemRerender, setForceItemRerender] = useState(100);
		const _forceItemRerender = () => setForceItemRerender(forceItemRerender + 1);

		return (
			<div key={item.id} className={clsx(classes.priceListItemBox, itemSelected !== 0 ? 'drag-selected' : '')}
				style={{
					transform: `scale(${scale})`,
					boxShadow: `rgba(0, 0, 0, 0.3) 0px ${shadow}px ${2 * shadow}px 0px`,
				}}
			>
				<div className='price-list-item-container'>
					<Paper className='section-1' elevation={8}>
						<input className='input-text input-pricelist-title' type="text" placeholder='Give this work a title'
							value={item.title}
							onChange={e => {
								item.title = e.target.value;
								_forceItemRerender();
							}}
						/>
						<textarea className='input-text input-pricelist-description' placeholder='Description of work...' rows={6}
							value={item.content}
							onChange={e => {
								item.content = e.target.value;
								_forceItemRerender();
							}}
						/>
					</Paper>
					<div className='section-2'>
						<PriceItem label="Material"
							onClick={() => {
								setMaterialModal(true);
								selectedPriceList(item.id);
							}}
						>
							<PriceInput value={item.totalMaterial.markup_price} staticText={true} />
						</PriceItem>
						<PriceItem label="Labour"
							onClick={() => {
								setLabourModal(true);
								selectedPriceList(item.id);
							}}
						>
							<PriceInput value={item.totalLabour.markup_price} staticText={true} />
						</PriceItem>
						<PriceItem label="Price">
							<PriceInput value={item.price}
								onValueChange={(value, name) => {
									item.price = value;
									_forceItemRerender();
								}}
							/>
						</PriceItem>
						<PriceItem label="Sub Total">
							<Typography className='w-auto' color='primary' variant='button' align='right'>
								$ {
									limitDecimal(
										item.totalMaterial.markup_price + item.totalLabour.markup_price
										- item.price
									)
								}
							</Typography>
						</PriceItem>
						<PriceItem label="VAT">
							<ItemComponent>
								<p>%</p>
								<DecimalInput value={item.vat} style={{ textAlign: 'right' }}
									onSetValue={val => {
										item.vat = val;
										_forceItemRerender();
									}}
								/>
							</ItemComponent>
						</PriceItem>
						<PriceItem label="Total">
							<Typography className='w-auto' color='primary' variant='button' align='right'>
								$ {
									limitDecimal(
										(item.totalMaterial.markup_price + item.totalLabour.markup_price - item.price)
										* (1 + item.vat / 100)
									)
								}
							</Typography>
						</PriceItem>
						<Divider />
					</div>
				</div>
				<div className='action-bar'>
					<Button variant="outlined" onClick={() => onPriceListItemDelete(item.id)}>
						<DeleteIcon />
						Delete
					</Button>
					<Button variant="outlined" onClick={() => onPriceListItemDelete(item.id)} {...dragHandleProps}>
						<HeightIcon />
					</Button>
				</div>
			</div>
		);
	}
	return (
		<>
			<Paper className={clsx(classes.root, 'min-h-screen')} elevation={4}>
				<Typography variant='h5'>Update a quote</Typography>
				<Divider />
				<br />

				<DraggableList list={allPriceListsRef.current} itemKey="id" template={PriceListItemComponent}
					onMoveEnd={(newList) => { allPriceListsRef.current = newList; _forceRerender(); }}
				/>

				<div>
					<Button className='px-4 py-1 mb-4 rounded' onClick={onAddBlank} color="secondary">
						<AddIcon />
						<p className='ml-2'>Add blank item</p>
					</Button>
					<Button className='px-4 py-1 mb-4 rounded' onClick={onAddFromPriceList} color="secondary">
						<AddIcon />
						<p className='ml-2'>Add from price list</p>
					</Button>
				</div>


				<Dialog open={priceListModal} PaperComponent={DraggablePaper} onClose={() => setPriceListModal(false)} PaperProps={{ style: { width: '60%' } }}>
					<div id="draggable-dialog-title" style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem', paddingBottom: '1rem', cursor: 'move' }}>
						<Typography variant='h5'>Add from price list</Typography>
						<Button variant="outlined" onClick={() => setPriceListModal(false)}>Close</Button>
					</div>
					<br />
					<div id="dialog-content" style={{ padding: '1.5rem', paddingTop: '0.5rem' }}>
						<div className={classes.priceListSearchBar}>
							<IconButton style={{ cursor: 'pointer' }} disableRipple disableFocusRipple >
								<SearchIcon />
							</IconButton>
							<input placeholder='Seach price list...' type='text'
								value={searchText} onChange={e => setSearchText(e.target.value)}
								onKeyDown={e => e.key === "Enter" ? handlePriceListSearch() : null}
							/>
							<IconButton onClick={() => setSearchText('')} style={{ cursor: 'pointer' }}>
								<CancelIcon />
							</IconButton>
						</div>
						<br />
						<List className={classes.priceListSelectBox}>
							{searchedPriceLists.map(each => (
								<ListItem key={each.id} className={classes.priceListItem}>
									<div className='info-section-1'>
										<Typography variant='h5'>{each.title}</Typography>
										<Typography variant='caption'>{each.content}</Typography>
									</div>
									<div className='info-section-2'>
										<Typography variant='h5'>$ {each.price}</Typography>
									</div>

									<Button className='add-item-btn' onClick={() => onPriceListItemAdd(each)} color="secondary">
										<AddIcon />
										<p className='ml-2'>Add this item</p>
									</Button>
								</ListItem>
							))}
						</List>
					</div>
				</Dialog>

				<MaterialLabourDialog
					title='Material costs'
					itemList={material_list} itemTemplateComponent={MaterialItem}
					totalPrice={selectedItem?.totalMaterial.price}
					totalMarkupPrice={selectedItem?.totalMaterial.markup_price}
					open={materialModal} onClose={() => setMaterialModal(false)}
					onMoveEnd={(newList) => {
						// selectedItem.material_list = newList;
						dispatch(SET_NEW_MATERIAL_LIST(newList));
					}}
					onAddNewItem={() => {
						const newItem = {
							id: _generateNewID(selectedItem?.material_list),	// a random id for [temp_blank] material item
							product_code: '', title: '', price: '0',
							foreach: '', markup: '0', brand: '', category_id: ''
						};
						console.log('***********************************', newItem);
						// selectedItem.material_list.push(newItem);				// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
						dispatch(ADD_ITEM_IN_NEW_MATERIAL_LIST(newItem));
					}}
				/>
				<MaterialLabourDialog
					title='Labour rates'
					itemList={labour_list} itemTemplateComponent={LabourItem}
					totalPrice={selectedItem?.totalLabour.price}
					totalMarkupPrice={selectedItem?.totalLabour.markup_price}
					open={labourModal} onClose={() => setLabourModal(false)}
					onMoveEnd={(newList) => {
						// selectedItem.labour_list = newList;
						dispatch(SET_NEW_LABOUR_LIST(newList));
					}}
					onAddNewItem={() => {
						const newItem = {
							id: _generateNewID(selectedItem?.labour_list),	// a random id for [temp_blank] material item
							title: '', price: '0', per: '', markup: '0'
						};
						// selectedItem.labour_list.push(newItem);				// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
						dispatch(ADD_ITEM_IN_NEW_LABOUR_LIST(newItem));
					}}
				/>



				<Divider />
				<br />
				<div className={classes.inputsWrapper}>
					<div>
						<Typography variant='subtitle2'>Company name <Typography variant="caption">(optional)</Typography></Typography>
						<ItemComponent>
							<input placeholder='e.g. ***. Inc'
								value={editData.company_name} onChange={e => setNewData({ ...editData, company_name: e.target.value })}
							/>
						</ItemComponent>
					</div>
					<div>
						<Typography variant='subtitle2'>Building number <Typography variant="caption">(optional)</Typography></Typography>
						<div className={classes.inputsRow}>
							<ItemComponent>
								<input placeholder="Building number" value={editData.building_number} onChange={e => setNewData({ ...editData, building_number: e.target.value })} />
							</ItemComponent>
							<ItemComponent>
								<input placeholder="Postcode" value={editData.post_code} onChange={e => setNewData({ ...editData, post_code: e.target.value })} />
							</ItemComponent>
						</div>
					</div>
					<div>
						<Typography variant='subtitle2'>Email</Typography>
						<div className={classes.inputsRow}>
							<ItemComponent>
								<input placeholder="example@gmail.com" value={editData.email} onChange={e => setNewData({ ...editData, email: e.target.value })} />
							</ItemComponent>
							<ItemComponent>
								<PhoneInput value={editData.phone} onChange={val => setNewData({ ...editData, phone: val })} />
							</ItemComponent>
						</div>
					</div>
					<Divider />
				</div>

				<div className='flex justify-center mt-6'>
					<Button className='mx-4 rounded' color="secondary" variant="contained" onClick={handleUpdateQuote}>Update this quote</Button>
					<Button className='mx-4 rounded' color="disabled" variant="outlined" onClick={() => navigate('/quote')}>Discard</Button>
				</div>
			</Paper>
		</>
	)
}


const calcTotalPrice = (itemList) => {
	let resultTotal = { price: 0, markup_price: 0 };
	itemList.map(each => {
		let price = Number(each.price);
		let markup = 1 + Number(each.markup) / 100;
		resultTotal.price += price;
		resultTotal.markup_price += price * markup;
	})
	return {
		price: limitDecimal(resultTotal.price),
		markup_price: limitDecimal(resultTotal.markup_price)
	};
}