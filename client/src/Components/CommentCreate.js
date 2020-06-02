import React, {useState} from 'react';
import axios from 'axios';

export default ({postId}) => {

    const [content, setContent] = useState('');

    const submitComment = async (e) =>  {
        e.preventDefault();
        await axios.post(`http://localhost:4001/posts/${postId}/comments`, {content})
        .then(({data}) => setContent(''));
    }

    return <div>
        <form onSubmit={submitComment}>
            <div className="form-group">
                <label htmlFor="commentInput">Comment</label>
                <input id="commentInput" className="form-control" type="text" onChange={(e) => setContent(e.target.value)} value={content} placeholder="Write a comment..." />
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
    </div>
}