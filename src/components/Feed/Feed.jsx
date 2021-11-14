import { useState } from "react";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import Posts from "./components/Posts";
import Reputation from "components/Reputation";
import AddPost from "./components/AddPost";
import glStyles from "components/gstyles";
import Blockie from "components/Blockie";
import { Avatar } from "antd";

const Feed = () => {
  const [showAddPost, setShowAddPost] = useState(false);
  const { selectedCategory } = useMoralisDapp();

  function toogleShowAddPost() {
    setShowAddPost(!showAddPost);
  }

  let result = null;
  if (selectedCategory["category"] === "default") {
    result = (
      <div className="col-lg-9">
        <h3>Choose a Category</h3>
      </div>
    );
  } else {
    result = (
      <div className="col-lg-9">
        <div
          style={{
            ...glStyles.card,
            padding: "10px 13px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Avatar src={<Blockie currentWallet />} />

          <h4>
            Your Reputation in {selectedCategory["category"]} is{" "}
            <Reputation categoryId={selectedCategory["categoryId"]} />
          </h4>
          <button className="btn btn-dark align-right" onClick={toogleShowAddPost}>
            Post
          </button>
        </div>
        {showAddPost ? <AddPost categoryId={selectedCategory["categoryId"]} /> : ""}
        <Posts categoryId={selectedCategory["categoryId"]} />
      </div>
    );
  }
  return result;
};

export default Feed;
