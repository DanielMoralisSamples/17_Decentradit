import { useMoralisQuery } from "react-moralis"
import { useState } from "react"
import { useEffect } from "react"


const Votes = ({postId}) => {
    const [postVotes, setPostVotes] = useState("0")
    
    const {data} = useMoralisQuery(
        "Votes",
        query => 
        query
            .equalTo("postId",postId)
            .limit(1),[],{live:true});
    
    useEffect(()=> {
        function getPostVotes(){
            const fetchedVote = JSON.parse(JSON.stringify(data,["postVotes"]));
            const postVotes = fetchedVote[0]["postVotes"];
            return postVotes;
        }
        if (data.length > 0) {
            setPostVotes(getPostVotes());
        }
    },[data])

    

    return (
        <>Votes {postVotes} </>
    )
}

export default Votes
