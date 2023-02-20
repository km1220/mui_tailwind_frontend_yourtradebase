
import axios from 'axios';
import React, { useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_ALERT } from '@store/actions';

import {
	Divider, Typography, Button
} from '@mui/material';
import { makeStyles } from '@mui/styles';
// import clsx from 'clsx';

import PwdDefaultInput from '@components/inputs/PwdInput/PwdDefaultInput'
import PwdValidInput from '@components/inputs/PwdInput/PwdValidInput'
import PwdConfirmInput from '@components/inputs/PwdInput/PwdConfirmInput'



const useStyles = makeStyles(theme => ({
	root: {
		'& > *:not(:first-child)': {
			marginTop: '2.5rem',
		},
	},
	inputsWrapper: {
		display: 'flex',
		flexDirection: 'column',
		padding: '0 2rem',
		'& > div': {
			display: 'flex',
			flexDirection: 'column',
		},
		'& > *:not(:first-child)': {
			marginTop: '1.5rem',
		},
	},
}));


export default function ChangePwdPage(props) {
	const classes = useStyles(props);
	const dispatch = useDispatch();
	const userData = useSelector(state => state.user);

	const [oldPwd, setOldPwd] = useState('')
	// const [isOldPwdError, setOldIsPwdError] = useState(false);
	const [newPwd, setNewPwd] = useState('')
	const [isNewPwdError, setNewIsPwdError] = useState(false);
	const [confirmPwd, setConfrirmPwd] = useState('')
	const isPwdComfirmed = useMemo(() => (newPwd === confirmPwd), [newPwd, confirmPwd]);


	const validate = useCallback(() => {
		if (oldPwd.length === 0) {
			console.log(`Old password is empty!`); return false;
		}
		// else if (isOldPwdError) {
		// 	console.log(`Old password is not valid format!`); return false;
		// }
		if (newPwd.length === 0) {
			console.log(`New password is empty!`); return false;
		}
		else if (isNewPwdError) {
			console.log(`New password is not valid format!`); return false;
		}
		else if (!isPwdComfirmed) {
			console.log(`Confirm password not matchs!`); return false;
		}
		return true;
	}, [newPwd, isNewPwdError, confirmPwd]);

	const handleChangePwd = () => {
		if (!validate()) return;

		axios.put(`/auth/update_pwd/${userData.id}`, { old_pwd: oldPwd, new_pwd: newPwd })
			.then(res => {
				console.log(res);
				if (res.data.affectedRows) {
					dispatch(SET_ALERT({ type: 'success', message: 'Changed your password successfully!' }));
					setOldPwd(''); setNewPwd(''); setConfrirmPwd('');
				}
			}).catch(err => {
				dispatch(SET_ALERT({ type: 'error', message: err.response.data.message }));
			});
	};

	return (
		<div className={classes.root}>
			<div>
				<Typography variant='h5'>Change password</Typography>
				<Divider />
			</div>
			<div className={classes.inputsWrapper}>
				<div>
					<Typography variant='subtitle1'>What's your current password?</Typography>
					<PwdDefaultInput placeholder="Password" value={oldPwd} onChange={e => setOldPwd(e.target.value)} />
				</div>
				<div>
					<Typography variant='subtitle1'>Enter your new password</Typography>
					<PwdValidInput placeholder="New password"
						value={newPwd} onChange={e => setNewPwd(e.target.value)}
						setIsPwdError={setNewIsPwdError}
					/>
					<Typography variant="caption">8+ characters. At least one number and any letters or symbols.</Typography>
				</div>
				<div>
					<Typography variant='subtitle1'>Re-enter your new password</Typography>
					<PwdConfirmInput placeholder="Confirm Password"
						value={confirmPwd} onChange={e => setConfrirmPwd(e.target.value)}
						isValid={isPwdComfirmed} errorText="Confirmation doesn't match Password"
					/>
				</div>
			</div>

			<div className='flex justify-center'>
				<Button className='mx-4 rounded' color="secondary" variant="contained" onClick={handleChangePwd}>Set new password</Button>
			</div>
		</div>
	)
}