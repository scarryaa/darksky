// Create a context to manage post data
import React, { createContext, useState } from 'react';
import { fetchTimeline } from '../api/api';
import { type PostView, type FeedViewPost } from '@atproto/api/dist/client/types/app/bsky/feed/defs';

export const PostContext = createContext({
  cachePost: function (postId: string, postData: PostView): void {
    throw new Error('Function not implemented.');
  },
  getPostFromCache: function (postId: string): PostView {
    throw new Error('Function not implemented.');
  },
  cacheReplyAuthor: function (replyAuthorDid: string, replyAuthorUsername: string): void {
    throw new Error('Function not implemented.');
  },
  getReplyAuthorFromCache: function (replyAuthorDid: string): string {
    throw new Error('Function not implemented.');
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
  const [replyAuthorCache, setReplyAuthorCache] = useState({});

  const cachePost = (postId, postData): void => {
    setPostCache(prevCache => ({
      ...prevCache,
      [postId]: postData
    }));
  };

  const cacheReplyAuthor = (replyAuthorDid: string, replyAuthorUsername: string): void => {
    setReplyAuthorCache(prevCache => ({
      ...prevCache,
      [replyAuthorDid]: replyAuthorUsername
    }));
  }

  const getPostFromCache = (postId): PostView => postCache[postId];
  const getReplyAuthorFromCache = (replyAuthorDid: string): string => replyAuthorCache[replyAuthorDid];

  return (
        <PostContext.Provider value={{ cachePost, getPostFromCache, cacheReplyAuthor, getReplyAuthorFromCache }}>
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
