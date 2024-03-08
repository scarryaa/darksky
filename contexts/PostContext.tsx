// Create a context to manage post data
import React, { createContext, useState } from 'react';
import { fetchTimeline } from '../api/api';

export const PostContext = createContext({ cachePost: (postId, postData) => { }, getPostFromCache: (postId): any => { } });
export const PostsContext = React.createContext({ timeline: [], refreshPosts: () => { } });

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

export const PostsProvider = ({ children }) => {
    const [timeline, setTimeline] = useState([]);

    const refreshPosts = async () => {
        try {
            const newPosts = await fetchTimeline();
            setTimeline(newPosts.data.feed);
        } catch (error) {
            console.error("Error refreshing posts:", error);
        }
    };

    return (
        <PostsContext.Provider value={{ timeline, refreshPosts }}>
            {children}
        </PostsContext.Provider>
    );
};
