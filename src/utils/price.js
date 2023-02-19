import { getRandomInt } from './index';


export const limitDecimal = (num, limit = 2) => {
	if (typeof num !== "number")
		return false;
	else
		return Number(num.toFixed(limit));
}






export const _generateNewID = (array_list = [], min = 100, max = 1000) => {
	let newID = getRandomInt(min, max);
	// check whether [random_new_id] already exist in the [array_list]
	while (array_list.filter(e => e.id == newID).length > 0)
		newID = getRandomInt(min, max);
	return newID;
};
export const calcTotalPrice = (itemList) => {
	let resultTotal = { price: 0, markup_price: 0 };
	itemList.map(each => {
		let price = Number(each.price);
		let markup = 1 + Number(each.markup) / 100;
		resultTotal.price += price;
		resultTotal.markup_price += price * markup;
	})
	return {
		price: limitDecimal(resultTotal.price),
		markup_price: limitDecimal(resultTotal.markup_price)
	};
}