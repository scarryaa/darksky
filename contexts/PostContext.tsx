// Create a context to manage post data
import React, { createContext, useState } from 'react';
import { fetchTimeline } from '../api/api';
import { type PostView, type FeedViewPost } from '@atproto/api/dist/client/types/app/bsky/feed/defs';

export const PostContext = createContext({
  cachePost: function (_, __): void {
    throw new Error('Function not implemented.');
  },
  getPostFromCache: function (_): PostView {
    throw new Error('Function not implemented');
  }
});
export const PostsContext = createContext({
  timeline: [] as FeedViewPost[],
  refreshPosts: async function (): Promise<void> {
    throw new Error('Function not implemented.');
  }
});

interface PostProviderProps {
  children: React.ReactNode;
}
export const PostProvider = ({ children }: PostProviderProps): JSX.Element => {
  const [postCache, setPostCache] = useState({});

  const cachePost = (postId, postData): void => {
    setPostCache(prevCache => ({
      ...prevCache,
      [postId]: postData
    }));
  };

  const getPostFromCache = (postId): PostView => postCache[postId];

  return (
        <PostContext.Provider value={{ cachePost, getPostFromCache }}>
            {children}
        </PostContext.Provider>
  );
};

interface PostsProviderProps {
  children: React.ReactNode;
}
export const PostsProvider = ({ children }: PostsProviderProps): JSX.Element => {
  const [timeline, setTimeline] = useState([] as FeedViewPost[]);

  const refreshPosts = async (): Promise<void> => {
    try {
      const newPosts = await fetchTimeline();
      setTimeline(newPosts.data.feed);
    } catch (error) {
      console.error('Error refreshing posts:', error);
    }
  };

  return (
        <PostsContext.Provider value={{ timeline, refreshPosts }}>
            {children}
        </PostsContext.Provider>
  );
};
