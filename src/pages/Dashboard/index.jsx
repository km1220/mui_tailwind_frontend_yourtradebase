import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Paper, Button, Typography, Divider } from '@mui/material'
// import { ShieldOutlined, BugReportOutlined, FactCheckOutlined } from '@mui/icons-material'


import { makeStyles } from '@mui/styles'
import clsx from 'clsx'

import SpaceTag from '@components/SpaceTag';
import { _isObjEmpty } from '@utils'

const useStyles = makeStyles(theme => ({
	root: {
		// margin: '5%',

		'& table.analyzed-data-table': {
			width: '100%',
			padding: '5%',
			border: '#007f8f dashed 3px',
			borderRadius: '10px',
			// '& tr': {
			// 	'&:not(:last-child)': {
			// 		borderBottom: '#333 solid 3px',
			// 	},
			// 	'& > th, & > td': {
			// 		textAlign: 'center',
			// 		'&:not(:last-child)': {
			// 			borderRight: '#333 solid 3px',
			// 		}
			// 	},
			// 	'& th.horizontal-table-title': {
			// 		background: '#888'
			// 	}
			// },
		}
	},
}))

function Dashboard(props) {
	const classes = useStyles(props)
	const dispatch = useDispatch()
	const userData = useSelector(state => state.user)

	return (
		<>
			<div className={clsx(classes.root, 'flex flex-col m-8')}>
				<SpaceTag h={4} />
				<Typography variant="h2"> Dashboard Page </Typography>
				<Paper className="flex flex-col items-center px-6 py-8 m-8 sm:m-12 sm:px-8 sm:py-12" elevation={24} >
					<Typography variant="h6"> Welcome {userData.email_addr}!</Typography>
				</Paper>
			</div>
		</>
	)
}

export default Dashboard