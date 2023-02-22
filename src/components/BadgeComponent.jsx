import React from 'react';
import { Typography, alpha } from '@mui/material';
import { DescriptionOutlined } from '@mui/icons-material';
import { useTheme } from '@mui/styles';

export default function BadgeComponent(props) {
	const { text, Icon = DescriptionOutlined, children, ...others } = props;
	const theme = useTheme();
	return (
		<div className='flex items-baseline' {...others}>
			{children}
			<Typography className='flex items-center' variant='overline'
				sx={{ height: 'fit-content', lineHeight: 1, backgroundColor: alpha(theme.palette.info.light, 0.3), p: '0.1rem 0.5rem', borderRadius: 0.5 }}
			>
				<Icon fontSize='1' sx={{ mr: 0.5 }} /> {text}
			</Typography>
		</div>
	)
}
