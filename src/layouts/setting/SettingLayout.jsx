import React from 'react'
import { Outlet } from 'react-router-dom';

import Header from '../Header';
import SideBar from './SideBar';

export default function SettingLayout() {
	return <>
		<Header />
		<div className='flex justify-center w-full my-8 grow'>
			<SideBar />
			<div className='w-1/3'>
				<Outlet />
			</div>
		</div>
	</>
}