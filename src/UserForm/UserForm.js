import React from 'react';
import './UserForm.css';
import firebase from '../firebase/firebase';
import { Form, Col, Alert, Table, Button } from 'react-bootstrap';
import NavbarCustom from '../NavbarCustom/NavbarCustom';
import { parseTableTime } from "../utils/date";

export default class UserForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTimes: {},
      activeCells: {}
    };
  }

  componentDidMount() {
    const { formId } = this.props.match.params;

    /* Get the form specified in the URL */
    firebase.getSyncFormFromDatabase(formId)
      .then((form) => {
        this.setState({
          ...form.val(),
          formId
        });
      });
  }

  createTable = () => {
    const { dateRange, isAllDay, times } = this.state;

    if (dateRange == undefined) {
      return;
    }

    // let startDate = new Date(dateRange.startDate);

    if (isAllDay) {
      return Object.keys(times).map(key => (
        <tr key={new Date(times[key].time)} className='time'>
          <td>{parseTableTime(new Date(times[key].time))}</td>
          <td cellid={Math.random()} className="table-cell" id={key} onClick={this.handleOnCellClick}>Select</td>
        </tr>
      ));
    }
  }

  onChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }

  handleOnCellClick = (cell) => {
    const { id, cellid } = cell.target;
    let selectedTime = this.state.times[id];

    console.log(cell.target.cellid)
    
    let tableCell = this.state.activeCells[cell.target.cellid];

    if (tableCell == undefined) {
      cell.target.style.backgroundColor = "#cce5ff";
      this.setState({
        ...this.state,
        selectedTimes: {
          ...this.state.selectedTimes,
          [id]: selectedTime
        },
        activeCells: {
          ...this.state.activeCells,
          [cellid]: true
        }
      })
    } else {
      cell.target.style.backgroundColor = "fff";
      this.setState({
        ...this.state,
        selectedTimes: {
          ...this.state.selectedTimes,
          [id]: null
        },
        activeCells: {
          ...this.state.activeCells,
          [cellid]: undefined
        }
      })

    }

    console.log("Cell Id: " + cell.target);
    console.log(this.state.activeCells[cell.target.cellid]);
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

    console.log({
      selectedTimes: clean,
      name
    });
    
    let times = {
      selectedTimes: clean,
      name
    }

    firebase.setFirebaseForm(formId, times)
      .then(() => {
        this.props.history.push('/thanks');
      })
  }

  render() {
    const { name } = this.state;

    return (
      <div>
        <NavbarCustom Text='Home' Route='/' />
        <Alert variant='primary'>
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
            <Table bordered responsive id="table">
              <thead>
                <tr>
                  <th colSpan='2' className='table-heading'>{this.state.day}</th>
                </tr>
              </thead>
              <tbody>
                {this.createTable()}
              </tbody>
            </Table>

            {/* <Form.Group>
              <Form.Check type="checkbox" id="not-free" onChange={this.onChange} name="notFree" label="I'm not free this day" />
            </Form.Group> */}

            <Button disabled={!name} size="lg" onClick={this.onSubmit}>
              Submit
            </Button>
            <br />
            <br />
            <br />
            <br />
            <br />
          </Col>
        </Form>
      </div>
    )
  }
  // componentDidMount() {
  //   const { formId } = this.props.match.params;

  //   firebase.getSyncFormFromDatabase(formId)
  //     .then((result) => {
  //       console.log(result.val());
  //       this.setState({
  //         ...result.val(),
  //       });

  //       let index = Number(this.state.to) / 60;
  //       console.log(index);
  //       let state = {};
  //       let start = Number(this.state.from) / 60;
  //       index = index - start;
  //       for (let i = 0; i <= index; i++) {
  //         console.log(i);
  //         let time = Number(this.state.from) + (60 * i);
  //         state['cell-' + i] = {
  //           active: false,
  //           time: time
  //         }

  //         console.log(state);
  //         this.setState({
  //           ...this.state,
  //           cells: {
  //             ...state,
  //           }
  //         })
  //       }
  //     });
  // }

  // constructor(props) {
  //   super(props);

  //   this.state = {};
  // }



  // convertTo24Hour = (minutes, qualifier) => {
  //   minutes = Number(minutes);

  //   if (minutes === 0 || minutes === 720) {
  //     if (qualifier === 'AM') {
  //       minutes = 0;
  //     }
  //     else {
  //       minutes = 720;
  //     }
  //   }
  //   else {
  //     if (qualifier === 'AM') {
  //       // return minutes;
  //     }
  //     else {
  //       minutes = minutes + 720;
  //     }
  //   }

  //   return minutes;
  // }

  // handleOnClick = args => {
  //   console.log(args);
  // }


  // convertMinutesToString(minutes) {
  //   let minutesInt = Number(minutes);
  //   let qualifier = 'AM';
  //   if (minutesInt >= 720) {
  //     minutesInt = minutesInt - 720;
  //     qualifier = 'PM';
  //   }
  //   switch (minutesInt) {
  //     case 0:
  //       return '12:00' + qualifier;
  //     case 60:
  //       return '1:00' + qualifier;
  //     case 120:
  //       return '2:00' + qualifier;
  //     case 180:
  //       return '3:00' + qualifier;
  //     case 240:
  //       return '4:00' + qualifier;
  //     case 300:
  //       return '5:00' + qualifier;
  //     case 360:
  //       return '6:00' + qualifier;
  //     case 420:
  //       return '7:00' + qualifier;
  //     case 480:
  //       return '8:00' + qualifier;
  //     case 540:
  //       return '9:00' + qualifier;
  //     case 600:
  //       return '10:00' + qualifier;
  //     case 660:
  //       return '11:00' + qualifier;
  //     case 720:
  //       return '12:00' + qualifier;
  //     default:
  //       return;
  //   }
  // }

  // onCellClick = cell => {
  //   console.log(cell.target);
  //   if (this.state.cells[cell.target.id].active) {
  //     cell.target.style.backgroundColor = "#fff";
  //     this.setState({
  //       ...this.state,
  //       cells: {
  //         ...this.state.cells,
  //         [cell.target.id]: {
  //           ...this.state.cells[cell.target.id],
  //           active: false
  //         }
  //       }
  //     })
  //   } else {
  //     cell.target.style.backgroundColor = "#cce5ff";
  //     this.setState({
  //       ...this.state,
  //       cells: {
  //         ...this.state.cells,
  //         [cell.target.id]: {
  //           ...this.state.cells[cell.target.id],
  //           active: true
  //         }
  //       }
  //     })
  //   }
  // }

  // createTable = data => {
  //   let times = [];
  //   let index = Number(data.to) / 60;
  //   let start = Number(data.from) / 60;
  //   index = index - start;
  //   let state = {};

  //   for (let i = 0; i <= index; i++) {
  //     let time = data.from + (60 * i);
  //     state['cell-' + index] = false;

  //     times.push({
  //       time: time,
  //       active: false
  //     })
  //   }

  //   return times.map((cell, index) => {
  //     return (
  //       <tr key={index} className='time'>
  //         <td>{this.convertMinutesToString(cell.time)}</td>
  //         <td id={'cell-' + index} onClick={this.onCellClick}>Select</td>
  //       </tr>
  //     )
  //   })
  // }

  


  // render() {
  //   const { name } = this.state;



  // }
}
