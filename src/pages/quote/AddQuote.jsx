import axios from 'axios';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	SET_PRICE_LISTS, REMOVE_ITEM_IN_PRICE_LISTS,
	SET_NEW_MATERIAL_LIST, ADD_ITEM_IN_NEW_MATERIAL_LIST,
	SET_NEW_LABOUR_LIST, ADD_ITEM_IN_NEW_LABOUR_LIST,
	ADD_ITEM_IN_QUOTES
} from '@store/actions';

import { AddCircleOutlined as AddIcon, SearchOutlined as SearchIcon, CancelOutlined as CancelIcon, DeleteOutlined as DeleteIcon } from '@mui/icons-material';
import { Box, Paper, Divider, Typography, Button, Dialog } from '@mui/material';
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

import { _generateNewID, limitDecimal, parseJSON } from '@utils/price';




const useStyles = makeStyles(theme => ({
	root: {
		width: '45%',
		margin: '2rem',
		padding: '3rem',
		[theme.breakpoints.down('lg')]: {
			width: '100%',
			padding: '1rem 2rem',
		},
	},
	inputsContainer: {
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
		'&.drag-selected': {
			background: theme.palette.neutral[300],
			'& .price-list-item-container': {
				borderTop: 0,
			},
		},
		'& .price-list-item-container': {
			width: '100%',
			display: 'flex',
			padding: '1rem 1.5rem',
			borderTop: `1px dashed ${theme.palette.divider}`,
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
	},

	priceListSearchBar: {
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
		display: 'flex',
		alignItems: 'center',
		width: '100%',
		'& > .info-section-1': {
			flexGrow: 1
		},
		'& > .info-section-2': {
		},
		'& > .add-item-btn': {
			padding: '0.25rem 0.5rem',
			borderRadius: '0.25rem',
		},
	},
}));


const initailPriceListItem = () => ({
	id: _generateNewID(), title: '', content: '',
	material_list: [], labour_list: [], price: 0,

	totalMaterial: { price: 0, markup_price: 0 },
	totalLabour: { price: 0, markup_price: 0 },
	vat: 0
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
export default function AddQuotePage(props) {
	const classes = useStyles(props);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { price_lists } = useSelector(state => state);
	const { material_list, labour_list } = useSelector(state => state.material_labour_list);

	const [forceRerender, setForceRerender] = useState(100);
	const [newData, setNewData] = useState(initialData);

	const [priceListModal, setPriceListModal] = useState(false);
	const [materialModal, setMaterialModal] = useState(false);
	const [labourModal, setLabourModal] = useState(false);

	const allPriceListsRef = useRef(initialData.pricelist_data_list);
	const [selectedIndex, setSelectedPriceListIndex] = useState(0);
	let selectedItem = allPriceListsRef.current[selectedIndex];


	const _forceRerender = () => setForceRerender(forceRerender + 1);
	const _getAllPriceLists = async () => {
		const res = await axios.get('/price_lists');
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
	}
	useEffect(() => {
		if (price_lists.length === 0) _getAllPriceLists();
		return () => {
			dispatch(SET_NEW_MATERIAL_LIST([]));
			dispatch(SET_NEW_LABOUR_LIST([]));
		}
	}, []);

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



	const selectedPriceList = (targetID) => {
		const targetIndex = allPriceListsRef.current.findIndex(e => e.id === targetID);
		if (targetIndex !== -1)
			setSelectedPriceListIndex(targetIndex);
	};
	const onAddBlank = () => {
		let buffList = newData.pricelist_data_list;
		buffList.push(initailPriceListItem());
		setNewData({ ...newData, pricelist_data_list: buffList });
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
	const handleAddQuote = () => {
		const newQuote = {
			...newData,
			pricelist_data_list: JSON.stringify(allPriceListsRef.current),
		}
		axios.post('/quotes', newQuote).then(res => {
			if (res.data.affectedRows) {
				dispatch(ADD_ITEM_IN_QUOTES({ ...newQuote, id: res.data.insertId }));
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

		return (
			<div key={item.id}
				className={clsx(classes.priceListItemBox, itemSelected !== 0 ? 'drag-selected' : '')}
				{...dragHandleProps}
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
								_forceRerender();
							}}
						/>
						<textarea className='input-text input-pricelist-description' placeholder='Description of work...' rows={6}
							value={item.content}
							onChange={e => {
								item.content = e.target.value;
								_forceRerender();
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
									_forceRerender();
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
										_forceRerender();
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
				<Button className='px-2 py-0 mb-4 rounded' variant="outlined"
					onClick={() => onPriceListItemDelete(item.id)}
				>
					<DeleteIcon />
					Delete
				</Button>
			</div>
		);
	}
	return (
		<>
			<Paper className={clsx(classes.root, 'min-h-screen')} elevation={4}>
				<Typography variant='h5'>Add a new quote</Typography>
				<Divider />


				<DraggableList list={allPriceListsRef.current} itemKey="id" template={PriceListItemComponent}
					onMoveEnd={(newList) => { allPriceListsRef.current = newList; _forceRerender(); }}
				/>
				{/* {allPriceListsRef.current.map(
					(each, index) => (
						<div key={each.id} className={classes.priceListItemBox}>
							<div className='price-list-item-container' style={{ borderTop: '1px dashed #000' }}>
								<Paper className='section-1' elevation={8}>
									<input className='input-text input-pricelist-title' type="text" placeholder='Give this work a title'
										value={each.title}
										onChange={e => {
											each.title = e.target.value;
											_forceRerender();
										}}
									/>
									<textarea className='input-text input-pricelist-description' placeholder='Description of work...' rows={6}
										value={each.content}
										onChange={e => {
											each.content = e.target.value;
											_forceRerender();
										}}
									/>
								</Paper>
								<div className='section-2'>
									<PriceItem label="Material"
										onClick={() => {
											setMaterialModal(true);
											setSelectedPriceListIndex(index);
										}}
									>
										<PriceInput value={each.totalMaterial.markup_price} staticText={true} />
									</PriceItem>
									<PriceItem label="Labour"
										onClick={() => {
											setLabourModal(true);
											setSelectedPriceListIndex(index);
										}}
									>
										<PriceInput value={each.totalLabour.markup_price} staticText={true} />
									</PriceItem>
									<PriceItem label="Price">
										<PriceInput value={each.price}
											onValueChange={(value, name) => {
												each.price = value;
												_forceRerender();
											}}
										/>
									</PriceItem>
									<PriceItem label="Sub Total">
										<Typography className='w-auto' color='primary' variant='button' align='right'>
											$ {
												limitDecimal(
													each.totalMaterial.markup_price + each.totalLabour.markup_price
													- each.price
												)
											}
										</Typography>
									</PriceItem>
									<PriceItem label="VAT">
										<ItemComponent>
											<p>%</p>
											<DecimalInput value={each.vat} style={{ textAlign: 'right' }}
												onSetValue={val => {
													each.vat = val;
													_forceRerender();
												}}
											/>
										</ItemComponent>
									</PriceItem>
									<PriceItem label="Total">
										<Typography className='w-auto' color='primary' variant='button' align='right'>
											$ {
												limitDecimal(
													(each.totalMaterial.markup_price + each.totalLabour.markup_price - each.price)
													* (1 + each.vat / 100)
												)
											}
										</Typography>
									</PriceItem>
									<Divider />
								</div>
							</div>
							<Button className='px-2 py-0 mb-4 rounded' variant="outlined"
								onClick={() => onPriceListItemDelete(each.id)}
							>
								<DeleteIcon />
								Delete
							</Button>
						</div>
					))
				} */}

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


				<Dialog open={priceListModal} PaperComponent={DraggablePaper} onClose={() => setPriceListModal(false)}>
					<div id="draggable-dialog-title" style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem', paddingBottom: '1rem', cursor: 'move' }}>
						<Typography variant='h5'>Add from price list</Typography>
						<Button variant="outlined" onClick={() => setPriceListModal(false)}>Close</Button>
					</div>
					<br />
					<br />
					<div id="dialog-content" style={{ padding: '1.5rem', paddingTop: '0.5rem' }}>
						<div className={classes.priceListSearchBar}>
							<SearchIcon onClick={() => { }} style={{ cursor: 'pointer' }} />
							<input placeholder='Seach price list...' type='text'
								// value={searchText} onChange={e => { }}
								onKeyDown={e => e.key === "Enter" ? () => { } : null}
							/>
							<CancelIcon onClick={() => setSearchText('')} style={{ cursor: 'pointer' }} />
						</div>

						{price_lists.map(each => (
							<div key={each.id} className={classes.priceListItem}>
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
							</div>
						))}
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



				<div className={classes.inputsContainer}>
					<div>
						<Typography variant='subtitle2'>Company name <Typography variant="caption">(optional)</Typography></Typography>
						<ItemComponent>
							<input placeholder='e.g. ***. Inc'
								value={newData.company_name} onChange={e => setNewData({ ...newData, company_name: e.target.value })}
							/>
						</ItemComponent>
					</div>
					<div>
						<Typography variant='subtitle2'>Building number <Typography variant="caption">(optional)</Typography></Typography>
						<div className={classes.inputsRow}>
							<ItemComponent>
								<input placeholder="Building number" value={newData.building_number} onChange={e => setNewData({ ...newData, building_number: e.target.value })} />
							</ItemComponent>
							<ItemComponent>
								<input placeholder="Postcode" value={newData.post_code} onChange={e => setNewData({ ...newData, post_code: e.target.value })} />
							</ItemComponent>
						</div>
					</div>
					<div>
						<Typography variant='subtitle2'>Email</Typography>
						<div className={classes.inputsRow}>
							<ItemComponent>
								<input placeholder="example@gmail.com" value={newData.email} onChange={e => setNewData({ ...newData, email: e.target.value })} />
							</ItemComponent>
							<ItemComponent>
								<PhoneInput placeholder="+359 ** *** ****" defaultCountry="BG"
									value={newData.phone} onChange={val => setNewData({ ...newData, phone: val })}
								/>
							</ItemComponent>
						</div>
					</div>
					<Divider />
				</div>

				<div className='flex justify-center mt-6'>
					<Button className='mx-4 rounded' color="secondary" variant="contained" onClick={handleAddQuote}>Add this quote</Button>
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