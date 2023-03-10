import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { InputAdornment, IconButton, Collapse, Typography } from '@mui/material';
import { Visibility, VisibilityOff, CheckCircle as CheckIcon, Cancel as CancelIcon } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx'
import { _isStrEmpty } from '@utils'

import PwdInputComponent from './PwdInputComponent'


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

function PwdConfirmInput(props) {
	const { className, /*placeholder,*/ value, onChange, isValid, errorText, ...others } = props
	const classes = useStyles(props)
	const [showPwd, setShowPwd] = useState(false)


	return (
		<div className={clsx('w-full flex flex-col items-center justify-center', className)}>
			{/* <div className={clsx(classes.inputBase, 'w-full',
				_isStrEmpty(value) ? '' : isValid ? 'success' : 'error')
			}> */}
			<div className={clsx(
				classes.inputBase, _isStrEmpty(value) ? '' : !isValid ? 'error' : 'success',
				'w-full flex items-center'
			)}>
				<PwdInputComponent
					// placeholder={placeholder}
					value={value} onChange={onChange}
					type={showPwd ? 'text' : 'password'}
					endAdornment={
						<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onClick={() => setShowPwd(!showPwd)}
								onMouseDown={e => e.preventDefault()}
								edge="end"
								tabIndex={-1}
							>
								{showPwd ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						</InputAdornment>
					}
					{...others}
				/>
				{
					_isStrEmpty(value) ? '' : !isValid ?
						<CancelIcon className='pl-2 text-3xl sm:text-5xl' />
						:
						<CheckIcon className='pl-2 text-3xl sm:text-5xl' />
				}
			</div>
			<Collapse in={!_isStrEmpty(value) && !isValid} component='ul' className={clsx(classes.errorText, 'error')}>
				{errorText !== '' &&
					<div className='sm:my-4 my-2'><Typography>{errorText}</Typography></div>
				}
			</Collapse>
		</div>
	)
}

PwdConfirmInput.defaultProps = {
	isValid: true
}

PwdConfirmInput.propTypes = {
	isValid: PropTypes.bool
}

export default PwdConfirmInput