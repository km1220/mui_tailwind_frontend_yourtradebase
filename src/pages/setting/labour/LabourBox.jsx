import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Box, Paper, Divider, Collapse, Button, List, ListItem, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

import ItemComponent from '@components/price_list/ItemComponent';
import PriceInput from '@components/price_list/PriceInput';
import DecimalInput from '@components/price_list/DecimalInput';

import { _generateNewID } from '@utils';


const useStyles = makeStyles(theme => ({
	root: {
		padding: '1rem',
		border: `1px solid ${theme.palette.common.black}`,
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
function LabourBox(props) {
	const classes = useStyles(props);
	const {
		itemData, setItemData,
		className, saveBtnTitle, handleSave, handleDiscard, ...others
	} = props;


	return (
		<Box className={clsx(classes.root, 'flex flex-col', className)} {...others}>
			<div className='mb-4'>
				<Typography variant='subtitle2'>Labour Item</Typography>
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
					<Typography variant='subtitle2'>Per...</Typography>
					<ItemComponent>
						<input value={itemData.per} onChange={(e) => setItemData({ ...itemData, per: e.target.value })} />
					</ItemComponent>
				</div>
				<div>
					<Typography variant='subtitle2'>Markup</Typography>
					<ItemComponent>
						<p>%</p>
						<DecimalInput
							value={itemData.markup} onSetValue={val => setItemData({ ...itemData, markup: val })}
							style={{ textAlign: 'right' }}
						/>
					</ItemComponent>
				</div>
			</div>
			<div className='flex justify-center'>
				<Button className='mx-4 rounded' color="secondary" variant="contained" onClick={handleSave}>{saveBtnTitle}</Button>
				<Button className='mx-4 rounded' color="inherit" variant="outlined" onClick={handleDiscard}>Discard</Button>
			</div>
		</Box>
	)
}

LabourBox.propTypes = {
	itemData: PropTypes.shape({
		id: PropTypes.number,
		title: PropTypes.string,
		price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		per: PropTypes.string,
		markup: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
	}),
	setItemData: PropTypes.func.isRequired,
	saveBtnTitle: PropTypes.string,
	handleSave: PropTypes.func,
	handleDiscard: PropTypes.func
}
LabourBox.defaultProps = {
	itemData: {
		id: _generateNewID(),
		title: '',
		price: '0.00',
		per: '',
		markup: '0.00'
	}
}

export default LabourBox;