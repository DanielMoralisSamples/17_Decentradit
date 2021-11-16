import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useMoralisQuery, useMoralis, } from "react-moralis";
import { useState } from "react";
import { useEffect } from "react";

const Reputation = ({categoryId}) => {
    const {Moralis} = useMoralis()
    const [reputationValue, setReputation] = useState()
    const { walletAddress, contractABI, contractAddress, selectedCategory} = useMoralisDapp();
    const contractABIJson = JSON.parse(contractABI)

    const { data: votes } = useMoralisQuery("Votes", (query) => query.equalTo("postOwner", walletAddress), [], {
      live: true,
    });

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
    
    useEffect(() => {
      if (!votes?.length) return 0;
  
      async function getReputation() {
        await Moralis.enableWeb3();
        const result = await Moralis.executeFunction(options);
        setReputation(result);
      }
  
      getReputation();
    }, [votes, walletAddress, categoryId]);
    
    
    return (
        <>
            {reputationValue}
        </>
    )
}

export default Reputation
