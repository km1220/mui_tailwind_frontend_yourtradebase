// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
// 	Box, Paper, Divider,
// 	Typography, Button,
// } from '@mui/material';
// import { makeStyles, styled } from '@mui/styles';
// import clsx from 'clsx';

// import PriceInput from './PriceInput';
// import ItemComponent from './ItemComponent';
// import DecimalInput from './DecimalInput';



// const DragIcon = (props) => <span {...props}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 23.998a.755.755 0 0 1-.26-.047l-.022-.008a.732.732 0 0 1-.249-.165l-3.749-3.75a.744.744 0 0 1 0-1.06.744.744 0 0 1 1.06 0l2.47 2.47V2.559l-2.47 2.47a.744.744 0 0 1-1.06-.001c-.142-.141-.22-.33-.22-.53s.078-.389.22-.53L11.469.219a.74.74 0 0 1 .245-.163l.025-.009a.733.733 0 0 1 .521.001l.021.007c.097.04.179.095.25.166L16.28 3.97c.142.141.22.33.22.53s-.078.389-.22.53a.749.749 0 0 1-1.06 0l-2.47-2.47v18.879l2.47-2.47a.744.744 0 0 1 1.06 0 .749.749 0 0 1 0 1.06l-3.75 3.75a.763.763 0 0 1-.246.164l-.027.01a.769.769 0 0 1-.257.045z"></path></svg></span>;

// const useStyles = makeStyles(theme => ({
// 	root: {
// 		display: 'flex',
// 		padding: '0.375rem 1.5rem',
// 		alignItems: 'center',
// 	},
// 	dragHandler: {
// 		// padding: '0.75rem',
// 		'& svg': {
// 			height: '1.5rem',
// 		}
// 	},
// 	selected: {
// 		background: theme.palette.neutral[300]
// 	}
// }));
// const MaterialItem = props => {
// 	const { item, itemSelected, dragHandleProps, commonProps, ...others } = props; 1
// 	const { handleEachValueChange } = commonProps;
// 	const { id, product_code, title, price, foreach, markup, brand, category_id, } = item;


// 	const classes = useStyles(props);
// 	const scale = itemSelected * 0.0001 + 1;
// 	const shadow = itemSelected * 5 + 1;
// 	return (
// 		<div
// 			className={clsx(classes.root, itemSelected !== 0 ? classes.selected : '')}
// 			style={{
// 				transform: `scale(${scale})`,
// 				boxShadow: `rgba(0, 0, 0, 0.3) 0px ${shadow}px ${2 * shadow}px 0px`,
// 			}}
// 		>
// 			<DragIcon className={classes.dragHandler} {...dragHandleProps} />

// 			<ItemComponent>
// 				<input value={item.product_code} onChange={e => handleEachValueChange(e.target.value, 'product_code', item)} />
// 			</ItemComponent>
// 			<ItemComponent>
// 				<input value={item.title} onChange={e => handleEachValueChange(e.target.value, 'title', item)} />
// 			</ItemComponent>
// 			<PriceInput value={item.price} onValueChange={(val) => handleEachValueChange(val, 'price', item)} />
// 			<ItemComponent>
// 				<input value={item.foreach} onChange={e => handleEachValueChange(e.target.value, 'foreach', item)} />
// 			</ItemComponent>
// 			<ItemComponent>
// 				<DecimalInput value={item.markup} onSetValue={(val) => handleEachValueChange(val, 'markup', item)} />
// 			</ItemComponent>
// 			<ItemComponent>
// 				<input value={item.brand} onChange={e => handleEachValueChange(e.target.value, 'brand', item)} />
// 			</ItemComponent>
// 			<ItemComponent>
// 				<input value={item.category_id} type="number" onChange={e => handleEachValueChange(e.target.value, 'category_id', item)} />
// 			</ItemComponent>
// 		</div>
// 	)
// }


// export default MaterialItem;



import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { SET_NEW_MATERIAL_LIST, ADD_ITEM_IN_NEW_MATERIAL_LIST, UPDATE_ITEM_IN_NEW_MATERIAL_LIST, REMOVE_ITEM_IN_NEW_MATERIAL_LIST } from '../../store/actions';

import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

import PriceInput from './PriceInput';
import ItemComponent from './ItemComponent';
import DecimalInput from './DecimalInput';



const DragIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 23.998a.755.755 0 0 1-.26-.047l-.022-.008a.732.732 0 0 1-.249-.165l-3.749-3.75a.744.744 0 0 1 0-1.06.744.744 0 0 1 1.06 0l2.47 2.47V2.559l-2.47 2.47a.744.744 0 0 1-1.06-.001c-.142-.141-.22-.33-.22-.53s.078-.389.22-.53L11.469.219a.74.74 0 0 1 .245-.163l.025-.009a.733.733 0 0 1 .521.001l.021.007c.097.04.179.095.25.166L16.28 3.97c.142.141.22.33.22.53s-.078.389-.22.53a.749.749 0 0 1-1.06 0l-2.47-2.47v18.879l2.47-2.47a.744.744 0 0 1 1.06 0 .749.749 0 0 1 0 1.06l-3.75 3.75a.763.763 0 0 1-.246.164l-.027.01a.769.769 0 0 1-.257.045z"></path></svg>;

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		padding: '0.375rem',
		alignItems: 'center',
		// '& > *': {
		// 	marginRight: '1.5rem',
		// }
	},
	dragIcon: {
		flexShrink: 0,
		margin: '0.5rem',
		width: '1.5rem !important',
		height: '1.5rem !important',
		cursor: 'pointer',
	},
	deleteIcon: {
		margin: '0.5rem',
		width: '1.5rem !important',
		height: '1.5rem !important',
		cursor: 'pointer',
	},
	selected: {
		background: theme.palette.neutral[300],
	}
}));
const MaterialItem = props => {
	const dispatch = useDispatch();
	const { item, itemSelected, dragHandleProps, commonProps, ...others } = props;
	const { } = commonProps;
	const itemDataRef = useRef({ id: item.id, product_code: item.product_code, title: item.title, price: item.price, foreach: item.foreach, markup: item.markup, brand: item.brand, category_id: item.category_id });

	const classes = useStyles(props);
	const scale = itemSelected * 0.0001 + 1;
	const shadow = itemSelected * 5 + 1;

	const updateStore = () => dispatch(UPDATE_ITEM_IN_NEW_MATERIAL_LIST(itemDataRef.current));
	const handleDeleteItem = () => {
		console.log(itemDataRef);
		dispatch(REMOVE_ITEM_IN_NEW_MATERIAL_LIST(itemDataRef.current.id));
	};
	return (
		<div
			className={clsx(classes.root, itemSelected !== 0 ? classes.selected : '')}
			style={{
				transform: `scale(${scale})`,
				boxShadow: `rgba(0, 0, 0, 0.3) 0px ${shadow}px ${2 * shadow}px 0px`,
			}}
		>
			<DragIcon className={classes.dragIcon} {...dragHandleProps} />

			<ItemComponent>
				<input value={itemDataRef.current.product_code} onChange={e => {
					itemDataRef.current.product_code = e.target.value;
					updateStore();
				}} />
			</ItemComponent>
			<ItemComponent>
				<input value={itemDataRef.current.title} onChange={e => {
					itemDataRef.current.title = e.target.value;
					updateStore();
				}} />
			</ItemComponent>
			<PriceInput value={itemDataRef.current.price} onValueChange={val => {
				itemDataRef.current.price = val ? val : '0';
				updateStore();
			}} />
			<ItemComponent>
				<input value={itemDataRef.current.foreach} onChange={e => {
					itemDataRef.current.foreach = e.target.value;
					updateStore();
				}} />
			</ItemComponent>
			<ItemComponent>
				<DecimalInput value={itemDataRef.current.markup} onSetValue={val => {
					itemDataRef.current.markup = val;
					updateStore();
				}} />
			</ItemComponent>
			<ItemComponent>
				<input value={itemDataRef.current.brand} onChange={e => {
					itemDataRef.current.brand = e.target.value;
					updateStore();
				}} />
			</ItemComponent>
			<ItemComponent>
				<input value={itemDataRef.current.category_id} onChange={e => {
					itemDataRef.current.category_id = e.target.value;
					updateStore();
				}} />
			</ItemComponent>

			<DeleteIcon className={classes.deleteIcon} onClick={handleDeleteItem} />
		</div>
	)
}


export default MaterialItem;