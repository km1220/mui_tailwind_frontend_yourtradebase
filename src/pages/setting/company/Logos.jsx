import React, { useState, useEffect, useMemo } from 'react';
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
import DraggablePaper from '../DraggablePaper';
import ImageUploadBox from '@components/ImageUploadDropzone';
import BadgeComponent from '@components/BadgeComponent';


const useStyles = makeStyles(theme => ({
	root: {
		'& > *:not(:first-child)': {
			marginTop: '2.5rem',
		},
		'& > div': {
			display: 'flex',
			flexDirection: 'column',
		},

		'& #badge-container': {
			display: 'flex',
			flexWrap: 'wrap',
			'& > *': {
				margin: '1rem',
				// padding: '1rem',
				minWidth: '120px',
				minHeight: '80px',
			},
		},
	},
	uploadDropzone: {
		width: 'fit-content', height: 'fit-content',
		display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
		backgroundColor: alpha(theme.palette.primary.light, 0.1),
		borderWidth: '2px', borderStyle: 'dashed', borderColor: alpha(theme.palette.primary.dark, 0.3), borderRadius: '0.5rem',
		'&:hover': {
			borderWidth: '2.5px',
			borderColor: alpha(theme.palette.primary.dark, 0.8),
		},
		'&:active': {
			borderWidth: '2.5px',
			borderColor: alpha(theme.palette.primary.dark, 0.8),
			backgroundColor: alpha(theme.palette.primary.light, 0.05),
		},
	},
	thumb: {
		height: '100%',
		display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
		padding: '1rem',
	},
	thumbImg: {
		maxHeight: '180px',
		'#badge-container &': {
			maxHeight: '60px',
		},
	},
	thumbName: {
		display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
		padding: '0 1rem',
		'& > :first-child': { marginRight: '1rem' }
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


export default function Logos(props) {
	const classes = useStyles(props);
	const theme = useTheme();
	const baseStyle = { cursor: 'pointer', position: 'relative' };
	const focusedStyle = { backgroundColor: alpha(theme.palette.primary.light, 0.2) };
	const acceptStyle = { backgroundColor: alpha(theme.palette.success.light, 0.2) };
	const rejectStyle = { backgroundColor: alpha(theme.palette.error.light, 0.2) };

	const [showLogoUploadModal, setShowLogoUploadModal] = useState(false);
	const { getRootProps: getLogoRootProps, getInputProps: getLogoInputProps,
		isFocused: isLogoFocused, isDragAccept: isLogoDragAccept, isDragReject: isLogoDragReject
	} = useDropzone({
		multiple: false, accept: { 'image/*': ['.png', '.jpg', '.bmp'] },
		onDrop: (file) => {
			setLogoData({ file: file[0], preview: URL.createObjectURL(file[0]) });
			setShowLogoUploadModal(false);
		}
	});
	const logoStyle = useMemo(() => ({
		...baseStyle,
		...(isLogoFocused ? focusedStyle : {}),
		...(isLogoDragAccept ? acceptStyle : {}),
		...(isLogoDragReject ? rejectStyle : {})
	}), [isLogoFocused, isLogoDragAccept, isLogoDragReject]);
	const onReset = () => {
		setLogoData();
	}
	const onCloseUploadModal = e => {
		setShowLogoUploadModal(false);
		e.stopPropagation();
		// e.target.closest('.dropzone').stopPropagation();
	};


	const [logoData, setLogoData] = useState();
	const [badge1, setBadge1] = useState();
	const [badge2, setBadge2] = useState();
	const [badge3, setBadge3] = useState();
	const [badge4, setBadge4] = useState();
	const [badge5, setBadge5] = useState();

	console.log(logoData, badge1, badge2, badge3, badge4, badge5);

	return (
		<div className={classes.root}>
			<Typography variant='h5'>Logos</Typography>
			<div className=''>
				<Typography variant='subtitle1'>Compnay logo</Typography>
				<Typography variant='body1'>Drag and drop a logo below or click to upload a logo from your computer.</Typography>
				<BadgeComponent text='Need help?'>
					<Typography variant='body1'>Your logo appears on all paperwork.</Typography>
				</BadgeComponent>
			</div>
			<div className='flex flex-col justify-center items-center w-fit'>
				<div className={classes.uploadDropzone}
					onClick={() => setShowLogoUploadModal(true)}
					style={{ minWidth: '300px', minHeight: '200px' }}
				>
					{logoData?.file ?
						<div className={classes.thumb}>
							<img className={classes.thumbImg} src={logoData.preview}
								// Revoke data uri after image is loaded
								onLoad={() => { URL.revokeObjectURL(logoData.preview) }}
							/>
							<div className={classes.thumbName}>
								<Typography variant="body1"> {logoData.file.name}</Typography>
								<Typography variant="caption"> {(logoData.file.size / 1024).toFixed(2)} Kbytes </Typography>
							</div>
						</div>
						:
						<Typography variant="subtitle1">Upload logo</Typography>
					}
				</div>
				{logoData?.file &&
					<Button className={classes.removeBtn} onClick={onReset} variant='outlined' size='small' color="error">Remove</Button>
				}

				<Dialog PaperComponent={DraggablePaper} PaperProps={{ id: "draggable-dialog-title", style: { width: '70%', height: '70%', padding: '1.5rem' } }}
					open={showLogoUploadModal} onClose={onCloseUploadModal}
				>
					<div {...getLogoRootProps({
						className: clsx('dropzone', classes.uploadDropzone),
						style: { ...logoStyle, width: '100%', height: '100%' }
					})}>
						<input {...getLogoInputProps()} />
						<Typography variant='h5' color="primary">Drop logo here or browse</Typography>

						<IconButton onClick={onCloseUploadModal} style={{ position: 'absolute', right: 0, top: 0, zIndex: 99999 }}> <CloseOutlined /> </IconButton>
					</div>
				</Dialog >
			</div>

			<div>
				<div>
					<Typography variant='subtitle1'>Compnay logo</Typography>
					<Typography variant='body1'>Drag and drop a logo below or click to upload a logo from your computer.</Typography>
				</div>
				<br />
				<div id='badge-container' className='flex'>
					<ImageUploadBox placeholder="Upload badge #1" handleFileChange={(file) => setBadge1(file)} />
					<ImageUploadBox placeholder="Upload badge #1" handleFileChange={(file) => setBadge2(file)} />
					<ImageUploadBox placeholder="Upload badge #1" handleFileChange={(file) => setBadge3(file)} />
					<ImageUploadBox placeholder="Upload badge #1" handleFileChange={(file) => setBadge4(file)} />
					<ImageUploadBox placeholder="Upload badge #1" handleFileChange={(file) => setBadge5(file)} />
				</div>
			</div>
		</div >
	)
}
