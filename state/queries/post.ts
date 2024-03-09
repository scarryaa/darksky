import { type AppBskyFeedDefs } from '@atproto/api'
import { agent } from '../../services/api';

export const likePost = async (post: AppBskyFeedDefs.PostView): Promise<void> => {
  await agent.like(post.uri, post.cid);
}

export const unlikePost = async (post: AppBskyFeedDefs.PostView): Promise<void> => {
  await agent.deleteLike(((post.viewer?.like) != null) ? post.viewer.like : '');
}

export const repostPost = async (post: AppBskyFeedDefs.PostView): Promise<void> => {
  await agent.repost(post.uri, post.cid);
}

export const unrepostPost = async (post: AppBskyFeedDefs.PostView): Promise<void> => {
  await agent.deleteRepost(((post.viewer?.repost) != null) ? post.viewer.repost : '');
}

export const bookmarkPost = async (post: AppBskyFeedDefs.PostView): Promise<void> => {
  // for now, save posts to localstorage
  localStorage.setItem('saved-post', JSON.stringify(post));
}

export const unbookmarkPost = async (post: AppBskyFeedDefs.PostView): Promise<void> => {
  localStorage.removeItem('saved-post');
}
