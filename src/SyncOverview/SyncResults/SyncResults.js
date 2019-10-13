import React from 'react';
import './SyncResults.css';
import Alert from 'react-bootstrap/Alert';
import { Chart } from '@bit/primefaces.primereact.chart';

class SyncResults extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      data: this.props.data,
      eventTitle: this.props.data.eventTitle,
      eventDate: this.props.data.eventDate,
      recommendedTime: this.props.data.recommendedTime
    };
  }

  render () {
    return (
      <div>
        <div className='content-section implementation'>
          <Alert variant='light'>
            <Alert.Heading>{this.state.eventTitle}</Alert.Heading>
            <hr />
            <h5>Time Free for {this.state.eventDate}</h5>
            <Chart type='horizontalBar' data={this.state.data} />
            <hr />
            <h5>Recommended time:</h5>
            <p>{this.state.recommendedTime}</p>
          </Alert>
        </div>
      </div>
    );
  }
}

export default SyncResults;
