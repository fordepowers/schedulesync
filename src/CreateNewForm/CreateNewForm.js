import React from 'react';
import './CreateNewForm.css';
import { Button, Form, Col, InputGroup, Alert } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import DatetimeRangePicker from 'react-bootstrap-datetimerangepicker';
import moment from 'moment';
import firebase from '../firebase/firebase';
import NavbarCustom from '../NavbarCustom/NavbarCustom';

class CreateNewForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleApply = this.handleApply.bind(this);
    this.state = {
      startDate: moment().subtract(29, 'days'),
      endDate: moment(),
      ranges: {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
      },
    };
  }

  onChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }

  handleToggle = event => {
    console.log(event.target.checked);
    this.setState({
      ...this.state,
      isAllDay: event.target.checked
    });
  }

  handleApply(event, picker) {
    this.setState({
      startDate: picker.startDate,
      endDate: picker.endDate,
    });
  }

  submitForm = async () => {
    let dateAndTime = this.state.startDate + ' - ' + this.state.endDate;
    if (this.state.startDate === this.state.endDate) {
      dateAndTime = this.state.startDate.toString();
    }

    let form = {
      title: this.state.title,
      description: this.state.description,
      dateAndTime: dateAndTime
    };
    console.dir(form);

    firebase.addSyncFormToDatabase(form)
      .then((res) => {
        this.props.history.push('/overview/' + res.key);
      });
  }

  render() {
    const { title, description, isAllDay } = this.state;

    let start = this.state.startDate.format('DD/MM/YYYY, HH:mm');
    let end = this.state.endDate.format('DD/MM/YYYY, HH:mm');
    let label = start + ' - ' + end;
    if (start === end) {
      label = start;
    }

    let locale = {
      format: 'DD/MM/YYYY, HH:mm',
      separator: ' - ',
      applyLabel: 'Apply',
      cancelLabel: 'Cancel',
      weekLabel: 'W',
      customRangeLabel: 'Custom Range',
      daysOfWeek: moment.weekdaysMin(),
      monthNames: moment.monthsShort(),
      firstDay: moment.localeData().firstDayOfWeek(),
    };

    return (
      <div className='CreateNewForm'>
        <NavbarCustom Text='Home' Route='/' />
        <Alert variant='light'>
          <Form>
            <Col>
              <Form.Group>
                <Form.Label>
                  Event Title
            </Form.Label>
                <Form.Control type="plaintext" onChange={this.onChange} name="title" placeholder="'Club Meeting'" value={title} />
              </Form.Group>

              <Form.Group>
                <Form.Label>
                  Event Description
              </Form.Label>
                <Form.Control type="plaintext" onChange={this.onChange} value={description} name="description" placeholder="'What time can you meet?'" />
              </Form.Group>

              <Form.Group>
                <Form.Check type="checkbox" id="all-day" name="isAllDay" onChange={this.handleToggle} checked={isAllDay} label="All Day Event?" />
              </Form.Group>

              <Form.Group>
                <Form.Label>
                  Date and Time
                    </Form.Label>
                {
                  !this.state.isAllDay ?
                    <DatetimeRangePicker
                      timePicker
                      locale={locale}
                      startDate={this.state.startDate}
                      endDate={this.state.endDate}
                      onApply={this.handleApply}
                    >
                      <Form.Control readOnly type="plaintext" value={label} name="dateAndTime" placeholder={label} />
                    </DatetimeRangePicker>
                    :
                    <InputGroup>
                      <DatePicker
                        selected={this.state.selectedDate}
                        onChange={this.handleChange}
                      />
                    </InputGroup>
                }
                <hr />
              </Form.Group>


              <Button variant="primary" disabled={this.state.title && this.state.description && label ? false : true} size="lg" onClick={this.submitForm}>
                Submit
              </Button>
            </Col>
          </Form>
        </Alert>
      </div >
    );
  }
}

export default CreateNewForm;
