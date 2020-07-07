import React from 'react';
import './SyncResults.css';
import Spinner from 'react-bootstrap/Spinner';
import WeekdayView from './WeekdayView/WeekdayView';
import { Chart } from '@bit/primefaces.primereact.chart';

class SyncResults extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  displayWeekdayLabel (weekdays) {
    let weekdayLabel = '';
    let su, m, tu, w, th, f, sa;
    for (const [key, value] of Object.entries(weekdays)) {
      switch (key) {
        case 'Sunday':
          su = true;
          break;
        case 'Monday':
          m = true;
          break;
        case 'Tuesday':
          tu = true;
          break;
        case 'Wednesday':
          w = true;
          break;
        case 'Thursday':
          th = true;
          break;
        case 'Friday':
          f = true;
          break;
        case 'Saturday':
          sa = true;
          break;
        default:
          break;
      }
    }

    weekdayLabel = `${su ? 'Sunday, ' : ''}${m ? 'Monday, ' : ''}${tu ? 'Tuesday, ' : ''}${w ? 'Wednesday, ' : ''}${th ? 'Thursday, ' : ''}${f ? 'Friday, ' : ''}${sa ? 'Saturday, ' : ''}`;
    return weekdayLabel.slice(0, -1).slice(0, -1) + '.';
  }

  render () {
    let weekdayLabel;
    let dateRangeLabel;
    if (this.props.data.dateRange.weekdays) {
      weekdayLabel = this.displayWeekdayLabel(this.props.data.dateRange.weekdays);
    }
    if (!this.props.data.singleDayEvent) {
      dateRangeLabel = this.props.data.dateRange.startDate + ' - ' + this.props.data.dateRange.endDate;
    }

    return (
      <div>
        <div className='content-section implementation'>
          <h3 style={{ textAlign: 'left' }}>{this.props.data.title}</h3>
          <hr />
          <h6>{weekdayLabel || dateRangeLabel || this.props.data.dateRange.startDate}</h6>
          {this.props.data.datasets[0].data === undefined || this.props.data.datasets[0].data === null
            ? <div id='loadingSpinny'>
              <Spinner animation='grow' role='status' as='span'>
                <span className='sr-only'>Waiting for entries...</span>
              </Spinner>
              <p style={{ fontSize: 'medium' }}>Waiting for entries...</p>
            </div>
            : <div>
              <Chart type='horizontalBar' data={this.props.data} />
            </div>}
          {weekdayLabel ? <WeekdayView data={this.props.data} /> : null}
          <hr />
          {!this.props.data.recommendedTime ? null
            : <div>
              <h5>Recommended time:</h5>
              <p>{this.props.data.recommendedTime}</p>
            </div>}
        </div>
      </div>
    );
  }
}

export default SyncResults;
