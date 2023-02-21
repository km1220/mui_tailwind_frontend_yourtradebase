import React from 'react';
import { Typography } from '@mui/material';
import { DescriptionOutlined } from '@mui/icons-material';

export default function BadgeComponent(props) {
	const { text, Icon = DescriptionOutlined, children, ...others } = props;
	return (
		<div className='flex items-baseline'>
			{children}
			<Typography className='flex items-center' variant='overline'
				sx={{ height: 'fit-content', lineHeight: 1, backgroundColor: 'info.light', p: '0.1rem 0.5rem', borderRadius: 0.5, ml: 1 }}
			>
				<Icon fontSize='1' sx={{ mr: 0.5 }} /> {text}
			</Typography>
		</div>
	)
}
