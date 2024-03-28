/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { Form, Container, Row, Col } from "react-bootstrap";

export default ({ title, value, symbol }) => (
  <div>
    <Container className="border border-primary">
      <Form.Group as={Row} controlId="lpTokenBalance">
        <Form.Label column style={{ minWidth: 200 }} className="text-start">
          {title}
        </Form.Label>
        <Col />
        <Form.Label column style={{ minWidth: 200 }} className="text-end">
          {value} {symbol}
        </Form.Label>
      </Form.Group>
    </Container>
  </div>
);
