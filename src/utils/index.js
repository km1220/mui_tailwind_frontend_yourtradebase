
export * from './avatar.js';
export * from './price.js';
export * from './date.js';

export const _strCapitalize = str => {
	if (str === '' || str === null || str === undefined) return null;
	return str.charAt(0).toUpperCase() + str.slice(1);
};
export const _allWordsCapitalize = str => {
	if (str === '' || str === null || str === undefined) return null;
	str = str.trim();
	let words = str.split(" ");
	words = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
	return words.join(' ');
};

export const _isStrEmpty = v => v === '' || v === undefined || v == null;
export const _isObjEmpty = obj => obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype;

export const validateEmail = (email) => {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
};




// export const parseJSON = (str, isArray = true) => {
// 	let result;
// try {
// 		result = JSON.parse(str);
// 		if (typeof result === "object")
// 			return result;
// 		else {
// 			result = !isArray ? {} : []
// 			return result;
// 		}
// } catch (e) {
// 	return result;
// }
// }
export const parseJSON = (str, isArray = true) => {
	try {
		let result = JSON.parse(str);
		if (typeof result === "object")
			return result;
		return;
	} catch (e) {
		return;
	}
}





export const getRandomArbitrary = (min = 0, max = 100) => {
	return Math.random() * (max - min) + min;
}
export const getRandomInt = (min = 0, max = 100) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}