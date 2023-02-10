import React, { useState } from 'react';
// import PropTypes from 'prop-types'
import { Typography, InputAdornment, IconButton, Collapse } from '@mui/material';
import { Visibility, VisibilityOff, CheckCircle as CheckCircleIcon, Cancel as CancelIcon } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { _isStrEmpty } from '@utils'

import InputComponent from '@components/inputs/InputComponent'

const useStyles = makeStyles(theme => {
	console.log(theme)
	return ({
		root: {
		},
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
		errorLists: {
			listStyle: 'disc',
			textAlign: 'left',
			'& li': {
				'&.info': { color: theme.palette.info.main },
				'&.error': { color: theme.palette.error.main }
			}
		}
	})
})

const ErrorItem = (props) => {
	const { text, ...others } = props
	return (
		<li {...others}>
			<Typography>{text}</Typography>
		</li>
	)
}

function PwdValidInput(props) {
	const { className, /*placeholder, */ value, onChange, ...others } = props
	const classes = useStyles(props)
	const [showPwd, setShowPwd] = useState(false)
	const [ruleError, setRuleError] = useState(false)
	const [errorLists, setErrorLists] = useState([])

	const handlePwdChange = e => {
		onChange(e)
		let buff_pwd = e.target.value

		let buff_error_list = []

		let isEmpty = _isStrEmpty(buff_pwd);
		let isShort = buff_pwd.length < 8;
		let hasUppercase = String(buff_pwd).match(/[A-Z]/g) !== null;
		let hasLowercase = String(buff_pwd).match(/[a-z]/g) !== null;;
		let hasNumber = String(buff_pwd).match(/[0-9]/g) !== null;;
		if (isEmpty)
			buff_error_list.push(<ErrorItem className={clsx('info')} key={1} text="Must not be empty" />)
		if (isShort)
			buff_error_list.push(<ErrorItem className={clsx(isEmpty ? 'info' : 'error')} key={2} text="8 characters minimum" />)
		if (!hasUppercase)
			buff_error_list.push(<ErrorItem className={clsx(isEmpty ? 'info' : 'error')} key={3} text="One uppercase character" />)
		if (!hasLowercase)
			buff_error_list.push(<ErrorItem className={clsx(isEmpty ? 'info' : 'error')} key={4} text="One lowercase character" />)
		if (!hasNumber)
			buff_error_list.push(<ErrorItem className={clsx(isEmpty ? 'info' : 'error')} key={5} text="One number" />)

		if (buff_error_list.length !== 0) {
			setRuleError(true)
			setErrorLists(buff_error_list);
			return
		}
		setRuleError(false)

	}
	return (
		<div className={clsx('w-full flex flex-col items-center justify-center', className)}>
			<div className={clsx(
				classes.inputBase, _isStrEmpty(value) ? '' : ruleError ? 'error' : 'success',
				'w-full flex items-center'
			)}>
				<InputComponent
					value={value}
					onChange={handlePwdChange}
					type={showPwd ? 'text' : 'password'}
					// placeholder="Password"
					endAdornment={
						<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onClick={() => setShowPwd(!showPwd)}
								onMouseDown={e => e.preventDefault()}
								edge="end"
							>
								{showPwd ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						</InputAdornment>
					}
					{...others}
				/>
				{
					_isStrEmpty(value) ? '' : ruleError ?
						<CancelIcon className='sm:text-5xl text-3xl pl-2' />
						:
						<CheckCircleIcon className='sm:text-5xl text-3xl pl-2' />
				}
			</div>
			<Collapse in={ruleError} component='ul' className={clsx(classes.errorLists)}>
				{errorLists.length > 0 &&
					<div className='sm:my-4 my-2'>{errorLists}</div>
				}
			</Collapse>
		</div>
	)
}

export default PwdValidInput