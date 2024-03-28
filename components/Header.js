/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";

import {
  Container,
  Row,
  Col,
  Button,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { Flow } from "../components/Layout";

import { shortenAccount, getAccount } from "../web3/utils";

import { myWeb3 } from "../web3/provider";

import { getBalance as getBalanceCake } from "../web3/cake_lp";
import {
  getBalance as getBalanceETB,
  getAllowance as getAllowanceETB,
} from "../web3/etb";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleAccount = this.handleAccount.bind(this);
  }

  // componentDidMount() {
  //   this.reload();

  //   // Check if the Ethereum provider (MetaMask) is injected into the window object
  //   if (typeof window.ethereum !== "undefined") {
  //     // Now safe to use ethereum.on
  //     window.ethereum.on("chainChanged", (chainId) => {
  //       // Handle the new chain.
  //       // Correctly handling chain changes can be complicated.
  //       // We recommend reloading the page unless you have good reason not to.
  //       window.location.reload();
  //     });
  //   } else {
  //     // Optionally, handle the case where MetaMask is not installed
  //     console.log("MetaMask is not installed.");
  //   }
  // }

  componentDidMount() {
    this.reload();

    if (typeof window.ethereum !== "undefined") {
      // Safe to use ethereum.on
      window.ethereum.on("chainChanged", this.handleChainChanged);
    } else {
      console.log("MetaMask is not installed.");
    }
  }

  componentWillUnmount() {
    // Ensure to remove the event listener when the component unmounts
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.removeListener("chainChanged", this.handleChainChanged);
    }
  }

  handleChainChanged = (chainId) => {
    // Handle the chain change
    window.location.reload();
  };

  reloadPressed = async () => {
    this.reload();
    this.props.reload(); // reaload parent page
  };

  reload = async () => {
    await this.loadBlockInfo();
    await this.loadAccount();
    await this.loadBalance();
  };

  connect = () => {
    if (typeof window.ethereum !== "undefined") {
      ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          let account = accounts.length > 0 ? accounts[0] : undefined;
          this.reload();
          this.handleAccount(account);
        })
        .catch((error) => {
          console.error("Error during account request:", error);
        });
    } else {
      console.error("Ethereum provider (e.g., MetaMask) is not available.");
      // Optionally, provide feedback to the user that MetaMask is not installed
    }
  };

  handleAccount = (account) => {
    if (account) {
      this.setState({
        account: shortenAccount(account),
      });
      this.props.setAccountConnected(true);
    } else {
      this.setState({
        account: undefined,
      });
      this.props.setAccountConnected(false);
    }
  };

  loadAccount = () => {
    getAccount()
      .then((account) => {
        this.handleAccount(account);
      })
      .catch((error) => {
        this.setState({ error: error.message });
        this.props.setAccountConnected(false);
      });
  };

  loadBalance = () => {
    getBalanceETB()
      .then((data) => {
        this.setState({
          balanceETB: data.units,
        });
        return getBalanceCake();
      })
      .then((data) => {
        this.setState({
          balanceCake: data.units,
        });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  };

  loadBlockInfo = () => {
    if (!myWeb3 || !myWeb3.eth) {
      console.error("Web3 is not initialized or MetaMask is not installed.");
      // Optionally, handle this scenario appropriately, e.g., by setting a state variable
      // to show an error message or disable certain functionality in the UI.
      return;
    }

    myWeb3.eth
      .getBlock("latest")
      .then((block) => {
        this.setState({
          blockNumber: block.number,
          blockTimestamp: block.timestamp,
        });
      })
      .catch((error) => {
        console.error("Failed to load block info:", error);
        // Handle this error appropriately
      });
  };

  render() {
    const { balanceETB, balanceCake } = this.state;

    const blockNumber = this.state && this.state.blockNumber;
    const blockDate =
      this.state &&
      this.state.blockTimestamp &&
      new Date(this.state.blockTimestamp * 1000);
    const blockDateFormatted =
      (blockDate &&
        `${blockDate.toLocaleDateString()} @ ${blockDate.toLocaleTimeString()}`) ||
      "-";
    const account = this.state && this.state.account;

    return (
      <div className="header">
        <Container fluid>
          <Row>
            <Col>
              <Flow>
                <div>
                  <img src="/logo.webp" alt="logo" width="50" height="50" />
                </div>

                <div>
                  {balanceETB !== undefined && (
                    <h5 className="m-2"> {balanceETB} $PTP</h5>
                  )}
                </div>
                <div>
                  {balanceCake !== undefined && (
                    <h5 className="m-2"> {balanceCake} PulseX-LP </h5>
                  )}
                </div>
              </Flow>
            </Col>

            <Col xs className="text-end">
              Connected Wallet: &nbsp;
              {account ? (
                <DropdownButton
                  id="menu"
                  variant="outline-primary"
                  title={account}
                >
                  <Dropdown.Item eventKey="1" disabled>
                    Block Info
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item eventKey="2" disabled>
                    Block Number: {blockNumber}{" "}
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="3" disabled>
                    date: {blockDateFormatted}
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item eventKey="4" onClick={this.reloadPressed}>
                    Reload
                  </Dropdown.Item>
                </DropdownButton>
              ) : (
                // Move the check inside the onClick event handler to ensure it's only executed client-side
                <Button
                  name="connect"
                  variant="primary"
                  onClick={() =>
                    typeof window !== "undefined" && window.ethereum
                      ? this.connect()
                      : alert("MetaMask is not installed.")
                  }
                >
                  Connect Wallet
                </Button>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
