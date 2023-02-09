import { OutlinedInput } from '@mui/material'
import { makeStyles, styled } from '@mui/styles'
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

const InputComponent = (props) => {
	const classes = useStyles(props)
	const { className, placeholder, value, onChange, ...others } = props
	return false ? <input
		className={clsx(classes.root,
			`w-full rounded-full border
			 focus:outline-none focus:ring focus:ring-violet-300
			text-3xl sm:px-8 am:py-2 px-4 py-1`, className)}
		placeholder={placeholder} value={value} onChange={onChange}
		{...others}
	/> : <OutlinedInput
		className={clsx(`w-full rounded-full border text-xl sm:px-8 px-4`, className)}
		classes={{ root: classes.root, focused: classes.focused }}
		placeholder={placeholder} value={value} onChange={onChange}
		{...others}
	/>

}

export default InputComponent