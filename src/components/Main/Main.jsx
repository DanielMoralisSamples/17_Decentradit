import { useMoralis, useMoralisQuery } from "react-moralis";
import { useState } from "react";
import Categories from "components/Categories";
import Feed from "components/Feed";



function Main() {

  const { data} = useMoralisQuery("Categories");
  const fetchedCategories = JSON.parse(JSON.stringify(data,["categoryId", "category"]));
  const [selectedCategory, setSelectedCategory] = useState(null);

  function selectCategory (categoryId) {
    const selectedCategory = fetchedCategories.filter((category) => category["categoryId"] === categoryId);
    setSelectedCategory(selectedCategory[0]);
  }

  return (
    <div id="main" className="container">
      <div className="row">
        <Categories categories = {fetchedCategories} actionFunction = {selectCategory}/>
        <Feed selectedCategory={selectedCategory}/>
      </div>
    </div>
  );
}
export default Main;
