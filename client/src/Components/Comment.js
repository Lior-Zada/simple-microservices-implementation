import React from 'react';

export default ({ comment: { content, status } }) => {
    const getColor = () => (['pending','rejected'].includes(status) ? 'red' : 'green');
    return <li style={{ color: getColor() }}>{content}</li>;
};
