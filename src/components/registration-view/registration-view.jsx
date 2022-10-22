import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Form,
  Button,
  Card,
  CardGroup,
  Container,
  Col,
  Row,
} from "react-bootstrap";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios
        .post("https://nixflix.herokuapp.com/users", {
          username: username,
          password: password,
          email: email,
          Birthday: birthday,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          alert("Registration successful, please login");
          window.open("/", "_self"); // the second argument '_self' is necessary so that the page will open in the current tab
        })
        .catch((response) => {
          console.error(response);
          alert("Unable to register");
        });
    }
  };

  return (
    <Row>
      <Col>
        <CardGroup>
          <Card>
            <Card.Body>
              <Card.Title>Registration</Card.Title>
              <Form>
                <Form.Group>
                  <Form.Label>Username: </Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    placeholder="enter a username"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password: </Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="enter a password"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Email: </Form.Label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="enter an email"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label> Birthday: </Form.Label>
                  <Form.Control
                    type="birthday"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    placeholder="enter your birthday"
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  onClick={handleRegister}
                >
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </CardGroup>
      </Col>
    </Row>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    // Birthday: PropTypes.string.isRequired,
  }),
};
