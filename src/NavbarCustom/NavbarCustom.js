import React from 'react';
import './NavbarCustom.css';
import { Navbar, Button, Form } from 'react-bootstrap';
import logo from './logo.jpg';
import { Link } from 'react-router-dom';

function NavbarCustom ({ Text, Route }) {
  return (
    <div>
      <Navbar className='justify-content-between' bg='dark' variant='dark' sticky='top'>
        <Navbar.Brand>
          <img
            alt=''
            src={logo}
            height='30'
            width='30'
            className='d-inline-block align-top'
          />
          {' Schedule Sync'}
        </Navbar.Brand>
        <Form inline>
          <Link to={Route}>
            <Button className='button' type='submit'>{Text}</Button>
          </Link>
        </Form>
      </Navbar>
    </div>
  );
}

export default NavbarCustom;
