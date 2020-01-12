import React from 'react';
import DatetimeRangePicker from 'react-bootstrap-datetimerangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import { Form } from 'react-bootstrap';
import moment from 'moment';

class DateRangeTimePicker extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      startDate: moment().subtract(5, 'days'),
      endDate: moment(),
      ranges: {
        Today: [moment(), moment()],
        Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      }
    };
  }

  handleApply (event, picker) {
    this.setState({
      startDate: picker.startDate,
      endDate: picker.endDate
    });
  }

  render () {
    const start = this.state.startDate.format('MM/DD/YYYY, HH:mm');
    const end = this.state.endDate.format('MM/DD/YYYY, HH:mm');
    let label = start + ' - ' + end;
    if (start === end) {
      label = start;
    }

    const locale = {
      format: 'MM/DD/YYYY, HH',
      separator: ' - ',
      applyLabel: 'Apply',
      cancelLabel: 'Cancel',
      weekLabel: 'W',
      customRangeLabel: 'Custom Range',
      daysOfWeek: moment.weekdaysMin(),
      monthNames: moment.monthsShort(),
      firstDay: moment.localeData().firstDayOfWeek()
    };

    return (
      <div className='form-group'>
        <DatetimeRangePicker
          timePicker
          showDropdowns
          locale={locale}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onApply={this.props.handleApply}
        >
          <Form.Control type='plaintext' value={label} name='DateRangeTimePicker' placeholder={label} />
        </DatetimeRangePicker>
      </div>
    );
  }
}

export default DateRangeTimePicker;
