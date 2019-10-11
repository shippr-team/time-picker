"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _rcTrigger = _interopRequireDefault(require("rc-trigger"));

var _moment = _interopRequireDefault(require("moment"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _classnames = _interopRequireDefault(require("classnames"));

var _Panel = _interopRequireDefault(require("./Panel"));

var _placements = _interopRequireDefault(require("./placements"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function noop() {}

function refFn(field, component) {
  this[field] = component;
}

var Picker =
/*#__PURE__*/
function (_Component) {
  _inherits(Picker, _Component);

  function Picker(props) {
    var _this;

    _classCallCheck(this, Picker);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Picker).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onPanelChange", function (value) {
      _this.setValue(value);
    });

    _defineProperty(_assertThisInitialized(_this), "onAmPmChange", function (ampm) {
      var onAmPmChange = _this.props.onAmPmChange;
      onAmPmChange(ampm);
    });

    _defineProperty(_assertThisInitialized(_this), "onClear", function (event) {
      event.stopPropagation();

      _this.setValue(null);

      _this.setOpen(false);
    });

    _defineProperty(_assertThisInitialized(_this), "onVisibleChange", function (open) {
      _this.setOpen(open);
    });

    _defineProperty(_assertThisInitialized(_this), "onEsc", function () {
      _this.setOpen(false);

      _this.focus();
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (e) {
      if (e.keyCode === 40) {
        _this.setOpen(true);
      }
    });

    _this.saveInputRef = refFn.bind(_assertThisInitialized(_this), 'picker');
    _this.savePanelRef = refFn.bind(_assertThisInitialized(_this), 'panelInstance');

    var defaultOpen = props.defaultOpen,
        defaultValue = props.defaultValue,
        _props$open = props.open,
        _open = _props$open === void 0 ? defaultOpen : _props$open,
        _props$value = props.value,
        _value = _props$value === void 0 ? defaultValue : _props$value;

    _this.state = {
      open: _open,
      value: _value
    };
    return _this;
  }

  _createClass(Picker, [{
    key: "setValue",
    value: function setValue(value) {
      var onChange = this.props.onChange;

      if (!('value' in this.props)) {
        this.setState({
          value: value
        });
      }

      onChange(value);
    }
  }, {
    key: "getPanelElement",
    value: function getPanelElement() {
      var _this$props = this.props,
          prefixCls = _this$props.prefixCls,
          placeholder = _this$props.placeholder,
          disabledHours = _this$props.disabledHours,
          disabledMinutes = _this$props.disabledMinutes,
          disabledSeconds = _this$props.disabledSeconds,
          hideDisabledOptions = _this$props.hideDisabledOptions,
          inputReadOnly = _this$props.inputReadOnly,
          showHour = _this$props.showHour,
          showMinute = _this$props.showMinute,
          showSecond = _this$props.showSecond,
          defaultOpenValue = _this$props.defaultOpenValue,
          clearText = _this$props.clearText,
          addon = _this$props.addon,
          use12Hours = _this$props.use12Hours,
          focusOnOpen = _this$props.focusOnOpen,
          onKeyDown = _this$props.onKeyDown,
          hourStep = _this$props.hourStep,
          minuteStep = _this$props.minuteStep,
          secondStep = _this$props.secondStep,
          clearIcon = _this$props.clearIcon;
      var value = this.state.value;
      return _react["default"].createElement(_Panel["default"], {
        clearText: clearText,
        prefixCls: "".concat(prefixCls, "-panel"),
        ref: this.savePanelRef,
        value: value,
        inputReadOnly: inputReadOnly,
        onChange: this.onPanelChange,
        onAmPmChange: this.onAmPmChange,
        defaultOpenValue: defaultOpenValue,
        showHour: showHour,
        showMinute: showMinute,
        showSecond: showSecond,
        onEsc: this.onEsc,
        placeholder: placeholder,
        disabledHours: disabledHours,
        disabledMinutes: disabledMinutes,
        disabledSeconds: disabledSeconds,
        hideDisabledOptions: hideDisabledOptions,
        use12Hours: use12Hours,
        hourStep: hourStep,
        minuteStep: minuteStep,
        secondStep: secondStep,
        addon: addon,
        focusOnOpen: focusOnOpen,
        onKeyDown: onKeyDown,
        clearIcon: clearIcon
      });
    }
  }, {
    key: "getPopupClassName",
    value: function getPopupClassName() {
      var _this$props2 = this.props,
          showHour = _this$props2.showHour,
          showMinute = _this$props2.showMinute,
          showSecond = _this$props2.showSecond,
          use12Hours = _this$props2.use12Hours,
          prefixCls = _this$props2.prefixCls,
          popupClassName = _this$props2.popupClassName;
      var selectColumnCount = 0;

      if (showHour) {
        selectColumnCount += 1;
      }

      if (showMinute) {
        selectColumnCount += 1;
      }

      if (showSecond) {
        selectColumnCount += 1;
      }

      if (use12Hours) {
        selectColumnCount += 1;
      } // Keep it for old compatibility


      return (0, _classnames["default"])(popupClassName, _defineProperty({}, "".concat(prefixCls, "-panel-narrow"), (!showHour || !showMinute || !showSecond) && !use12Hours), "".concat(prefixCls, "-panel-column-").concat(selectColumnCount));
    }
  }, {
    key: "setOpen",
    value: function setOpen(open) {
      var _this$props3 = this.props,
          onOpen = _this$props3.onOpen,
          onClose = _this$props3.onClose;
      var currentOpen = this.state.open;

      if (currentOpen !== open) {
        if (!('open' in this.props)) {
          this.setState({
            open: open
          });
        }

        if (open) {
          onOpen({
            open: open
          });
        } else {
          onClose({
            open: open
          });
        }
      }
    }
  }, {
    key: "focus",
    value: function focus() {
      this.picker.focus();
    }
  }, {
    key: "blur",
    value: function blur() {
      this.picker.blur();
    }
  }, {
    key: "renderClearButton",
    value: function renderClearButton() {
      var _this2 = this;

      var value = this.state.value;
      var _this$props4 = this.props,
          prefixCls = _this$props4.prefixCls,
          allowEmpty = _this$props4.allowEmpty,
          clearIcon = _this$props4.clearIcon,
          clearText = _this$props4.clearText,
          disabled = _this$props4.disabled;

      if (!allowEmpty || !value || disabled) {
        return null;
      }

      if (_react["default"].isValidElement(clearIcon)) {
        var _ref = clearIcon.props || {},
            _onClick = _ref.onClick;

        return _react["default"].cloneElement(clearIcon, {
          onClick: function onClick() {
            if (_onClick) _onClick.apply(void 0, arguments);

            _this2.onClear.apply(_this2, arguments);
          }
        });
      }

      return _react["default"].createElement("a", {
        role: "button",
        className: "".concat(prefixCls, "-clear"),
        title: clearText,
        onClick: this.onClear,
        tabIndex: 0
      }, clearIcon || _react["default"].createElement("i", {
        className: "".concat(prefixCls, "-clear-icon")
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
          prefixCls = _this$props5.prefixCls,
          placeholder = _this$props5.placeholder,
          placement = _this$props5.placement,
          align = _this$props5.align,
          id = _this$props5.id,
          disabled = _this$props5.disabled,
          transitionName = _this$props5.transitionName,
          style = _this$props5.style,
          className = _this$props5.className,
          getPopupContainer = _this$props5.getPopupContainer,
          name = _this$props5.name,
          autoComplete = _this$props5.autoComplete,
          onFocus = _this$props5.onFocus,
          onBlur = _this$props5.onBlur,
          autoFocus = _this$props5.autoFocus,
          inputReadOnly = _this$props5.inputReadOnly,
          inputIcon = _this$props5.inputIcon,
          popupStyle = _this$props5.popupStyle;
      var _this$state = this.state,
          open = _this$state.open,
          value = _this$state.value;

      var monkeyFormat = function monkeyFormat(value) {
        var start = value;
        var end = parseInt(start) + 15;
        end = end < 60 ? end : 0;

        if (end < 10) {
          end = "0".concat(end);
        }

        return "".concat(start, " - ").concat(end);
      };

      var popupClassName = this.getPopupClassName();
      return _react["default"].createElement(_rcTrigger["default"], {
        prefixCls: "".concat(prefixCls, "-panel"),
        popupClassName: popupClassName,
        popupStyle: popupStyle,
        popup: this.getPanelElement(),
        popupAlign: align,
        builtinPlacements: _placements["default"],
        popupPlacement: placement,
        action: disabled ? [] : ['click'],
        destroyPopupOnHide: true,
        getPopupContainer: getPopupContainer,
        popupTransitionName: transitionName,
        popupVisible: open,
        onPopupVisibleChange: this.onVisibleChange
      }, _react["default"].createElement("span", {
        className: (0, _classnames["default"])(prefixCls, className),
        style: style
      }, _react["default"].createElement("input", {
        className: "".concat(prefixCls, "-input"),
        ref: this.saveInputRef,
        type: "text",
        placeholder: placeholder,
        name: name,
        onKeyDown: this.onKeyDown,
        disabled: disabled,
        value: value && monkeyFormat(value) || '',
        autoComplete: autoComplete,
        onFocus: onFocus,
        onBlur: onBlur,
        autoFocus: autoFocus,
        onChange: noop,
        readOnly: !!inputReadOnly,
        id: id
      }), inputIcon || _react["default"].createElement("span", {
        className: "".concat(prefixCls, "-icon")
      }), this.renderClearButton()));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var newState = {};

      if ('value' in props) {
        newState.value = props.value;
      }

      if (props.open !== undefined) {
        newState.open = props.open;
      }

      return Object.keys(newState).length > 0 ? _objectSpread({}, state, {}, newState) : null;
    }
  }]);

  return Picker;
}(_react.Component);

_defineProperty(Picker, "propTypes", {
  prefixCls: _propTypes["default"].string,
  clearText: _propTypes["default"].string,
  value: _propTypes["default"].object,
  defaultOpenValue: _propTypes["default"].object,
  inputReadOnly: _propTypes["default"].bool,
  disabled: _propTypes["default"].bool,
  allowEmpty: _propTypes["default"].bool,
  defaultValue: _propTypes["default"].object,
  open: _propTypes["default"].bool,
  defaultOpen: _propTypes["default"].bool,
  align: _propTypes["default"].object,
  placement: _propTypes["default"].any,
  transitionName: _propTypes["default"].string,
  getPopupContainer: _propTypes["default"].func,
  placeholder: _propTypes["default"].string,
  format: _propTypes["default"].string,
  showHour: _propTypes["default"].bool,
  showMinute: _propTypes["default"].bool,
  showSecond: _propTypes["default"].bool,
  style: _propTypes["default"].object,
  className: _propTypes["default"].string,
  popupClassName: _propTypes["default"].string,
  popupStyle: _propTypes["default"].object,
  disabledHours: _propTypes["default"].func,
  disabledMinutes: _propTypes["default"].func,
  disabledSeconds: _propTypes["default"].func,
  hideDisabledOptions: _propTypes["default"].bool,
  onChange: _propTypes["default"].func,
  onAmPmChange: _propTypes["default"].func,
  onOpen: _propTypes["default"].func,
  onClose: _propTypes["default"].func,
  onFocus: _propTypes["default"].func,
  onBlur: _propTypes["default"].func,
  addon: _propTypes["default"].func,
  name: _propTypes["default"].string,
  autoComplete: _propTypes["default"].string,
  use12Hours: _propTypes["default"].bool,
  hourStep: _propTypes["default"].number,
  minuteStep: _propTypes["default"].number,
  secondStep: _propTypes["default"].number,
  focusOnOpen: _propTypes["default"].bool,
  onKeyDown: _propTypes["default"].func,
  autoFocus: _propTypes["default"].bool,
  id: _propTypes["default"].string,
  inputIcon: _propTypes["default"].node,
  clearIcon: _propTypes["default"].node
});

_defineProperty(Picker, "defaultProps", {
  clearText: 'clear',
  prefixCls: 'rc-time-picker',
  defaultOpen: false,
  inputReadOnly: false,
  style: {},
  className: '',
  popupClassName: '',
  popupStyle: {},
  id: '',
  align: {},
  defaultOpenValue: (0, _moment["default"])(),
  allowEmpty: true,
  showHour: true,
  showMinute: true,
  showSecond: true,
  disabledHours: noop,
  disabledMinutes: noop,
  disabledSeconds: noop,
  hideDisabledOptions: false,
  placement: 'bottomLeft',
  onChange: noop,
  onAmPmChange: noop,
  onOpen: noop,
  onClose: noop,
  onFocus: noop,
  onBlur: noop,
  addon: noop,
  use12Hours: false,
  focusOnOpen: false,
  onKeyDown: noop
});

(0, _reactLifecyclesCompat.polyfill)(Picker);
var _default = Picker;
exports["default"] = _default;