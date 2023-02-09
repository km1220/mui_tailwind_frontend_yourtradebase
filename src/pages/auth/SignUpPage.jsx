import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Button, Typography, Divider } from '@mui/material'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'

// import GoogleLogo from '@assets/imgs/social/google.png'
// import LinkedInLogo from '@assets/imgs/social/linkedin.png'
// import FacebookLogo from '@assets/imgs/social/facebook.png'

import SelectRolePage from '@components/SelectRolePage'
import InputComponent from '@components/Inputs/InputComponent'
import EmailInput from '@components/Inputs/EmailInput'
import PwdValidInput from '@components/Inputs/PwdInput/PwdValidInput'
import PwdConfirmInput from '@components/Inputs/PwdInput/PwdConfirmInput'

const useStyles = makeStyles(theme => {
	console.log(theme)
	return ({
		root: {
		},
		divider: {
			fontSize: '1.25rem'
		},
		loginLink: {
			color: theme.palette.warning.main
		}
	})
})



function SignUpPage(props) {
	const classes = useStyles(props);
	const navigate = useNavigate();
	const [email, setEmail] = useState('')
	const [pwd, setPwd] = useState('')
	const [confirmPwd, setConfrirmPwd] = useState('')

	const handleSignUp = () => {
		navigate('/dashboard')
	}

	return (
		<SelectRolePage className={"w-2/5"}>
			<Typography className='my-10 font-extrabold sm:text-4xl text-2xl'>Welcome</Typography>
			<EmailInput className='mb-5' placeholder="E-mail*"
				value={email} onChange={e => setEmail(e.target.value)}
			/>
			<InputComponent className='mb-5' placeholder="Full Name*" />
			<PwdValidInput className="mb-5" placeholder="Password"
				value={pwd} onChange={e => setPwd(e.target.value)}
			/>
			<PwdConfirmInput className="mb-5" placeholder="Confirm Password"
				value={confirmPwd} onChange={e => setConfrirmPwd(e.target.value)}
				isValid={pwd === confirmPwd} errorText="Confirmation doesn't match Password"
			/>

			<Button className={'h-12 rounded-full text-xl px-10 py-2 mb-7'}
				variant='contained' color="primary"
				onClick={handleSignUp}
				sx={{ minWidth: '30%' }}
			>
				Sign Up
			</Button>

			{/* <Divider classes={{ root: classes.divider }} className='w-1/4 my-7' >OR</Divider>
			<div className='flex justify-evenly w-3/4 mb-12'>
				<img src={FacebookLogo} alt='FacebookLogo' />
				<img src={LinkedInLogo} alt='LinkedInLogo' />
				<img src={GoogleLogo} alt='GoogleLogo' />
			</div>

			<FormControlLabel
				className='w-3/5 mb-11'
				label={<Typography className='lg:text-sm text-xs'>By continuing with Google or Facebook, you are agreeing to our Terms + Conditions</Typography>}
				control={
					<Checkbox />
				}
			/> */}

			<Divider className="w-3/4" />
			<Typography className='my-5 font-bold'>
				Already have an account?
				<Link className={clsx(classes.loginLink)} to="/login">   Log In   </Link>
			</Typography>
		</SelectRolePage>
	)
}

export default SignUpPage