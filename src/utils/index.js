
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








export const isJson = (str) => {
	try {
		let parseResult = JSON.parse(str);
		if (typeof parseResult === "object")
			return true;
		else
			return false;
	} catch (e) {
		return false;
	}
}
export const limitDecimal = (num, limit = 2) => {
	if (typeof num !== "number")
		return false;
	else
		return Number(num.toFixed(limit));
}

export const getRandomArbitrary = (min = 0, max = 100) => {
	return Math.random() * (max - min) + min;
}
export const getRandomInt = (min = 0, max = 100) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
export const _generateNewID = (array_list = [], min = 100, max = 1000) => {
	let newID = getRandomInt(min, max);
	// check whether [random_new_id] already exist in the [array_list]
	while (array_list.filter(e => e.id == newID).length > 0)
		newID = getRandomInt(min, max);
	return newID;
};