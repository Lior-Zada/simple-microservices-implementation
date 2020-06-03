import React from 'react';
import Comment from './Comment';

export default ({ comments }) => comments.map((comment) => <Comment key={comment.id} content={comment.content} />);
