import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button, Card, Col, Row } from "react-bootstrap";
import axios from "axios";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      // This api url? <--------------------------------------
      .post("https://nixflix.herokuapp.com/login", {
        Username: username,
        Password: password,
      })
      .then((response) => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch((e) => {
        console.log("no such user");
      });

    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    // props.onLoggedIn(username);
  };
  return (
    <Row>
      <Col>
        <Card>
          <Card.Body>
            <Card.Title>Login</Card.Title>
            <Form>
              <Form.Group controlId="formUsername">
                <Form.Label>Username: </Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="username"
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password: </Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="password"
                />
              </Form.Group>

              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
