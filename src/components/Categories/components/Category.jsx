
const Category = ({category, onClickFunc}) => {

    return (
        <button type="button" className="list-group-item list-group-item-action list-group-item-primary font-weight-bold btn-lg" onClick={() => onClickFunc(category["categoryId"])}>{category["category"]}</button>
        )
}

export default Category