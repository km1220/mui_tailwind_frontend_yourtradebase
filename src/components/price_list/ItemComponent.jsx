import React from 'react';
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
	root: {
		borderRadius: '0.25rem',
	},
	wrapper: {
		display: 'flex',
		width: '100%',
		justifyContent: 'space-between',
		'& input, textarea': {
			background: "transparent",
			outline: 'none',
			width: '100%',
		},
	},
}));

const ItemComponent = ({ className, style, children, ...others }) => {
	const classes = useStyles(others);

	return (
		<Button
			sx={{ borderRadius: '0.25rem' }}
			component="div" variant='outlined' disableRipple
			style={{ ...style }} {...others}
		>
			<div className={clsx(classes.wrapper, className, '')}>
				{children}
			</div>
		</Button>
	)
}

export default ItemComponent;