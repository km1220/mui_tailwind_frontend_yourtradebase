import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Typography, Divider } from '@mui/material'
// import { ThemeProvider } from '@mui/material/styles';
// import { createTheme } from '@mui/material';

import { makeStyles, styled } from '@mui/styles'
import clsx from 'clsx'

// import Logo from '@assets/imgs/app-logo.png'

const useStyles = makeStyles(theme => ({
	root: {
		background: theme.palette.common.black,
		color: theme.palette.common.white,

		height: '200px',
	},
	section: {
		"& > .MuiDivider-root": {
			// height: '100px',
		}
	},
}))

function Footer(props) {
	const classes = useStyles(props)

	return (
		<div className={clsx(classes.root, 'w-full flex flex-col')}>
			{/* <img className="w-1/12 bg-white" src={Logo} alt="logo" />
			<img className="w-1/12 bg-white" src={Logo} alt="logo" /> */}
			<div className={clsx(classes.section, `w-full flex md:flex-row flex-col justify-around items-center
			h-full
			`)}>
				<div>First block</div>
				<Divider className="border-white h-3/4" orientation='vertical' />
				<div>Second block</div>
				<Divider className="border-white h-3/4" orientation='vertical' />
				<div>Third block</div>
			</div>
		</div>
	)
}

export default Footer