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
import * as classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import * as DateUtil from './date';
var defaultTime = new Date(1970, 1, 1);
var styles = function (theme) { return ({
    clockDigitalContainer: {
        padding: '16px 16px 8px',
        display: 'flex',
        justifyContent: 'stretch',
        userSelect: 'none'
    },
    clockDigitContainer: {
        flex: '1 1',
        display: 'flex'
    },
    hourDigitContainer: {
        justifyContent: 'flex-end'
    },
    miniteDigitContainer: {
        justifyContent: 'flex-start'
    },
    digitText: {
        width: '62px',
        cursor: 'pointer',
        '&:active': {
            opacity: 0.7
        }
    },
    hourDigitText: {
        textAlign: 'right'
    },
    colonDigit: {
        width: '18px',
        textAlign: 'left'
    },
    ampmButtons: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    ampmButton: {
        minWidth: 'initial',
        minHeight: 'initial',
        padding: '4px 8px'
    },
    clockAnalogContainer: {
        padding: '16px 24px 24px'
    },
    clockBackground: {
        width: '230px',
        height: '230px',
        maxWidth: 'calc(100vw - 112px)',
        maxHeight: 'calc(100vw - 112px)',
        borderRadius: '115px',
        position: 'relative',
        background: theme.palette.background.default,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'
    },
    clockText: {
        position: 'absolute',
        userSelect: 'none',
        height: '16px',
        width: '16px',
        lineHeight: '16px',
        textAlign: 'center'
    },
    clockTextSelected: {
        color: theme.palette.primary.contrastText
    },
    clockTextFaded: {
        opacity: 0,
        pointerEvents: 'none'
    },
    minuteDot: {
        position: 'absolute',
        height: '6px',
        width: '6px',
        borderRadius: '3px'
    },
    minuteDotSelected: {
        backgroundColor: theme.palette.primary.contrastText
    },
    clockHandContainer: {
        position: 'absolute',
        width: '2px'
    },
    clockHand: {
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: theme.palette.primary.main
    },
    clockHandHead: {
        position: 'absolute',
        left: '-20px',
        top: '-21px',
        width: '42px',
        height: '42px',
        borderRadius: '21px',
        backgroundColor: theme.palette.primary.main
    },
    clockHandTail: {
        position: 'absolute',
        left: '-3px',
        bottom: '-4px',
        width: '8px',
        height: '8px',
        borderRadius: '4px',
        backgroundColor: theme.palette.primary.main
    },
    okToConfirmRow: {
        height: '48px',
        marginTop: '-8px',
        padding: '0 6px',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
}); };
var Clock = /** @class */ (function (_super) {
    __extends(Clock, _super);
    function Clock(props) {
        var _this = _super.call(this, props) || this;
        _this.setClockRadius = function () {
            _this.setState({ clockRadius: _this.getClockRadius() });
        };
        _this.getClockRadius = function () {
            var background = _this.clockface ? _this.clockface.getBoundingClientRect().width : 230;
            return background / 2 - 28;
        };
        _this.getValue = function (options, target, origin) {
            var radian = Math.atan2(target.y - origin.y, target.x - origin.x);
            var angle = radian + (Math.PI / 6 * 3) < 0 ? radian + (Math.PI / 6 * 15) : radian + (Math.PI / 6 * 3);
            var select = Math.round(angle / 2 / Math.PI * options.length);
            var selected = options
                .map(function (option, index) { return ({
                option: option,
                distance: Math.min.apply(Math, [index, index + options.length].map(function (index) { return Math.abs(index - select); }))
            }); })
                .filter(function (select) { return select.option !== undefined; })
                .reduce(function (selected, option) {
                return selected && selected.distance < option.distance ? selected : option;
            }, undefined);
            return selected && selected.option;
        };
        _this.getOriginPoint = function () {
            var clockface = _this.clockface.getBoundingClientRect();
            return { x: clockface.left + clockface.width / 2, y: clockface.top + clockface.height / 2 };
        };
        _this.getMouseTargetPoint = function (event) {
            var mouse = event.nativeEvent;
            return { x: mouse.pageX, y: mouse.pageY };
        };
        _this.getTouchTargetPoint = function (event) {
            var touch = event.nativeEvent.touches[event.nativeEvent.touches.length - 1];
            return { x: touch.pageX, y: touch.pageY };
        };
        _this.changeValue = function (label, selecting, event) {
            var _a = _this.props, value = _a.value, onChange = _a.onChange, okToConfirm = _a.okToConfirm;
            var selected = _this.state.selected;
            var date = new Date((okToConfirm ? selected : value) || defaultTime);
            if (selecting >= 0 && label === 'hour') {
                date.setHours(selecting + ((value && value.getHours() >= 12) ? 12 : 0));
            }
            else if (selecting >= 0 && label === 'minute') {
                date.setMinutes(selecting);
            }
            if (selecting >= 0 && okToConfirm) {
                _this.setState({ selecting: true, selected: date });
            }
            else if (selecting >= 0) {
                _this.setState({ selecting: true }, function () { return onChange(date, event); });
            }
        };
        _this.mouseSelectClock = function (event, label, options) {
            event.preventDefault();
            var selected = _this.getValue(options, _this.getMouseTargetPoint(event), _this.getOriginPoint());
            _this.setState({ selecting: true }, function () { return _this.changeValue(label, selected, event); });
        };
        _this.touchSelectClock = function (event, label, options) {
            event.preventDefault();
            var selected = _this.getValue(options, _this.getTouchTargetPoint(event), _this.getOriginPoint());
            _this.setState({ selecting: true }, function () { return _this.changeValue(label, selected, event); });
        };
        _this.mouseHoverClock = function (event, label, options) {
            event.preventDefault();
            var selecting = _this.state.selecting;
            var selected = _this.getValue(options, _this.getMouseTargetPoint(event), _this.getOriginPoint());
            if (selecting && selected !== undefined) {
                _this.changeValue(label, selected, event);
            }
        };
        _this.touchHoverClock = function (event, label, options) {
            event.preventDefault();
            var touch = event.nativeEvent.touches[event.nativeEvent.touches.length - 1];
            var target = { x: touch.pageX, y: touch.pageY };
            var selected = _this.getValue(options, _this.getTouchTargetPoint(event), _this.getOriginPoint());
            if (selected !== undefined) {
                _this.changeValue(label, selected, event);
            }
        };
        _this.confirmClock = function (event, label) {
            var _a = _this.props, closeClock = _a.closeClock, okToConfirm = _a.okToConfirm;
            event.preventDefault();
            if (label === 'hour') {
                _this.setState({ mode: 'minute', selecting: false });
            }
            else {
                _this.setState({ selecting: false }, okToConfirm ? undefined : closeClock);
            }
        };
        _this.confirmTime = function (event) {
            var _a = _this.props, onChange = _a.onChange, closeClock = _a.closeClock, okToConfirm = _a.okToConfirm;
            if (okToConfirm) {
                closeClock();
                onChange(_this.state.selected, event);
            }
        };
        _this.clickSetMode = function (mode) {
            _this.setState({ mode: mode });
        };
        _this.clickAmPm = function (ampm, event) {
            var _a = _this.props, value = _a.value, onChange = _a.onChange, okToConfirm = _a.okToConfirm;
            var selected = _this.state.selected;
            var date = new Date((okToConfirm ? selected : value) || defaultTime);
            var hour = date.getHours();
            if (hour >= 12 && ampm === 'am') {
                date.setHours(hour - 12);
            }
            else if (hour < 12 && ampm === 'pm') {
                date.setHours(hour + 12);
            }
            if (okToConfirm) {
                _this.setState({ selected: date });
            }
            else {
                onChange(date, event);
            }
        };
        _this.getSelectedDate = function () {
            var _a = _this.props, value = _a.value, okToConfirm = _a.okToConfirm;
            var selected = _this.state.selected;
            var selecting = okToConfirm ? selected : value;
            return selecting ? {
                hour: selecting.getHours() >= 12 ? selecting.getHours() - 12 : selecting.getHours(),
                minute: selecting.getMinutes(),
                ampm: selecting.getHours() >= 12 ? 'pm' : 'am'
            } : {
                hour: 0,
                minute: 0,
                ampm: 'am'
            };
        };
        if (props.action) {
            props.action({
                resize: _this.setClockRadius
            });
        }
        _this.state = {
            mode: 'hour',
            selected: props.value,
            selecting: false,
            clockRadius: _this.getClockRadius()
        };
        return _this;
    }
    Clock.prototype.componentDidMount = function () {
        if (!this.props.action)
            this.setClockRadius();
        window.addEventListener('resize', this.setClockRadius);
    };
    Clock.prototype.componentWillUnmount = function () {
        window.removeEventListener('resize', this.setClockRadius);
    };
    Clock.prototype.render = function () {
        var _this = this;
        var _a = this.props, classes = _a.classes, value = _a.value, okToConfirm = _a.okToConfirm, closeClock = _a.closeClock, selectableMinutesInterval = _a.selectableMinutesInterval;
        var _b = this.state, mode = _b.mode, selecting = _b.selecting, clockRadius = _b.clockRadius;
        var hours = Array(12).fill(undefined).map(function (number, index) { return index === 0 ? 12 : index; });
        var minutes = Array(60).fill(undefined).map(function (number, index) { return !selectableMinutesInterval ?
            index :
            index % selectableMinutesInterval === 0 ?
                index :
                undefined; });
        var selected = this.getSelectedDate();
        var selectAngle = (mode === 'hour' ?
            selected.hour / hours.length :
            selected.minute / minutes.length) * 2 * Math.PI - (Math.PI / 6 * 3);
        return (React.createElement("div", { className: classes.root },
            React.createElement("div", { className: classnames(classes.clockDigitalContainer, classes.digitalContainer) },
                React.createElement("div", { className: classnames(classes.clockDigitContainer, classes.hourDigitContainer) },
                    React.createElement(Typography, { color: mode === 'hour' ? 'primary' : 'default', variant: 'display3', classes: { root: classnames(classes.digitText, classes.hourDigitText) }, onClick: function () { return _this.clickSetMode('hour'); } }, selected.hour === 0 ? 12 : selected.hour)),
                React.createElement("div", null,
                    React.createElement(Typography, { variant: 'display3', classes: { root: classes.colonDigit } }, ":")),
                React.createElement("div", { className: classnames(classes.clockDigitContainer, classes.miniteDigitContainer) },
                    React.createElement(Typography, { color: mode === 'minute' ? 'primary' : 'default', variant: 'display3', classes: { root: classes.digitText }, onClick: function () { return _this.clickSetMode('minute'); } }, DateUtil.fillInDigit(selected.minute, 2)),
                    React.createElement("div", { className: classes.ampmButtons },
                        React.createElement(Button, { color: selected.ampm === 'am' ? 'primary' : 'default', classes: { root: classes.ampmButton }, onClick: function (event) { return _this.clickAmPm('am', event); } }, "AM"),
                        React.createElement(Button, { color: selected.ampm === 'pm' ? 'primary' : 'default', classes: { root: classes.ampmButton }, onClick: function (event) { return _this.clickAmPm('pm', event); } }, "PM")))),
            React.createElement("div", { key: 'clock', className: classes.clockAnalogContainer, onMouseDown: function (event) { return _this.mouseSelectClock(event, mode, mode === 'hour' ? hours : minutes); }, onTouchStart: function (event) { return _this.touchSelectClock(event, mode, mode === 'hour' ? hours : minutes); }, onMouseMove: function (event) { return _this.mouseHoverClock(event, mode, mode === 'hour' ? hours : minutes); }, onTouchMove: function (event) { return _this.touchHoverClock(event, mode, mode === 'hour' ? hours : minutes); }, onMouseUp: function (event) { return _this.confirmClock(event, mode); }, onTouchEnd: function (event) { return _this.confirmClock(event, mode); } },
                React.createElement("div", { className: classes.clockBackground, ref: function (clockface) { return _this.clockface = clockface; } },
                    React.createElement("div", { className: classes.clockHandContainer, style: { height: clockRadius, paddingBottom: clockRadius,
                            transition: selecting ? '' : 'transform 600ms ease-in-out',
                            transform: "rotate(" + (selectAngle + (Math.PI / 6 * 3)) + "rad)"
                        } },
                        React.createElement("div", { className: classnames(classes.clockHand, classes.hand) },
                            React.createElement("div", { className: classes.clockHandHead }),
                            React.createElement("div", { className: classes.clockHandTail }))),
                    hours.map(function (hour, index) {
                        var _a, _b;
                        var angle = index / hours.length * 2 * Math.PI - (Math.PI / 6 * 3);
                        return React.createElement(Typography, { key: hour, className: classnames(classes.clockText, (_a = {}, _a[classes.clockTextSelected] = mode === 'hour' && selected.hour === index, _a), (_b = {}, _b[classes.clockTextFaded] = mode !== 'hour', _b)), style: {
                                transition: selecting ? 'opacity 600ms ease-in-out' : 'opacity 600ms ease-in-out, color 0ms 600ms',
                                transform: "translate(" + clockRadius * Math.cos(angle) + "px, " + clockRadius * Math.sin(angle) + "px)"
                            } }, hour);
                    }),
                    minutes.map(function (minute, index) {
                        var _a, _b, _c, _d;
                        var angle = index / minutes.length * 2 * Math.PI - (Math.PI / 6 * 3);
                        if (minute % 5 === 0) {
                            return React.createElement(Typography, { key: index, className: classnames(classes.clockText, (_a = {}, _a[classes.clockTextSelected + " " + classes.textSelected] = mode === 'minute' && selected.minute === index, _a), (_b = {}, _b[classes.clockTextFaded] = mode !== 'minute', _b)), style: {
                                    transition: selecting ? 'opacity 600ms ease-in-out' : 'opacity 600ms ease-in-out, color 0ms 600ms',
                                    transform: "translate(" + clockRadius * Math.cos(angle) + "px, " + clockRadius * Math.sin(angle) + "px)"
                                } }, minute);
                        }
                        else {
                            return React.createElement("div", { key: index, className: classnames(classes.minuteDot, (_c = {}, _c[classes.minuteDotSelected] = mode === 'minute' && selected.minute === minute, _c), (_d = {}, _d[classes.clockTextFaded] = mode !== 'minute', _d)), style: {
                                    transition: selecting ? 'opacity 600ms ease-in-out' : 'opacity 600ms ease-in-out, background 0ms 600ms',
                                    transform: "translate(" + clockRadius * Math.cos(angle) + "px, " + clockRadius * Math.sin(angle) + "px)"
                                } });
                        }
                    }))),
            okToConfirm && React.createElement("div", { className: classes.okToConfirmRow },
                React.createElement(Button, { onClick: closeClock }, "CANCEL"),
                React.createElement(Button, { onClick: function (event) { return _this.confirmTime(event); } }, "OK"))));
    };
    Clock = __decorate([
        withStyles(styles)
    ], Clock);
    return Clock;
}(React.Component));
export default Clock;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY2xvY2sudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEtBQUssS0FBSyxNQUFNLE9BQU8sQ0FBQTtBQUU5QixPQUFPLEtBQUssVUFBVSxNQUFNLFlBQVksQ0FBQTtBQUN4QyxPQUFPLEVBQUMsVUFBVSxFQUEwQyxNQUFNLDBCQUEwQixDQUFBO0FBQzVGLE9BQU8sVUFBVSxNQUFNLDhCQUE4QixDQUFBO0FBQ3JELE9BQU8sTUFBTSxNQUFNLDBCQUEwQixDQUFBO0FBRTdDLE9BQU8sS0FBSyxRQUFRLE1BQU0sUUFBUSxDQUFBO0FBRWxDLElBQU0sV0FBVyxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDeEMsSUFBTSxNQUFNLEdBQUcsVUFBQyxLQUFXLElBQWdCLE9BQUEsQ0FBQztJQUMxQyxxQkFBcUIsRUFBRTtRQUNyQixPQUFPLEVBQUUsZUFBZTtRQUN4QixPQUFPLEVBQUUsTUFBTTtRQUNmLGNBQWMsRUFBRSxTQUFTO1FBQ3pCLFVBQVUsRUFBRSxNQUFNO0tBQ25CO0lBQ0QsbUJBQW1CLEVBQUU7UUFDbkIsSUFBSSxFQUFFLEtBQUs7UUFDWCxPQUFPLEVBQUUsTUFBTTtLQUNoQjtJQUNELGtCQUFrQixFQUFFO1FBQ2xCLGNBQWMsRUFBRSxVQUFVO0tBQzNCO0lBQ0Qsb0JBQW9CLEVBQUU7UUFDcEIsY0FBYyxFQUFFLFlBQVk7S0FDN0I7SUFDRCxTQUFTLEVBQUU7UUFDVCxLQUFLLEVBQUUsTUFBTTtRQUNiLE1BQU0sRUFBRSxTQUFTO1FBQ2pCLFVBQVUsRUFBRTtZQUNWLE9BQU8sRUFBRSxHQUFHO1NBQ2I7S0FDRjtJQUNELGFBQWEsRUFBRTtRQUNiLFNBQVMsRUFBRSxPQUFPO0tBQ25CO0lBQ0QsVUFBVSxFQUFFO1FBQ1YsS0FBSyxFQUFFLE1BQU07UUFDYixTQUFT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