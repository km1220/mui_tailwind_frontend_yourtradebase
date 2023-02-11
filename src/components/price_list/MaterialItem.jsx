import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { UPDATE_ITEM_IN_NEW_MATERIAL_LIST, REMOVE_ITEM_IN_NEW_MATERIAL_LIST } from '@store/actions';

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
	const [itemData, setItemData] = useState(item);

	const classes = useStyles(props);
	const scale = itemSelected * 0.0001 + 1;
	const shadow = itemSelected * 5 + 1;

	const updateStore = () => dispatch(UPDATE_ITEM_IN_NEW_MATERIAL_LIST(itemData));
	const handleDeleteItem = () => dispatch(REMOVE_ITEM_IN_NEW_MATERIAL_LIST(itemData.id));

	useEffect(() => { updateStore() }, [itemData]);

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
				<input value={itemData.product_code} onChange={e => setItemData({ ...itemData, product_code: e.target.value })} />
			</ItemComponent>
			<ItemComponent>
				<input value={itemData.title} onChange={e => setItemData({ ...itemData, title: e.target.value })} />
			</ItemComponent>
			<PriceInput value={itemData.price} onValueChange={val => setItemData({ ...itemData, price: val ? val : '0' })} />
			<ItemComponent>
				<input value={itemData.foreach} onChange={e => setItemData({ ...itemData, foreach: e.target.value })} />
			</ItemComponent>
			<ItemComponent>
				<DecimalInput value={itemData.markup} onSetValue={val => setItemData({ ...itemData, markup: val })} />
			</ItemComponent>
			<ItemComponent>
				<input value={itemData.brand} onChange={e => setItemData({ ...itemData, brand: e.target.value })} />
			</ItemComponent>
			<ItemComponent>
				<input value={itemData.category_id} onChange={e => setItemData({ ...itemData, category_id: e.target.value })} />
			</ItemComponent>

			<DeleteIcon className={classes.deleteIcon} onClick={handleDeleteItem} />
		</div>
	)
}


export default MaterialItem;