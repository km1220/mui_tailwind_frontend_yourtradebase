import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

import ItemComponent from '@components/price_list/ItemComponent';
import PriceInput from '@components/price_list/PriceInput';
import DecimalInput from '@components/price_list/DecimalInput';

import { _generateNewID } from '@utils/price';


const useStyles = makeStyles(theme => ({
	root: {
		padding: '1rem',
		border: `1px solid ${theme.palette.divider}`,
		borderRadius: '0.25rem',
	},
	inputsContainer: {
		display: 'flex',
		alignItems: 'end',
		'& > *:not(:first-child)': {
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
				}
			},
		},
	},
}));
function MaterialBox(props) {
	const classes = useStyles(props);
	const {
		itemData, setItemData,
		className, saveBtnTitle, handleSave, handleDiscard, ...others
	} = props;


	return (
		<Box className={clsx(classes.root, 'flex flex-col', className)} {...others}>
			<div className='mb-4'>
				<Typography variant='subtitle2'>Code <Typography variant="caption">(optional)</Typography></Typography>
				<ItemComponent className="mr-6">
					<input placeholder='Product code'
						value={itemData.product_code} onChange={(e) => setItemData({ ...itemData, product_code: e.target.value })}
					/>
				</ItemComponent>
			</div>
			<div className='mb-4'>
				<Typography variant='subtitle2'>Title</Typography>
				<ItemComponent className="w-full">
					<input placeholder='Enter a title for this material'
						value={itemData.title} onChange={(e) => setItemData({ ...itemData, title: e.target.value })}
					/>
				</ItemComponent>
			</div>
			<div className={clsx(classes.inputsContainer, 'mb-4')}>
				<div>
					<Typography variant='subtitle2'>Price</Typography>
					<PriceInput placeholder='Price'
						value={itemData.price} onValueChange={val => setItemData({ ...itemData, price: val })}
					/>
				</div>
				<div>
					<Typography variant='subtitle2'>for each <Typography variant="caption">(optional)</Typography></Typography>
					<ItemComponent>
						<input placeholder=''
							value={itemData.foreach} onChange={(e) => setItemData({ ...itemData, foreach: e.target.value })}
						/>
					</ItemComponent>
				</div>
				<div>
					<Typography variant='subtitle2'>Markup <Typography variant="caption">(optional)</Typography></Typography>

					<ItemComponent>
						<p>%</p>
						<DecimalInput
							value={itemData.markup} onSetValue={val => setItemData({ ...itemData, markup: val })}
							style={{ textAlign: 'right' }}
						/>
					</ItemComponent>
				</div>
			</div>
			<div className='mb-4'>
				<Typography variant='subtitle2'>Category <Typography variant="caption">(optional)</Typography></Typography>
				<ItemComponent className="w-full">
					<input placeholder='Category'
						type="number"
						value={itemData.category_id} onChange={(e) => setItemData({ ...itemData, category_id: Number(e.target.value) })}
					/>
				</ItemComponent>
			</div>
			<div className='mb-4'>
				<Typography variant='subtitle2'>Brand <Typography variant="caption">(optional)</Typography></Typography>
				<ItemComponent className="w-full">
					<input placeholder='Brand Info'
						value={itemData.brand} onChange={(e) => setItemData({ ...itemData, brand: e.target.value })}
					/>
				</ItemComponent>
			</div>
			<div className='flex justify-center'>
				<Button className='mx-4 rounded' color="secondary" variant="contained" onClick={handleSave}>{saveBtnTitle}</Button>
				<Button className='mx-4 rounded' color="disabled" variant="outlined" onClick={handleDiscard}>Discard</Button>
			</div>
		</Box>
	)
}

MaterialBox.propTypes = {
	itemData: PropTypes.shape({
		id: PropTypes.number,
		product_code: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		title: PropTypes.string,
		price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		foreach: PropTypes.string,
		markup: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		brand: PropTypes.string,
		category_id: PropTypes.number
	}),
	setItemData: PropTypes.func.isRequired,
	saveBtnTitle: PropTypes.string,
	handleSave: PropTypes.func,
	handleDiscard: PropTypes.func
}
MaterialBox.defaultProps = {
	itemData: {
		id: _generateNewID(),
		product_code: '',
		title: '',
		price: '0',
		foreach: '',
		markup: '0',
		brand: '',
		category_id: 1
	},
	saveBtnTitle: 'Save'
}

export default MaterialBox;