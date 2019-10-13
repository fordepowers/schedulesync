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
    console.log('hey: ' + ownerId);
    if (ownerId && ownerId !== '') {
      firebase.getOverviewInformation(ownerId)
        .then((result) => {
          console.log(result.key);

          this.setState({
            ...result.val(),
            key: result.key
          });
        });
    }
  }

  constructor (props) {
    super(props);

    this.state = {

    };
  }

  render () {
    let eventDate = new Date();
    eventDate = eventDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const recommendedTime = '9am';
    console.log('THIS IS TITLE: ' + this.state.title);

    const data = {
      eventDate: eventDate,
      eventTitle: this.state.title,
      recommendedTime: recommendedTime,
      labels: ['6am', '7am', '8am', '9am', '10am', '11am', '12pm'],
      datasets: [
        {
          label: '# of people free',
          backgroundColor: '#42A5F5',
          data: [2, 0, 3, 9, 6, 3, 5]
        }
      ]
    };

    console.dir(data);

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
