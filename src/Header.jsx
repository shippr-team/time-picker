import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';

class Header extends Component {
  static propTypes = {
    format: PropTypes.string,
    prefixCls: PropTypes.string,
    disabledDate: PropTypes.func,
    placeholder: PropTypes.string,
    clearText: PropTypes.string,
    value: PropTypes.object,
    inputReadOnly: PropTypes.bool,
    hourOptions: PropTypes.array,
    minuteOptions: PropTypes.array,
    secondOptions: PropTypes.array,
    disabledHours: PropTypes.func,
    disabledMinutes: PropTypes.func,
    disabledSeconds: PropTypes.func,
    onChange: PropTypes.func,
    onEsc: PropTypes.func,
    defaultOpenValue: PropTypes.object,
    currentSelectPanel: PropTypes.string,
    focusOnOpen: PropTypes.bool,
    onKeyDown: PropTypes.func,
    clearIcon: PropTypes.node,
  };

  static defaultProps = {
    inputReadOnly: false,
  };

  constructor(props) {
    super(props);
    const { value, format } = props;
    this.state = {
      str: (value && value.format(format)) || '',
      invalid: false,
    };
  }

  componentDidMount() {
    const { focusOnOpen } = this.props;
    if (focusOnOpen) {
      // Wait one frame for the panel to be positioned before focusing
      const requestAnimationFrame = window.requestAnimationFrame || window.setTimeout;
      requestAnimationFrame(() => {
        this.refInput.focus();
        this.refInput.select();
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { value, format } = this.props;
    if (value !== prevProps.value) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        str: (value && value.format(format)) || '',
        invalid: false,
      });
    }
  }

  onInputChange = event => {
    const str = event.target.value;
    this.setState({
      str,
    });
    const {
      format,
      hourOptions,
      minuteOptions,
      secondOptions,
      disabledHours,
      disabledMinutes,
      disabledSeconds,
      onChange,
    } = this.props;

    if (str) {
      const { value: originalValue } = this.props;
      const value = this.getProtoValue().clone();
      const parsed = moment(str, format, true);
      if (!parsed.isValid()) {
        this.setState({
          invalid: true,
        });
        return;
      }
      value
        .hour(parsed.hour())
        .minute(parsed.minute())
        .second(parsed.second());

      // if time value not allowed, response warning.
      if (
        hourOptions.indexOf(value.hour()) < 0 ||
        minuteOptions.indexOf(value.minute()) < 0 ||
        secondOptions.indexOf(value.second()) < 0
      ) {
        this.setState({
          invalid: true,
        });
        return;
      }

      // if time value is disabled, response warning.
      const disabledHourOptions = disabledHours();
      const disabledMinuteOptions = disabledMinutes(value.hour());
      const disabledSecondOptions = disabledSeconds(value.hour(), value.minute());
      if (
        (disabledHourOptions && disabledHourOptions.indexOf(value.hour()) >= 0) ||
        (disabledMinuteOptions && disabledMinuteOptions.indexOf(value.minute()) >= 0) ||
        (disabledSecondOptions && disabledSecondOptions.indexOf(value.second()) >= 0)
      ) {
        this.setState({
          invalid: true,
        });
        return;
      }

      if (originalValue) {
        if (
          originalValue.hour() !== value.hour() ||
          originalValue.minute() !== value.minute() ||
          originalValue.second() !== value.second()
        ) {
          // keep other fields for rc-calendar
          const changedValue = originalValue.clone();
          changedValue.hour(value.hour());
          changedValue.minute(value.minute());
          changedValue.second(value.second());
          onChange(changedValue);
        }
      } else if (originalValue !== value) {
        onChange(value);
      }
    } else {
      onChange(null);
    }

    this.setState({
      invalid: false,
    });
  };

  onKeyDown = e => {
    const { onEsc, onKeyDown } = this.props;
    if (e.keyCode === 27) {
      onEsc();
    }

    onKeyDown(e);
  };

  getProtoValue() {
    const { value, defaultOpenValue } = this.props;
    return value || defaultOpenValue;
  }

  getInput() {
    const { prefixCls, placeholder, inputReadOnly } = this.props;
    const { invalid, str } = this.state;
    const invalidClass = invalid ? `${prefixCls}-input-invalid` : '';


    let value = new Date(str)
    let hour = value.getHours()
    let start = value.getMinutes();
    let end = start + 15;
    end = end < 60 ? end : 0;
    if (hour < 10) {
      hour = "0".concat(hour);
    }
    if (start < 10) {
      start = "0".concat(start);
    }
    if (end < 10) {
      end = "0".concat(end);
    }


    return (
      <input
        className={classNames(`${prefixCls}-input`, invalidClass)}
        ref={ref => {
          this.refInput = ref;
        }}
        onKeyDown={this.onKeyDown}
        value={`${hour}:${start} - ${hour}:${end}`}
        placeholder={placeholder}
        onChange={this.onInputChange}
        readOnly={!!inputReadOnly}
      />
    );
  }

  render() {
    const { prefixCls } = this.props;
    return <div className={`${prefixCls}-input-wrap`}>{this.getInput()}</div>;
  }
}

export default Header;
