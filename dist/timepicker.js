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
import AccessTime from '@material-ui/icons/AccessTime';
import * as DateUtil from './date';
import Clock from './clock';
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
var TimeFormatInput = /** @class */ (function (_super) {
    __extends(TimeFormatInput, _super);
    function TimeFormatInput(props) {
        var _this = _super.call(this, props) || this;
        _this.action = {};
        _this.labelRef = function (label) {
            var labelDOM = ReactDOM.findDOMNode(label);
            if (labelDOM && labelDOM.offsetWidth) {
                _this.setState({ labelWidth: labelDOM.offsetWidth });
            }
        };
        _this.onWindowClick = function (event) {
            if ([_this.input, _this.clock].reduce(function (contain, next) { return contain && (!next || next.compareDocumentPosition(event.target) < 16); }, true)) {
                _this.closeClock();
            }
        };
        _this.onFocus = function (event) {
            _this.setState({ focus: event.type === 'focus' });
        };
        _this.toggleShowClock = function () {
            var clockShow = _this.state.clockShow;
            _this.setState({ clockShow: !clockShow });
        };
        _this.closeClock = function () {
            _this.setState({ clockShow: false });
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
            clockShow: false
        };
        return _this;
    }
    TimeFormatInput.prototype.componentDidMount = function () {
        window.addEventListener('click', this.onWindowClick);
    };
    TimeFormatInput.prototype.componentWillUnmount = function () {
        window.removeEventListener('click', this.onWindowClick);
    };
    TimeFormatInput.prototype.render = function () {
        var _this = this;
        var _a;
        var _b = this.props, name = _b.name, label = _b.label, value = _b.value, variant = _b.variant, onChange = _b.onChange, selectableMinutesInterval = _b.selectableMinutesInterval, anchorOrigin = _b.anchorOrigin, transformOrigin = _b.transformOrigin, disabled = _b.disabled, error = _b.error, fullWidth = _b.fullWidth, dialog = _b.dialog, okToConfirm = _b.okToConfirm, endIcon = _b.endIcon, className = _b.className, FormControlProps = _b.FormControlProps, InputLabelProps = _b.InputLabelProps, InputProps = _b.InputProps, FormHelperTextProps = _b.FormHelperTextProps, ClockProps = _b.ClockProps, classes = _b.classes;
        var _c = this.state, focus = _c.focus, labelWidth = _c.labelWidth, clockShow = _c.clockShow;
        var SelectedInput = variant === 'outlined' ? OutlinedInput :
            variant === 'filled' ? FilledInput : Input;
        return ([
            React.createElement("div", { key: 'date-input', className: classnames((_a = {}, _a[classes.container] = fullWidth, _a), className), ref: function (input) { return _this.input = ReactDOM.findDOMNode(input); } },
                React.createElement(FormControl, __assign({ disabled: disabled, onClick: this.toggleShowClock, error: error !== undefined, fullWidth: fullWidth, variant: variant }, __assign({}, FormControlProps, { classes: FormControlProps && FormControlProps.classes ? __assign({ root: classes.formControl }, FormControlProps.classes) : { root: classes.formControl } })),
                    label && React.createElement(InputLabel, __assign({}, { ref: this.labelRef }, { shrink: focus || clockShow || value !== undefined, htmlFor: name }, __assign({}, InputLabelProps, { classes: InputLabelProps && InputLabelProps.classes ? __assign({ root: classes.label }, InputLabelProps.classes) : { root: classes.label } })), label),
                    React.createElement(SelectedInput, __assign({ name: name, value: value ? DateUtil.format(value, 'h:mm a').toUpperCase() : '\u00a0' }, variant === 'outlined' ? {
                        notched: focus || clockShow || value !== undefined,
                        labelWidth: labelWidth
                    } : {}, { onFocus: this.onFocus, onBlur: this.onFocus, inputComponent: function (_a) {
                            var value = _a.value;
                            var _b;
                            return React.createElement("div", { className: classnames(classes.input, (_b = {}, _b[classes.outlinedInput] = variant === 'outlined', _b[classes.filledInput] = variant === 'filled', _b)) }, value);
                        }, endAdornment: React.createElement(InputAdornment, { position: 'end' },
                            React.createElement(IconButton, { onMouseDown: function (event) { return event.preventDefault(); } }, endIcon ? endIcon : React.createElement(AccessTime, null))) }, InputProps)),
                    error && React.createElement(FormHelperText, __assign({ error: true }, FormHelperTextProps), error))),
            dialog ?
                React.createElement(Dialog, { key: 'date-dialog', open: clockShow, onClose: this.closeClock },
                    React.createElement(Clock, __assign({ ref: function (clock) { return _this.clock = ReactDOM.findDOMNode(clock); }, value: value, onChange: onChange, selectableMinutesInterval: selectableMinutesInterval, closeClock: this.closeClock, okToConfirm: okToConfirm }, ClockProps))) :
                React.createElement(Popover, { key: 'date-popover', open: clockShow, onEntered: function () { if (_this.action.resize)
                        _this.action.resize(); }, anchorOrigin: anchorOrigin, transformOrigin: transformOrigin, anchorEl: this.input },
                    React.createElement(Clock, __assign({ action: function (action) { return _this.action.resize = action.resize; }, ref: function (clock) { return _this.clock = ReactDOM.findDOMNode(clock); }, value: value, onChange: onChange, selectableMinutesInterval: selectableMinutesInterval, closeClock: this.closeClock, okToConfirm: okToConfirm }, ClockProps)))
        ]);
    };
    TimeFormatInput = __decorate([
        withStyles(styles)
    ], TimeFormatInput);
    return TimeFormatInput;
}(React.Component));
export default TimeFormatInput;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy90aW1lcGlja2VyLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEtBQUssS0FBSyxNQUFNLE9BQU8sQ0FBQTtBQUM5QixPQUFPLEtBQUssUUFBUSxNQUFNLFdBQVcsQ0FBQTtBQUNyQyxPQUFPLEtBQUssVUFBVSxNQUFNLFlBQVksQ0FBQTtBQUN4QyxPQUFPLEVBQUMsVUFBVSxFQUEwQyxNQUFNLDBCQUEwQixDQUFBO0FBQzVGLE9BQU8sT0FBTyxNQUFNLDJCQUEyQixDQUFBO0FBQy9DLE9BQU8sTUFBTSxNQUFNLDBCQUEwQixDQUFBO0FBQzdDLE9BQU8sV0FBK0IsTUFBTSwrQkFBK0IsQ0FBQTtBQUMzRSxPQUFPLGNBQXFDLE1BQU0sa0NBQWtDLENBQUE7QUFDcEYsT0FBTyxLQUFtQixNQUFNLHlCQUF5QixDQUFBO0FBQ3pELE9BQU8sYUFBbUMsTUFBTSxpQ0FBaUMsQ0FBQTtBQUNqRixPQUFPLFdBQVcsTUFBTSwrQkFBK0IsQ0FBQTtBQUN2RCxPQUFPLFVBQTZCLE1BQU0sOEJBQThCLENBQUE7QUFDeEUsT0FBTyxjQUFjLE1BQU0sa0NBQWtDLENBQUE7QUFDN0QsT0FBTyxVQUFVLE1BQU0sOEJBQThCLENBQUE7QUFDckQsT0FBTyxVQUFVLE1BQU0sK0JBQStCLENBQUE7QUFFdEQsT0FBTyxLQUFLLFFBQVEsTUFBTSxRQUFRLENBQUE7QUFDbEMsT0FBTyxLQUFtQixNQUFNLFNBQVMsQ0FBQTtBQUV6QyxJQUFNLE1BQU0sR0FBRyxVQUFDLEtBQVcsSUFBZ0IsT0FBQSxDQUFDO0lBQzFDLFNBQVMsRUFBRTtRQUNULEtBQUssRUFBRSxNQUFNO0tBQ2Q7SUFDRCxLQUFLLEVBQUU7UUFDTCxRQUFRLEVBQUUsTUFBTTtRQUNoQixVQUFVLEVBQUUsUUFBUTtRQUNwQixRQUFRLEVBQUUsUUFBUTtRQUNsQixZ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