var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import * as classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import * as DateUtil from './date';
var VirtualizedSwipeableViews = virtualize(SwipeableViews);
var styles = function (theme) { return ({
    calendarContainer: {
        position: 'relative',
        maxWidth: '100%',
        width: (48 * 7) + 'px',
        overflow: 'hidden'
    },
    calendarControl: {
        position: 'absolute',
        width: '100%',
        pointerEvents: 'none',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100
    },
    calendarControlButton: {
        pointerEvents: 'all'
    },
    calendarControlMonth: {
        display: 'flex',
        height: '48px',
        justifyContent: 'center',
        alignItems: 'center'
    },
    calendarMonthTitle: {
        fontSize: '1rem',
        fontWeight: 500,
        textTransform: 'none'
    },
    years: {
        height: '48px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    invalidInput: {
        color: theme.palette.text.disabled
    },
    week: {
        display: 'flex'
    },
    labelWeekDay: {
        height: '48px',
        width: '48px',
        color: theme.palette.text.hint,
        fontWeight: 300,
        lineHeight: '48px',
        textAlign: 'center'
    },
    weekDay: {
        flex: '1 1 auto',
        width: '38px',
        margin: '5px'
    },
    weekDayResponse: {
        maxHeight: 'calc(((100vw - 64px) / 7) - 10px)'
    },
    day: {
        padding: 0,
        transition: theme.transitions.create('background-color')
    },
    selectedDay: {
        backgroundColor: theme.palette.primary.dark,
        '&:hover': {
            backgroundColor: theme.palette.primary.main
        }
    },
    dayText: {
        transition: theme.transitions.create('color')
    },
    selectedDayText: {
        color: theme.palette.primary.contrastText
    },
    okToConfirmRow: {
        height: '48px',
        padding: '0 6px',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
}); };
var Calendar = /** @class */ (function (_super) {
    __extends(Calendar, _super);
    function Calendar(props) {
        var _this = _super.call(this, props) || this;
        _this.updateHeight = {
            month: undefined,
            year: undefined
        };
        _this.getButtonHeight = function () {
            var view = _this.container ? _this.container.getBoundingClientRect().width : 336;
            return view / 7;
        };
        _this.resize = function () {
            if (_this.updateHeight.month) {
                _this.setState({ buttonHeight: _this.getButtonHeight() }, _this.updateHeight.month);
            }
            if (_this.updateHeight.year) {
                _this.setState({ buttonHeight: _this.getButtonHeight() }, _this.updateHeight.year);
            }
        };
        _this.selectDate = function (date, event) {
            var _a = _this.props, onChange = _a.onChange, closeCalendar = _a.closeCalendar, okToConfirm = _a.okToConfirm;
            if (okToConfirm) {
                _this.setState({ selected: date });
            }
            else {
                closeCalendar();
                onChange(date, event);
            }
        };
        _this.confirmDate = function (event) {
            var _a = _this.props, onChange = _a.onChange, closeCalendar = _a.closeCalendar, okToConfirm = _a.okToConfirm;
            if (okToConfirm) {
                closeCalendar();
                onChange(_this.state.selected, event);
            }
        };
        _this.showYearsCalendar = function () {
            var year = _this.state.year;
            _this.setState({
                mode: 'year',
                yearIndex: Math.floor(year / 18)
            });
        };
        _this.selectCalendarYear = function (year) {
            var _a = _this.props, min = _a.min, max = _a.max;
            var month = _this.state.month;
            if (year) {
                _this.setState({
                    mode: 'month',
                    year: year,
                    month: min && month < min.getMonth() && year === min.getFullYear() ? min.getMonth() : (max && month > max.getMonth() && year === max.getFullYear() ? max.getMonth() : month)
                });
            }
            else {
                _this.setState({
                    mode: 'month'
                });
            }
        };
        _this.previousYearsValid = function () {
            var min = _this.props.min;
            var yearIndex = _this.state.yearIndex;
            return yearIndex >= 1 && (min === undefined || yearIndex >= Math.ceil(min.getFullYear() / 18));
        };
        _this.previousYears = function () {
            var min = _this.props.min;
            var yearIndex = _this.state.yearIndex;
            _this.setState({
                yearIndex: yearIndex - 1
            });
        };
        _this.nextYearsValid = function () {
            var max = _this.props.max;
            var yearIndex = _this.state.yearIndex;
            return max === undefined || yearIndex < Math.floor(max.getFullYear() / 18);
        };
        _this.nextYears = function () {
            var yearIndex = _this.state.yearIndex;
            _this.setState({
                yearIndex: yearIndex + 1
            });
        };
        _this.changeYears = function (index) {
            _this.setState({
                yearIndex: index
            });
        };
        _this.yearInvalid = function (currentYear) {
            var _a = _this.props, min = _a.min, max = _a.max;
            var _b = _this.state, month = _b.month, year = _b.year;
            return (min && currentYear < min.getFullYear()) || (max && currentYear > max.getFullYear()) || year === currentYear;
        };
        _this.previousMonthValid = function () {
            var min = _this.props.min;
            var _a = _this.state, month = _a.month, year = _a.year;
            return min === undefined || (month > min.getMonth() || year > min.getFullYear());
        };
        _this.previousMonth = function () {
            var _a = _this.state, month = _a.month, year = _a.year;
            _this.setState({
                year: year - (month <= 0 ? 1 : 0),
                month: month <= 0 ? 11 : month - 1
            });
        };
        _this.nextMonthValid = function () {
            var max = _this.props.max;
            var _a = _this.state, month = _a.month, year = _a.year;
            return max === undefined || (month < max.getMonth() || year < max.getFullYear());
        };
        _this.nextMonth = function () {
            var _a = _this.state, month = _a.month, year = _a.year;
            _this.setState({
                year: year + (month >= 11 ? 1 : 0),
                month: month >= 11 ? 0 : month + 1
            });
        };
        _this.changeMonth = function (index) {
            _this.setState({
                year: Math.floor(index / 12),
                month: index % 12
            });
        };
        _this.dayInvalid = function (date) {
            var _a = _this.props, value = _a.value, min = _a.min, max = _a.max;
            return (value && DateUtil.sameDay(date, value)) || (min && date.getTime() < min.setHours(0, 0, 0, 0) || (max && date.getTime() > max.setHours(0, 0, 0, 0)));
        };
        _this.yearIndexValid = function (index) {
            var yearIndex = _this.state.yearIndex;
            return index <= yearIndex + 2 && index >= yearIndex - 2;
        };
        _this.monthIndexValid = function (index) {
            var _a = _this.state, month = _a.month, year = _a.year;
            var currentIndex = year * 12 + month;
            return index <= currentIndex + 2 && index >= currentIndex - 2;
        };
        _this.generateYearCalendar = function (index) {
            var years = [];
            var counter = 0;
            for (var year = index * 18; year < (index + 1) * 18; year++) {
                if (!years[Math.floor(counter / 3)]) {
                    years[Math.floor(counter / 3)] = [year];
                }
                else {
                    years[Math.floor(counter / 3)] = years[Math.floor(counter / 3)].concat([year]);
                }
                counter++;
            }
            return years;
        };
        _this.generateMonthCalendar = function (index) {
            var calendarFocus = {
                year: Math.floor(index / 12),
                month: index % 12
            };
            var firstDay = new Date(calendarFocus.year, calendarFocus.month, 1);
            var daysInWeekInMonth = [Array(firstDay.getDay()).fill(undefined)];
            var counter = firstDay.getDay();
            for (var day = firstDay; day.getMonth() === calendarFocus.month; day = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1)) {
                if (!daysInWeekInMonth[Math.floor(counter / 7)]) {
                    daysInWeekInMonth[Math.floor(counter / 7)] = [new Date(day.getFullYear(), day.getMonth(), day.getDate())];
                }
                else {
                    daysInWeekInMonth[Math.floor(counter / 7)] = daysInWeekInMonth[Math.floor(counter / 7)].concat([new Date(day.getFullYear(), day.getMonth(), day.getDate())]);
                }
                counter++;
            }
            for (var day = 6; !daysInWeekInMonth[daysInWeekInMonth.length - 1][day]; day--) {
                daysInWeekInMonth[daysInWeekInMonth.length - 1][day] = undefined;
            }
            return daysInWeekInMonth;
        };
        var now = new Date();
        var date = new Date(now.getTime());
        var min = props.min, max = props.max;
        if (max && now.getTime() > max.getTime()) {
            date = new Date(max.getTime());
        }
        else if (min && now.getTime() < min.getTime()) {
            date = new Date(min.getTime());
        }
        if (props.action) {
            props.action({
                resize: _this.resize
            });
        }
        _this.state = {
            mode: 'month',
            selected: props.value,
            month: date.getMonth(),
            year: date.getFullYear(),
            yearIndex: Math.floor(date.getFullYear() / 18),
            buttonHeight: _this.getButtonHeight()
        };
        return _this;
    }
    Calendar.prototype.componentDidMount = function () {
        if (!this.props.action)
            this.resize();
        window.addEventListener('resize', this.resize);
        var value = this.props.value;
        if (value) {
            this.setState({
                month: value.getMonth(),
                year: value.getFullYear()
            });
        }
    };
    Calendar.prototype.componentWillUnmount = function () {
        window.removeEventListener('resize', this.resize);
    };
    Calendar.prototype.render = function () {
        var _this = this;
        var _a = this.props, classes = _a.classes, value = _a.value, closeCalendar = _a.closeCalendar, dateDisabled = _a.dateDisabled, okToConfirm = _a.okToConfirm;
        var _b = this.state, mode = _b.mode, buttonHeight = _b.buttonHeight, selected = _b.selected, year = _b.year, month = _b.month, yearIndex = _b.yearIndex;
        var active = okToConfirm ? selected : value;
        return (React.createElement("div", { ref: function (container) { return _this.container = container; }, className: classes.root }, mode === 'month' ? [
            React.createElement("div", { className: classes.calendarControl, key: 'calendar-month-control' },
                React.createElement(IconButton, { classes: { root: classes.calendarControlButton }, disabled: !this.previousMonthValid(), onClick: this.previousMonth },
                    React.createElement(ChevronLeft, null)),
                React.createElement(IconButton, { classes: { root: classes.calendarControlButton }, disabled: !this.nextMonthValid(), onClick: this.nextMonth },
                    React.createElement(ChevronRight, null))),
            React.createElement(VirtualizedSwipeableViews, { key: 'calendar-month-swipeable', action: function (actions) { return _this.updateHeight.year = actions.updateHeight; }, className: classes.calendarContainer, index: year * 12 + month, animateHeight: true, onChangeIndex: this.changeMonth, slideRenderer: function (_a) {
                    var index = _a.index;
                    return _this.monthIndexValid(index) ?
                        React.createElement("div", { key: index, className: classes.calendarContainer },
                            React.createElement("div", { className: classes.calendarControlMonth },
                                React.createElement(Button, { onClick: _this.showYearsCalendar, classes: { root: classes.calendarMonthTitle } }, DateUtil.month[index % 12].long + ', ' + Math.floor(index / 12))),
                            React.createElement("div", { className: classes.week }, ['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(function (day, index) {
                                return React.createElement(Typography, { key: 'weeklabel-' + index, className: classes.labelWeekDay, variant: 'body1', style: { height: buttonHeight, lineHeight: buttonHeight + "px" } }, day);
                            })),
                            _this.generateMonthCalendar(index).map(function (week, index) {
                                return React.createElement("div", { className: classes.week, key: 'week-' + index }, week.map(function (date, index) {
                                    var _a, _b;
                                    return date ? React.createElement(IconButton, { classes: { root: classnames(classes.day, (_a = {}, _a[classes.selectedDay] = active && DateUtil.sameDay(date, active), _a), classes.weekDay) }, disabled: _this.dayInvalid(date) || (dateDisabled && dateDisabled(date)), onClick: function (event) { return _this.selectDate(date, event); }, key: 'day-' + index, style: { height: buttonHeight - 10 } },
                                        React.createElement(Typography, { classes: { root: classnames(classes.dayText, (_b = {},
                                                    _b[classes.selectedDayText] = active && DateUtil.sameDay(date, active),
                                                    _b[classes.invalidInput] = _this.dayInvalid(date) || (dateDisabled && dateDisabled(date)),
                                                    _b)) }, variant: 'body1', style: { height: buttonHeight - 10, lineHeight: buttonHeight - 10 + "px" } }, date.getDate())) :
                                        React.createElement("div", { className: classes.weekDay, style: { height: buttonHeight - 10 }, key: 'day-' + index });
                                }));
                            })) :
                        React.createElement("div", { key: index });
                } }),
            okToConfirm && React.createElement("div", { className: classes.okToConfirmRow, key: 'calendar-confirm-button' },
                React.createElement(Button, { onClick: closeCalendar }, "CANCEL"),
                React.createElement(Button, { onClick: function (event) { return _this.confirmDate(event); } }, "OK"))
        ] : mode === 'year' ? [
            React.createElement("div", { className: classes.calendarControl, key: 'calendar-year-control' },
                React.createElement(IconButton, { classes: { root: classes.calendarControlButton }, disabled: !this.previousYearsValid(), onClick: this.previousYears },
                    React.createElement(ChevronLeft, null)),
                React.createElement(IconButton, { classes: { root: classes.calendarControlButton }, disabled: !this.nextYearsValid(), onClick: this.nextYears },
                    React.createElement(ChevronRight, null))),
            React.createElement(VirtualizedSwipeableViews, { key: 'calendar-year-swipeable', action: function (actions) { return _this.updateHeight.year = actions.updateHeight; }, className: classes.calendarContainer, index: yearIndex, animateHeight: true, onChangeIndex: this.changeYears, slideRenderer: function (_a) {
                    var index = _a.index;
                    return _this.yearIndexValid(index) ?
                        React.createElement("div", { key: index },
                            React.createElement("div", { className: classes.calendarControlMonth },
                                React.createElement(Button, { onClick: function () { return _this.selectCalendarYear(); }, classes: { root: classes.calendarMonthTitle } }, (index * 18) + ' - ' + (index * 18 + 17))),
                            React.createElement("div", { className: classes.calendarContainer }, _this.generateYearCalendar(index).map(function (years, index) {
                                return React.createElement("div", { className: classes.years, key: 'years-' + index }, years.map(function (currentYear, index) {
                                    var _a, _b;
                                    return React.createElement(Button, { className: classnames((_a = {}, _a[classes.selectedYear] = year === currentYear, _a)), variant: year === currentYear ? 'raised' : 'flat', disabled: _this.yearInvalid(currentYear), onClick: function () { return _this.selectCalendarYear(currentYear); }, key: 'year-' + index },
                                        React.createElement(Typography, { className: classnames((_b = {},
                                                _b[classes.invalidInput] = _this.yearInvalid(currentYear),
                                                _b[classes.selectedYearText] = year === currentYear,
                                                _b)), variant: 'body1' }, currentYear));
                                }));
                            }))) :
                        React.createElement("div", { key: index });
                } })
        ] : []));
    };
    Calendar = __decorate([
        withStyles(styles)
    ], Calendar);
    return Calendar;
}(React.Component));
export default Calendar;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY2FsZW5kYXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEtBQUssS0FBSyxNQUFNLE9BQU8sQ0FBQTtBQUU5QixPQUFPLGNBQWMsTUFBTSx1QkFBdUIsQ0FBQTtBQUNsRCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sNkJBQTZCLENBQUE7QUFDdEQsT0FBTyxLQUFLLFVBQVUsTUFBTSxZQUFZLENBQUE7QUFDeEMsT0FBTyxFQUFDLFVBQVUsRUFBMEMsTUFBTSwwQkFBMEIsQ0FBQTtBQUM1RixPQUFPLFVBQVUsTUFBTSw4QkFBOEIsQ0FBQTtBQUNyRCxPQUFPLE1BQU0sTUFBTSwwQkFBMEIsQ0FBQTtBQUM3QyxPQUFPLFVBQVUsTUFBTSw4QkFBOEIsQ0FBQTtBQUNyRCxPQUFPLFdBQVcsTUFBTSxnQ0FBZ0MsQ0FBQTtBQUN4RCxPQUFPLFlBQVksTUFBTSxpQ0FBaUMsQ0FBQTtBQUUxRCxPQUFPLEtBQUssUUFBUSxNQUFNLFFBQVEsQ0FBQTtBQUNsQyxJQUFNLHlCQUF5QixHQUFHLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQTtBQUU1RCxJQUFNLE1BQU0sR0FBRyxVQUFDLEtBQVcsSUFBZ0IsT0FBQSxDQUFDO0lBQzFDLGlCQUFpQixFQUFFO1FBQ2pCLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLFFBQVEsRUFBRSxNQUFNO1FBQ2hCLEtBQUssRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJO1FBQ3RCLFFBQVEsRUFBRSxRQUFRO0tBQ25CO0lBQ0QsZUFBZSxFQUFFO1FBQ2YsUUFBUSxFQUFFLFVBQVU7UUFDcEIsS0FBSyxFQUFFLE1BQU07UUFDYixhQUFhLEVBQUUsTUFBTTtRQUNyQixPQUFPLEVBQUUsTUFBTTtRQUNmLGNBQWMsRUFBRSxlQUFlO1FBQy9CLFVBQVUsRUFBRSxRQUFRO1FBQ3BCLE1BQU0s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