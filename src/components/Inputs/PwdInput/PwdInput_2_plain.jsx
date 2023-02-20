import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { makeStyles, styled } from '@mui/styles';
import clsx from 'clsx'
import { _isStrEmpty } from '@utils'



const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		padding: "0.5rem 1rem",
		borderRadius: '0.25rem',
	}
}))



const PwdOutlinedInput = styled(OutlinedInput)({
	'&.MuiOutlinedInput-root': {
		padding: 0,
		paddingRight: '1rem',
	},
	'& .MuiOutlinedInput-input': {
		padding: '0.25rem 1.25rem',
		paddingRight: 0,
	}
});

function PwdDefaultInput(props) {
	const { className, /*placeholder, */ value, onChange, isValid, ...others } = props
	const classes = useStyles(props)
	const [showPwd, setShowPwd] = useState(false)


	return (
		// <div className={clsx(classes.root, 'w-full flex flex-col items-center justify-center', className)}>

			<PwdOutlinedInput
				className={clsx(classes.root, 'xxxxxx', className)}
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
		// </div>
	)
}



PwdDefaultInput.propTypes = {
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	onChange: PropTypes.func,
	isValid: PropTypes.bool
}

PwdDefaultInput.defaultProps = {
	isValid: true
}


export default PwdDefaultInput