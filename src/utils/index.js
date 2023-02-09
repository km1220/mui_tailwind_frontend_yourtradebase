
export const _strCapitalize = str => {
	if (str === '' || str === null || str === undefined) return null
	return str.charAt(0).toUpperCase() + str.slice(1)
};
export const _allWordsCapitalize = str => {
	if (str === '' || str === null || str === undefined) return null
	str = str.trim()
	let words = str.split(" ")
	words = words.map(word => word.charAt(0).toUpperCase() + word.slice(1))
	return words.join(' ')
};

export const _isStrEmpty = v => v === '' || v === undefined || v == null;
export const _isObjEmpty = obj => obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype

export const validateEmail = (email) => {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
};