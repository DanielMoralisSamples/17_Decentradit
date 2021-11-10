import Category from "./components/Category"

const Categories = ({categories, actionFunction}) => {

    return (
        <div className="col-lg-3">
            <h3 className="mb-3">Categories</h3>
            <div className="list-group">
                {categories.map((category) => (
                    <Category key={category["categoryId"]} category={category} onClickFunc={actionFunction}/>
                ))}
            </div>
        </div>
    )
}

export default Categories
