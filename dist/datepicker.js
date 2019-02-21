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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Dialog from '@material-ui/core/Dialog';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Today from '@material-ui/icons/Today';
import * as DateUtil from './date';
import Calendar from './calendar';
var styles = function (theme) { return ({
    container: {
        width: '100%'
    },
    label: {
        maxWidth: '100%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    formControl: {
        cursor: 'pointer'
    },
    input: {
        minWidth: '180px',
        flexGrow: 1,
        maxWidth: '100%',
        height: '19px',
        padding: '6px 0 7px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    outlinedInput: {
        padding: '18.5px 14px'
    },
    filledInput: {
        padding: '27px 12px 10px'
    }
}); };
var DateFormatInput = /** @class */ (function (_super) {
    __extends(DateFormatInput, _super);
    function DateFormatInput(props) {
        var _this = _super.call(this, props) || this;
        _this.action = {};
        _this.labelRef = function (label) {
            var labelDOM = ReactDOM.findDOMNode(label);
            if (labelDOM && labelDOM.offsetWidth) {
                _this.setState({ labelWidth: labelDOM.offsetWidth });
            }
        };
        _this.onWindowClick = function (event) {
            if ([_this.input, _this.calendar].reduce(function (contain, next) { return contain && (!next || next.compareDocumentPosition(event.target) < 16); }, true)) {
                _this.closeCalendar();
            }
        };
        _this.onFocus = function (event) {
            _this.setState({ focus: event.type === 'focus' });
        };
        _this.toggleShowCalendar = function () {
            var calendarShow = _this.state.calendarShow;
            _this.setState({ calendarShow: !calendarShow });
        };
        _this.closeCalendar = function () {
            _this.setState({ calendarShow: false });
        };
        _this.dateValue = function (date) {
            var dateFormat = _this.props.dateFormat;
            if (typeof dateFormat === 'string') {
                return DateUtil.format(date, dateFormat);
            }
            else if (typeof dateFormat === 'function') {
                return dateFormat(date);
            }
            else {
                return DateUtil.format(date, 'EEE, MMMM d, yyyy');
            }
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
        _this.state = {
            focus: false,
            labelWidth: 0,
            calendarShow: false
        };
        return _this;
    }
    DateFormatInput.prototype.componentDidMount = function () {
        window.addEventListener('click', this.onWindowClick);
    };
    DateFormatInput.prototype.componentDidUpdate = function (prevProps, prevState) {
        if ((prevProps.value && prevProps.value.getTime()) !== (this.props.value && this.props.value.getTime()) && prevState.calendarShow) {
            this.closeCalendar();
        }
    };
    DateFormatInput.prototype.componentWillUnmount = function () {
        window.removeEventListener('click', this.onWindowClick);
    };
    DateFormatInput.prototype.render = function () {
        var _this = this;
        var _a;
        var _b = this.props, name = _b.name, label = _b.label, value = _b.value, variant = _b.variant, onChange = _b.onChange, anchorOrigin = _b.anchorOrigin, transformOrigin = _b.transformOrigin, disabled = _b.disabled, error = _b.error, fullWidth = _b.fullWidth, dateDisabled = _b.dateDisabled, min = _b.min, max = _b.max, dialog = _b.dialog, okToConfirm = _b.okToConfirm, endIcon = _b.endIcon, className = _b.className, FormControlProps = _b.FormControlProps, InputLabelProps = _b.InputLabelProps, InputProps = _b.InputProps, FormHelperTextProps = _b.FormHelperTextProps, CalendarProps = _b.CalendarProps, classes = _b.classes;
        var _c = this.state, focus = _c.focus, labelWidth = _c.labelWidth, calendarShow = _c.calendarShow;
        var calendarProps = __assign({ ref: function (calendar) { return _this.calendar = ReactDOM.findDOMNode(calendar); }, value: value, onChange: onChange, dateDisabled: dateDisabled, min: min, max: max, closeCalendar: this.closeCalendar, okToConfirm: okToConfirm }, CalendarProps);
        var SelectedInput = variant === 'outlined' ? OutlinedInput :
            variant === 'filled' ? FilledInput : Input;
        return ([
            React.createElement("div", { key: 'date-input', className: classnames((_a = {}, _a[classes.container] = fullWidth, _a), className), ref: function (input) { return _this.input = input; } },
                React.createElement(FormControl, __assign({ disabled: disabled, onClick: this.toggleShowCalendar, error: error !== undefined, fullWidth: fullWidth, variant: variant }, __assign({}, FormControlProps, { classes: FormControlProps && FormControlProps.classes ? __assign({ root: classes.formControl }, FormControlProps.classes) : { root: classes.formControl } })),
                    label && React.createElement(InputLabel, __assign({}, { ref: this.labelRef }, { shrink: focus || calendarShow || value !== undefined, htmlFor: name }, __assign({}, InputLabelProps, { classes: InputLabelProps && InputLabelProps.classes ? __assign({ root: classes.label }, InputLabelProps.classes) : { root: classes.label } })), label),
                    React.createElement(SelectedInput, __assign({ name: name, value: value ? this.dateValue(value) : '\u00a0' }, variant === 'outlined' ? {
                        notched: focus || calendarShow || value !== undefined,
                        labelWidth: labelWidth
                    } : {}, { onFocus: this.onFocus, onBlur: this.onFocus, inputComponent: function (_a) {
                            var value = _a.value;
                            var _b;
                            return React.createElement("div", { className: classnames(classes.input, (_b = {}, _b[classes.outlinedInput] = variant === 'outlined', _b[classes.filledInput] = variant === 'filled', _b)) }, value);
                        }, endAdornment: React.createElement(InputAdornment, { position: 'end' },
                            React.createElement(IconButton, { onMouseDown: function (event) { return event.preventDefault(); } }, endIcon ? endIcon : React.createElement(Today, null))) }, InputProps)),
                    error && React.createElement(FormHelperText, __assign({ error: true }, FormHelperTextProps), error))),
            dialog ?
                React.createElement(Dialog, { key: 'date-dialog', open: calendarShow, onClose: this.closeCalendar },
                    React.createElement(Calendar, __assign({}, calendarProps))) :
                React.createElement(Popover, { key: 'date-popover', open: calendarShow, anchorOrigin: anchorOrigin, transformOrigin: transformOrigin, anchorEl: this.input },
                    React.createElement(Calendar, __assign({}, calendarProps)))
        ]);
    };
    DateFormatInput = __decorate([
        withStyles(styles)
    ], DateFormatInput);
    return DateFormatInput;
}(React.Component));
export default DateFormatInput;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXRlcGlja2VyLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEtBQUssS0FBSyxNQUFNLE9BQU8sQ0FBQTtBQUM5QixPQUFPLEtBQUssUUFBUSxNQUFNLFdBQVcsQ0FBQTtBQUNyQyxPQUFPLEtBQUssVUFBVSxNQUFNLFlBQVksQ0FBQTtBQUN4QyxPQUFPLEVBQUMsVUFBVSxFQUEwQyxNQUFNLDBCQUEwQixDQUFBO0FBQzVGLE9BQU8sT0FBTyxNQUFNLDJCQUEyQixDQUFBO0FBQy9DLE9BQU8sTUFBTSxNQUFNLDBCQUEwQixDQUFBO0FBQzdDLE9BQU8sV0FBK0IsTUFBTSwrQkFBK0IsQ0FBQTtBQUMzRSxPQUFPLGNBQXFDLE1BQU0sa0NBQWtDLENBQUE7QUFDcEYsT0FBTyxLQUFtQixNQUFNLHlCQUF5QixDQUFBO0FBQ3pELE9BQU8sYUFBbUMsTUFBTSxpQ0FBaUMsQ0FBQTtBQUNqRixPQUFPLFdBQVcsTUFBTSwrQkFBK0IsQ0FBQTtBQUN2RCxPQUFPLFVBQTZCLE1BQU0sOEJBQThCLENBQUE7QUFDeEUsT0FBTyxjQUFjLE1BQU0sa0NBQWtDLENBQUE7QUFDN0QsT0FBTyxVQUFVLE1BQU0sOEJBQThCLENBQUE7QUFDckQsT0FBTyxLQUFLLE1BQU0sMEJBQTBCLENBQUE7QUFFNUMsT0FBTyxLQUFLLFFBQVEsTUFBTSxRQUFRLENBQUE7QUFDbEMsT0FBTyxRQUF5QixNQUFNLFlBQVksQ0FBQTtBQUVsRCxJQUFNLE1BQU0sR0FBRyxVQUFDLEtBQVcsSUFBZ0IsT0FBQSxDQUFDO0lBQzFDLFNBQVMsRUFBRTtRQUNULEtBQUssRUFBRSxNQUFNO0tBQ2Q7SUFDRCxLQUFLLEVBQUU7UUFDTCxRQUFRLEVBQUUsTUFBTTtRQUNoQixVQUFVLEVBQUUsUUFBUTtRQUNwQixRQUFRLEVBQUUsUUFBUTtRQUNsQixZ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