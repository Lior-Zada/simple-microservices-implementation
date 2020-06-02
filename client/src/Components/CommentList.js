import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Comment from './Comment';

export default ({ postId }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        getComments();
    }, []);

    const getComments = async () => {
        await axios
            .get(`http://localhost:4001/posts/${postId}/comments`)
            .then(({ data }) => setComments(data));
    };

    return comments.map((comment) => <Comment key={comment.id} comment={comment} />);
};
