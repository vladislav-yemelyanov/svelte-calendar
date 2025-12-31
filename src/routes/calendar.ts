import dayjs from 'dayjs';

function log(value: any, space: number = 0) {
	const genSpace = Array.from({ length: space })
		.map(() => '  ')
		.join('');

	if (typeof value === 'string') {
		console.log(`${genSpace}${value}`);
	} else {
		console.log(`${genSpace}`, value);
	}
}

function genMonths(from: dayjs.Dayjs, count: number, enableLog = false) {
	enableLog && log(`🎈 ${count > 0 ? 'after:' : 'before:'}`);
	let cloned = from.clone();

	enableLog && log(`⏱️ from: ${cloned.format('MMM YY')}`, 1);

	return Array.from({ length: Math.abs(count) }).map(() => {
		if (count > 0) {
			cloned = cloned.add(1, 'month');
		} else {
			cloned = cloned.subtract(1, 'month');
		}
		enableLog && log(`⏱️ updated: ${cloned.format('MMM YY')}`, 3);
		return cloned;
	});
}

function countToArray(count: number) {
	return Array.from({ length: count }).map((_, i) => i + 1);
}

function genCells(from: dayjs.Dayjs, enableLog = false) {
	let rowsOfCells: dayjs.Dayjs[][] = [];
	const isoStartMonthDay = (from.clone().startOf('month').day() + 6) % 7;

	const startMonthDay = isoStartMonthDay + 1;
	enableLog && log(`🏁 start month day: ${startMonthDay}`);

	const count = from.daysInMonth() + startMonthDay;

	enableLog && log(`💡 count cells: ${count}`);

	const weeks = Math.ceil(count / 7); // 4.28 -> 5
	let currentD = from.clone().startOf('month');

	for (const week of countToArray(weeks)) {
		const weekArr: dayjs.Dayjs[] = [];
		for (const day of countToArray(7)) {
			if (week === 1 && day < startMonthDay) {
				enableLog && log('🎈 prev month');
				enableLog && log(`👉 week: ${week}`, 1);
				enableLog && log(`👇 day: ${day}`, 1);
				const prevMonth = from.clone().subtract(1, 'month').endOf('month');
				enableLog && log(`⏱️ start: ${prevMonth.format('DD MMM')}`, 1);
				const d = prevMonth.subtract(day - 1, 'day');
				enableLog && log(`⏱️ updated: ${d.format('DD MMM')}`, 2);
				weekArr.unshift(d);
			} else if (currentD.date() <= from.daysInMonth() - startMonthDay) {
				enableLog && log('🎈 current month');
				enableLog && log(`👉 week: ${week}`, 1);
				enableLog && log(`👇 day: ${day}`, 1);
				enableLog && log(`⏱️ start: ${currentD.format('DD MMM')}`, 1);
				currentD = currentD.add(day === startMonthDay && week === 1 ? 0 : 1, 'day');
				enableLog && log(`⏱️ updated: ${currentD.format('DD MMM')}`, 2);
				weekArr.push(currentD);
			} else {
				enableLog && log('🎈 next month');
				enableLog && log(`👉 week: ${week}`, 1);
				enableLog && log(`👇 day: ${day}`, 1);
				enableLog && log(`⏱️ start: ${currentD.format('DD MMM')}`, 1);

				currentD = currentD.add(1, 'day');
				enableLog && log(`⏱️ updated: ${currentD.format('DD MMM')}`, 2);
				weekArr.push(currentD);
			}
		}
		rowsOfCells.push(weekArr);
	}

	return rowsOfCells;
}

export const calendar = {
	genMonths,
	log,
	genCells
};
