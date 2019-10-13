import React from 'react';
import './Thanks.css';
import NavbarCustom from '../NavbarCustom/NavbarCustom';
import { Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Thanks extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
    };
  }

  render () {
    return (
      <div>
        <NavbarCustom Text='Home' Route='/' />
        <Alert variant='success'>
          <Alert.Heading>Success!</Alert.Heading>
          <hr />
          <p>Thank you for submitting this form and contributing.</p>
          <Link to='/'>
            <Button variant='outline-success'>Home</Button>
          </Link>
        </Alert>
      </div>
    );
  }
}

export default Thanks;
