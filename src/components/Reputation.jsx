import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useState } from "react";
import { useMoralis} from "react-moralis";

const Reputation = ({categoryId}) => {
    const {Moralis} = useMoralis()
    const [reputationValue, setReputation] = useState()
    const { walletAddress, contractABI, contractAddress} = useMoralisDapp();
    const contractABIJson = JSON.parse(contractABI)

    const options = {
        contractAddress: contractAddress,
        functionName: "getReputation",
        abi: contractABIJson,
        params: {
          _address: walletAddress,
          _categoryID:
            categoryId
        }
      };
    
    const getReputation = async () => {
      await Moralis.enableWeb3();
      const result = await Moralis.executeFunction(options);
      setReputation(result);
    };

    getReputation()
    return (
        <>
            {reputationValue}
        </>
    )
}

export default Reputation
