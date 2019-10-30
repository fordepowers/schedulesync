import React from 'react';
import './Tutorial.css';
import NavbarCustom from '../../NavbarCustom/NavbarCustom';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

class Tutorial extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  handleAccordionClick (e) {
    if (e.target.className === 'accordion active') {
      e.target.className = 'accordion';
    } else if (e.target.className === 'accordion') {
      e.target.className = 'accordion active';
    }
    var panel = e.target.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  }

  render () {
    const tutorial = new Map();
    tutorial.set('Creating a New Form', "If you are looking to see when a number of people are available on a given date you will want to use the create form tab to create a SyncForm, this is what you will be sending out to other people for them to fill out. On the create form page theres will be some options to change for the form. These options include the time span of the event and if its an all day event. There will be a calendar if you choose to select a further date. Once you create the form you will be redirected to the 'Overview' tab. On the 'Overview' tab at first there are 2 things you will see, one is a link for you to return to this overview tab, you don't want to lose this otherwise you will lose the data you are trying to collect, the second is a link that you will have to share with all the people you want to collect the data from, this data is sharable via two ways either a link that you can send to them or a QR code that sends them to the page. Once people start entering in their data you will be able to see graphs and charts of what times they are available on the overview.");
    tutorial.set('Filling out a Form', 'If you are going to enter in data in someone else form you will first need a link or QR code provided by the creator and once you have that you will be brought to a page to input the times you are available, At this page it will ask you to input your name and then ask you to input the times you are available at the time that the creator specifies');
    tutorial.set('Using the Overview Page', 'This is just a test');
    const sections = [];

    tutorial.forEach((value, key) => {
      sections.push(
        <div className='section'>
          <div className='accordion' onClick={(e) => { this.handleAccordionClick(e); }}>
            {key}
          </div>
          <div className='panel'>
            {value}
            <hr />
          </div>
        </div>
      );
    });

    return (
      <div className='Guide'>
        <NavbarCustom Text='Create New' Route='/create-new' />
        <div className='top-heading'>
          <h1>Tutorial</h1>
          <h5>Click to expand sections</h5>
        </div>
        {sections}
        <div className='button-container'>
          <br />
          <Link to=''>
            <Button variant='outline-primary' size='lg' block>Home</Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Tutorial;
