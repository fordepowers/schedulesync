import React from 'react';
import './CreateNewForm.css';
import { Button, Form, Col, Alert } from 'react-bootstrap';
import DateRangeTimePicker from "./DateRangeTimePicker/DateRangeTimePicker";
import SingleDateTimePicker from "./SingleDateTimePicker/SingleDateTimePicker";
import moment from 'moment';
import firebase from '../firebase/firebase';
import NavbarCustom from '../NavbarCustom/NavbarCustom';

class CreateNewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment().subtract(2, 'days'),
      endDate: moment(),
      isAllDay: true,
    };
  }

  onChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }

  handleApply(event, picker) {
    this.setState({
        startDate: picker.startDate,
        endDate: picker.endDate,
    });
}

  handleToggle = event => {
    this.setState({
      ...this.state,
      isAllDay: event.target.checked
    });
  }

  submitForm = async () => {
    const { isAllDay, startDate, endDate, title, description } = this.state;

    let form = {
      dateRange: {
        startDate: startDate.toString(),
        endDate: endDate ? endDate.toString() : null
      },
      timestamp: new Date().toString(),
      times: isAllDay ? this.createTimes() : null,
      isAllDay,
      title,
      description
    }

    firebase.addSyncFormToDatabase(form)
      .then((res) => {
        this.props.history.push('/overview/' + res.key);
      });
  }

  createTimes = () => {
    const { isAllDay, startDate } = this.state;
    let date = new Date(startDate.toString());
    if (isAllDay) {
      /* We only have to create an map with 24 entries for one day */
      let timeMap = {};

      for (let i = 0; i < 24; i++) {
        date.setHours(i, 0, 0, 0);

        let timeEntry = {
          time: date.toString(),
          count: 0
        };

        timeMap[date.getHours()] = timeEntry;
      }

      return timeMap;
    }
  }
  render() {
    const { title, description, isAllDay } = this.state;

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
                <Form.Control type="plaintext" onChange={this.onChange} value={description} name="description" placeholder={this.state.isAllDay ? "'What time can you meet?'" : "'What day and time can you meet?'"} />
              </Form.Group>

              <Form.Group>
                <Form.Check type="checkbox" id="all-day" name="isAllDay" onChange={this.handleToggle} checked={isAllDay} label="All Day Event" />
              </Form.Group>

              <Form.Group>
                <Form.Label>
                  {this.state.isAllDay ? "Date" : "Dates and Time"}
                </Form.Label>
                {this.state.isAllDay ? <SingleDateTimePicker /> : <DateRangeTimePicker handleApply={this.handleApply} />}
                <hr />
              </Form.Group>


              <Button variant="primary" disabled={this.state.title && this.state.description ? false : true} size="lg" onClick={this.submitForm}>
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
