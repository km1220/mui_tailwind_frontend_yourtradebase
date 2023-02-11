import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
	SET_PRICE_LISTS,
	SET_NEW_MATERIAL_LIST, ADD_ITEM_IN_NEW_MATERIAL_LIST, UPDATE_ITEM_IN_NEW_MATERIAL_LIST, REMOVE_ITEM_IN_NEW_MATERIAL_LIST,
	SET_NEW_LABOUR_LIST, ADD_ITEM_IN_NEW_LABOUR_LIST, UPDATE_ITEM_IN_NEW_LABOUR_LIST, REMOVE_ITEM_IN_NEW_LABOUR_LIST,
	ADD_ITEM_IN_PRICE_LISTS, UPDATE_ITEM_IN_PRICE_LISTS, REMOVE_ITEM_IN_PRICE_LISTS
} from '../../../store/actions';

import {
	Box, Paper, Divider,
	Typography, Button,
	Dialog
} from '@mui/material';
import { AddCircleOutlineOutlined as AddIcon } from '@mui/icons-material';
import { makeStyles, styled } from '@mui/styles';
import clsx from 'clsx';

import { getRandomInt } from '@utils';

import SpaceTag from '@components/SpaceTag';
import PriceInput from '@components/price_list/PriceInput';
import PriceItem from '@components/price_list/PriceItem';
import MaterialItem from '@components/price_list/MaterialItem';
import LabourItem from '@components/price_list/LabourItem';
import Draggable from 'react-draggable';
import DraggableList from 'react-draggable-list';


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

export default function EditPriceList(props) {
	const { id: paramID } = useParams();
	const classes = useStyles(props);
	const navigate = useNavigate();
	const dispatch = useDispatch();



	const [editTargetData, setEditTargetData] = useState();
	const { price_lists: all_price_lists } = useSelector(state => state);
	const { material_list, labour_list } = useSelector(state => state.material_labour_list);

	const [materialModal, setMaterialModal] = useState(false);
	const [labourModal, setLabourModal] = useState(false);

	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const totalMaterial = useRef({ price: 0, markup: 0 });
	const totalLabour = useRef({ price: 0, markup: 0 });
	const [price, setPrice] = useState(0);

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
		calcTotalMaterial();
		calcTotalLabour();
		if (all_price_lists.length === 0) {
			_getAllPriceLists();
		}

		return () => {
			dispatch(SET_NEW_MATERIAL_LIST([]));
			dispatch(SET_NEW_LABOUR_LIST([]));
		}
	}, []);
	useEffect(() => {
		if (all_price_lists.length === 0) return;
		const targetData = all_price_lists.filter(e => e.id === Number(paramID))[0];
		if (!targetData) {
			navigate('/setting/price_list');
			return;
		}
		else {
			setEditTargetData(targetData);
			dispatch(SET_NEW_MATERIAL_LIST(targetData.material_list));
			dispatch(SET_NEW_LABOUR_LIST(targetData.labour_list));
		}
	}, [all_price_lists, all_price_lists.length]);
	useEffect(() => {
		calcTotalMaterial();
	}, [material_list, material_list.length]);
	useEffect(() => {
		calcTotalLabour();
	}, [labour_list, labour_list.length]);
	useEffect(() => {
		if (!editTargetData) return;
		setTitle(editTargetData.title);
		setContent(editTargetData.content);
		setPrice(editTargetData.price);
	}, [editTargetData]);


	const calcTotalMaterial = () => {
		let resultTotal = { price: 0, markup: 0 };
		material_list.map(each => {
			let price = Number(each.price);
			let markup = 1 + Number(each.markup);
			resultTotal.price += price;
			resultTotal.markup += price * markup;
		})
		totalMaterial.current = resultTotal;
		// console.log(resultTotal, totalMaterial, materialList);
	}
	const calcTotalLabour = () => {
		let resultTotal = { price: 0, markup: 0 };
		labour_list.map(each => {
			let price = Number(each.price);
			let markup = 1 + Number(each.markup);
			resultTotal.price += price;
			resultTotal.markup += price * markup;
		})
		totalLabour.current = resultTotal;
	}
	const handleMaterialDone = () => {
		setMaterialModal(false);
	}
	const handleLabourDone = () => {
		setLabourModal(false);
	}
	// const clarifyList = () => {
	// 	let newList = [];
	// 	material_list.map(each => {
	// 		if (each.id > 100) // all [temp_blank] ids are over 100
	// 			continue;
	// 		else
	// 			newList.push(each);
	// 	});
	// 	dispatch(SET_NEW_MATERIAL_LIST(newList);
	// };

	const handleUpdatePriceList = () => {
		const newItem = {
			title: title, content: content,
			material_list: JSON.stringify(material_list), labour_list: JSON.stringify(labour_list),
			price: price
		};
		axios.put(`/price_lists/${editTargetData.id}`, newItem).then(res => {
			console.log('123123123 ', res);

			if (res.data.affectedRows) {
				dispatch(UPDATE_ITEM_IN_PRICE_LISTS({
					id: editTargetData.id, title: title, content: content,
					material_list: material_list, labour_list: labour_list,
					price: price
				}));
				dispatch(SET_NEW_MATERIAL_LIST([]));
				dispatch(SET_NEW_LABOUR_LIST([]));

				navigate('/setting/price_list');
			}
		}).catch(err => {
			if (err.response.status === 400) alert(err.response.data);
			else if (err.response.status === 403) alert(err.response.data);
		});
	};
	const handleAddNewMaterial = () => {
		dispatch(ADD_ITEM_IN_NEW_MATERIAL_LIST({
			id: _generateNewID(material_list),	// a random id for [temp_blank] material item
			product_code: '', title: '', price: '0.00',
			foreach: '', markup: '0.00', brand: '', category_id: ''
		}));
	};
	const handleAddNewLabour = () => {
		dispatch(ADD_ITEM_IN_NEW_LABOUR_LIST({
			id: _generateNewID(labour_list),	// a random id for [temp_blank] labour item
			title: '', price: '0.00', per: '', markup: '0.00'
		}));
	};

	return (
		<>
			<Box className={clsx(classes.root, 'w-3/5 min-h-screen, px-8, py-8')}>
				<Typography variant='overline'>Price list</Typography>
				<Typography variant='h5'>Update a price list item</Typography>
				<Typography variant='subtitle2'>Save work you do regularly to cost work faster.</Typography>
				<Divider />
				<SpaceTag h={1} />

				<Paper className='flex flex-col input-list' elevation={8}>
					<input className='input-text input-title' type="text" placeholder='Give this work a title'
						value={title} onChange={e => setTitle(e.target.value)} />
					{/* <input className='input-text' type="text" placeholder='Description of work...' /> */}
					<textarea className='input-text input-description' placeholder='Description of work...' rows={6}
						value={content} onChange={e => setContent(e.target.value)} />
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
					<Button className='mx-4 rounded' color="secondary" variant="contained" onClick={handleUpdatePriceList}>Update to Price List</Button>
					<Button className='mx-4 rounded' color="inherit" variant="outlined" onClick={() => navigate('/setting/price_list')}>Discard</Button>
				</div>
			</Box>



			<Dialog open={materialModal} PaperComponent={PaperComponent}
			// onClose={handleMaterialDone}
			>
				<div id="draggable-dialog-title" style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem', paddingBottom: '1rem', cursor: 'move' }}>
					<div>
						<Typography variant='h5'>Material Costs</Typography>
						<Typography variant='body1'>${totalMaterial.current.price} - ${totalMaterial.current.markup} ex. markup</Typography>
					</div>
					<Button variant="outlined" onClick={handleMaterialDone}>Done</Button>
				</div>
				<div id="dialog-content" style={{ padding: '1.5rem', paddingTop: '0.5rem' }}>
					<DraggableList list={material_list} itemKey="id" template={MaterialItem}
						onMoveEnd={(newList) => dispatch(SET_NEW_MATERIAL_LIST(newList))}
						commonProps={{}} />
					<Button onClick={handleAddNewMaterial} variant="contained" >
						<AddIcon /> Add a material item
					</Button>
				</div>
			</Dialog>
			<Dialog open={labourModal} PaperComponent={PaperComponent}
			// onClose={handleLabourDone}
			>
				<div id="draggable-dialog-title" style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem', paddingBottom: '1rem', cursor: 'move' }}>
					<div>
						<Typography variant='h5'>Labour rates</Typography>
						<Typography variant='body1'>${totalLabour.current.price} - ${totalLabour.current.markup} ex. markup</Typography>
					</div>
					<Button variant="outlined" onClick={handleLabourDone}>Done</Button>
				</div>
				<div id="dialog-content" style={{ padding: '1.5rem', paddingTop: '0.5rem' }}>
					<DraggableList list={labour_list} itemKey="id" template={LabourItem}
						onMoveEnd={(newList) => dispatch(SET_NEW_LABOUR_LIST(newList))}
						commonProps={{}} />
					<Button onClick={handleAddNewLabour} variant="contained" >
						<AddIcon /> Add a labour item
					</Button>
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
		<Paper style={{ ...style, maxWidth: 'none', width: '80%', overflowY: 'auto' }} {...others} />
	</Draggable>
);

const _generateNewID = (array_list) => {
	let newID = getRandomInt(100, 1000);
	// check whether [random_new_id] already exist in naterial_list_in_redux
	while (array_list.filter(e => e.id == newID).length > 0) {
		newID = getRandomInt(100, 1000);
	}
	return newID;
};