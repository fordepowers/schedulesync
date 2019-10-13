import React from 'react';
import './CreateNewForm.css';
import { Button, Form, Col, InputGroup, Alert } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import firebase from '../firebase/firebase';
import NavbarCustom from '../NavbarCustom/NavbarCustom';

const INITIAL_FORM_STATE = {
  dayOfWeek: 'Monday',
  from: 60,
  fromAMPM: 'AM',
  to: 60,
  toAMPM: 'AM',
};

const DROPDOWN_TIMES = [
  '1:00',
  '2:00',
  '3:00',
  '4:00',
  '5:00',
  '6:00',
  '7:00',
  '8:00',
  '9:00',
  '10:00',
  '11:00',
  '12:00'
]

class CreateNewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_FORM_STATE,
    };

  }

  onChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }

  handleChange = date => {
    this.setState({
      ...this.state,
      selectedDate: date
    });
  };

  handleToggle = event => {

    console.log(event.target.checked);

    this.setState({
      ...this.state,
      isAllDay: event.target.checked
    });
  }

  convertTo24Hour = (minutes, qualifier) => {
    minutes = Number(minutes);

    if (minutes === 0 || minutes === 720) {
      if (qualifier === 'AM') {
        minutes = 0;
      }
      else {
        minutes = 720;
      }
    }
    else {
      if (qualifier === 'AM') {
        // return minutes;
      }
      else {
        minutes = minutes + 720;
      }
    }

    return minutes;
  }

  submitForm = async () => {
    let from = this.convertTo24Hour(this.state.from, this.state.fromAMPM);
    let to = this.convertTo24Hour(this.state.to, this.state.toAMPM);
    let selectedDate = this.state.selectedDate.toString();

    if (this.state.isAllDay) {
      from = 0;
      to = 1440;
    }

    let form = {
      title: this.state.title,
      description: this.state.description,
      isAllDay: true,
      from: from,
      to: to,
      selectedDate: selectedDate
    };
    console.dir(form);

    firebase.addSyncFormToDatabase(form)
      .then((res) => {
        this.props.history.push('/overview/' + res.key);
      });
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
                <Form.Control type="plaintext" onChange={this.onChange} value={description} name="description" placeholder="'What time can you meet?'" />
              </Form.Group>

              <Form.Group>
                <Form.Check type="checkbox" id="all-day" name="isAllDay" onChange={this.handleToggle} checked={isAllDay} label="All Day Event?" />
              </Form.Group>

              {
                !this.state.isAllDay &&
                <>
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="from">From</InputGroup.Text>
                    </InputGroup.Prepend>

                    <select onChange={this.onChange} name="from">
                      {DROPDOWN_TIMES.map((time, index) => {
                        return <option value={60 * (index + 1)} key={index}>{time}</option>
                      })}
                    </select>
                    <InputGroup.Append>
                      <select name="fromAMPM" onChange={this.onChange}>
                        <option>AM</option>
                        <option>PM</option>
                      </select>
                    </InputGroup.Append>
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="from">To</InputGroup.Text>
                    </InputGroup.Prepend>

                    <select onChange={this.onChange} name="to">
                      {DROPDOWN_TIMES.map((time, index) => {
                        return <option value={60 * (index + 1)} key={index + 64}>{time}</option>
                      })}
                    </select>
                    <InputGroup.Append>
                      <select name="toAMPM" onChange={this.onChange}>
                        <option>AM</option>
                        <option>PM</option>
                      </select>
                    </InputGroup.Append>
                  </InputGroup>
                </>
              }
              <Form.Group>
                <Form.Label>
                  Which Day?
            </Form.Label>
                <InputGroup>
                  <DatePicker
                    selected={this.state.selectedDate}
                    onChange={this.handleChange}
                  />
                </InputGroup>
                <hr />
              </Form.Group>
              <Button variant="primary" disabled={this.state.title && this.state.description && this.state.selectedDate ? false : true} size="lg" onClick={this.submitForm}>
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
