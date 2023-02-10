import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Box, Paper, Divider,
	Typography, Button,
	Dialog
} from '@mui/material';
import { makeStyles, styled } from '@mui/styles';
import clsx from 'clsx';

import SpaceTag from '../../../components/SpaceTag';
import PriceInput from '../../../components/price_list/PriceInput';
import PriceItem from '../../../components/price_list/PriceItem';
import MaterialItem from '../../../components/price_list/MaterialItem';
import Draggable from 'react-draggable';
import DraggableList from 'react-draggable-list';
import CurrencyInput from 'react-currency-input-field';

const useStyles = makeStyles(theme => ({
	root: {
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
	}
}));

const temp_list = [
	{
		id: 1,
		product_code: 324,
		title: 'first',
		price: '100',
		foreach: 'bag',
		markup: '0.5',
		brand: 'X',
		category_id: 1
	},
	{
		id: 2,
		product_code: 199,
		title: 'second',
		price: '200',
		foreach: 'kg',
		markup: '0.5',
		brand: 'Z',
		category_id: 1
	},
	{
		id: 3,
		product_code: 1234156,
		title: 'third',
		price: '50',
		foreach: 'bag',
		markup: '0',
		brand: 'XXX',
		category_id: 2
	},
	{
		id: 4,
		product_code: '',
		title: '',
		price: '',
		foreach: '',
		markup: '',
		brand: '',
		category_id: ''
	},
]



export default function AddPriceListPage(props) {
	const classes = useStyles(props);
	const navigate = useNavigate();
	const [materialModal, setMaterialModal] = useState(false);
	const [labourModal, setLabourModal] = useState(false);

	const [rerenderFlag, setRerenderFlag] = useState(1);
	const [materialList, setMaterialList] = useState(temp_list);
	const totalMaterial = useRef({ price: 0, markup: 0 });
	// const [totalMaterial, setTotalMaterial] = useState({ price: 0, markup: 0 });
	const [labourList, setLabourList] = useState(temp_list);
	const totalLabour = useRef({ price: 0, markup: 0 });
	// const [totalLabour, setTotalLabour] = useState({ price: 0, markup: 0 });
	const [price, setPrice] = useState(0);

	useEffect(() => {
		calcTotalMaterial();
	}, [materialList]);
	useEffect(() => {
		calcTotalLabour();
	}, [labourList]);


	const _forceRerender = () => setRerenderFlag(rerenderFlag + 1);
	const calcTotalMaterial = () => {
		let resultTotal = { price: 0, markup: 0 };
		materialList.map(each => {
			let price = Number(each.price);
			let markup = 1 + Number(each.markup);
			resultTotal.price += price;
			resultTotal.markup += price * markup;
			console.log(price, markup)
		})
		totalMaterial.current = resultTotal;
		_forceRerender();
		// console.log(resultTotal, totalMaterial, materialList);
	}
	const calcTotalLabour = () => {
		let resultTotal = { price: 0, markup: 0 };
		labourList.map(each => {
			let price = Number(each.price);
			let markup = 1 + Number(each.markup);
			resultTotal.price += price;
			resultTotal.markup += price * markup;
		})
		totalLabour.current = resultTotal;
		_forceRerender();
	}
	const handleMaterialListChange = (val, category, targetItem) => {
		const newList = materialList.map(each => each.id === targetItem.id ? { ...targetItem, [category]: val } : each);
		setMaterialList(newList);
	};
	const handleLabourListChange = (val, category, targetItem) => {
		const newList = labourList.map(each => each.id === targetItem.id ? { ...targetItem, [category]: val } : each);
		setLabourList(newList);
	};

	return (
		<>
			<Box className={clsx(classes.root, 'w-3/5 min-h-screen, px-8, py-8')}>
				<Typography variant='overline'>Price list</Typography>
				<Typography variant='h5'>Add a price list item</Typography>
				<Typography variant='subtitle2'>Save work you do regularly to cost work faster.</Typography>
				<Divider />
				<SpaceTag h={1} />

				<Paper className='flex flex-col input-list' elevation={8}>
					<input className='input-text input-title' type="text" placeholder='Give this work a title' />
					{/* <input className='input-text' type="text" placeholder='Description of work...' /> */}
					<textarea className='input-text input-description' placeholder='Description of work...' rows={6} />
				</Paper>
				<SpaceTag h={1} />

				<PriceItem className="w-1/2" label="Material" onClick={() => setMaterialModal(true)} >
					<PriceInput className='w-1/3' value={totalMaterial.current.price} staticText={true} />
					<PriceInput className='w-1/3' value={totalMaterial.current.markup} staticText={true} />
				</PriceItem>
				<PriceItem className="w-1/2" label="Labour" onClick={() => setLabourModal(true)}>
					<PriceInput className='w-1/3' value={totalLabour.current.price} staticText={true} />
					<PriceInput className='w-1/3' value={totalLabour.current.markup} staticText={true} />
				</PriceItem>
				<PriceItem className="w-1/2" label="Price">
					<PriceInput className='w-1/3' value={price} onValueChange={(value, name) => setPrice(value)} />
				</PriceItem>
				<PriceItem className="w-1/2" label="Total Price">
					<PriceInput className='w-1/3' value={totalMaterial.current.price + totalLabour.current.price - price} staticText={true} />
					<PriceInput className='w-1/3' value={totalMaterial.current.markup + totalLabour.current.markup - price} staticText={true} />
				</PriceItem>
				<Divider />
				<SpaceTag h={2} />

				<div className='flex justify-center'>
					<Button className='mx-4 rounded' color="secondary" variant="contained">Add to Price List</Button>
					<Button className='mx-4 rounded' color="inherit" variant="outlined" onClick={() => navigate('/setting/price_list')}>Discard</Button>
				</div>
			</Box>



			<Dialog open={materialModal} PaperComponent={PaperComponent}>
				<div id="draggable-dialog-title"
					style={{
						display: 'flex', justifyContent: 'space-between',
						padding: '1.5rem', paddingBottom: '1rem',
						cursor: 'move'
					}}
				>
					<div>
						<Typography variant='h5'>Material Costs</Typography>
						<Typography variant='body1'>${0} - ${0}		ex. markup</Typography>
					</div>
					<Button variant="outlined" onClick={() => setMaterialModal(false)}>Done</Button>
				</div>
				{/* <Divider /> */}
				<div id="dialog-content" style={{ padding: '1.5rem', paddingTop: '0.5rem' }}>
					<DraggableList list={materialList} itemKey="id"
						template={MaterialItem}
						onMoveEnd={(newList) => setMaterialList(newList)}
						commonProps={{
							'handleEachValueChange': handleMaterialListChange
						}}
					>
					</DraggableList>
				</div>
			</Dialog>
			<Dialog open={labourModal} PaperComponent={PaperComponent}>
				<div id="draggable-dialog-title"
					style={{
						display: 'flex', justifyContent: 'space-between',
						padding: '1.5rem', paddingBottom: '1rem',
						cursor: 'move'
					}}
				>
					<div>
						<Typography variant='h5'>Material Costs</Typography>
						<Typography variant='body1'>${totalLabour.price} - ${totalLabour.markup}		ex. markup</Typography>
					</div>
					<Button variant="outlined" onClick={() => setLabourModal(false)}>Done</Button>
				</div>
				{/* <Divider /> */}
				<div id="dialog-content" style={{ padding: '1.5rem', paddingTop: '0.5rem' }}>
					<DraggableList list={labourList} itemKey="id"
						template={MaterialItem}
						onMoveEnd={(newList) => setLabourList(newList)}
						commonProps={{
							'handleEachValueChange': handleLabourListChange
						}}
					>
					</DraggableList>
				</div>
			</Dialog>
		</>
	)
}



const PaperComponent = ({ style, ...others }) => (
	<Draggable
		handle="#draggable-dialog-title"
		cancel={'[class*="MuiDialogContent-root"]'}
	>
		<Paper style={{ ...style, maxWidth: 'none', width: '80%' }} {...others} />
	</Draggable>
);