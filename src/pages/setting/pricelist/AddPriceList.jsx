import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
	SET_PRICE_LISTS, ADD_ITEM_IN_PRICE_LISTS,
	SET_NEW_MATERIAL_LIST, ADD_ITEM_IN_NEW_MATERIAL_LIST,
	SET_NEW_LABOUR_LIST, ADD_ITEM_IN_NEW_LABOUR_LIST,
	LOADING
} from '@store/actions';

import { Box, Paper, Divider, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

import { _generateNewID } from '@utils';

import PriceInput from '@components/price_list/PriceInput';
import PriceItem from '@components/price_list/PriceItem';
import MaterialItem from '@components/price_list/MaterialItem';
import LabourItem from '@components/price_list/LabourItem';

import MaterialLabourDialog from '../MaterialLabourDialog';

const useStyles = makeStyles(theme => ({
	root: {
		width: '60%',
		padding: '3rem',
		[theme.breakpoints.down('lg')]: {
			width: '100%',
			padding: '1rem 2rem',
		},
		'& .input-list': {
			padding: '0.625rem 1rem',
			'& .input-text': {
				padding: '0.25rem 0',
				fontSize: '0.875rem',
			},
			'& .input-title': {
				fontSize: '1.125rem',
				fontWeight: 700,
			},
			'& .input-description': {
				minHeight: '7rem',	// 8 rows
				maxHeight: '7rem',	// 8 rows
			}
		},
		'& ::-webkit-scrollbar': { width: '5px', },
		'& ::-webkit-scrollbar-track': { background: 'transparent', opacity: 0.5, },
		'& ::-webkit-scrollbar-thumb': { background: theme.palette.primary.dark, },
		'& ::-webkit-scrollbar-thumb:hover': { background: '#555', },
	},
	priceListContainer: {
		'& > *:not(:last-child)': {
			width: '50%',
			[theme.breakpoints.down(['md'])]: {
				width: '100%',
			}
		}
	},
}));

export default function AddPriceListPage(props) {
	const classes = useStyles(props);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { material_list, labour_list } = useSelector(state => state.material_labour_list);

	const [materialModal, setMaterialModal] = useState(false);
	const [labourModal, setLabourModal] = useState(false);

	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const totalMaterial = useRef({ price: 0, markup_price: 0 });
	const totalLabour = useRef({ price: 0, markup_price: 0 });
	const [price, setPrice] = useState(0);

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

	useEffect(() => {
		return () => {
			dispatch(SET_NEW_MATERIAL_LIST([]));
			dispatch(SET_NEW_LABOUR_LIST([]));
		}
	}, []);
	useEffect(() => { calcTotalMaterial(); }, [material_list]);
	useEffect(() => { calcTotalLabour(); }, [labour_list]);


	const calcTotalMaterial = () => {
		let resultTotal = { price: 0, markup_price: 0 };
		material_list.map(each => {
			let price = Number(each.price);
			let markup = 1 + Number(each.markup) / 100;
			resultTotal.price += price;
			resultTotal.markup_price += price * markup;
		})
		totalMaterial.current = resultTotal;
		// console.log(resultTotal, totalMaterial, materialList);
	}
	const calcTotalLabour = () => {
		let resultTotal = { price: 0, markup_price: 0 };
		labour_list.map(each => {
			let price = Number(each.price);
			let markup = 1 + Number(each.markup) / 100;
			resultTotal.price += price;
			resultTotal.markup_price += price * markup;
		})
		totalLabour.current = resultTotal;
	}

	const handleAddPriceList = () => {
		const newItem = {
			title: title, content: content,
			material_list: JSON.stringify(material_list), labour_list: JSON.stringify(labour_list),
			price: price
		};
		axios.post('/price_lists', newItem).then(res => {
			if (res.data.affectedRows) {
				_getAllPriceLists();
				dispatch(ADD_ITEM_IN_PRICE_LISTS({
					id: res.data.insertId, title: title, content: content,
					material_list: material_list, labour_list: labour_list,
					price: price
				}));
				navigate('/setting/price_list');
			}
		}).catch(err => {
			if (err.response.status === 400) alert(err.response.data);
			else if (err.response.status === 403) alert(err.response.data);
		});
	};

	return (
		<>
			<Box className={clsx(classes.root, 'min-h-screen')}>
				<Typography variant='overline'>Price list</Typography>
				<Typography variant='h4'>Add a price list item</Typography>
				<Typography variant='subtitle2'>Save work you do regularly to cost work faster.</Typography>
				<Divider />

				<Paper className='flex flex-col my-4 input-list' elevation={16}>
					<input className='input-text input-title' type="text" placeholder='Give this work a title'
						value={title} onChange={e => setTitle(e.target.value)} />
					<textarea className='input-text input-description' placeholder='Description of work...' rows={6}
						value={content} onChange={e => setContent(e.target.value)} />
				</Paper>

				<div className={classes.priceListContainer}>
					<PriceItem label="Material" onClick={() => setMaterialModal(true)} >
						<PriceInput className='w-1/3' value={totalMaterial.current.price} staticText={true} />
						<PriceInput className='w-1/3' value={totalMaterial.current.markup_price} staticText={true} />
					</PriceItem>
					<PriceItem label="Labour" onClick={() => setLabourModal(true)}>
						<PriceInput className='w-1/3' value={totalLabour.current.price} staticText={true} />
						<PriceInput className='w-1/3' value={totalLabour.current.markup_price} staticText={true} />
					</PriceItem>
					<PriceItem label="Price">
						<PriceInput className='w-1/3' value={price} onValueChange={(value, name) => setPrice(value)} />
					</PriceItem>
					<PriceItem label="Total Price">
						<PriceInput className='w-1/3' value={totalMaterial.current.price + totalLabour.current.price - price} staticText={true} />
						<PriceInput className='w-1/3' value={totalMaterial.current.markup_price + totalLabour.current.markup_price - price} staticText={true} />
					</PriceItem>
					<Divider />
				</div>

				<div className='flex justify-center mt-6'>
					<Button className='mx-4 rounded' color="secondary" variant="contained" onClick={handleAddPriceList}>Add to Price List</Button>
					<Button className='mx-4 rounded' color="disabled" variant="outlined" onClick={() => navigate('/setting/price_list')}>Discard</Button>
				</div>
			</Box>


			<MaterialLabourDialog
				itemList={material_list} itemTemplateComponent={MaterialItem}
				title='Material costs' totalPrice={totalMaterial.current.price} totalMarkupPrice={totalMaterial.current.markup_price}
				open={materialModal} onClose={() => setMaterialModal(false)} onMoveEnd={(newList) => dispatch(SET_NEW_MATERIAL_LIST(newList))}
				onAddNewItem={() =>
					dispatch(ADD_ITEM_IN_NEW_MATERIAL_LIST({
						id: _generateNewID(material_list),	// a random id for [temp_blank] material item
						product_code: '', title: '', price: '0',
						foreach: '', markup: '0', brand: '', category_id: ''
					}))
				}
			/>
			<MaterialLabourDialog
				itemList={labour_list} itemTemplateComponent={LabourItem}
				title='Labour rates' totalPrice={totalLabour.current.price} totalMarkupPrice={totalLabour.current.markup_price}
				open={labourModal} onClose={() => setLabourModal(false)} onMoveEnd={(newList) => dispatch(SET_NEW_LABOUR_LIST(newList))}
				onAddNewItem={() =>
					dispatch(ADD_ITEM_IN_NEW_LABOUR_LIST({
						id: _generateNewID(labour_list),	// a random id for [temp_blank] labour item
						title: '', price: '0', per: '', markup: '0'
					}))
				}
			/>
		</>
	)
}
