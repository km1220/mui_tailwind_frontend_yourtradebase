import React from "react";
import { Paper } from '@mui/material';

import Draggable from 'react-draggable';


const DraggablePaper = ({ style, ...others }) => (
	<Draggable
		handle="#draggable-dialog-title"
		cancel={'[class*="MuiDialogContent-root"]'}
	>
		<Paper style={{ ...style, maxWidth: 'none', width: '80%', overflowY: 'auto' }} {...others} />
	</Draggable>
);


export default DraggablePaper;