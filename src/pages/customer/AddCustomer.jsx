import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	SET_PRICE_LISTS, REMOVE_ITEM_IN_PRICE_LISTS,
	SET_NEW_MATERIAL_LIST, ADD_ITEM_IN_NEW_MATERIAL_LIST,
	SET_NEW_LABOUR_LIST, ADD_ITEM_IN_NEW_LABOUR_LIST,
	ADD_ITEM_IN_CUSTOMERS
} from '@store/actions';

import { AddCircleOutlined as AddIcon, SearchOutlined as SearchIcon, CancelOutlined as CancelIcon, DeleteOutlined as DeleteIcon } from '@mui/icons-material';
import { Box, Paper, Divider, Typography, Button, Dialog, Select, MenuItem } from '@mui/material';
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
		'& textarea': {
			resize: 'none',
		}
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
export default function AddCustomerPage(props) {
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
	const handleAddCustomer = () => {
		const newCustomer = {
			...newData,
			pricelist_data_list: JSON.stringify(allPriceListsRef.current),
		}
		axios.post('/customers', newCustomer).then(res => {
			if (res.data.affectedRows) {
				dispatch(ADD_ITEM_IN_CUSTOMERS({ ...newCustomer, id: res.data.insertId }));
				navigate('/customer');
			}
		}).catch(err => {
			if (err.response.status === 400) alert(err.response.data);
			else if (err.response.status === 403) alert(err.response.data);
		});
	};


	return (
		<>
			<Paper className={clsx(classes.root, 'min-h-screen')} elevation={4}>
				<Typography variant='h5'>Add a new customer</Typography>
				<Divider />

				<div className={clsx(classes.inputsContainer, 'mb-8')}>
					<div>
						<Typography variant='subtitle2'>Full name</Typography>
						<ItemComponent>
							<input placeholder='e.g. Mr & Mrs Smith'
							// value={newData.company_name} onChange={e => setNewData({ ...newData, company_name: e.target.value })}
							/>
						</ItemComponent>
					</div>
					<div className='w-3/5'>
						<Typography variant='subtitle2'>Friendly name <Typography variant="caption">(optional)</Typography></Typography>
						<Typography variant="caption">For down-to-earth, day-to-day message</Typography>
						<ItemComponent>
							<input placeholder='e.g. John & Jenny'
							// value={newData.company_name} onChange={e => setNewData({ ...newData, company_name: e.target.value })}
							/>
						</ItemComponent>
					</div>
					<div>
						<Typography variant='subtitle2'>Company name <Typography variant="caption">(optional)</Typography></Typography>
						<ItemComponent>
							<input placeholder="e.g. Smith\'s The Bakers Ltd."
							// value={newData.company_name} onChange={e => setNewData({ ...newData, company_name: e.target.value })}
							/>
						</ItemComponent>
					</div>
					<div>
						<Typography variant='subtitle2'>Address</Typography>
						<ItemComponent>
							<textarea placeholder="" rows={2}
							// value={newData.company_name} onChange={e => setNewData({ ...newData, company_name: e.target.value })}
							/>
						</ItemComponent>
					</div>
					<div className='w-1/3'>
						<Typography variant='subtitle2'>Postcode</Typography>
						<ItemComponent>
							<input placeholder=""
							// value={newData.company_name} onChange={e => setNewData({ ...newData, company_name: e.target.value })}
							/>
						</ItemComponent>
					</div>
				</div>


				<div className='mb-8'>
					<Typography variant='h5'>Contact info</Typography>
					<Typography variant="caption">Add as many options as you can - it'll make life easier.</Typography>
					<Divider />
					<div className='flex flex-col'>
						<div className='flex mt-4'>
							<ItemComponent className='w-1/3 px-0 mr-4 shrink-0'>
								<Select className='w-full px-4 outline-none' defaultValue='email' disableUnderline variant='standard'>
									<MenuItem value='email'>Email</MenuItem>
									<MenuItem value='home'>Home</MenuItem>
									<MenuItem value='mobile'>Mobile</MenuItem>
									<MenuItem value='office'>Office</MenuItem>
									<MenuItem value='work'>Work</MenuItem>
									<MenuItem value='others'>Others...</MenuItem>
								</Select>
							</ItemComponent>
							<ItemComponent>
								<input placeholder="" />
							</ItemComponent>
						</div>
					</div>
				</div>

				<div>
					<Typography variant='h5'>Extra info</Typography>
					<Typography variant="caption">What else would you like to keeep track of?</Typography>
					<Divider />
					<div className='flex items-center mt-4'>
						<Typography variant='subtitle1' className='w-1/3 mr-4 shrink-0 whitespace-nowrap'>Invoices due in</Typography>
						<ItemComponent className=''>
							<input placeholder="" />
						</ItemComponent>
					</div>
					<div className='flex items-center mt-4'>
						<Typography variant='subtitle1' className='w-1/3 mr-4 shrink-0 whitespace-nowrap'>test text</Typography>
						<ItemComponent className=''>
							<input placeholder="" />
						</ItemComponent>
					</div>
				</div>

				<div className='flex justify-center mt-6'>
					<Button className='mx-4 rounded' color="secondary" variant="contained" onClick={handleAddCustomer}>Add this customer</Button>
					<Button className='mx-4 rounded' color="disabled" variant="outlined" onClick={() => navigate('/customer')}>Discard</Button>
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