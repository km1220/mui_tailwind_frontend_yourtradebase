export const formatDate = (date_str = '') => {
	let date = new Date(date_str);
	if (date == 'Invalid Date')
		date = new Date();

	return date.toISOString().split("T")[0];
}