import React from 'react';
import DatetimeRangePicker from 'react-bootstrap-datetimerangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import { Form } from 'react-bootstrap';
import moment from 'moment';

class DateRangePicker extends React.Component {
  constructor (props) {
    super(props);
    this.handleApply = this.handleApply.bind(this);
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
    this.props.storeStartDate(picker.startDate.format('MM/DD/YYYY'));
    this.props.storeEndDate(picker.endDate.format('MM/DD/YYYY'));
  }

  render () {
    const start = this.state.startDate.format('MM/DD/YYYY');
    const end = this.state.endDate.format('MM/DD/YYYY');
    let label = start + ' - ' + end;
    if (start === end) {
      label = start;
    }

    const locale = {
      format: 'MM/DD/YYYY',
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
          showDropdowns
          locale={locale}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onApply={this.handleApply}
        >
          <Form.Control type='plaintext' onChange={() => { }} value={label} name='DateRangePicker' placeholder={label} />
        </DatetimeRangePicker>
      </div>
    );
  }
}

export default DateRangePicker;
