import {useMoralisQuery } from "react-moralis";
import Categories from "components/Categories";
import Feed from "components/Feed";



function Main() {
  const queryCategories = useMoralisQuery("Categories")
  const fetchedCategories = JSON.parse(JSON.stringify(queryCategories.data,["categoryId", "category"]));

  return (
    <div id="main" className="container">
      <div className="row">
        <Categories categories = {fetchedCategories} />
        <Feed />
      </div>
    </div>
  );
}
export default Main;
