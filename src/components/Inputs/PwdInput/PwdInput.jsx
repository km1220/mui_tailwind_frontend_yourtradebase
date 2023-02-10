import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { InputAdornment, IconButton, Collapse, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx'
import { _isStrEmpty } from '@utils'

import InputComponent from '@components/inputs/InputComponent'


const useStyles = makeStyles(theme => ({
	root: {}
}))

function PwdInput(props) {
	const { className, /*placeholder, */ value, onChange, isValid, ...others } = props
	const classes = useStyles(props)
	const [showPwd, setShowPwd] = useState(false)


	return (
		<div className={clsx(classes.root, 'w-full flex flex-col items-center justify-center', className)}>

			<InputComponent
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
						>
							{showPwd ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				}
				{...others}
			/>
		</div>
	)
}

PwdInput.defaultProps = {
	isValid: true
}

PwdInput.propTypes = {
	isValid: PropTypes.bool
}

export default PwdInput