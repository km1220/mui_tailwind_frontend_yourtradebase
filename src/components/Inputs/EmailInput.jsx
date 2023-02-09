import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Collapse, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx'
import { _isStrEmpty, validateEmail } from '@utils'

import InputComponent from '@components/Inputs/InputComponent'


const useStyles = makeStyles(theme => ({
	inputBase: {
		'&.success': {
			'& :first-child': {
				borderColor: theme.palette.success.main,
				color: theme.palette.success.main,
			},
			'& svg': {
				color: theme.palette.success.main,
			},
		},
		'&.error': {
			'& :first-child': {
				backgroundColor: theme.palette.error.light,
				color: theme.palette.error.dark,
				borderColor: theme.palette.error.main,
			},
			'& svg': {
				color: theme.palette.error.dark,
			},
		},
	},
	errorText: {
		'&.error': { color: theme.palette.error.main }
	}
}))

function EmailInput(props) {
	const { className, /* placeholder, */ value, onChange, ...others } = props
	const classes = useStyles(props)
	const [emailValid, setEmailValid] = useState(false)

	const handleEmailChange = e => {
		setEmailValid(validateEmail(e.target.value));

		onChange(e);
	}

	return (
		<div className={clsx('w-full flex flex-col items-center justify-center', className)}>
			<div className={clsx(classes.inputBase, 'w-full',
				_isStrEmpty(value) ? '' : emailValid ? 'success' : 'error')
			}>
				<InputComponent
					// placeholder={placeholder}
					value={value}
					onChange={handleEmailChange}
					{...others}
				/>
			</div>
			<Collapse in={!_isStrEmpty(value) && !emailValid} component='ul' className={clsx(classes.errorText, 'error')}>
				<div className='sm:my-4 my-2'><Typography>Your input is not the email format</Typography></div>
			</Collapse>
		</div>
	)
}

EmailInput.defaultProps = {
	// isValid: true
}

EmailInput.propTypes = {
	// isValid: PropTypes.bool
}

export default EmailInput