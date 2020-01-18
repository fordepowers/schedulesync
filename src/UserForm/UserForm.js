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
    if (dateRange) {
      startDateObject = new Date(dateRange.startDate);
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
