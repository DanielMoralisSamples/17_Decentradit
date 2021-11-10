import { useWeb3ExecuteFunction } from "react-moralis";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useMoralisFile } from "react-moralis";
import { useState } from "react"


const AddPost = ({categoryId}) => {
    const { walletAddress, contractABI, contractAddress} = useMoralisDapp();
    const contractABIJson = JSON.parse(contractABI);    
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [options, setOptions] = useState("");
    const ipfsProcessor = useMoralisFile();
    const contractProcessor = useWeb3ExecuteFunction();
    
    //const { fetch } = useWeb3ExecuteFunction(options);

    const validateForm = () => {
        let result = !title || !content ? false: true;
        return result
    }

   const clearForm = () =>{
        setTitle('');
        setContent('');
    }

    async function addPost(post) {
        const contentUri = processContent(post); 
        const options = {
            contractAddress: contractAddress,
            functionName: "createPost",
            abi: contractABIJson,
            params: {
                _parentId: "0x91",
                _contentUri: contentUri,
                _categoryId: categoryId
            },
            }
        await contractProcessor.fetch(options)
        contractProcessor.fetch({
            onSuccess: () => console.log("success"),
            onError: (error) => console.error(error),
        });
    }

    const processContent = async (content) => {
        const ipfsResult = await ipfsProcessor.saveFile(
            "post.json",
            { base64: btoa(JSON.stringify(content)) },
            { saveIPFS: true}
        )
        return ipfsResult._ipfs;
    }

   const onSubmit = (e) =>{
        e.preventDefault()
        if (!validateForm()) {
          alert('Remember to add the title and content of your post')
          return
        }
        addPost({title, content})
        clearForm()
    }



    return (
    <form onSubmit={onSubmit}>
        <div className ="row">
            <div className="form-group">
                <input
                type="text"
                className="mb-2 mt-2 form-control"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                type='text'
                className="mb-2 form-control"
                placeholder="Post away"
                rows="5"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-dark ">Submit</button>
        </div>
    </form>
    )
}

export default AddPost
