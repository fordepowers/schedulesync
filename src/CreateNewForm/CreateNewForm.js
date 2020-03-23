import React from 'react';
import './CreateNewForm.css';
import { Button, Form, Col, Row, Tabs, Tab } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';
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

  handleToggle = event => {
    this.setState({
      ...this.state,
      singleDayEvent: event.target.checked
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
              <Form.Group>
              </Form.Group>
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
                <Tab eventKey="date" title="Specific Date">
                  <br />
                  <Form.Group>
                    <Form.Label>
                      {this.state.singleDayEvent ? "Date" : "Dates"}
                    </Form.Label>
                    <br />
                    <DatePicker selected={this.state.startDate} onChange={this.storeStartDate} />
                    <Form.Group>
                      <Form.Check type="checkbox" id="all-day" name="singleDayEvent" onChange={this.handleToggle} checked={singleDayEvent} label="Single Day Event" />
                    </Form.Group>
                  </Form.Group>
                </Tab>
                <Tab eventKey="weekdays" title="Days of the Week">
                  <br />
                  <Form.Group>
                    <Form.Label>
                      {this.state.singleDayEvent ? "Date" : "Dates"}
                    </Form.Label>
                    <br />
                    <DatePicker selected={this.state.startDate} onChange={this.storeStartDate} />
                    <Form.Group>
                      <Form.Check type="checkbox" id="all-day" name="singleDayEvent" onChange={this.handleToggle} checked={singleDayEvent} label="Single Day Event" />
                    </Form.Group>
                  </Form.Group>
                </Tab>
              </Tabs>

              <hr />

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
