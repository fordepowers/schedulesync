import React from 'react';
import './Scheduler.css';
import { Table, Button } from 'react-bootstrap';
import firebase from '../../firebase/firebase';

const EventListenerMode = {capture: true};
class Scheduler extends React.Component {
  constructor(props) {
    super(props);

    let data = {
      day: 'Wednesday',
      from: 0,
      to: 720,
    }

    let index = data.to / 60;
    console.log(index);
    let state = {};

    for (let i = 0; i <= index; i++) {
      let time = data.from + (60 * i);
      state['cell-' + i] = {
        active: false,
        time: time
      }
    }

    console.dir(state);
    this.state = {
      ...state,
    }
  }

  convertMinutesToString(minutes) {
    let minutesInt = Number(minutes);
    let qualifier = 'AM';
    if (minutesInt >= 720) {
      minutesInt = minutesInt - 720;
      qualifier = 'PM';
    }
    switch (minutesInt) {
      case 0: 
        return '12:00' + qualifier;
      case 60:
        return '1:00' + qualifier;
      case 120:
        return '2:00' + qualifier;
      case 180:
        return '3:00' + qualifier;
      case 240:
        return '4:00' + qualifier;
      case 300:
        return '5:00' + qualifier;
      case 360:
        return '6:00' + qualifier;
      case 420:
        return '7:00' + qualifier;
      case 480:
        return '8:00'+ qualifier; 
      case 540:
        return '9:00' + qualifier;
      case 600:
        return '10:00' + qualifier;
      case 660:
        return '11:00' + qualifier;
      case 720:
        return '12:00' + qualifier;
    }
  }

  onCellClick = cell => {
    console.log(cell.target);
    cell.target.style.backgroundColor = "#F5F5F5";
    this.setState({
      ...this.state,
      [cell.target.id]: {
        ...this.state[cell.target.id],
        active: true
      }
    })
  }

  onDrag = cell => {
    console.dir(cell.target);
    if (cell.buttons == 1 && cell.target.id != 'time' && !this.state[cell.target.id].active) {
      cell.target.style.backgroundColor="#F5F5F5";
      this.setState({
        ...this.state,
        [cell.target.id]: {
          ...this.state[cell.target.id],
          active: true
        }
      })
    }
    
  }
  
  createTable = data => {
    let times = [];
    let index = data.to / 60;
    let state = {};

    for (let i = 0; i <= index; i++) {
      let time = data.from + (60 * i);
      state['cell-' + index] = false;

      times.push({
        time: time,
        active: false
      })
    }

    return times.map((cell, index) => {
      return (
        <tr key={index} className='time'>
          <td>{this.convertMinutesToString(cell.time)}</td>
          <td id={'cell-' + index}  onClick={this.onCellClick} onMouseMove={this.onDrag}>Y</td>
        </tr>
      )
    })
  }

  onSubmit = () => {
    const { formId } = this.props.match.params;
    console.log(this.state);
    let array = [];
    array = Object.keys(this.state).map(key => {
      return this.state[key];
    })

    let time = {
      time: array,
    }
    firebase.setFirebaseForm(formId, time)
      .then(() => {
        this.props.history.push('/');
      })
  }

  render() {
    let data = {
      day: 'Wednesday',
      from: 0,
      to: 720,
    }

    return (
      <div>
        <Table bordered hover responsive id="table">
          <thead>
            <tr>
              <th></th>
              <th>{data.day}</th>
            </tr>
          </thead>
          <tbody>
            {this.createTable(data)}
          </tbody>

        </Table>

        <Button onClick={this.onSubmit}>
          Submit
        </Button>
      </div>
    )
  }
}

export default Scheduler;