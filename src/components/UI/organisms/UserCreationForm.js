import { Form, Button, Row, Col } from "react-bootstrap";
import React, { useState } from "react";

const LoginUser = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitForm: function = (evt) => {
    evt.preventDefault();
    onSubmit({
      username: username,
      password: password,
    });
  };

  return (
    <Row>
      <Col className="mx-auto" xs={6}>
        <Form onSubmit={submitForm}>
          <Form.Group className="mb-3">
            <Form.Label>Create Username</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Create Password</Form.Label>
            <Form.Control
              type="PASSWORD"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Re-enter Password</Form.Label>
            <Form.Control
              type="PASSWORD"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={submitForm}>
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
};
export default LoginUser;
