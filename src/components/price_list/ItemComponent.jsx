import React from 'react';
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
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

const ItemComponent = ({ className, contentClassName, style, children, ...others }) => {
	const classes = useStyles(others);

	return (
		<Button
			className={clsx(classes.root, className)}
			sx={{ borderRadius: '0.25rem' }}
			component="div" variant='outlined' disableRipple
			style={{ ...style }} {...others}
			tabIndex={-1}
		>
			<div className={clsx(classes.wrapper, contentClassName, '')}>
				{children}
			</div>
		</Button>
	)
}

export default ItemComponent;