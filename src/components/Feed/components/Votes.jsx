import { useMoralis, useMoralisQuery } from "react-moralis";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useState } from "react";
import { useEffect } from "react";

const Votes = ({ postId }) => {
  const {Moralis} = useMoralis()
  const { contractABI, contractAddress} = useMoralisDapp();
  const contractABIJson = JSON.parse(contractABI)
  const [postVotes, setPostVotes] = useState("0");

  const { data } = useMoralisQuery("Votes", (query) => query.equalTo("postId", postId), [], { live: true });

  const options = {
    contractAddress: contractAddress,
    functionName: "getPost",
    abi: contractABIJson,
    params: {
      _postId: postId
    }
  };

  useEffect(() => {
    async function getPostVotes() {
      await Moralis.enableWeb3();
      const result = await Moralis.executeFunction(options);
      setPostVotes(result[3]);
    }
    
    getPostVotes();
    
  }, [data]);

  return <>{postVotes} </>;
};

export default Votes;
