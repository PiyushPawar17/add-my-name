const capitalize = str => {
	const splitStr = str.toLowerCase().split(' ');
	const capitalized = splitStr.map(subString => subString.charAt(0).toUpperCase() + subString.substring(1));

	return capitalized.join(' ');
};

module.exports = capitalize;
