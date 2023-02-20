import React from 'react'
import { Outlet } from 'react-router-dom';

import Header from '../Header';
import SideBar from './SideBar';

export default function SettingLayout() {
	return <>
		<Header />
		<div className=''
			style={{
				minWidth: '70%',
				display: 'flex',
				justifyContent: 'center',
				flexGrow: 1,
				margin: '2rem 0',
			}}
		>
			<SideBar />
			<div className=''
				style={{ flexGrow: 1, }}
			>
				<Outlet />
			</div>
		</div>
	</>
}
