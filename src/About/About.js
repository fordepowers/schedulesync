import React from 'react';
import './About.css';
import { Accordion, Card } from 'react-bootstrap';

function About() {
    return (
        <div className="About">
            <Accordion defaultActiveKey="0">
                <Card>
                    <Card.Header>
                        <Accordion.Toggle className="accordion-header" as={Card.Body} eventKey="0">
                            <h5>> About</h5>
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse className="accordion-collapse" eventKey="0">
                        <Card.Body>
                            <h6>Welcome to Schedule Sync!</h6>
                            This app was created as a part of the DubHacks event on October 13th, 2019.
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle className="accordion-header" as={Card.Body} eventKey="1">
                            <h5>> Tutorial</h5>
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse className="accordion-collapse" eventKey="1">
                        <Card.Body>Hello! I'm another body</Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    );
}

export default About;