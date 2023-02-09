import React from 'react'
import { Box, Paper, Typography } from "@mui/material";
import { makeStyles } from '@mui/styles'
import clsx from 'clsx';

import Header from '@layouts/Header';
import LogoImg from '@assets/imgs/app-logo.png';

const useStyles = makeStyles(theme => ({
	root: {
		padding: '5vw',
		textAlign: 'center',
		'& img#logo-img': {
			color: theme.palette.info.main
		}
	},
	logoImg: {
		// background: theme.palette.common.white,
		// padding: '0.5rem',
		// borderRadius: '1rem',
		// width: '3rem',
		width: '1.5rem',
		marginRight: '1rem',
	}
}))

function SelectRolePage(props) {
	const { className, ...others } = props
	const classes = useStyles(props)

	return (
		<>
			<Header />
			<Box className={clsx(classes.root, 'w-full flex flex-col items-center')}>
				<div className='flex items-center'>
					<img id='logo-img' className={clsx(classes.logoImg, 'w-6 mr-4')} src={LogoImg} alt="logo" />
					<Typography variant='h2'>YourTradebase</Typography>
				</div>
				<Paper
					elevation={24}
					className={clsx(
						`flex flex-col 
					items-center justify-center
					sm:rounded-3xl rounded-lg
					p-8`, props.className)
					}>
					{props.children}
				</Paper>
			</Box>
		</>
	)
}

export default SelectRolePage