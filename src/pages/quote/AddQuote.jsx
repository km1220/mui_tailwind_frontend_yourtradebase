import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	SET_NEW_MATERIAL_LIST, ADD_ITEM_IN_NEW_MATERIAL_LIST,
	SET_NEW_LABOUR_LIST, ADD_ITEM_IN_NEW_LABOUR_LIST,
	ADD_ITEM_IN_QUOTES
} from '@store/actions';


import { Box, Paper, Divider, Typography, Button } from '@mui/material';
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

import MaterialLabourDialog from '../setting/MaterialLabourDialog';

import { _generateNewID, limitDecimal } from '@utils';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		padding: '3rem 10rem',
		[theme.breakpoints.down('md')]: {
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
	priceListContainer: {
		width: '100%',
		display: 'flex',
		padding: '1rem 1.5rem',
		[theme.breakpoints.down('md')]: {
			flexDirection: 'column',
			alignItems: 'center',
		},
	},
	priceListSection1: {
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
	priceListSection2: {
		flexBasis: '35%',
		[theme.breakpoints.down('md')]: {
			marginTop: '1rem',
			marginBottom: '1rem',
			minWidth: '80%',
		},
		'& > *': {
			marginLeft: '2rem',
			marginRight: '2rem',
			'& > .MuiButton-root, .MuiTypography-button': {
				width: '40%',
				padding: '0.25rem 0.5rem',
				[theme.breakpoints.down('md')]: {
					width: '50%',
				},
			}
		},
	},
}));


const initialData = {
	// id: _generateNewID(),
	pricelist_data_list: [
		{
			id: _generateNewID(), title: '', content: '',
			material_list: [], labour_list: [],
			totalMaterial: { price: 0, markup_price: 0 },
			totalLabour: { price: 0, markup_price: 0 },
			price: 0, vat: 0
		}
	],
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

	const [forceRerender, setForceRerender] = useState(100);
	const [newData, setNewData] = useState(initialData);
	const { material_list, labour_list } = useSelector(state => state.material_labour_list);
	const [materialModal, setMaterialModal] = useState(false);
	const [labourModal, setLabourModal] = useState(false);

	const allPriceListsRef = useRef(initialData.pricelist_data_list);
	const [selectedIndex, setSelectedPriceListIndex] = useState(0);
	let selectedItem = allPriceListsRef.current[selectedIndex];


	const _forceRerender = () => setForceRerender(forceRerender + 1);
	useEffect(() => {
		return () => {
			dispatch(SET_NEW_MATERIAL_LIST([]));
			dispatch(SET_NEW_LABOUR_LIST([]));
		}
	}, []);

	useEffect(() => {
		dispatch(SET_NEW_MATERIAL_LIST(selectedItem.material_list));
		dispatch(SET_NEW_LABOUR_LIST(selectedItem.labour_list));
	}, [selectedIndex]);
	useEffect(() => { calcTotalMaterial(); }, [material_list]);
	useEffect(() => { calcTotalLabour(); }, [labour_list]);



	const calcTotalMaterial = () => {
		let resultTotal = { price: 0, markup_price: 0 };
		selectedItem.material_list = material_list;		// update [allPriceListsRef].material_list   from redux_store.material_list
		material_list.map(each => {
			let price = Number(each.price);
			let markup = 1 + Number(each.markup) / 100;
			resultTotal.price += price;
			resultTotal.markup_price += price * markup;
		})
		selectedItem.totalMaterial = {
			price: limitDecimal(resultTotal.price),
			markup_price: limitDecimal(resultTotal.markup_price)
		};
		// console.log(resultTotal, 'selectedItem.material_list', selectedItem.material_list, 'material_list', material_list, selectedIndex);
	}
	const calcTotalLabour = () => {
		let resultTotal = { price: 0, markup_price: 0 };
		selectedItem.labour_list = labour_list;		// update [allPriceListsRef].labour_list   from redux_store.labour_list
		labour_list.map(each => {
			let price = Number(each.price);
			let markup = 1 + Number(each.markup) / 100;
			resultTotal.price += price;
			resultTotal.markup_price += price * markup;
		})
		selectedItem.totalLabour = {
			price: limitDecimal(resultTotal.price),
			markup_price: limitDecimal(resultTotal.markup_price)
		};
	}

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


	return (
		<>
			<Box className={clsx(classes.root, 'min-h-screen')}>
				<Typography variant='h5'>Add a new quote</Typography>
				<Divider />

				{allPriceListsRef.current.map(
					(each, index) => (
						<div key={each.id} className={classes.priceListContainer} style={{ borderTop: '1px dashed #000' }}>
							<Paper className={classes.priceListSection1} elevation={8}>
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
							<div className={classes.priceListSection2}>
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
									<Typography color='primary' variant='button' align='right'>
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
									<Typography color='primary' variant='button' align='right'>
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
					))}


				<MaterialLabourDialog
					title='Material costs'
					itemList={material_list} itemTemplateComponent={MaterialItem}
					totalPrice={selectedItem.totalMaterial.price}
					totalMarkupPrice={selectedItem.totalMaterial.markup_price}
					open={materialModal} onClose={() => setMaterialModal(false)}
					onMoveEnd={(newList) => {
						// selectedItem.material_list = newList;
						dispatch(SET_NEW_MATERIAL_LIST(newList));
					}}
					onAddNewItem={() => {
						const newItem = {
							id: _generateNewID(selectedItem.material_list),	// a random id for [temp_blank] material item
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
					totalPrice={selectedItem.totalLabour.price}
					totalMarkupPrice={selectedItem.totalLabour.markup_price}
					open={labourModal} onClose={() => setLabourModal(false)}
					onMoveEnd={(newList) => {
						// selectedItem.labour_list = newList;
						dispatch(SET_NEW_LABOUR_LIST(newList));
					}}
					onAddNewItem={() => {
						const newItem = {
							id: _generateNewID(selectedItem.labour_list),	// a random id for [temp_blank] material item
							title: '', price: '0', per: '', markup: '0'
						};
						// selectedItem.labour_list.push(newItem);				// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
						dispatch(ADD_ITEM_IN_NEW_LABOUR_LIST(newItem));
					}}
				/>



				<div className={classes.inputsContainer}>
					<div>
						<Typography variant='subtitle2'>Company name <Typography variant="caption">(optional)</Typography></Typography>
						<ItemComponent className="">
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
			</Box>
		</>
	)
}
