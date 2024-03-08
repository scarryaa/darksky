import { AppBskyFeedDefs } from "@atproto/api"
import { agent } from "../../services/api";


export const likePost = async (post: AppBskyFeedDefs.PostView) => {
    await agent.like(post.uri, post.cid);
}

export const unlikePost = async (post: AppBskyFeedDefs.PostView) => {
    await agent.deleteLike(post.viewer.like);
}

export const repostPost = async (post: AppBskyFeedDefs.PostView) => {
    await agent.repost(post.uri, post.cid);
}

export const unrepostPost = async (post: AppBskyFeedDefs.PostView) => {
    await agent.deleteRepost(post.viewer.repost);
}

export const bookmarkPost = async (post: AppBskyFeedDefs.PostView) => {
    // for now, save posts to localstorage
    localStorage.setItem('saved-post', JSON.stringify(post));
}

export const unbookmarkPost = async (post: AppBskyFeedDefs.PostView) => {
    localStorage.removeItem('saved-post');
}