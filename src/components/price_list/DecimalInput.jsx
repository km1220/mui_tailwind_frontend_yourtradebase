import React from "react";
import PropTypes from "prop-types";

const InputDecimal = ({ value, onSetValue, ...others }) => {
	const handleChange = e => {
		const selectionStart = e.target.selectionStart;
		let val = e.target.value;
		// console.log(val, val.charAt(0), val.length, val.charAt(val.length - 1));
		if (val.charAt(0) === '.' || val.charAt(val.length - 1) === '.') {
			e.target.value = 0;
			onSetValue(Number(0).toFixed(2));
			return;
		}

		val = val.replace(/([^0-9.]+)/, "");
		val = val.replace(/^(0|\.)/, "");
		const match = /(\d{0,5})[^.]*((?:\.\d{0,2})?)/g.exec(val);
		const value = match[1] + match[2];
		e.target.value = value;
		onSetValue(value);
		// console.log(val, value, match);

		if (val.length > 0) {
			e.target.value = Number(value).toFixed(2);
			e.target.setSelectionRange(selectionStart, selectionStart);
			onSetValue(Number(value).toFixed(2));
		}
	};
	return (
		<input type="text" onChange={handleChange} value={value} {...others} />
	)
}
InputDecimal.propTypes = {
	// pattern: PropTypes.instanceOf(RegExp),
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	onSetValue: PropTypes.func
}
InputDecimal.defaultProps = {
	// pattern: /(\d{0,7})[^.]*((?:\.\d{0,2})?)/g
}

export default InputDecimal;