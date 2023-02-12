import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

import CurrencyInput from 'react-currency-input-field';


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
			outline: 'none'
		},
	},
}));

const PriceInput = (props) => {
	const {
		className, style, children,
		value, onValueChange, staticText,
		defaultValue, maxLength, decimalsLimit, disableGroupSeparators,
		...others
	} = props;
	const classes = useStyles(others);

	return (
		<Button
			className={clsx(classes.root, className)}
			sx={{ borderRadius: '0.25rem' }}
			component="div" variant='outlined' disableRipple
			style={{ ...style }} {...others}
			tabIndex={-1}
		>
			<div className={clsx(classes.wrapper, '')}>
				<p>$</p>
				<CurrencyInput
					value={value} onValueChange={onValueChange}
					defaultValue={defaultValue} maxLength={maxLength} decimalsLimit={decimalsLimit} disableGroupSeparators={disableGroupSeparators}
					onFocus={e => {
						if (staticText)
							e.target.blur();
					}}
					style={{ ...style, width: '100%', textAlign: 'right', cursor: staticText ? 'pointer' : 'text' }}
					{...others}
				/>
			</div>
		</Button>
	)
}
PriceInput.propTypes = {
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	onValueChange: PropTypes.func,
	// value: PropTypes.number.isRequired,
	// onValueChange: PropTypes.func.isRequired,

	defaultValue: PropTypes.number,
	maxLength: PropTypes.number,
	decimalsLimit: PropTypes.number,
	disableGroupSeparators: PropTypes.bool,

	staticText: PropTypes.bool,
};
PriceInput.defaultProps = {
	defaultValue: 0.00,
	maxLength: 11,
	decimalsLimit: 2,
	disableGroupSeparators: true,

	staticText: false,
};

export default PriceInput;