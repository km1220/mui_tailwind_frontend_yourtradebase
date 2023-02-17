import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Paper, Button, Typography, Divider } from '@mui/material'
// import { ShieldOutlined, BugReportOutlined, FactCheckOutlined } from '@mui/icons-material'


import { makeStyles } from '@mui/styles'
import clsx from 'clsx'

import SpaceTag from '@components/SpaceTag';
import { _isObjEmpty } from '@utils'


import BGImg1 from '../../assets/imgs/bg/marketing-wallpapers-1.jpg';
import BGImg2 from '../../assets/imgs/bg/marketing-wallpapers-2.jpg';
import BGImg3 from '../../assets/imgs/bg/digital-marketing-courses.jpg';
import BGImg4 from '../../assets/imgs/bg/marketing-manager.jpg';




const useStyles = makeStyles(theme => ({
	root: {
		padding: '2%',
		background: `url(${BGImg1}) left top no-repeat`,
		backgroundSize: '100% 100%',
		width: '100%',
		height: '100%',
		display: 'flex',
		flexColumn: 'column',
		flexGrow: 1,
		justifyContent: 'center',
		// alignItems: 'center',
		alignItems: 'start',

		'& .MuiTypography-root': {
			color: theme.palette.primary.dark,
		}
	},
}))

function Dashboard(props) {
	const classes = useStyles(props)
	const dispatch = useDispatch()
	const userData = useSelector(state => state.user)

	return (
		<>
			<div className={classes.root}>
				{/* <Typography variant="h2"> Dashboard Page </Typography> */}
				<Paper className="flex flex-col items-center px-12 py-8" elevation={24}
					style={{
						// backgroundImage: `url(${BGImg})`,
						// background: 'transparent',
						background: '#F3F4F6',
						// opacity: 0.65,
						boxShadow: `0 0.25rem 0.5rem 0.05rem #555`,
						color: '#000',
					}}
				>
					<Typography variant="h4"> Welcome {userData.email_addr}!</Typography>
				</Paper>
			</div>
		</>
	)
}

export default Dashboard