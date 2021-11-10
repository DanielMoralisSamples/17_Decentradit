import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useState } from "react";
import { useAPIContract } from "hooks/useAPIContract";

const ReputationB = ({ categoryId }) => {
  const [reputationValue, setReputation] = useState();
  const { chainId, walletAddress, contractABI, contractAddress } = useMoralisDapp();
  const contractABIJson = JSON.parse(contractABI);

  const { contractResponse, error, isLoading } = useAPIContract({
    chain: chainId,
    abi: contractABIJson,
    contractAddress: contractAddress,
    functionName: "getReputation",
    params: {
      _address: walletAddress,
      _categoryID: categoryId,
    },
  });

  console.log(contractResponse);

  return (
    <div>
      <>{contractResponse}</>
    </div>
  );
};

export default ReputationB

