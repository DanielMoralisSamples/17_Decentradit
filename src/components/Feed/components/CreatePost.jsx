import { useState } from "react";

import { useWeb3ExecuteFunction } from "react-moralis";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";

const CreatePost = ({categoryId, post, validateFunc, cleanFunc}) => {
    const { walletAddress, contractABI, contractAddress} = useMoralisDapp();
   
    const contractABIJson = JSON.parse(contractABI);    
    const [contentUri, setContentUri] = useState("");

    

    const options = {
        contractAddress,
        functionName: "createPost",
        abi: contractABIJson,
        params: {
            _parentId: "0x91",
            _contentUri:
            "https://ipfs.moralis.io:2053/ipfs/QmQu6FgxYwhF9ugQHFNVSuFT462hmkXNfFp7XJUzx2L7Ju",
            _categoryId:
            "0x1bd90f8c72ab4cd7073d12a01d256980dcab0a6f7e9b9083fbe0d943c7fd1585",
        },
        };

    async function processContent(content){
        const ipfsResult = await ipfsProcessor.saveFile(
            "post.json",
            { base64: btoa(JSON.stringify(content)) },
            { saveIPFS: true}
        )
        return ipfsProcessor.moralisFile;
    }
    

    
   
    

    const { fetch } = useWeb3ExecuteFunction(options);

    const run = () => {
    fetch({
        onSuccess: () => console.log("success"),
        onError: (error) => console.error(error),
    });
    };

    return (
    <>
        <button type="submit" className="btn btn-dark ">Submit</button>
    </>
    );
};

export default CreatePost;