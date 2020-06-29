import React from 'react';
import QRCode from 'qrcode.react';
import './SyncOverview.css';
import SyncResults from './SyncResults/SyncResults';
import NavbarCustom from '../NavbarCustom/NavbarCustom';
import firebase from '../firebase/firebase';
import TableView from './TableView/TableView';
import { Accordion, Card, CardGroup, Button } from 'react-bootstrap';
import { eachHourOfInterval, eachDayOfInterval, format } from 'date-fns'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Checkmark } from 'react-checkmark'


class SyncOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      overviewCopied: false,
      userCopied: false,
      displayQR: false
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

    /* Save a reference to the Sync Form from Firebase */
    let formRef = firebase.getFormRef(this.state.key).child('/');

    /* Initializes the event listener */
    let eventListener = formRef.on('value', (snapshot) => {
      if (!snapshot.val()) {
        return;
      }
    });
  }

  handleSingleDay() {
    const { startDate, fromTime, toTime } = this.state.dateRange;
    let startTimeObject = new Date(startDate + ' ' + fromTime);
    let endTimeObject = new Date(startDate + ' ' + toTime);

    let hours = eachHourOfInterval({ start: startTimeObject, end: endTimeObject })
    console.log(hours)
  }

  handleDateRange() {
    const { startDate, endDate, fromTime, toTime } = this.state.dateRange;

    let days = eachDayOfInterval({ start: new Date(startDate), end: new Date(endDate) });
    let daysAndHours = [];
    days.forEach(day => {
      daysAndHours.push(eachHourOfInterval({ start: new Date(format(day, 'MM/dd/yyyy') + ' ' + fromTime), end: new Date(format(day, 'MM/dd/yyyy') + ' ' + toTime) }))
    });
    console.log(daysAndHours)
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
    const { dateRange, singleDayEvent, title, description } = this.state
    const data = {
      dateRange: {
        fromTime: dateRange ? dateRange.fromTime : null,
        startDate: dateRange ? dateRange.startDate : null,
        toTime: dateRange ? dateRange.toTime : null,
        endDate: dateRange ? dateRange.endDate : null,
        weekdays: dateRange ? dateRange.weekdays : null
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

    if (singleDayEvent) {
      console.log('Handling a single day!')
      this.handleSingleDay()
    } else if (dateRange) {
      if (dateRange.weekdays) {
        console.log('Handling weekdays!')
      } else if (dateRange.endDate) {
        console.log('Handling a date range!')
        this.handleDateRange()
      }
    }

    let userFormURL = window.location.href;
    let index = userFormURL.indexOf('/overview/');
    userFormURL = userFormURL.slice(0, index) + '/user-form/' + this.state.key;

    return (
      <div>
        <NavbarCustom Text='Home' Route='/' />
        <div style={{ margin: '25px', padding: '1.25rem' }}>
          <SyncResults data={data} />
        </div>
        {this.state.data === undefined || this.state.data === null ? null :
          <Accordion defaultActiveKey='0'>
            <Card>
              <Card.Header>
                <Accordion.Toggle className='accordion-header' as={Card.Body} eventKey='1'>
                  <h6>Individual Responses</h6>
                </Accordion.Toggle>
                <Accordion.Collapse className='accordion-collapse' eventKey='1'>
                  <Card.Body>
                    <TableView data={data} />
                  </Card.Body>
                </Accordion.Collapse>
              </Card.Header>
            </Card>
          </Accordion>}

        <CardGroup>
          <Card style={{ margin: '25px' }}>
            <Card.Body>
              <Card.Title>Overview Page</Card.Title>
              <Card.Text style={{ fontSize: 'medium' }}>
                This (the current page) is the overview page. As data comes in about your Schedule Sync, it will appear here.
              </Card.Text>
              <a target='_blank' rel='noopener noreferrer' href={window.location.href}><p className='links'>{window.location.href}</p></a>
              <Card.Text>
                <CopyToClipboard text={window.location.href} onCopy={() => this.setState({ overviewCopied: true })}>
                  <Button style={{ width: '100px' }}>{this.state.overviewCopied ? <Checkmark size='medium' /> : 'Copy Link'}</Button>
                </CopyToClipboard>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ margin: '0 25px 25px 25px' }}>
            <Card.Body>
              <Card.Title>User Page</Card.Title>
              <Card.Text style={{ fontSize: 'medium' }}>
                This link is the one you send to people. As they fill out their availability, the responses will show up.
              </Card.Text>
              <a target='_blank' rel='noopener noreferrer' href={userFormURL}><p className='links'>{userFormURL}</p></a>
              <Card.Text>
                <CopyToClipboard text={userFormURL} onCopy={() => this.setState({ userCopied: true })}>
                  <Button style={{ width: '100px' }}>{this.state.userCopied ? <Checkmark size='medium' /> : 'Copy Link'}</Button>
                </CopyToClipboard>
                <br />
                {this.state.displayQR ?
                  <div id='qrcode'><QRCode size={80} value={userFormURL} bgColor='#fff' /></div> :
                  <Button id='generate-qr' onClick={() => this.setState({ displayQR: true })}>Display QR Code</Button>
                }
              </Card.Text>
            </Card.Body>
          </Card>
        </CardGroup>
      </div>
    );
  }
}

export default SyncOverview;
