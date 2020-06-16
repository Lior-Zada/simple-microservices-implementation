import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

export default () => {
    const [posts, setPosts] = useState({});

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = async () => {
        await axios
            .get('http://posts.com/posts')
            .then(({ data }) => setPosts(data));
    };

    const getRenderedPosts = () => {
        // Object.values extracts the values from an object into an array
        return Object.values(posts).map((post) => {
            return (
                <div
                    className='card'
                    style={{ width: '30%', marginBottom: '20px' }}
                    key={post.id}
                >
                    <div className='card-body'>
                        <h3>{post.title}</h3>
                        <CommentCreate postId={post.id} />
                    </div>

                    <div className='card-footer'>
                        <h4>Comments</h4>
                        <CommentList comments={post.comments} />
                    </div>
                </div>
            );
        });
    };

    return (
        <div>
            <h1>Post list</h1>
            <div className='d-flex flex-row flex-wrap justify-content-between'>
                {getRenderedPosts()}
            </div>
        </div>
    );
};
