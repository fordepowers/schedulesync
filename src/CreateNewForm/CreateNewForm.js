import React from 'react';
import './CreateNewForm.css';
import { Button, Form, Col } from 'react-bootstrap';


function CreateNewForm() {
    return (
        <div className="CreateNewForm">
            <Form>
                <Form.Group controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                        Email

                    </Form.Label>
                    <Col sm={10}>
                    </Col>
                </Form.Group>

                <Form.Group controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                        Password
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="password" placeholder="Password" />
                    </Col>
                </Form.Group>

                <Form.Group>
                    <Col sm={{ span: 10, offset: 2 }}>
                        <Button type="submit">Create</Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    );
}

export default CreateNewForm;