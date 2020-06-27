import React from 'react';
import './SyncResults.css';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { Chart } from '@bit/primefaces.primereact.chart';

class SyncResults extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  displayWeekdayLabel (weekdays) {
    let weekdayLabel = '';
    for (const [key, value] of Object.entries(weekdays)) {
      if (value === true) {
        weekdayLabel = weekdayLabel + `${key}, `;
      }
    }
    return weekdayLabel.slice(0, -1).slice(0, -1) + '.';
  }

  render () {
    let weekdayLabel;
    if (this.props.data.dateRange.weekdays) {
      weekdayLabel = this.displayWeekdayLabel(this.props.data.dateRange.weekdays);
    }

    return (
      <div>
        <div className='content-section implementation'>
          <Alert variant='light'>
            <h3>{this.props.data.title}</h3>
            <hr />
            {this.props.data.datasets[0].data === undefined
              ? <div id='loadingSpinny'>
                <Spinner animation='grow' role='status' as='span'>
                  <span className='sr-only'>Waiting for entries...</span>
                </Spinner> <p>Waiting for entries...</p>
              </div>
              : <div>
                <h6>Time Free for: <br /> {weekdayLabel || this.props.data.dateRange.startDate}</h6>
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
