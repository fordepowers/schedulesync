import React from 'react';
import { Table } from 'react-bootstrap';

export default class WeekdayView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  createTable = () => {
    console.log('THIS IS PROPS: ')
    console.dir(this.props);
    
  }

  render() {
    return (
      <div>
        {this.createTable()}
      </div>
    )
  }
}