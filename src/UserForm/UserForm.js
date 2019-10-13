import React from 'react';
import './UserForm.css';
import firebase from '../firebase/firebase';
import { Button, Form, Col, Row, ButtonToolbar, InputGroup, DropdownButton, Alert } from 'react-bootstrap';
import NavbarCustom from '../NavbarCustom/NavbarCustom';
import Scheduler from './Scheduler/Scheduler';

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

export default class UserForm extends React.Component {
  componentDidMount() {
    const { formId } = this.props.match.params;

    firebase.getSyncFormFromDatabase(formId)
      .then((result) => {
        console.log(result.val());
        this.setState({
          ...result.val(),
        });
      });
  }

  constructor(props) {
    super(props);

    this.state = {};
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
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

  handleOnClick = args => {
    console.log(args);
  }

  render() {
    const { name } = this.state;

    return (
      <div>
        <NavbarCustom Text='Home' Route='/' />
        <Alert variant='light'>
          <Alert.Heading>{this.state.title}</Alert.Heading>
          <p>{this.state.description}</p>
          <hr />
        </Alert>

        <Form>
          <Col>
            <Form.Group>
              <Form.Label>
                Name
          </Form.Label>
              <Form.Control type="plaintext" onChange={this.onChange} name="name" placeholder="Please enter your name:" value={name} />
            </Form.Group>

          <Scheduler match={this.props.match}  history={this.props.history}/>
          </Col>
        </Form>


      </div>
    );
  }
}
