import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider"
import Category from "./components/Category"

const Categories = ({categories, actionFunction}) => {
    const {setSelectedCategory} = useMoralisDapp()

    function selectCategory (categoryId) {
        const selectedCategory = categories.filter((category) => category["categoryId"] === categoryId);
        setSelectedCategory(selectedCategory[0]);
    }

    return (
        <div className="col-lg-3">
            <h3 className="mb-3">Categories</h3>
            <div className="list-group">
                {categories.map((category) => (
                    <Category key={category["categoryId"]} category={category} onClickFunc={selectCategory}/>
                ))}
            </div>
        </div>
    )
}

export default Categories
