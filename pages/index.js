import React, { useState, useEffect, useRef } from "react";
import { Alert, Button } from "react-bootstrap";

import { getStakedBalance, getRewardsStats } from "../web3/stakes";
import { getBalance as getBalanceLP } from "../web3/cake_lp";
import { getCurrentRewardPeriod } from "../web3/reward_phases";

import Header from "../components/Header";
import { Page, Center, CenterBottom } from "../components/Layout";
import { AlertDismissible } from "../components/AlertDismissible";
import StakeView from "../components/StakeView";

const IndexPage = () => {
  const [accountConnected, setAccountConnected] = useState(false);
  const [currentRewardPeriod, setCurrentRewardPeriod] = useState(undefined);
  const [state, setState] = useState({
    lpUnstaked: undefined,
    lpStaked: undefined,
    claimableRewards: undefined,
    rewardsPaid: undefined,
    rewardRate: undefined,
    totalRewardsPaid: undefined,
    error: undefined,
    info: undefined,
  });
  const headerRef = useRef();

  useEffect(() => {
    initializeEthereumConnection();
  }, []);

  const initializeEthereumConnection = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        setAccountConnected(accounts.length > 0);
        if (accounts.length > 0) {
          loadBalances();
        }

        // Add this check to ensure window.ethereum is not undefined
        if (window.ethereum.on) {
          window.ethereum.on("accountsChanged", (accounts) => {
            setAccountConnected(accounts.length > 0);
            if (accounts.length > 0) {
              loadBalances();
            }
          });
        }
      } catch (error) {
        console.error("Error initializing Ethereum connection:", error);
      }
    } else {
      // Inform the user that MetaMask or an Ethereum provider is not available
      console.error(
        "Ethereum provider (e.g., MetaMask) not found. Please install it to use this app."
      );
    }
  };

  const reload = () => {
    loadBalances();
  };

  const loadBalances = async () => {
    try {
      const period = await getCurrentRewardPeriod();
      setCurrentRewardPeriod(period);
      if (!period) return;

      const stakedBalance = await getStakedBalance();
      const balanceLP = await getBalanceLP();
      const info = await getRewardsStats();

      setState((prevState) => ({
        ...prevState,
        lpStaked: stakedBalance,
        lpUnstaked: balanceLP.units,
        ...info,
      }));
    } catch (error) {
      setState((prevState) => ({ ...prevState, error: error.message }));
    }
  };

  const handleSuccess = (result) => {
    headerRef.current.reload();
    reload();
    setState((prevState) => ({
      ...prevState,
      info: {
        title: "Success!",
        detail: result,
      },
    }));
  };

  const handleError = (error, message) => {
    const errorMessage =
      message || (error && error.message) || `An error occurred (${error})`;
    setState((prevState) => ({ ...prevState, error: errorMessage }));
  };

  if (!accountConnected) {
    return (
      <Page>
        <Header
          ref={headerRef}
          reload={reload}
          setAccountConnected={setAccountConnected}
        />
        <Center>
          <Alert variant="info" style={{ textAlign: "center" }}>
            Please connect a Metamask Wallet account to use the dapp!
          </Alert>
        </Center>
      </Page>
    );
  }

  return (
    <Page>
      <Header
        ref={headerRef}
        reload={reload}
        setAccountConnected={setAccountConnected}
      />
      <Center>
        <div className="w-100 divisor"></div>
        <h1 className="text-center-top">$PTP LP STAKING</h1>
        <p className="text-center-top2">
          $PTP LP STAKING allows you to stake your V2 LP tokens (PulseX V2) to
          earn more $PTP rewards
        </p>
        <p className="text-center-top2">
          The PulseX V2 LP token address for the $PTP/PLS pair is:
          0xb8efccb3fa5d4bc68524989173dc603e1acc0362
        </p>
      </Center>
      <Center>
        {state.error && (
          <AlertDismissible variant="danger" title="Error">
            {state.error.includes(
              "Cannot read properties of null (reading 'getCurrentRewardPeriodId')"
            )
              ? "Please connect to the PulseChain Blockchain Network"
              : state.error}
          </AlertDismissible>
        )}
        {state.info && (
          <AlertDismissible variant="info" title={state.info.title}>
            {state.info.detail}
          </AlertDismissible>
        )}

        {!currentRewardPeriod && (
          <Alert variant="info">No Active Reward Period.</Alert>
        )}

        {currentRewardPeriod && (
          <StakeView
            {...state}
            handleSuccess={handleSuccess}
            handleError={handleError}
            allowanceUpdated={() =>
              console.log(">>> handleAllowanceUpdated() -- TODO")
            }
            rewardPeriod={currentRewardPeriod}
          />
        )}
      </Center>

      <CenterBottom>
        <Button
          className="center-container"
          variant="secondary"
          onClick={() =>
            (window.location.href = "https://www.pulsetrailerpark.com/")
          } // Change the URL to the desired website
        >
          Go back to main Website
        </Button>
      </CenterBottom>
    </Page>
  );
};

export default IndexPage;
