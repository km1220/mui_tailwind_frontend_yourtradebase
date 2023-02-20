import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
	SET_USER_INFO, SET_ALERT,
	LOADING
} from '@store/actions';
import { Button, Typography, Divider } from '@mui/material';

import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

import SelectRolePage from '@components/SelectRolePage';
import EmailInput from '@components/inputs/EmailInput';
import PwdDefaultInput from '@components/inputs/PwdInput/PwdDefaultInput';

import * as EmailValidator from 'email-validator';
import { parseJSON } from '@utils';
import spacetime from "spacetime";

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
}))

function LogInPage(props) {
	const classes = useStyles(props);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [pwd, setPwd] = useState('');


	const handleLogIn = () => {
		if (!EmailValidator.validate(email)) {
			console.log(`Your E-mail ${email} is not valid!`)
			return
		}

		const loginTime = spacetime.now();
		dispatch(LOADING(true));
		axios.post('/auth/login', { targetEmail: email, targetPwd: pwd, lastLoginAt: JSON.stringify(loginTime) })
			.then(res => {
				// if (!res.data.user_data.id || res.response.status === 404 || res.response.data.status === 'failed') {
				// 	alert(res.response.data.message);
				// 	return;
				// }
				const result = res.data.user_data;
				const userData = {
					id: result.id, name: result.name, email: result.email,					// password: result.password,
					fromName: result.from_name || '', reply2email: result.reply_to_email || '', sign: result.signature || '',
					TZ: result.timezone || '', lastLoginAt: parseJSON(result.last_login_at) || ''
				};
				dispatch(SET_USER_INFO(userData));
				navigate('/dashboard');
				dispatch(LOADING(false));
				dispatch(SET_ALERT({ type: 'success', message: 'Successfully Logged in!' }));
			}).catch(err => {
				console.log(err);
				dispatch(LOADING(false));
				dispatch(SET_ALERT({ type: 'error', message: err.response.data.message }));
			});
	}

	return (
		<SelectRolePage className={clsx(classes.root, "w-2/5")}>
			<Typography className='mb-6 text-2xl font-extrabold sm:text-4xl'>Log In</Typography>
			<div>
				<EmailInput placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
				<PwdDefaultInput placeholder="Password" value={pwd} onChange={e => setPwd(e.target.value)} />
				{/* <Typography component={Link} to={{ pathname: "/verify_email" }} className="mb-6 text-gray-400 hover:text-black">forgot password?</Typography> */}
			</div>
			<br />

			<Button className={'h-12 rounded-full text-xl px-10 py-2'} sx={{ minWidth: '30%' }}
				variant='contained' color="primary" onClick={handleLogIn}
			>
				Log In
			</Button>
			<br />

			<Divider className="w-3/4" />
			<Typography className='my-5 font-bold'>
				Don't have an account?
				<Link className={clsx(classes.loginLink)} to="/signup">   Sign Up   </Link>
			</Typography>
		</SelectRolePage>
	)
}

export default LogInPage