import React from 'react';
import CustomDatepicker from '../CustomDatepicker/index.js'
import './CreateNewForm.css';
import { Button, Form, Col, Row, Tabs, Tab } from 'react-bootstrap';
import TimePicker from 'react-time-picker';
import Switch from "react-switch";
import firebase from '../firebase/firebase';
import NavbarCustom from '../NavbarCustom/NavbarCustom';

class CreateNewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      singleDayEvent: true,
      fromTime: '14:00',
      toTime: '16:00',
      startIsVisible: false,
      endIsVisible: false,
    };
  }

  onChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }

  handleWeekdayClick = (event) => {
    let Weekday = event.target.id;

    if (this.state[Weekday]) {
      this.setState({
        ...this.state,
        [event.target.id]: false,
        startDate: null,
        endDate: null
      });
      event.target.className = 'DayPicker-Weekday';
    } else if (!this.state[Weekday]) {
      this.setState({
        ...this.state,
        [event.target.id]: true,
        startDate: null,
        endDate: null
      });
      event.target.className = 'DayPicker-Weekday Selected';
    }
  }

  resetWeekdays() {
    let weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    weekdays.forEach(weekday => {
      this.setState({ [weekday]: null });
      let div = document.getElementById(weekday);
      div.className = "DayPicker-Weekday";
    });
  }

  storeStartDate = (startDate) => {
    this.setState({
      ...this.state,
      startDate: startDate
    });
    this.resetWeekdays();
  }

  storeEndDate = (endDate) => {
    this.setState({
      ...this.state,
      endDate: endDate
    });
    this.resetWeekdays();
  }

  changeStartVisibility = (event) => { this.setState({ ...this.state, startIsVisible: !this.state.startIsVisible }) }
  changeEndVisibility = (event) => { this.setState({ ...this.state, endIsVisible: !this.state.endIsVisible }) }

  changeFromTime = (fromTime) => this.setState({ fromTime })
  changeToTime = (toTime) => this.setState({ toTime })

  handleToggle = (event) => {
    this.setState({
      ...this.state,
      singleDayEvent: event
    });
  };

  isButtonDisabled() {
    let state = this.state;
    let weekdayIsSelected = (state.Sunday || state.Monday || state.Tuesday || state.Wednesday || state.Thursday || state.Friday || state.Saturday)
    if (state.title && state.description && state.fromTime && state.toTime && (state.startDate || weekdayIsSelected)) {
      return false; // False because the button is not disabled
    } else {
      return true; // True because button is disabled
    }
  };

  submitForm = async () => {
    const { singleDayEvent,
      startDate,
      endDate,
      fromTime,
      toTime,
      title,
      description,
      Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday
    } = this.state;
    let weekdayIsSelected = (Sunday || Monday || Tuesday || Wednesday || Thursday || Friday || Saturday)
    let weekdaysSelected;
    if (weekdayIsSelected) {
      weekdaysSelected = {
        Sunday: Sunday ? Sunday : null,
        Monday: Monday ? Monday : null,
        Tuesday: Tuesday ? Tuesday : null,
        Wednesday: Wednesday ? Wednesday : null,
        Thursday: Thursday ? Thursday : null,
        Friday: Friday ? Friday : null,
        Saturday: Saturday ? Saturday : null,
      };
    };

    let form = {
      dateRange: {
        startDate: startDate ? startDate.toString() : null,
        endDate: endDate ? endDate.toString() : null,
        weekdays: weekdayIsSelected ? weekdaysSelected : null,
        fromTime: fromTime,
        toTime: toTime,
      },
      timestamp: new Date().toString(),
      singleDayEvent: !weekdayIsSelected ? singleDayEvent : null,
      title,
      description
    }

    firebase.addSyncFormToDatabase(form)
      .then((res) => {
        this.props.history.push('/overview/' + res.key);
      });
  }

  render() {
    const { title, description, singleDayEvent } = this.state;
    return (
      <div className='CreateNewForm'>
        <NavbarCustom Text='Home' Route='/' />
        <Form>
          <Col>
            <Col>
              <Form.Group></Form.Group>
              <Form.Group>
                <Form.Label>
                  Event Title
            </Form.Label>
                <Form.Control onChange={this.onChange} name="title" placeholder="'Club Meeting'" value={title} />
              </Form.Group>

              <Form.Group>
                <Form.Label>
                  Event Description
              </Form.Label>
                <Form.Control onChange={this.onChange} value={description} name="description" placeholder="'What day and time can you meet?'" />
              </Form.Group>

              <Tabs defaultActiveKey="date" id="date-choice-tab">
                <Tab eventKey="date" title="Specific Date(s)">
                  <Form.Group></Form.Group>
                  <Form.Group>
                    <span>Single Day</span>
                    <br />
                    <Switch onChange={this.handleToggle} className='toggle-button' checked={singleDayEvent} uncheckedIcon={false} checkedIcon={false} onColor='#007bff' />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      {singleDayEvent ? "Date" : "Start Date"}
                    </Form.Label>
                    <br />
                    <div className="relative">
                      <input className={'react-datepicker__input-container'} onFocus={(e) => { this.setState({ ...this.state, startIsVisible: true }); e.target.blur() }} type='text' value={this.state.startDate} readOnly />
                      <CustomDatepicker onDateSelected={this.storeStartDate} visible={this.state.startIsVisible} visibilityCallback={this.changeStartVisibility} />
                    </div>

                    <br />
                    {singleDayEvent ? null :
                      <div>
                        <Form.Label>End Date</Form.Label>
                        <br />
                        <div className="relative">
                          <input className={'react-datepicker__input-container'} onFocus={(e) => { this.setState({ ...this.state, endIsVisible: true }); e.target.blur() }} type='text' value={this.state.endDate} readOnly />
                          <CustomDatepicker onDateSelected={this.storeEndDate} visible={this.state.endIsVisible} visibilityCallback={this.changeEndVisibility} />
                        </div>
                      </div>
                    }
                  </Form.Group>

                </Tab>
                <Tab eventKey="weekdays" title="Days of the Week">
                  <br />
                  <Form.Group>
                    <Form.Label>
                      Days
                    </Form.Label>
                    <br />
                    <div className='DayPicker-Weekdays'>
                      <div id="Sunday" className='DayPicker-Weekday' onClick={this.handleWeekdayClick}>Su</div>
                      <div id="Monday" className='DayPicker-Weekday' onClick={this.handleWeekdayClick}>Mo</div>
                      <div id="Tuesday" className='DayPicker-Weekday' onClick={this.handleWeekdayClick}>Tu</div>
                      <div id="Wednesday" className='DayPicker-Weekday' onClick={this.handleWeekdayClick}>We</div>
                      <div id="Thursday" className='DayPicker-Weekday' onClick={this.handleWeekdayClick}>Th</div>
                      <div id="Friday" className='DayPicker-Weekday' onClick={this.handleWeekdayClick}>Fr</div>
                      <div id="Saturday" className='DayPicker-Weekday' onClick={this.handleWeekdayClick}>Sa</div>
                    </div>
                  </Form.Group>
                </Tab>
              </Tabs>

              <Form.Group as={Row} controlId="formHorizontalFrom">
                <Form.Label column sm={2}>From</Form.Label>
                <Col sm={10}>
                  <TimePicker onChange={this.changeFromTime} value={this.state.fromTime} disableClock maxDetail="minute" />
                </Col>
                <Form.Label column sm={2}>To</Form.Label>
                <Col sm={10}>
                  <TimePicker onChange={this.changeToTime} value={this.state.toTime} disableClock maxDetail="minute" />
                </Col>
              </Form.Group>

              <hr />

              <Button variant="primary" block disabled={this.isButtonDisabled()} size='lg' onClick={this.submitForm}>
                Submit
              </Button>
              <br />
            </Col>
          </Col>
        </Form>
      </div >
    );
  }
}

export default CreateNewForm;
