import React from 'react';
import DatetimeRangePicker from 'react-bootstrap-datetimerangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import { Form } from 'react-bootstrap';
import moment from 'moment';

class SingleDateTimePicker extends React.Component {
  constructor (props) {
    super(props);
    this.handleApply = this.handleApply.bind(this);
    this.state = {
      startDate: moment(),
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
      startDate: picker.startDate
    });
    this.props.storeStartDate(picker.startDate.format('MM/DD/YYYY'));
  }

  render () {
    const label = this.state.startDate.format('MM/DD/YYYY');

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
          singleDatePicker
          showDropdowns
          locale={locale}
          startDate={this.state.startDate}
          onApply={this.handleApply}
        >
          <Form.Control type='plaintext' onChange={() => { }} value={label} name='SingleDateTimePicker' placeholder={label} />
        </DatetimeRangePicker>
      </div>
    );
  }
}

export default SingleDateTimePicker;
