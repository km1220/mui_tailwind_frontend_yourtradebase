import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RESET_USER_INFO, RESET_USER_REMINDERS } from '@store/actions';

import {
	Paper, Dialog, Button, IconButton, Typography, Divider, Avatar, Popover, List, ListItemButton, ListItemIcon, ListItemText, Collapse, Badge,
	alpha
} from '@mui/material';
// import { createTheme } from '@mui/material';
import { makeStyles, styled, useTheme, ThemeProvider } from '@mui/styles';
import { DescriptionOutlined, CloseOutlined } from '@mui/icons-material';
import clsx from 'clsx';

import { useDropzone } from 'react-dropzone';



const useBadgeUploadZoneStyles = makeStyles(theme => ({
	root: {
		display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
	},
	uploadDropzone: {
		width: 'fit-content', height: 'fit-content', minWidth: '120px', minHeight: '80px',
		display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
		backgroundColor: alpha(theme.palette.primary.light, 0.1),
		borderWidth: '2px', borderStyle: 'dashed', borderColor: alpha(theme.palette.primary.dark, 0.3), borderRadius: '0.5rem',
		'&:hover': { borderWidth: '2.5px', borderColor: alpha(theme.palette.primary.dark, 0.8) },
		'&:active': { borderWidth: '2.5px', borderColor: alpha(theme.palette.primary.dark, 0.8), backgroundColor: alpha(theme.palette.primary.light, 0.05) },
	},
	thumb: {
		height: '100%', padding: '1rem',
		display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
	},
	thumbImg: {
		maxHeight: '180px',
		'#badge-container &': {
			maxHeight: '60px',
		},
	},
	thumbName: {
		textAlign: 'center',
		padding: '0 1rem',
		'& > :first-child': { width: '100px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }
	},
	removeBtn: {
		'&.MuiButton-root': {
			width: 'fit-content',
			padding: '0 1rem',
			marginTop: '0.25rem',
			borderRadius: '0.25rem',
		}
	}
}));

const BadgeUploadZone = (props) => {
	const classes = useBadgeUploadZoneStyles(props);
	const theme = useTheme();
	const { placeholder, handleFileChange, ...others } = props;


	const baseStyle = { cursor: 'pointer', position: 'relative' };
	const focusedStyle = { backgroundColor: alpha(theme.palette.primary.light, 0.2) };
	const acceptStyle = { backgroundColor: alpha(theme.palette.success.light, 0.2) };
	const rejectStyle = { backgroundColor: alpha(theme.palette.error.light, 0.2) };

	const [imgData, setImgData] = useState();
	const { getRootProps: getBadgeRootProps, getInputProps: getBadgeInputProps,
		isFocused: isBadgeFocused, isDragAccept: isBadgeDragAccept, isDragReject: isBadgeDragReject
	} = useDropzone({
		multiple: false,
		// preventDropOnDocument: true,
		// addRemoveLinks: true,
		accept: { 'image/*': ['.png', '.jpg', '.bmp'] },
		onDrop: (file) => {
			console.log(file);
			setImgData({ file: file[0], preview: URL.createObjectURL(file[0]) });
		}
	});
	const badgeStyle = useMemo(() => ({
		...baseStyle,
		...(isBadgeFocused ? focusedStyle : {}),
		...(isBadgeDragAccept ? acceptStyle : {}),
		...(isBadgeDragReject ? rejectStyle : {})
	}), [isBadgeFocused, isBadgeDragAccept, isBadgeDragReject]);


	useEffect(() => {
		handleFileChange(imgData);
	}, [imgData]);


	const onReset = (e) => {
		// e.stopPropagation();			// ** to prevent parent.onclick function when child component is clicked
		setImgData();
	}

	return (
		<div className={classes.root}>
			<div {...getBadgeRootProps({
				className: clsx('dropzone', classes.uploadDropzone),
				style: badgeStyle
			})}>
				<input {...getBadgeInputProps()} />
				<div className={classes.thumb}>
					{imgData?.file ?
						<>
							<img className={classes.thumbImg} src={imgData.preview}
								// Revoke data uri after image is loaded
								onLoad={() => { URL.revokeObjectURL(imgData.preview) }}
							/>
							<div className={classes.thumbName}>
								<Typography variant="body1"> {imgData.file.name}</Typography>
								<Typography variant="caption"> {(imgData.file.size / 1024).toFixed(2)} Kbytes </Typography>
							</div>
						</>
						:
						<Typography variant='subtitle2' color="primary">
							{placeholder}
						</Typography>
					}
				</div>
			</div>
			{imgData?.file &&
				<Button className={classes.removeBtn} onClick={onReset} variant='outlined' size='small' color="error">Remove</Button>
			}
		</div>
	)
}

BadgeUploadZone.propTypes = {
	handleFileChange: PropTypes.func
}

export default BadgeUploadZone;