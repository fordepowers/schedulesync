import React from 'react';
import QRCode from 'qrcode.react';
import Alert from 'react-bootstrap/Alert';
import './SyncOverview.css';
import SyncResults from './SyncResults/SyncResults';
import NavbarCustom from '../NavbarCustom/NavbarCustom';
import firebase from '../firebase/firebase';

class SyncOverview extends React.Component {
  componentDidMount() {
    const { ownerId } = this.props.match.params;
    console.log(ownerId);
    if (ownerId && ownerId != '') {
      firebase.getOverviewInformation(ownerId)
        .then((result) => console.log(result.val()));
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

    const eventTitle = 'Event Title';
    const recommendedTime = '9am';

    const data = {
      eventDate: eventDate,
      eventTitle: eventTitle,
      recommendedTime: recommendedTime,
      labels: ['6am', '7am', '8am', '9am', '10am', '11am', '12pm'],
      datasets: [
        {
          label: '# of people free',
          backgroundColor: '#42A5F5',
          data: [65, 59, 80, 81, 56, 55, 40]
        }
      ]
    };

    const overviewPage = 'overview';
    const syncForm = 'syncform';

    return (
      <div>
        <NavbarCustom Text='Home' Route='/' />
        <Alert variant='primary'>
          <p>This URL is the overview page. As data comes in about your Schedule Sync, it will appear here. </p>
          <hr />
          <Alert.Link>{`https://www.schedulesync.tech/${overviewPage}`}</Alert.Link>
        </Alert>
        {data ? <SyncResults data={data} /> : null}
        <Alert variant='secondary'>
          <Alert.Heading>Send this link out:</Alert.Heading>
          <p>This URL is the one you send to friends and family. As they fill out the information, the responses will show up here.</p>
          <hr />
          <Alert.Link>{`https://www.schedulesync.tech/${syncForm}`}</Alert.Link>
          <hr />
          <div id='qrcode'><QRCode value={`https://www.schedulesync.tech/${syncForm}`} bgColor='#e2e3e5' /></div>
          <br />
          <br />
          <br />
        </Alert>
      </div>
    );
  }
}

export default SyncOverview;
