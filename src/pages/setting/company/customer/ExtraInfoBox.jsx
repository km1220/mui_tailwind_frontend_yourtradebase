import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

import ItemComponent from '@components/price_list/ItemComponent';
import { _generateNewID } from '@utils';


const useStyles = makeStyles(theme => ({
	root: {
		padding: '1rem',
		border: `1px solid ${theme.palette.divider}`,
		borderRadius: '0.25rem',
	},
	inputsWrapper: {
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
function ExtraCustomerInfoBox(props) {
	const classes = useStyles(props);
	const {
		itemData, setItemData,
		className, saveBtnTitle, handleSave, handleDiscard, ...others
	} = props;


	return (
		<Box className={clsx(classes.root, 'flex flex-col', className)} {...others}>
			<div className='mb-4'>
				<div>
					<Typography variant='h5'>Want to add some extra customer info? Here goes.</Typography>
					<br />
					<Typography variant='subtitle1'>Choose a name for this extra info</Typography>
					<Typography variant='body1' color='text.secondary'>What extra info do you want to capture for your customers? For example: Referral source</Typography>
				</div>
				<ItemComponent className="w-full">
					<textarea value={itemData.data} onChange={(e) => setItemData({ ...itemData, data: e.target.value })} />
				</ItemComponent>
			</div>
			<div className='flex justify-center'>
				<Button className='mx-4 rounded' color="secondary" variant="contained" onClick={handleSave}>{saveBtnTitle}</Button>
				<Button className='mx-4 rounded' color="disabled" variant="outlined" onClick={handleDiscard}>Discard</Button>
			</div>
		</Box>
	)
}

ExtraCustomerInfoBox.propTypes = {
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
ExtraCustomerInfoBox.defaultProps = {
	itemData: {
		id: _generateNewID(),
		title: '',
		price: '0',
		per: '',
		markup: '0'
	}
}

export default ExtraCustomerInfoBox;