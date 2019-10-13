import React from 'react';
import './UserForm.css';
import firebase from '../firebase/firebase';
import { Button, Form, Col, Row, ButtonToolbar, InputGroup, DropdownButton } from 'react-bootstrap';
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

        <h1>{this.state.title}</h1>
        <h1>{this.state.description}</h1>

        <Form>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Name
          </Form.Label>
            <Col sm="10">
              <Form.Control type="plaintext" onChange={this.onChange} name="name" placeholder="Name" value={name} />
            </Col>
          </Form.Group>

          <Scheduler match={this.props.match}  history={this.props.history}/>
        </Form>


      </div>
    );
  }
}
