import React from 'react';
import { Snackbar, Alert as MuiAlert, } from '@mui/material';

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function MySnackbar(props) {
	const { open, onClose, autoHideDuration = 3000, severity, message, ...others } = props;
	return (
		<Snackbar open={open} autoHideDuration={autoHideDuration} onClose={onClose}>
			<Alert severity={severity}>{message}</Alert>
		</Snackbar >
	)
}
