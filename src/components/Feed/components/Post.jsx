import { useMoralisQuery } from "react-moralis"
import { useState, useEffect } from "react";
import Blockie from "components/Blockie"
import VotesArea from "./VotesArea";

const Post = ({post}) => {
    //const [dataFetched, setDataFetched] = useState(false);
    const [postContent, setPosContent] = useState({title:"default", content:"default"});

    const {data} = useMoralisQuery(
        "Content",
        query => 
        query
            .equalTo("contentId",post["contentId"])); 
    
    useEffect(() => {
        function extractUri(data){
            const fetchedContent = JSON.parse(JSON.stringify(data,["contentUri"]));
            const contentUri = fetchedContent[0]["contentUri"]; 
            return contentUri;
        }
        async function fetchIPFSDoc(ipfsHash) {
            const url = ipfsHash;
            const response = await fetch(url);
            return await response.json();
        }
        async function processContent() {
            const content = await fetchIPFSDoc(extractUri(data));
            setPosContent(content);
        }
        if (data.length > 0) {
            processContent();
        }
    },[data])

    const loading = ""
    
    const result = <div className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="row">
                        <VotesArea postId={post["postId"]} postOwner={post["postOwner"]}/>
                        <div className="col-lg-10">
                            <div className="row">
                                <div className="col-lg-10">
                                    <h4 className ="mb-1">{postContent["title"]}</h4>
                                </div>
                                <div className="col-lg-2">
                                    <Blockie address={post["postOwner"]} size="7" scale="5"/>
                                </div>
                            </div>
                            <p className ="mt-1 mb-1">{postContent["content"]}</p>
                        </div>
                    </div>
                </div>

    return (
        postContent["title"] === "default" ? loading: result
    )
}

export default Post
