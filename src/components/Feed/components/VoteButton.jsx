import React from "react";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useWeb3ExecuteFunction } from "react-moralis";

const VoteButton = ({ postId, postOwner, direction }) => {
  const text = direction ? "⬆" : "⬇";
  const className = direction ? "btn btn-primary" : "btn btn-secondary";
  const { walletAddress, contractABI, contractAddress } = useMoralisDapp();
  const contractABIJson = JSON.parse(contractABI);
  const contractProcessor = useWeb3ExecuteFunction();

  async function voteUp() {
    const options = {
      contractAddress: contractAddress,
      functionName: "voteUp",
      abi: contractABIJson,
      params: {
        _postId: postId,
        _reputationAdded: 1,
      },
    };
    await contractProcessor.fetch({
      params: options,
      onSuccess: () => console.log("success"),
      onError: (error) => console.error(error),
    });
  }

  const button =
    walletAddress === postOwner ? (
      <button disabled className={className}>
        {text}
      </button>
    ) : (
      <button className={className} onClick={voteUp}>
        {text}
      </button>
    );

  return button;
};

export default VoteButton;
