import React from 'react';
import './UserForm.css';
import firebase from '../firebase/firebase';
import { Form, Col, Button, Row } from 'react-bootstrap';
import TimePicker from 'react-time-picker';
import NavbarCustom from '../NavbarCustom/NavbarCustom';

export default class UserForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  componentDidMount() {
    const { formId } = this.props.match.params;

    /* Get the form specified in the URL */
    firebase.getSyncFormFromDatabase(formId)
      .then((form) => {
        this.setState({
          ...form.val(),
          userFromTime: form.val().dateRange.fromTime,
          userToTime: form.val().dateRange.toTime,
          formId
        });
      });
  }

  onChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }

  changeFromTime = (userFromTime) => this.setState({ userFromTime })
  changeToTime = (userToTime) => this.setState({ userToTime })

  convertTimeToLabel = (time) => {
    time = time.replace(":", ".");
    time = parseFloat(time);
    let suffix = time >= 12 ? " PM" : " AM";
    time = ((time + 11) % 12 + 1)
    time = time.toString().split(".");
    time = time[0].slice(0, 2) + ":" + time[1].slice(0, 2) + suffix
    return time;
  }


  onSubmit = () => {
    const { name, formId } = this.state;

    /* We remove keys with null values */
    let clean = {};

    Object.keys(this.state.selectedTimes).map(key => {
      if (this.state.selectedTimes[key] != null) {
        clean[key] = this.state.selectedTimes[key];
      }
    });

    firebase.setFirebaseForm(formId, name)
      .then(() => {
        this.props.history.push('/thanks');
      })
  }

  render() {
    const { name, dateRange } = this.state;
    let startDateObject;
    let fromTime;
    let toTime;

    if (dateRange) {
      startDateObject = new Date(dateRange.startDate);
      fromTime = this.convertTimeToLabel(dateRange.fromTime);
      toTime = this.convertTimeToLabel(dateRange.toTime);
    }
    console.dir(this.state);

    return (
      <div>
        <NavbarCustom Text='Home' Route='/' />
        <Col>
          <Col>
            <Form.Group>
            </Form.Group>
            <h2>{this.state.title}</h2>
            <p>{this.state.description}</p>
            <hr />

            <Form>
              <Form.Group>
                <Form.Label>
                  Name
              </Form.Label>
                <Form.Control type="plaintext" onChange={this.onChange} name="name" placeholder="Please enter your name" value={name} />
              </Form.Group>

              <p style={{ textAlign: 'center' }}>{startDateObject ? startDateObject.toDateString() : null}</p>
              <h6 style={{ textAlign: 'center' }}>{fromTime ? fromTime : null} - {toTime ? toTime : null}</h6>
              <hr />
              <Form.Group as={Row} controlId="formHorizontalFrom">
                <Form.Label column sm={2}>From</Form.Label>
                <Col sm={10}>
                  <TimePicker onChange={this.changeFromTime} value={this.state.userFromTime} disableClock maxDetail="minute" />
                </Col>
                <Form.Label column sm={2}>To</Form.Label>
                <Col sm={10}>
                  <TimePicker onChange={this.changeToTime} value={this.state.userToTime} disableClock maxDetail="minute" />
                </Col>
              </Form.Group>

              <hr />
              <Button disabled={!name} size="lg" onClick={this.onSubmit}>
                Submit
            </Button>
            </Form>
          </Col>
        </Col>
      </div>
    )
  }
}
