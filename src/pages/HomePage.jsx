import React from 'react'
// import { useSelector } from 'react-redux'
import { Paper, Button, Typography, OutlinedInput, Divider } from '@mui/material'
// import { ShieldOutlined, BugReportOutlined, FactCheckOutlined } from '@mui/icons-material';

import { makeStyles, styled } from '@mui/styles'
import clsx from 'clsx'

import BGImg1 from '../assets/imgs/bg/marketing-wallpapers-1.jpg';
// import BGImg2 from '../assets/imgs/bg/marketing-wallpapers-2.jpg';
// import BGImg3 from '../assets/imgs/bg/digital-marketing-courses.jpg';
// import BGImg4 from '../assets/imgs/bg/marketing-manager.jpg';



const useStyles = makeStyles(theme => ({
	root: {
		padding: '5%',
		background: `url(${BGImg1}) left top no-repeat`,
		backgroundSize: '100% 100%',
		width: '100%',
		height: '100%',
		display: 'flex',
		flexColumn: 'column',
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'start',
	},
}))


function HomePage(props) {
	const classes = useStyles(props)
	return (
		<>
			<div className={classes.root}>
				<Paper className="flex flex-col items-center px-12 py-6 m-0" elevation={24}
					style={{ 
						background: '#F3F4F6',
						opacity: 0.65,
						boxShadow: `0 0.25rem 0.5rem 0.05rem #111`,
					 }}
				>
					<Typography variant="h3"> Home page</Typography>
				</Paper>
			</div>
		</>
	)
}

export default HomePage;