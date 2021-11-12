import { useState } from 'react'
import { useMoralisDapp } from 'providers/MoralisDappProvider/MoralisDappProvider'
import Posts from './components/Posts'
import Reputation from 'components/Reputation'
import AddPost from './components/AddPost'

const Feed = () => {
    const [showAddPost, setShowAddPost] = useState(false)
    const {selectedCategory} = useMoralisDapp()
    
    function toogleShowAddPost() {
        setShowAddPost(!showAddPost);
    }
    
    let result = null
    if(selectedCategory["category"]==="default"){
        result = (
            <div className="col-lg-9">
                <h3>Choose a Category</h3>
            </div>
            )
    }
    else{
        result = (
        <div className="col-lg-9"> 
            <div className="row">
                <div className="col-lg-9">
                    <h3>Your Reputation in {selectedCategory['category']} is <Reputation categoryId = {selectedCategory["categoryId"]}/></h3>
                </div>
                <div className="col-lg-3">
                    <button className="btn btn-dark align-right" onClick={toogleShowAddPost}>Post</button>
                </div>

            </div>
            {showAddPost ? <AddPost categoryId={selectedCategory['categoryId']}/>: ""}
            <Posts categoryId={selectedCategory['categoryId']}/>
            
        </div>
    )
    }
    return result;

}

export default Feed
