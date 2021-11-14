import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useMoralisQuery } from "react-moralis";
import Post from "./Post";

const Posts = () => {
  const { selectedCategory } = useMoralisDapp();

  const queryPost = useMoralisQuery(
    "Posts",
    (query) => query.equalTo("categoryId", selectedCategory["categoryId"]),
    [selectedCategory],
    { live: true }
  );

  const fetchedPosts = JSON.parse(JSON.stringify(queryPost.data, ["postId", "contentId", "postOwner"]));

  const havePosts = fetchedPosts.length > 0 ? true : false;

  const postResult = (
    <div className="mt-4 list-group">
      {fetchedPosts.map((post) => (
        <Post key={post["postId"]} post={post} />
      ))}
    </div>
  );

  const emptyResult = (
    <div>
      <h3>Be the first to post here for</h3>
      <h3>category ID {selectedCategory["categoryId"]} </h3>
    </div>
  );
  return havePosts ? postResult : emptyResult;
};

export default Posts;
