import React, { useState } from 'react';
import axios from 'axios';

export default () => {
    const [title, setTitle] = useState('');

    const submitForm = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:4000/posts', { title });
        setTitle('');
    };

    return (
        <div>
            <h1>Create Post</h1>
            <form onSubmit={submitForm}>
                <div className='form-group'>
                    <label htmlFor='title'>Title</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type='text'
                        id='title'
                        className='form-control'
                    />
                </div>
                <button type='submit' className='btn btn-primary'>
                    Submit
                </button>
            </form>
        </div>
    );
};
