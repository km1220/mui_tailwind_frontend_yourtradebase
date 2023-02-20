import axios from 'axios';
import React, { useState, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
	SET_USER_INFO, SET_ALERT,
	LOADING
} from '@store/actions';

import { Button, Typography, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

import * as EmailValidator from 'email-validator';
// import GoogleLogo from '@assets/imgs/social/google.png'
// import LinkedInLogo from '@assets/imgs/social/linkedin.png'
// import FacebookLogo from '@assets/imgs/social/facebook.png'

import SelectRolePage from '@components/SelectRolePage'
import InputComponent from '@components/inputs/PwdInput/PwdInputComponent'
import EmailInput from '@components/inputs/EmailInput'
import PwdValidInput from '@components/inputs/PwdInput/PwdValidInput'
import PwdConfirmInput from '@components/inputs/PwdInput/PwdConfirmInput'

const useStyles = makeStyles(theme => ({
	root: {
		'& > div': {
			width: '100%',
			'& > *:not(:first-child)': {
				marginTop: '1rem',
			},
		}
	},
	divider: {
		fontSize: '1.25rem'
	},
	loginLink: {
		color: theme.palette.warning.main
	}
}));



function SignUpPage(props) {
	const classes = useStyles(props);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [email, setEmail] = useState('')
	const [name, setName] = useState('');
	const [pwd, setPwd] = useState('')
	const [isPwdError, setIsPwdError] = useState(false);
	const [confirmPwd, setConfrirmPwd] = useState('')
	const isPwdComfirmed = useMemo(() => (pwd === confirmPwd), [pwd, confirmPwd]);


	const validate = useCallback(() => {
		if (!EmailValidator.validate(email)) {
			console.log(`Your E-mail ${email} is not valid!`); return false;
		}
		else if (pwd.length === 0) {
			console.log(`Password must not be empty!`); return false;
		}
		else if (isPwdError) {
			console.log(`Password is not valid format!`); return false;
		}
		else if (!isPwdComfirmed) {
			console.log(`Confirm password not matchs!`); return false;
		}
		return true;
	}, [email, pwd, isPwdError, confirmPwd]);

	const handleSignUp = () => {
		if (!validate()) return;

		dispatch(LOADING(true));
		axios.post('/auth/signup', { name: name, email: email, pwd: pwd })
			.then(res => {
				const result = res.data.user_data;
				if (!result.id)
					dispatch(SET_ALERT({ type: 'error', message: 'Sign Up failed!' }));
				else {
					navigate('/login');
					dispatch(SET_ALERT({ type: 'success', message: 'Sign Up success!' }));
				}
				dispatch(LOADING(false));
			}).catch(err => {
				console.log(err);
				dispatch(LOADING(false));
				dispatch(SET_ALERT({ type: 'error', message: err.response.data.message }));
			});
	}

	return (
		<SelectRolePage className={clsx(classes.root, "w-2/5")}>
			<Typography className='mb-6 text-2xl font-extrabold sm:text-4xl'>Sign Up</Typography>
			<div>
				<EmailInput placeholder="E-mail*" value={email} onChange={e => setEmail(e.target.value)} />
				<InputComponent placeholder="Full Name*" value={name} onChange={e => setName(e.target.value)} />
				<PwdValidInput placeholder="Password"
					value={pwd} onChange={e => setPwd(e.target.value)}
					setIsPwdError={setIsPwdError}
				/>
				<PwdConfirmInput placeholder="Confirm Password"
					value={confirmPwd} onChange={e => setConfrirmPwd(e.target.value)}
					isValid={isPwdComfirmed} errorText="Confirmation doesn't match Password"
				/>
			</div>
			<br />

			<Button className={'h-12 rounded-full text-xl px-10 py-2'} sx={{ minWidth: '30%' }}
				variant='contained' color="primary" onClick={handleSignUp}
			>
				Sign Up
			</Button>
			<br />

			<Divider className="w-3/4" />
			<Typography className='my-5 font-bold'>
				Already have an account?
				<Link className={clsx(classes.loginLink)} to="/login">   Log In   </Link>
			</Typography>
		</SelectRolePage>
	)
}

export default SignUpPage