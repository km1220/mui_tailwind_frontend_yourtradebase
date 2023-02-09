import React from 'react'
import { useSelector } from 'react-redux'
import { Paper, Button, Typography, OutlinedInput, Divider } from '@mui/material'
import { ShieldOutlined, BugReportOutlined, FactCheckOutlined } from '@mui/icons-material';

import { makeStyles, styled } from '@mui/styles'
import clsx from 'clsx'


import DefaultLayout from '@layouts/DefaultLayout';
import SpaceTag from '@components/SpaceTag';



const useStyles = makeStyles(theme => ({
	root: {},
}))


const CardItem = props => {
	const { className, headIcon = null, title = '', text = '', ...others } = props
	return <Paper className={clsx('p-8', className)} elevation={20}>
		{headIcon && React.createElement(headIcon, {
			className: "sm:text-6xl text-4xl sm:mb-4 mb-2",
		})}
		<Typography className="mb-2 text-lg sm:text-xl sm:mb-4" variant="h4">{title}</Typography>
		<Typography className="mb-8 text-sm sm:text-base sm:mb-12">{text}</Typography>
	</Paper>
}

function Dashboard(props) {
	const classes = useStyles(props)
	// const userData = useSelector(state => state.user)
	// console.log("data : ", userData)

	return (
		<DefaultLayout>
			<div className='grow'>
				<h1> content </h1>
			</div>
		</DefaultLayout>
	)
}

export default Dashboard