import Votes from "./Votes"
import VoteButton from "./VoteButton"

const VotesArea = ({postId, postOwner}) => {
    return (
        <div className="col-lg-2">
            <div className="row mb-2">
                <VoteButton postId={postId} postOwner={postOwner} direction={true}/>
            </div>
            <div className="row mb-2">
                <div className="bg-light text-primary text-center">
                    <Votes postId={postId}/>
                </div>
            </div>
            <div className="row">
                <VoteButton postId={postId} postOwner={postOwner} direction={false}/>
            </div>
        </div>
    )
}

export default VotesArea
