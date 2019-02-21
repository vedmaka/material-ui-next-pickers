export var fillInDigit = function (number, digit) {
    var max = Math.pow(10, digit);
    var clean = (number % max).toString();
    while (clean.length < digit)
        clean = '0' + clean;
    return clean;
};
export var month = [{
        short: 'Jan',
        long: 'January'
    }, {
        short: 'Feb',
        long: 'February'
    }, {
        short: 'Mar',
        long: 'March'
    }, {
        short: 'Apr',
        long: 'April'
    }, {
        short: 'May',
        long: 'May'
    }, {
        short: 'Jun',
        long: 'June'
    }, {
        short: 'Jul',
        long: 'July'
    }, {
        short: 'Aug',
        long: 'August'
    }, {
        short: 'Sep',
        long: 'September'
    }, {
        short: 'Oct',
        long: 'October'
    }, {
        short: 'Nov',
        long: 'November'
    }, {
        short: 'Dec',
        long: 'December'
    }];
export var day = [{
        short: 'Sun',
        long: 'Sunday'
    }, {
        short: 'Mon',
        long: 'Monday'
    }, {
        short: 'Tue',
        long: 'Tuesday'
    }, {
        short: 'Wed',
        long: 'Wednesday'
    }, {
        short: 'Thu',
        long: 'Thursday'
    }, {
        short: 'Fri',
        long: 'Friday'
    }, {
        short: 'Sat',
        long: 'Saturday'
    }];
export var format = function (date, format) {
    return [[{
                keyword: 'mm',
                word: fillInDigit(date.getMinutes(), 2)
            }, {
                keyword: 'm',
                word: date.getMinutes().toString()
            }], [{
                keyword: 'HH',
                word: fillInDigit(date.getHours(), 2)
            }, {
                keyword: 'H',
                word: date.getHours().toString()
            }], [{
                keyword: 'hh',
                word: fillInDigit(date.getHours() > 12 ? date.getHours() - 12 : date.getHours() === 0 ? 12 : date.getHours(), 2)
            }, {
                keyword: 'h',
                word: (date.getHours() > 12 ? date.getHours() - 12 : date.getHours() === 0 ? 12 : date.getHours()).toString()
            }], [{
                keyword: 'a',
                word: date.getHours() >= 12 ? 'pm' : 'am'
            }], [{
                keyword: 'dd',
                word: fillInDigit(date.getDate(), 2)
            }, {
                keyword: 'd',
                word: date.getDate().toString()
            }], [{
                keyword: 'MMMM',
                word: month[date.getMonth()].long
            }, {
                keyword: 'MMM',
                word: month[date.getMonth()].short
            }, {
                keyword: 'MM',
                word: fillInDigit(date.getMonth() + 1, 2)
            }, {
                keyword: 'M',
                word: (date.getMonth() + 1).toString()
            }], [{
                keyword: 'yyyy',
                word: fillInDigit(date.getFullYear(), 4)
            }, {
                keyword: 'yy',
                word: fillInDigit(date.getFullYear(), 2)
            }], [{
                keyword: 'EEE',
                word: day[date.getDay()].short
            }, {
                keyword: 'EEEE',
                word: day[date.getDay()].long
            }]].reduce(function (dateString, formattings) {
        var foundFormatting = formattings.find(function (formatting) { return dateString.includes(formatting.keyword); });
        if (foundFormatting) {
            return dateString.replace(foundFormatting.keyword, foundFormatting.word);
        }
        else {
            return dateString;
        }
    }, format);
};
export var sameDay = function (dateA, dateB) {
    if (dateA !== undefined && dateB !== undefined) {
        return dateA.getDate() === dateB.getDate() && dateA.getMonth() === dateB.getMonth() && dateA.getFullYear() === dateB.getFullYear();
    }
    else {
        return false;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxJQUFNLFdBQVcsR0FBRyxVQUFDLE1BQWEsRUFBRSxLQUFZO0lBQ3JELElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBQy9CLElBQUksS0FBSyxHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFBO0lBQ3JDLE9BQU0sS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLO1FBQUUsS0FBSyxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUE7SUFDL0MsT0FBTyxLQUFLLENBQUE7QUFDZCxDQUFDLENBQUE7QUFDRCxNQUFNLENBQUMsSUFBTSxLQUFLLEdBQUcsQ0FBQztRQUNwQixLQUFLLEVBQUUsS0FBSztRQUNaLElBQUksRUFBRSxTQUFTO0tBQ2hCLEVBQUU7UUFDRCxLQUFLLEVBQUUsS0FBSztRQUNaLElBQUksRUFBRSxVQUFVO0tBQ2pCLEVBQUU7UUFDRCxLQUFLLEVBQUUsS0FBSztRQUNaLElBQUksRUFBRSxPQUFPO0tBQ2QsRUFBRTtRQUNELEtBQUssRUFBRSxLQUFLO1FBQ1osSUFBSSxFQUFFLE9BQU87S0FDZCxFQUFFO1FBQ0QsS0FBSyxFQUFFLEtBQUs7UUFDWixJQUFJLEVBQUUsS0FBSztLQUNaLEVBQUU7UUFDRCxLQUFLLEVBQUUsS0FBSztRQUNaLElBQUksRUFBRSxNQUFNO0tBQ2IsRUFBRTtRQUNELEtBQUssRUFBRSxLQUFLO1FBQ1osSUFBSSxFQUFFLE1BQU07S0FDYixFQUFFO1FBQ0QsS0FBSyxFQUFFLEtBQUs7UUFDWixJQUFJLEVBQUUsUUFBUTtLQUNmLEVBQUU7UUFDRCxLQUFLLEVBQUUsS0FBSztRQUNaLElBQUksRUFBRSxXQUFXO0tBQ2xCLEVBQUU7UUFDRCxLQUFLLEVBQUUsS0FBSztRQUNa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