import React from 'react'
// import { useSelector } from 'react-redux'
import { Paper, Button, Typography, OutlinedInput, Divider } from '@mui/material'
// import { ShieldOutlined, BugReportOutlined, FactCheckOutlined } from '@mui/icons-material';

import { makeStyles, styled } from '@mui/styles'
import clsx from 'clsx'

import BGImg1 from '../assets/imgs/bg/marketing-wallpapers-1.jpg';
import BGImg2 from '../assets/imgs/bg/marketing-wallpapers-2.jpg';
import BGImg3 from '../assets/imgs/bg/digital-marketing-courses.jpg';
import BGImg4 from '../assets/imgs/bg/marketing-manager.jpg';



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
		// alignItems: 'center',
	},
}))


// const CardItem = props => {
// 	const { className, headIcon = null, title = '', text = '', ...others } = props
// 	return <Paper className={clsx('p-8', className)} elevation={20}>
// 		{headIcon && React.createElement(headIcon, {
// 			className: "sm:text-6xl text-4xl sm:mb-4 mb-2",
// 		})}
// 		<Typography className="mb-2 text-lg sm:text-xl sm:mb-4" variant="h4">{title}</Typography>
// 		<Typography className="mb-8 text-sm sm:text-base sm:mb-12">{text}</Typography>
// 	</Paper>
// }

function Dashboard(props) {
	const classes = useStyles(props)
	// const userData = useSelector(state => state.user)
	// console.log("data : ", userData)

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

export default Dashboard