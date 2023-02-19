import React from 'react';
import PropTypes from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';

const RichTextEditor = (props) => {
	const { onInit, initialValue, ...others } = props;
	return (
		<Editor
			// onInit={(evt, editor) => editorRef.current = editor}
			onInit={onInit} initialValue={initialValue} {...others}
			init={{
				height: 500,
				menubar: false,
				plugins: [
					'a11ychecker', 'advlist', 'advcode', 'advtable', 'autolink', 'checklist', 'export',
					'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
					'powerpaste', 'fullscreen', 'formatpainter', 'insertdatetime', 'media', 'table', 'help', 'wordcount'
				],
				toolbar: 'undo redo | casechange blocks | bold italic backcolor | ' +
					'alignleft aligncenter alignright alignjustify | ' +
					'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help',
				content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
			}}
		/>
	)
}

RichTextEditor.propTypes = {
	initialValue: PropTypes.string,
	onInit: PropTypes.func,
};
RichTextEditor.defaultProps = {
	initialValue: '',
	onInit: (evt, editor) => { },
	plugins: [
		'a11ychecker', 'advlist', 'advcode', 'advtable', 'autolink', 'checklist', 'export',
		'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
		'powerpaste', 'fullscreen', 'formatpainter', 'insertdatetime', 'media', 'table', 'help', 'wordcount'
	],
	toolbar: 'undo redo | casechange blocks | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist checklist outdent indent | removeformat | a11ycheck code table help',
	content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; }'
};

export default RichTextEditor;