import Votes from "./Votes";
import VoteButton from "./VoteButton";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";

const VotesArea = ({ postId, postOwner }) => {
  return (
    <div>
      {/* <VoteButton postId={postId} postOwner={postOwner} direction={true} />
      <VoteButton postId={postId} postOwner={postOwner} direction={false} /> */}
      {/* <CaretUpOutlined /> */}
      <IconThumbUp />
      <Votes postId={postId} />
      <IconThumbDown />
      {/* <CaretDownOutlined /> */}
    </div>
  );
};

export default VotesArea;

const IconThumbUp = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-thumb-up"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    strokeWidth={1}
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3"></path>
  </svg>
);

const IconThumbDown = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-thumb-down"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    stroke-width={1}
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3"></path>
  </svg>
);
