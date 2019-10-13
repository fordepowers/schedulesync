import React from 'react';
import './UserForm.css';
import firebase from '../firebase/firebase';
import { Button, Form, Col, Row, ButtonToolbar, InputGroup, DropdownButton } from 'react-bootstrap';
import { Scheduler, DayView, WeekView, Appointments } from '@devexpress/dx-react-scheduler-material-ui';

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
  componentDidMount () {
    const { formId } = this.props.match.params;

    firebase.getSyncFormFromDatabase(formId)
      .then((result) => {
        console.log(result.val());
        this.setState({
          ...result.val(),
        });
      });


  }

  constructor (props) {
    super(props);

    this.state = {};
  }
  onChange = event =>{
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
  submitForm = () => {
    let from = this.convertTo24Hour(this.state.from, this.state.fromAMPM);
    let to = this.convertTo24Hour(this.state.to, this.state.toAMPM);
    let name = this.name;

    if (this.state.isAllDay) {
      from = 0;
      to = 1440;
    }
  let form = {
    name: name,
    from: from,
    to: to,
  };
  console.dir(form);

  firebase.addSyncFormToDatabase(form)
    .then((ref) => {
      console.log(ref);
    })
}
const data= {[
  { startDate: '2018-10-31 10:00', endDate: '2018-10-31 11:00', title: 'Meeting' },
]}




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
            <Form.Control type="plaintext" onChange={this.onChange} name="name" placeholder="Name" value={name}/>
          </Col>
        </Form.Group>
    </Form>
    
    {
      <Scheduler
      data={[
        { startDate: '2018-10-31 00:00', endDate: '2018-11-1 00:00', title: 'Meeting' },
      ]}
    >
      <DayView startDayHour={0} endDayHour={23}/>
      <Appointments />
    </Scheduler>
      /* <InputGroup className="mb-3">
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
          </InputGroup> */}
    </div>
    );
  }
}
