import React from 'react';
import PostCreate from './Components/PostCreate';
import PostList from './Components/PostList';

export default () => {
    return <div className="container">
        <PostCreate />
        <hr/>
        <PostList />
    </div>;
};