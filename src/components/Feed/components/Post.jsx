import React from 'react'

const Post = ({post, actionFunction}) => {
    return (
    <div className="list-group-item list-group-item-action flex-column align-items-start">
        <div className="row">
            <div className="col-lg-2">
                <div className="row mb-2">
                    <button className = "btn btn-primary">⬆</button>
                </div>
                <div className="row mb-2">
                    <div className="bg-light text-primary text-center">
                        Votes 9
                    </div>
                </div>
                <div className="row">
                    <button className = "btn btn-secondary">⬇</button>
                </div>
            </div>
            <div className="col-lg-10">
                <h4 className ="mb-1">{post["title"]}</h4>
                <p className ="mb-1">{post["content"]}</p>
            </div>
        </div>
    </div>
    )
}

export default Post
