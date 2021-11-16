import {Form, Input, Button} from "antd"
const AppPost1 = () => {
    const {contractABI, contractAddress} = useMoralisDapp();
    const contractABIJson = JSON.parse(contractABI);    
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const ipfsProcessor = useMoralisFile();
    const contractProcessor = useWeb3ExecuteFunction();
    const {  Form, Input, Button } = antd;

    const validateForm = () => {
        let result = !title || !content ? false: true;
        return result
    }

   const clearForm = () =>{
        setTitle('');
        setContent('');
    }

    async function addPost(post) {
        const contentUri = await processContent(post); 
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
        await contractProcessor.fetch({params:options,
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
          //alert()
          return message.error('Remember to add the title and content of your post');
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

export default AppPost1
