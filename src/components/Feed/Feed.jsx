import { useState } from 'react'
import { useMoralisFile } from 'react-moralis'
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useMoralis } from 'react-moralis';
import { useWeb3Contract } from 'hooks/useWeb3Contract';
import Posts from './components/Posts'
import Reputation from 'components/Reputation'
//import ReputationB from 'components/ReputationB';
import AddPost from './components/AddPost'

const Feed = ({selectedCategory, reputation}) => {
    const [showAddPost, setShowAddPost] = useState(false)
    
    function toogleShowAddPost() {
        setShowAddPost(!showAddPost);
    }
    
    let result = null
    if(selectedCategory==null){
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
