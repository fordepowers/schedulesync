import React from 'react';
import './About.css';
import photo from './photo.jpg';
import { Accordion, Card } from 'react-bootstrap';

function About () {
  return (
    <div className='About'>
      <Accordion defaultActiveKey='0'>
        <Card>
          <Card.Body>
            <h3>About</h3>
            <br />
            <h5>Welcome to Schedule Sync!</h5>
                This app was created as a part of the DubHacks event on October 13th, 2019. We created this project in hope to bring communities and groups together by allowing them to plan events and get together easier with the ScheduleSync.
                ScheduleSync is a web-side client that allows users to see what time is most available for that group and allows them to plan accordingly using this data.
            </Card.Body>
        </Card>
      
        <Card>
          <Card.Header>
            <Accordion.Toggle className='accordion-header' as={Card.Body} eventKey='1'>
              <h5>Tutorial</h5>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse className='accordion-collapse' eventKey='1'>
            <Card.Body>
              <Card.Title>Form Creators</Card.Title>
              <p>
                If you are looking to see when a number of people are available on a given date you will want to use the create form tab to create a SyncForm, this is what you will be sending out to other
                people for them to fill out. On the create form page theres will be some options to change for the form. These options include the time span of the event and if its an all day event. There will be a calendar if you choose to select a further date.
                Once you create the form you will be redirected to the 'Overview' tab. On the 'Overview' tab at first there are 2 things you will see, one is a link for you to return to this overview tab, you don't want to lose this otherwise you will lose the data you are trying to collect,
                the second is a link that you will have to share with all the people you want to collect the data from, this data is sharable via two ways either a link that you can send to them or a QR code that sends them to the page.
                Once people start entering in their data you will be able to see graphs and charts of what times they are available on the overview.
              </p>
              <Card.Title>Form Users</Card.Title>
              <p>
                        If you are going to enter in data in someone else form you will first need a link or QR code provided by the creator and once you have that you will be brought to a page to input the times you are available,
                        At this page it will ask you to input your name and then ask you to input the times you are available at the time that the creator specifies
                        </p>
                        <br></br>
                        <br></br>
                        <br></br>

            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>

  );
}

export default About;
