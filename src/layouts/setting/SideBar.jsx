import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { CategoryOutlined, EngineeringOutlined, PriceChangeOutlined } from '@mui/icons-material';
import { makeStyles, styled } from '@mui/styles';
import clsx from 'clsx';


const useStyles = makeStyles(theme => ({
	root: {
		'&': {}
	}
}));


const SideBarList = styled(List)(({ theme }) => ({
	'& .MuiListItemButton-root': {
		padding: '0.5rem 1.5rem',
		'& .MuiListItemIcon-root': {
			minWidth: 0,
			marginRight: '1rem',
		},
		'& .MuiSvgIcon-root': {
			fontSize: '1.25rem',
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
		<ListItemButton component={Link} to={to} className={location.pathname === to ? 'active' : ''} >
			{Icon && <ListItemIcon> <Icon /> </ListItemIcon>}
			{title && <ListItemText className={Icon ? '' : 'ml-9'} primary={title} />}
			{children}
		</ListItemButton>
	)
}

export default function DefaultLayout(props) {
	const classes = useStyles(props);
	return <div id="setting-side-bar" className={clsx(classes.root, 'mx-8')}>
		<SideBarList>
			<Divider />
			<SideBarLink to="/setting/materials" title="Materials" Icon={CategoryOutlined} />
			<SideBarLink to="/setting/labour_rates" title="Labour rates" Icon={EngineeringOutlined} />
			<SideBarLink to="/setting/price_list" title="Price list" Icon={PriceChangeOutlined} />
			<Divider />
			<SideBarLink to="/setting" title="Setting">
				<h5>text</h5>
			</SideBarLink>
			<SideBarLink to="/setting" title="Setting" />
			<ListItem></ListItem>
		</SideBarList>
	</div>
}
