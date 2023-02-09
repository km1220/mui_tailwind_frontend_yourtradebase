import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { Button, Typography, Divider } from '@mui/material';

import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

import SelectRolePage from '@components/SelectRolePage'
// import InputComponent from '@components/Inputs/InputComponent'
import EmailInput from '@components/Inputs/EmailInput'
import PwdInput from '@components/Inputs/PwdInput/PwdInput'

import { SET_ALL_USER_INFO } from '@store/actions'
import { validateEmail } from '@utils'

const useStyles = makeStyles(theme => ({
	root: {
	},
	divider: {
		fontSize: '1.25rem'
	},
	loginLink: {
		color: theme.palette.warning.main
	}
}))

function LogInPage(props) {
	const dispatch = useDispatch()
	const classes = useStyles(props)
	const navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [pwd, setPwd] = useState('')

	const handleLogIn = (e) => {
		if (!validateEmail(email)) {
			console.log(`Your E-mail ${email} is not valid!`)
			return
		}

		console.log(`${email}  and ${pwd}    valid!`)
		// alert(`${email}  and ${pwd}    valid!`)

		dispatch(SET_ALL_USER_INFO({ email_addr: email }))
		navigate('/dashboard')
	}

	return (
		<SelectRolePage className={"w-2/5"}>
			<Typography className='my-10 font-extrabold sm:text-4xl text-2xl'>Welcome</Typography>
			<EmailInput className='mb-5' placeholder="Email"
				value={email} onChange={e => setEmail(e.target.value)}
			/>
			<PwdInput className='mb-3' placeholder="Password"
				value={pwd} onChange={e => setPwd(e.target.value)}
			/>
			<Typography component={Link} to={{ pathname: "/verify_email" }}
				className="mb-6 text-gray-400 hover:text-black">forgot password?</Typography>


			<Button className={clsx('h-12 rounded-full text-xl px-10 py-2 mb-7')}
				variant='contained' color="primary"
				onClick={handleLogIn}
			>Log In</Button>

			<Divider className="w-3/4" />
			<Typography className='my-5 font-bold'>
				Don't have an account?
				<Link className={clsx(classes.loginLink)} to="/signup">   Sign Up   </Link>
			</Typography>
		</SelectRolePage>
	)
}

export default LogInPage