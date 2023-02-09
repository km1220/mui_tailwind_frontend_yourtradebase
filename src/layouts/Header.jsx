import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { RESET_USER_INFO } from '@store/actions'

import { Button, Typography, Avatar, Popover, List, ListItemButton, ListItemIcon, ListItemText, Collapse } from '@mui/material'
// import { createTheme } from '@mui/material';
import { makeStyles, styled, useTheme, ThemeProvider } from '@mui/styles'
import {
	HomeOutlined, WcOutlined, DraftsOutlined, WorkOutline,
	DescriptionOutlined, CalendarMonthOutlined, FormatListBulletedOutlined,
	LogoutOutlined, AccountCircleOutlined, SettingsOutlined, GroupOutlined
} from '@mui/icons-material';
import clsx from 'clsx'

import Logo from '@assets/imgs/app-logo.png';

// const headerTheme = theme => createTheme({
// 	components: {
// 		MuiButton: {
// 			defaultProps: {
// 				// disableElevation: true,
// 				// disableFocusRipple: true,
// 			},
// 			styleOverrides: {
// 				root: {
// 					textTransform: 'none',
// 					color: theme.palette.primary.main,
// 					border: `${theme.palette.common.white} solid 1px`,
// 					borderRadius: '0',
// 				}
// 			}
// 		},
// 	},
// 	typography: {
// 		button: {
// 			fontWeight: 600,
// 			fontSize: '1.25rem',
// 			fontFamily: 'revert',
// 		},
// 	},
// })


const useStyles = makeStyles(theme => ({
	root: {
		background: theme.palette.neutral[300],
		color: theme.palette.common.black,
		// padding: '0rem 1.5rem'
	},
	logoImg: {
		// background: theme.palette.common.white,
		// padding: '0.5rem',
		// borderRadius: '1rem',
		// width: '3rem',
	}
}))


const HeaderBtn = props => {
	const { className, style, children, ...others } = props
	return React.createElement(Button, {
		className: clsx("px-4 py-2 text-xs", className), component: props.to ? Link : 'button',
		variant: "outlined", color: "inherit",
		style: {
			fontFamily: 'revert',
			borderRadius: '0.25rem',
			...style
		},
		...others
	},
		children
	)
}
const LinkBtn = ({ title, Icon, to }) => {
	return <Button className='flex flex-col' component={Link} to={to}>
		<Icon className='text-sl' />
		<Typography className='text-xs'>{title.toUpperCase()}</Typography>
	</Button>
}
const UserInfoList = styled(List)({
	'& .MuiListItemButton-root': {
		padding: '0.25rem 1.25rem',
	},
	'& .MuiListItemIcon-root': {
		minWidth: 0,
		marginRight: '1rem',
	},
	'& .MuiSvgIcon-root': {
		fontSize: '1.25rem',
	},
});

export default function Header(props) {
	const classes = useStyles(props)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const userData = useSelector(state => state.user)
	const [showUserInfoList, setShowUserInfoList] = useState(false);
	// const theme = useTheme()


	console.log('redux user data: ', userData);
	const handleLogout = () => {
		dispatch(RESET_USER_INFO())
		console.log('redux user data: ', userData);
	}

	return (
		// <ThemeProvider theme={headerTheme}>
		<div className={clsx(classes.root, 'w-full flex items-center')}>
			<Link to="/home" className="flex ml-8 align-middle">
				<img className={clsx(classes.logoImg, 'w-4')} src={Logo} alt="logo" />
				<Typography className="ml-4" variant="h6"> YourTradebase.com </Typography>
			</Link>

			<div style={{ flexGrow: 1 }}></div>
			<div className='flex justify-between grow'>
				<LinkBtn to={"/"} title="Home" Icon={HomeOutlined} />
				<LinkBtn to={"/customers"} title="Customers" Icon={WcOutlined} />
				<LinkBtn to={"/quotes"} title="Quotes" Icon={DraftsOutlined} />
				<LinkBtn to={"/jobs"} title="Jobs" Icon={WorkOutline} />
				<LinkBtn to={"/invoices"} title="Invoices" Icon={DescriptionOutlined} />
				<LinkBtn to={"/schedule"} title="Schedule" Icon={CalendarMonthOutlined} />
				<LinkBtn to={"/tasks"} title="Tasks" Icon={FormatListBulletedOutlined} />
			</div>
			<div style={{ flexGrow: 1 }}></div>

			<div className=''>
				<HeaderBtn to={'/contact_us'} color='secondary' variant="contained">Contact Us</HeaderBtn>
			</div>
			{!userData.email_addr ?
				<>
					<HeaderBtn to={'/login'} className="ml-6">Log In</HeaderBtn>
					<HeaderBtn to={'/signup'} className="ml-6">Sign Up</HeaderBtn>
				</>
				:
				<div>
					<Button id="user-info" className='' onClick={() => setShowUserInfoList(!showUserInfoList)}>
						<Avatar>
							{/* {userData.email_addr} */}EV
						</Avatar>
					</Button>
					<Popover
						open={showUserInfoList}
						anchorEl={document.getElementById('user-info')}
						onClose={() => setShowUserInfoList(false)}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'right',
						}}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
					>
						<UserInfoList style={{ padding: 0 }}>
							<ListItemButton component={Link} to="/setting">
								<ListItemIcon> <SettingsOutlined /> </ListItemIcon>
								<ListItemText primary="Setting" />
							</ListItemButton>
							<ListItemButton component={Link} to="/manage_team">
								<ListItemIcon> <GroupOutlined /> </ListItemIcon>
								<ListItemText primary="Manage Team" />
							</ListItemButton>
							<ListItemButton component={Link} to="/account">
								<ListItemIcon> <AccountCircleOutlined /> </ListItemIcon>
								<ListItemText primary="Manage Account" />
							</ListItemButton>
							<ListItemButton onClick={handleLogout}>
								<ListItemIcon> <LogoutOutlined /> </ListItemIcon>
								{/* <HeaderBtn className="ml-6" >Log out</HeaderBtn> */}
								<ListItemText primary="Log out" />
							</ListItemButton>
						</UserInfoList>
						{/* <Collapse in={true} >
							jkdslkjfldkl
						</Collapse> */}

					</Popover>
				</div>
			}
		</div>
		// </ThemeProvider>
	)
}
