// Create a context to manage post data
import React, { createContext, useState } from 'react';

export const PostContext = createContext({ cachePost: (postId, postData) => { }, getPostFromCache: (postId): any => { } });

export const PostProvider = ({ children }) => {
    const [postCache, setPostCache] = useState({});

    const cachePost = (postId, postData) => {
        setPostCache(prevCache => ({
            ...prevCache,
            [postId]: postData,
        }));
    };

    const getPostFromCache = postId => postCache[postId];

    return (
        <PostContext.Provider value={{ cachePost, getPostFromCache }}>
            {children}
        </PostContext.Provider>
    );
};
