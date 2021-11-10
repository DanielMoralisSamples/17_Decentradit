import { useMoralisQuery } from "react-moralis"
import Post from "./Post";

const Posts = ({categoryId}) => {
    /*const { data, error, isLoading } = useMoralisQuery(
        "Posts",
        query => 
        query
            .equalTo("categoryId",categoryId));*/
    
    //const fetchedPost = JSON.parse(JSON.stringify(data,["postId", "postOwner","contentId","parentId"]));
    const mockedPosts = [
                    {"postId":"12890121", "votes":"2","title":"This is Post 1","content":"Bacon ipsum dolor amet biltong cupim short loin hamburger rump. Drumstick strip steak shank, pig buffalo tail bacon. Pork frankfurter salami boudin strip steak sirloin. Ground round drumstick jowl boudin pancetta. Bresaola shankle picanha chicken, pork loin sirloin corned beef cow pork chop brisket pork belly frankfurter chuck short loin meatball. Beef ribs jowl pork chop shank drumstick."},
                    {"postId":"18239123", "votes":"6","title":"This is Post 2","content":"Short ribs cow prosciutto tail fatback. Filet mignon chicken ham shoulder. Meatloaf flank shankle, bacon t-bone brisket salami. Leberkas chuck pork chop pancetta landjaeger biltong chicken tenderloin. Leberkas meatloaf shoulder doner, strip steak landjaeger venison sirloin drumstick pork belly cupim bresaola shank ground round salami. Pancetta andouille flank shoulder, porchetta meatloaf pork chop jerky boudin short loin landjaeger fatback short ribs."}]

    const havePosts = mockedPosts.length > 0 ? true: false; 
    let result = "";
    
    function voteFunction(direction) {

    }

    if (havePosts) { 
        result = 
            <div className="mt-4 list-group">
                {mockedPosts.map((post) => (
                    <Post key={post["postId"]} post={post} onClickFunc={voteFunction}/>
                ))}
            </div>
        
    } 
    else{
        result =  
            <div>
                <h3>Be the first to post here for</h3>
                <h3>category ID {categoryId} </h3>
            </div>
    }
    return result
}

export default Posts
