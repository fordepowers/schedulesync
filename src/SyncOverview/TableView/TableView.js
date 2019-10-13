import React from 'react';
import { Table } from 'react-bootstrap';

export default class TableView extends React.Component {

  constructor(props) {
    super(props);
  }

  createTable = () => {
    console.log('THIS IS PROPS: ')
    console.dir(this.props);
    if (!this.props.data.rawData || !this.props.data.datasets[0]) {
      return;
    }

    
    let rawDataKeys = Object.keys(this.props.data.rawData);
    
    return this.props.data.datasets[0].data.map((item, index) => {
      console.log('THIS IS INDEX: ' + index);
      if (item > 0) {
        return (
          <div>
            <Table striped hovered key={index}>
              <thead>
                <th>{this.props.data.labels[index]}</th>
              </thead>
              <tbody>
                {rawDataKeys.map(key => {
                  let user = this.props.data.rawData[key];

                  if (user.time.time[index].active == true) {
                    return (
                      <tr>
                      <td>{user.time.name}</td>
                        </tr>
                    )
                  }
                })}                
              </tbody>
            </Table>
          </div>
        )
      }
    });
  }
  render() {
    return (
      <div>
        {this.createTable()}
      </div>
    )
  }
}