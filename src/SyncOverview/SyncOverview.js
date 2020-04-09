import React from 'react';
import QRCode from 'qrcode.react';
import Alert from 'react-bootstrap/Alert';
import './SyncOverview.css';
import SyncResults from './SyncResults/SyncResults';
import NavbarCustom from '../NavbarCustom/NavbarCustom';
import firebase from '../firebase/firebase';
import TableView from './TableView/TableView';
import { Accordion, Card } from 'react-bootstrap';


class SyncOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    /* We grab the unique owner ID from the URL  */
    const { ownerId } = this.props.match.params;

    /* Only consider cases where it is not empty */
    if (ownerId && ownerId !== '') {
      firebase.getSyncFormFromOwnerId(ownerId)
        .then((syncForm) => {
          /* If the Sync Form is not null, we want to remount the component */
          if (syncForm) {
            this.setState({ ...syncForm.val(), key: syncForm.key, data: null });
          }
        });
    }

    /**
     * Next, we will set up the event listener that updates the components when 
     * new entries are recieved 
     */

    /* Save a reference to the Sync Form from Firebase */
    let formRef = firebase.getFormRef(this.state.key).child('/');

    /* Initializes the event listener */
    let eventListener = formRef.on('value', (snapshot) => {
      if (!snapshot.val()) {
        return;
      }
    });

    const { singleDayEvent } = this.state;

    if (singleDayEvent) {
      this.handleAllDayForm()
    } else {
      console.log("Not implemented!");
    }
  }


  handleAllDayForm = () => {
    const { startDate } = this.state.dateRange.startDate;
    let date = new Date(startDate);
    let times = [];

    for (let i = 0; i < 24; i++) {
      times.push(date.getHours());
      date.setHours(date.getHours() + 1);
    }
  }

  calculateTimes = (data, from, to) => {
    let start = from / 60;
    let index = to / 60;
    index = index - start;
    let calculation = [];
    for (let i = 0; i <= index; i++) {
      calculation.push(0);
    }

    Object.keys(data).map((key) => {
      console.log(index);
      for (let j = 0; j <= index; j++) {
        console.log(data[key].time.time[j]);
        if (data[key].time.time[j].active === true) {
          calculation[j]++;
        }
      }
    })

    return calculation;
  }

  render() {
    const { dateRange } = this.state
    const data = {
      dateRange: {
        fromTime: dateRange ? dateRange.fromTime : null,
        startDate: dateRange ? dateRange.startDate : null,
        toTime: dateRange ? dateRange.toTime : null,
        endDate: dateRange ? dateRange.endDate : null,
        weekdays: dateRange? dateRange.weekdays : null
      },
      description: this.state.description,
      singleDayEvent: this.state.singleDayEvent,
      timestamp: this.state.timestamp,
      title: this.state.title,
      datasets: [
        {
          label: '# of people free',
          backgroundColor: '#42A5F5',
          data: this.state.data
        }
      ]
    };

    let userFormURL = window.location.href;
    const index = userFormURL.indexOf('/overview/');
    userFormURL = userFormURL.slice(0, index);
    userFormURL = userFormURL + '/user-form/' + this.state.key;

    console.log(this.state);

    return (
      <div>
        <NavbarCustom Text='Home' Route='/' />
        <Alert variant='primary'>
          <p>This URL is the overview page. As data comes in about your Schedule Sync, it will appear here. </p>
          <hr />
          <a target='_blank' rel='noopener noreferrer' href={window.location.href}><b>{window.location.href}</b></a>
        </Alert>
        <SyncResults data={data} />
        <Accordion defaultActiveKey='0'>
          <Card>
            <Card.Header>
              <Accordion.Toggle className='accordion-header' as={Card.Body} eventKey='1'>
                <h5>Individuals</h5>
              </Accordion.Toggle>
              <Accordion.Collapse className='accordion-collapse' eventKey='1'>
                <Card.Body>
                  <TableView data={data} />
                </Card.Body>
              </Accordion.Collapse>
            </Card.Header>
          </Card>
        </Accordion>
        <Alert variant='secondary'>
          <Alert.Heading>Send this link out:</Alert.Heading>
          <p>This URL is the one you send to friends and family. As they fill out the information, the responses will show up here.</p>
          <hr />
          <a target='_blank' rel='noopener noreferrer' href={userFormURL}><b>{userFormURL}</b></a>
          <hr />
          <div id='qrcode'><QRCode value={userFormURL} bgColor='#e2e3e5' /></div>
        </Alert>
      </div>
    );
  }
}

export default SyncOverview;
