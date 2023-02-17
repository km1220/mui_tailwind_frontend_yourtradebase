import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Tooltip, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { CategoryOutlined, EngineeringOutlined, PriceChangeOutlined, GroupOutlined } from '@mui/icons-material';
import { makeStyles, styled } from '@mui/styles';
import clsx from 'clsx';


const useStyles = makeStyles(theme => ({
	root: {
		'& .nav-header': {
			padding: '0 1.5rem',
		}
	}
}));


const SideBarList = styled(List)(({ theme }) => ({
	'& .MuiDivider-root': {
		borderColor: theme.palette.common.black,
		color: theme.palette.common.black,
		background: theme.palette.common.black,
	},
	'& .MuiListItemButton-root': {
		padding: '0.5rem 1.5rem',
		[theme.breakpoints.down('md')]: {
			padding: '0.5rem',
		},
		'& .MuiSvgIcon-root': {
			fontSize: '1.25rem',
			marginRight: '1rem',
			[theme.breakpoints.down('md')]: {
				fontSize: '1.75rem',
				marginRight: '0',
			},
		},
		'& .MuiListItemText-root': {
			[theme.breakpoints.down('md')]: {
				display: 'none',
			},
		},

		'&.active': {
			background: theme.palette.neutral[300],
			color: theme.palette.secondary.main,
			'& .MuiListItemIcon-root': {
				color: theme.palette.secondary.main,
			},
		},
	},
}));

const SideBarLink = ({ to, Icon, title, children }) => {
	const location = useLocation();
	return (
		<ListItemButton component={Link} to={to} className={clsx(
			location.pathname === to ? 'active' : '',
			// Icon ? '' : 'ml-9'
		)}>
			{Icon &&
				<Tooltip title={title}>
					<Icon />
				</Tooltip>
			}
			{title && <ListItemText className={clsx(Icon ? '' : 'ml-9')} primary={title} />}
			{/* {title && <ListItemText primary={title} />} */}
			{children}
		</ListItemButton>
	)
}

export default function DefaultLayout(props) {
	const classes = useStyles(props);
	return <div id="setting-side-bar" className={clsx(classes.root, 'mx-8')}>
		<SideBarList>
			<Divider />
			<Typography className='nav-header' variant='overline'>Prices</Typography>
			<SideBarLink to="/setting/material" title="Materials" Icon={CategoryOutlined} />
			<SideBarLink to="/setting/labour_rate" title="Labour rates" Icon={EngineeringOutlined} />
			<SideBarLink to="/setting/price_list" title="Price list" Icon={PriceChangeOutlined} />

			<Divider />
			<Typography className='nav-header' variant='overline'>Account</Typography>
			<SideBarLink to="/setting/team" title="Manage team" Icon={GroupOutlined} />

			<Divider />
			<Typography className='nav-header' variant='overline'>TEST</Typography>
			<SideBarLink title="Setting">
				<h5>test 1</h5>
			</SideBarLink>
			<SideBarLink title="Setting test 2" />
			<ListItem>test 3</ListItem>
		</SideBarList>
	</div>
}
