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
    let formRef =  firebase.getFormRef(this.state.key).child('/');

    /* Initializes the event listener */
    let eventListener = formRef.on('value', (snapshot) => {
      if (!snapshot.val()) {
        return;
      }
    });

    const { isAllDay } = this.state;

    if (isAllDay) {
      this.handleAllDayForm()
    } else {
      console.log("Not implemented!");
    }
  }


  handleAllDayForm = () => {
    const { startDate } = this.state.dateRange;
    let date = new Date(startDate);
    let times = [];

    for (let i = 0; i < 24; i++) {
      times.push(date.getHours());
      date.setHours(date.getHours() + 1);
    }
  }

  render() {
    return <h1>Under Construction</h1>
  }
  componentDidMount() {
    const { ownerId } = this.props.match.params;
    let formRef;
    if (ownerId && ownerId !== '') {
      firebase.getOverviewInformation(ownerId)
        .then((result) => {
          if (result) {
            this.setState({
              ...result.val(),
              key: result.key
            });
          }

          formRef = firebase.getFormRef(this.state.key).child('/');

          let ev = formRef.on('value', (snapshot) => {
            if (!snapshot.val()) {
              return;
            }
            let myData = this.calculateTimes(snapshot.val(), this.state.from, this.state.to);
            this.setState({
              ...this.state,
              data: myData,
              rawData: snapshot.val()
            })
          })

          firebase.getTimesForForm(this.state.key)
            .then(res => {
              if (!res.val()) {
                return;
              }

              let data = this.calculateTimes(res.val(), this.state.from, this.state.to);
              this.setState({
                ...this.state,
                data: data,
                rawData: res.val()
              });
            })
        });
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
        return '8:00' + qualifier;
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

  createLabels = (from, to) => {
    let array = [];

    let start = from / 60;
    let index = to / 60;
    index = index - start;

    for (let i = 0; i <= index; i++) {
      let time = from + (i * 60);
      array.push(this.convertMinutesToString(time));
    }

    return array;
  }

  checkHighestNumber = (labels, data) => {
    if (!data) {
      return;
    }
    var max = data[0];
    var maxIndex = 0;
    for (var i = 1; i < data.length; i++) {
      if (data[i] > max) {
        maxIndex = i;
        max = data[i];
      }
    }

    return labels[maxIndex];
  }

  render() {
    const labels = this.createLabels(this.state.from, this.state.to);
    const recommendedTime = this.checkHighestNumber(labels, this.state.data);
    const data = {
      rawData: this.state.rawData,
      eventDate: new Date(this.state.selectedDate).toDateString(),
      eventTitle: this.state.title,
      recommendedTime: recommendedTime,
      labels: labels,
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
          <br />
          <br />
          <br />
        </Alert>
      </div>
    );
  }
}

export default SyncOverview;
