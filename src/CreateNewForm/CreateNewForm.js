import React from 'react';
import './CreateNewForm.css';
import { Button, Form, Col, Row, Tabs, Tab } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
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
      toTime: '16:00'
    };
  }

  onChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }

  handleWeekdayClick = (event) => {
    let Weekday = [event.target.attributes[1].value];

    if (this.state[Weekday]) {
      this.setState({
        ...this.state,
        [event.target.attributes[1].value]: false
      });
      console.log(event.target.attributes[1].value + " False");
      event.target.className = 'DayPicker-Weekday';
    } else if (!this.state[Weekday]) {
      this.setState({
        ...this.state,
        [event.target.attributes[1].value]: true
      });
      console.log(event.target.attributes[1].value + " True");
      event.target.className = 'DayPicker-Weekday Selected';
    }
  }

  storeStartDate = (startDate) => {
    this.setState({
      ...this.state,
      startDate: startDate
    });
  }

  storeEndDate = (endDate) => {
    this.setState({
      ...this.state,
      endDate: endDate
    });
  }

  changeFromTime = (fromTime) => this.setState({ fromTime })
  changeToTime = (toTime) => this.setState({ toTime })

  handleToggle = (event) => {
    this.setState({
      ...this.state,
      singleDayEvent: event
    });
  }

  submitForm = async () => {
    const { singleDayEvent, startDate, endDate, fromTime, toTime, title, description } = this.state;

    let form = {
      dateRange: {
        startDate: startDate.toString(),
        endDate: endDate ? endDate.toString() : null,
        fromTime: fromTime,
        toTime: toTime,
      },
      timestamp: new Date().toString(),
      singleDayEvent,
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
                    <Switch onChange={this.handleToggle} className='toggle-button' checked={singleDayEvent} uncheckedIcon={false} checkedIcon={false} onColor='#2072B8' />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      {singleDayEvent ? "Date" : "Start Date"}
                    </Form.Label>
                    <br />
                    <DatePicker selected={this.state.startDate} onChange={this.storeStartDate} />
                    <br />
                    {singleDayEvent ? null :
                      <div>
                        <br />
                        <Form.Label>End Date</Form.Label>
                        <br />
                        <DatePicker selected={this.state.endDate} onChange={this.storeEndDate} />
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
                      <div className='DayPicker-Weekday' value='Sunday' onClick={this.handleWeekdayClick}>Su</div>
                      <div className='DayPicker-Weekday' value='Monday' onClick={this.handleWeekdayClick}>Mo</div>
                      <div className='DayPicker-Weekday' value='Tuesday' onClick={this.handleWeekdayClick}>Tu</div>
                      <div className='DayPicker-Weekday' value='Wednesday' onClick={this.handleWeekdayClick}>We</div>
                      <div className='DayPicker-Weekday' value='Thursday' onClick={this.handleWeekdayClick}>Th</div>
                      <div className='DayPicker-Weekday' value='Friday' onClick={this.handleWeekdayClick}>Fr</div>
                      <div className='DayPicker-Weekday' value='Saturday' onClick={this.handleWeekdayClick}>Sa</div>
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

              <Button variant="primary" disabled={this.state.title && this.state.description && this.state.fromTime && this.state.toTime && this.state.startDate ? false : true} size="lg" onClick={this.submitForm}>
                Submit
              </Button>
            </Col>
          </Col>
        </Form>
      </div >
    );
  }
}

export default CreateNewForm;
