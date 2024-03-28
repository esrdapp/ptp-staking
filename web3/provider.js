import Web3 from "web3";
import contract from "truffle-contract";

let web3Instance;

const getProvider = () => {
  if (typeof window !== "undefined" && window.ethereum) {
    console.log("Ethereum provider is available.");

    return window.ethereum;
  } else {
    console.error("Ethereum provider not found. Please install MetaMask!");
    return null;
  }
};

const createWeb3Instance = () => {
  if (web3Instance) return web3Instance; // Return existing instance if it's already created

  const provider = getProvider();
  if (!provider) {
    console.log("No Ethereum provider available.");
    return null;
  }
  web3Instance = new Web3(provider);
  return web3Instance;
};

// Initialize Web3 instance conditionally
web3Instance = createWeb3Instance();

if (web3Instance && web3Instance.eth && web3Instance.eth.currentProvider) {
  web3Instance.eth.currentProvider.setMaxListeners(110);
}
export const eth = web3Instance ? web3Instance.eth : null;
export const myWeb3 = web3Instance;

export const getInstance = async (artifact) => {
  if (!web3Instance) {
    console.error(
      "Web3 instance not available - cannot proceed with getting contract instance."
    );
    return null;
  }

  try {
    const contractObj = contract(artifact);
    contractObj.setProvider(web3Instance.currentProvider);

    if (typeof contractObj.currentProvider.sendAsync !== "function") {
      contractObj.currentProvider.sendAsync = function () {
        return contractObj.currentProvider.send.apply(
          contractObj.currentProvider,
          arguments
        );
      };
    }

    return await contractObj.deployed();
  } catch (error) {
    if (
      error.message.includes(
        "StakingRewardPool has not been deployed to detected network (network/artifact mismatch)"
      )
    ) {
      // Customize error message for the specific error case
      console.error("Wrong Network");
    } else {
      console.error("Failed to deploy contract:", error);
    }
    return null;
  }
};
