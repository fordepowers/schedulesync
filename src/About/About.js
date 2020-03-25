import React from 'react';
import './About.css';
import NavbarCustom from '../NavbarCustom/NavbarCustom';
import { Jumbotron, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class About extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <div className='About'>
        <NavbarCustom Text='Create New' Route='/create-new' />
        <Jumbotron className='jumbo'>
          <h3>Welcome to Schedule Sync!</h3>
          <hr />
          <p>This web app was created to allow users to see what time or day works best for a company, club, or any group of people. We built this as a part of <a href='https://www.dubhacks.co'>DubHacks</a> on October 13th, 2019.</p>
          <br />
          <div className='button-container'>
            <Link to='/tutorial'>
              <Button variant='outline-primary' size='lg' block>Tutorial</Button>
            </Link>
            <br />
            <Button variant='outline-dark' size='lg' block href='https://github.com/fordepowers/schedulesync' target='_blank'>GitHub</Button>
          </div>
        </Jumbotron>
      </div>
    );
  }
}

export default About;
