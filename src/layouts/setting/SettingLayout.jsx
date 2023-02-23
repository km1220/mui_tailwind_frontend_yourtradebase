import React from 'react'
import { Outlet } from 'react-router-dom';

import Header from '../Header';
import SideBar from './SideBar';
import { makeStyles, styled } from '@mui/styles';
import clsx from 'clsx';


const useStyles = makeStyles(theme => ({
	body: {
		minWidth: '70%',
		// height: `calc(100vh - 56px)`,

		display: 'flex',
		justifyContent: 'center',
		flexGrow: 1,
		margin: '2rem 0',
	},
	settingSideBar: {
		maxWidth: '25vw',
		// height: `calc(100vh - 56px - 64px)`,
		// overflow: 'auto',

		marginRight: '3rem',
		[theme.breakpoints.down('md')]: {
			marginRight: '2rem',
		},

		'&::-webkit-scrollbar': { width: '1px', height: '1px' },
		'&::-webkit-scrollbar-track': { background: '#bbb' },
		'&::-webkit-scrollbar-thumb': { background: '#004008' },
		'&::-webkit-scrollbar-thumb:hover': { background: '#333' },
	},
	settingContent: {
		maxWidth: '65vw',
		flexGrow: 1,
		[theme.breakpoints.down('md')]: {
			maxWidth: '85vw',
		}
	},
}));

export default function SettingLayout(props) {
	const classes = useStyles(props);
	return <>
		<Header />
		<div className={classes.body}>
			<SideBar className={classes.settingSideBar} />
			<div id='setting-content' className={classes.settingContent}>
				<Outlet />
			</div>
		</div>
	</>
}
