import { useMoralisQuery, useWeb3ExecuteFunction } from "react-moralis";
import { useState, useEffect, createElement } from "react";
import Blockie from "components/Blockie";
import VotesArea from "./VotesArea";
import { Comment, Tooltip, Avatar, message, Divider } from "antd";
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import glStyles from "components/gstyles";

const Post = ({ post }) => {
  const { contentId, postId, postOwner } = post;
  const [postVotes, setPostVotes] = useState("0");
  const [voteStatus, setVoteStatus] = useState();
  //const [dataFetched, setDataFetched] = useState(false);
  console.log("postpostpost", post);
  /**From vote */

  const { walletAddress, contractABI, contractAddress } = useMoralisDapp();
  const contractABIJson = JSON.parse(contractABI);
  const contractProcessor = useWeb3ExecuteFunction();

  const { data: votes } = useMoralisQuery("Votes", (query) => query.equalTo("postId", postId).limit(1), [], {
    live: true,
  });

  useEffect(() => {
    function getPostVotes() {
      const fetchedVote = JSON.parse(JSON.stringify(votes, ["postVotes"]));
      const postVotes = fetchedVote[0]["postVotes"];
      return postVotes;
    }
    if (votes.length > 0) {
      setPostVotes(getPostVotes());
    }
  }, [votes]);

  /** voteUp function */
  async function voteUp() {
    if (walletAddress.toLowerCase() !== postOwner.toLowerCase()) {
      const options = {
        contractAddress: contractAddress,
        functionName: "voteUp",
        abi: contractABIJson,
        params: {
          _postId: post["postId"],
          _reputationAdded: 1,
        },
      };
      await contractProcessor.fetch({
        params: options,
        onSuccess: () => console.log("success"),
        onError: (error) => console.error(error),
      });
    } else message.error("You cannot vote on your posts");
  }

  /** voteDown function */
  async function voteDown() {
    if (walletAddress.toLowerCase() !== postOwner.toLowerCase()) {
      const options = {
        contractAddress: contractAddress,
        functionName: "voteDown",
        abi: contractABIJson,
        params: {
          _postId: post["postId"],
          _reputationTaken: 1,
        },
      };
      await contractProcessor.fetch({
        params: options,
        onSuccess: () => console.log("success"),
        onError: (error) => console.error(error),
      });
    } else message.error("You cannot vote on your posts");
  }

  /**From vote */

  //

  const actions = [
    <Tooltip key="comment-basic-like" title="Vote Up">
      <span style={{ fontSize: "15px", display: "flex", alignItems: "center" }} onClick={() => voteUp()}>
        {createElement(voteStatus === "liked" ? LikeFilled : LikeOutlined)} Vote Up
      </span>
    </Tooltip>,
    <span style={{ fontSize: "15px" }}>{postVotes}</span>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span style={{ fontSize: "15px", display: "flex", alignItems: "center" }} onClick={() => voteDown()}>
        {createElement(voteStatus === "disliked" ? DislikeFilled : DislikeOutlined)} Vote Down
      </span>
    </Tooltip>,
  ];
  //
  const [postContent, setPosContent] = useState({ title: "default", content: "default" });

  const { data } = useMoralisQuery("Content", (query) => query.equalTo("contentId", contentId));

  useEffect(() => {
    function extractUri(data) {
      const fetchedContent = JSON.parse(JSON.stringify(data, ["contentUri"]));
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
  }, [data]);

  const loading = "";

  const result = (
    // <Card>
    //   <div className="row">
    //     <VotesArea postId={post["postId"]} postOwner={post["postOwner"]} />
    //     <div className="col-lg-10">
    //       <div className="row">
    //         <div className="col-lg-10">
    //           <h4 className="mb-1">{postContent["title"]}</h4>
    //         </div>
    //         <div className="col-lg-2">
    //           <Blockie address={post["postOwner"]} size="7" scale="5" />
    //         </div>
    //       </div>
    //       <p className="mt-1 mb-1">{postContent["content"]}</p>
    //     </div>
    //   </div>
    // </Card>
    // <div style={glStyles.card}>
    <Comment
      style={{ ...glStyles.card, padding: "0px 15px", marginBottom: "10px" }}
      actions={actions}
      author={<Text strong>{post["postOwner"]}</Text>}
      avatar={<Avatar src={<Blockie address={post["postOwner"]} scale="4" />}></Avatar>}
      content={
        <>
          <Text strong style={{ fontSize: "20px", color: "#333" }}>
            {postContent["title"]}
          </Text>
          <p style={{ fontSize: "15px", color: "#111" }}>{postContent["content"]}</p>
          <Divider style={{ margin: "15px 0" }} />
        </>
      }
    />
    // </div>
  );

  return postContent["title"] === "default" ? loading : result;
};

export default Post;
