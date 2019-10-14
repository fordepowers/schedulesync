import React from 'react';
import './NotFound.css';
import NavbarCustom from '../NavbarCustom/NavbarCustom';
import { Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class NotFound extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
    };
  }

  render () {
    return (
      <div>
        <NavbarCustom Text='Home' Route='/' />
        <Alert variant='danger'>
          <Alert.Heading>404: Not Found</Alert.Heading>
          <hr />
          <p>Sorry, that URL doesn't appear to match anything.</p>
          <Link to='/'>
            <Button variant='outline-danger'>Home</Button>
          </Link>
        </Alert>
      </div>
    );
  }
}

export default NotFound;
