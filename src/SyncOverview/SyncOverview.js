import React from 'react';
import QRCode from 'qrcode.react';
import Alert from 'react-bootstrap/Alert';
import './SyncOverview.css';
import SyncResults from './SyncResults/SyncResults';
import NavbarCustom from '../NavbarCustom/NavbarCustom';
import firebase from '../firebase/firebase';

class SyncOverview extends React.Component {
  componentDidMount () {
    const { ownerId } = this.props.match.params;
    if (ownerId && ownerId !== '') {
      firebase.getOverviewInformation(ownerId)
        .then((result) => {
          
          this.setState({
            ...result.val(),
            key: result.key
          });

          firebase.getTimesForForm(this.state.key)
            .then(res => {
              if (!res.val()) {
                return;
              }
              
              let data = this.calculateTimes(res.val(), this.state.from, this.state.to);
              this.setState({
                ...this.state,
                data: data
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
        if (data[key].time.time[j].active == true) {
          calculation[j]++;
        }
      }
    })

    return calculation;
  }
  constructor (props) {
    super(props);

    this.state = {

    };
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

    for (let i = 0; i <= index; i++)
    {
      let time = from + (i * 60);
      array.push(this.convertMinutesToString(time));
    }

    return array;
  }



  render () {
    let eventDate = new Date();
    eventDate = eventDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const recommendedTime = '9am';
    const labels = this.createLabels(this.state.from, this.state.to);
    const data = {
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
