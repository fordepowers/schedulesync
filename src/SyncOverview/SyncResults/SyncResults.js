import React from 'react';
import './SyncResults.css';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { Chart } from '@bit/primefaces.primereact.chart';

class SyncResults extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
    };
    console.log('THiS IS EVENT TITLE: ' + this.state.eventTitle);
  }

  render () {
    return (
      <div>
        <div className='content-section implementation'>
          <Alert variant='light'>
            <Alert.Heading>{this.props.data.eventTitle}</Alert.Heading>
            <hr />
            {this.props.data.datasets[0].data === undefined
              ? <div id='loadingSpinny'>
                <Spinner animation='grow' role='status' as='span'>
                  <span className='sr-only'>Waiting for entries...</span>
                </Spinner> <p>Waiting for entries...</p>
              </div>
              : <div>
                <h5>Time Free for {this.props.data.eventDate}</h5>
                <Chart type='horizontalBar' data={this.props.data} />
              </div>}
            <hr />
            {!this.props.data.recommendedTime ? null
              : <div>
                <h5>Recommended time:</h5>
                <p>{this.props.data.recommendedTime}</p>
              </div>}
          </Alert>
        </div>
      </div>
    );
  }
}

export default SyncResults;
