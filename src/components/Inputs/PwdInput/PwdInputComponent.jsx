import PropTypes from 'prop-types';
import { OutlinedInput } from '@mui/material'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
	root: {
		'& .MuiInputBase-input': {
			height: 'auto',
			padding: '8px 6px',
			paddingRight: '0',
			[theme.breakpoints.down('sm')]: {
				padding: '4px 2px',
				paddingRight: '0',
			}
		},
	},
	focused: {
		// height: '100px',
	}
}))

// const XComponent = (Elem) => styled(Elem) < Element > (({ theme }) => ({}))

const PwdInputComponent = (props) => {
	const classes = useStyles(props)
	const { className, variant, placeholder, value, onChange, ...others } = props
	return variant !== 'outlined-input' ? <input
		className={clsx(classes.root,
			`w-full rounded border
			 focus:outline-none focus:ring focus:ring-violet-300
			text-3xl sm:px-8 am:py-2 px-4 py-1`, className)}
		placeholder={placeholder} value={value} onChange={onChange}
		{...others}
	/> : <OutlinedInput
		className={clsx(`w-full rounded border text-xl sm:px-8 px-4`, className)}
		classes={{ root: classes.root, focused: classes.focused }}
		placeholder={placeholder} value={value} onChange={onChange}
		{...others}
	/>

}

PwdInputComponent.propTypes = {
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	onChange: PropTypes.func,
	variant: PropTypes.oneOf(['outlined-input', 'div'])
}
PwdInputComponent.defaultProps = {
	// variant: 'div',
	variant: 'outlined-input',
}

export default PwdInputComponent