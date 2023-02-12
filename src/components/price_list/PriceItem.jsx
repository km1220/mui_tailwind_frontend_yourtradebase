import React from 'react';
import { Typography, Button } from '@mui/material';
import { makeStyles, styled } from '@mui/styles';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		alignItems: 'center',
		padding: '0.5rem 0',
	}
}));

const PriceItem = ({ className, label, onClick, children, ...others }) => {
	const classes = useStyles(others);

	return (
		<div className={clsx(classes.root, className)} onClick={onClick}>
			<Typography variant='body2'>{label}</Typography>
			<div style={{ flexGrow: 1 }} />

			{children}
		</div>
	)
}

export default PriceItem;