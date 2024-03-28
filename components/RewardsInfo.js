/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { Form, Container, Row, Col } from "react-bootstrap";

const RewardInfo = ({ rewardRate, totalRewardsPaid }) => (
  <Container className="border border-primary">
    <Form.Group as={Row} controlId="rewardRate">
      <Form.Label column style={{ minWidth: 250 }} className="text-start">
        Rewards Rate
      </Form.Label>
      <Col />
      <Form.Label column style={{ minWidth: 200 }} className="text-end">
        {rewardRate * 60 * 60 * 24} $PTP / day
      </Form.Label>
    </Form.Group>
    <Form.Group as={Row} controlId="totalRewardsPaid">
      <Form.Label column style={{ minWidth: 250 }} className="text-start">
        Total Rewards Paid
      </Form.Label>
      <Col />
      <Form.Label column style={{ minWidth: 200 }} className="text-end">
        {totalRewardsPaid} $PTP
      </Form.Label>
    </Form.Group>
  </Container>
);

export default RewardInfo;
