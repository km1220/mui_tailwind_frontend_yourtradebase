import React from 'react';
import PropTypes from 'prop-types';

import { Typography, Button, Dialog } from '@mui/material';
import { AddCircleOutlineOutlined as AddIcon } from '@mui/icons-material';

import DraggablePaper from './DraggablePaper';
import DraggableList from 'react-draggable-list';



function MaterialLabourDialog(props) {
	let { open, onClose, title, totalPrice, totalMarkupPrice,
		itemList, itemTemplateComponent, onMoveEnd,
		onAddNewItem } = props;

	return (
		<Dialog open={open} PaperComponent={DraggablePaper}
			onClose={onClose}
		>
			<div id="draggable-dialog-title" style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem', paddingBottom: '1rem', cursor: 'move' }}>
				<div>
					<Typography variant='h5'>{title}</Typography>
					<Typography variant='body1'>${totalPrice} - ${totalMarkupPrice} ex. markup</Typography>
				</div>
				<Button variant="outlined" onClick={onClose}>Done</Button>
			</div>
			<div id="dialog-content" style={{ padding: '1.5rem', paddingTop: '0.5rem' }}>
				<DraggableList list={itemList} itemKey="id" template={itemTemplateComponent}
					onMoveEnd={(newList) => onMoveEnd(newList)}
				// commonProps={{}}
				/>
				<Button onClick={onAddNewItem} variant="contained" >
					<AddIcon /> Add a new item
				</Button>
			</div>
		</Dialog>
	)
}
MaterialLabourDialog.propTypes = {
	open: PropTypes.bool.isRequired,
	onClose: PropTypes.func,
	title: PropTypes.string,
	totalPrice: PropTypes.number,
	totalMarkupPrice: PropTypes.number,

	itemList: PropTypes.array.isRequired,
	// itemTemplateComponent: PropTypes.node.isRequired,
	onMoveEnd: PropTypes.func.isRequired,
	onAddNewItem: PropTypes.func
}
MaterialLabourDialog.defaultProps = {
	open: false,
	title: '',
	totalPrice: 0,
	totalMarkupPrice: 0,
	onAddNewItem: () => { }
}

export default MaterialLabourDialog;