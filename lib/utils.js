export const dateStringToRelative = function (date) {
	const dateObj = new Date(date);
	const dateDiff = parseInt((dateObj - Date.now()) / 1000 / 60 / 60 / 24);

	if (-dateDiff <= 30) {
		const rtf = new Intl.RelativeTimeFormat('ja', {
			numeric: 'auto',
		});
		return rtf.format(dateDiff, "day");
	}

	const formatted = `
		${dateObj.getMonth()+1}月
		${dateObj.getDate()}日 
		${dateObj.getHours()}:
		${dateObj.getSeconds()}
		`.replace(/\n|\r|\t/g, '');
	if (dateObj.getFullYear() !== (new Date()).getFullYear()) {
		return `${dateObj.getFullYear()}年${formatted}`;
	}
	return formatted;
};