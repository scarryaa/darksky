import { View, StyleSheet } from "react-native";
import BookmarkButton from "./BookmarkButton";
import LikeButton from "./LikeButton";
import ReplyButton from "./ReplyButton";
import RepostButton from "./RepostButton";
import MoreButton from "./MoreButton";
import { AppBskyFeedDefs } from "@atproto/api";
import React, { useContext } from "react";
import { bookmarkPost, likePost, repostPost, unbookmarkPost, unlikePost, unrepostPost } from "../../../../state/queries/post";
import { ThemeContext } from "../../../../contexts/ThemeContext";

type PostControlsProps = {
    big: boolean;
    post: AppBskyFeedDefs.PostView;
};

const PostControls = ({ big, post }: PostControlsProps) => {
    const { theme } = useContext(ThemeContext);

    const onLike = React.useCallback(async () => {
        try {
            if (!post.viewer.like) {
                await likePost(post);
            } else {
                await unlikePost(post);
            }
        } catch (e: any) {
            if (e?.name !== 'AbortError') {
                throw e;
            }
        }
    }, [post.viewer?.like, likePost, unlikePost]);

    const onRepost = React.useCallback(async () => {
        try {
            if (!post.viewer.repost) {
                await repostPost(post);
            } else {
                await unrepostPost(post);
            }
        } catch (e: any) {
            if (e?.name !== 'AbortError') {
                throw e;
            }
        }
    }, [post.viewer?.repost, repostPost, unrepostPost]);

    const onBookmark = React.useCallback(async () => {
        try {
            if (true) {
                await bookmarkPost(post);
            } else {
                await unbookmarkPost(post);
            }
        } catch (e: any) {
            if (e?.name !== 'AbortError') {
                throw e;
            }
        }
    }, []);

    return (
        <View style={[styles.actionButtons, big ? { marginHorizontal: theme.spacing.sm } : {}]}>
            <ReplyButton big={big} onReply={() => { }} replyCount={post.replyCount} />
            <RepostButton big={big} onRepost={onRepost} repostCount={post.repostCount} reposted={!!post.viewer.repost} />
            <LikeButton big={big} onLike={onLike} likeCount={post.likeCount} liked={!!post.viewer.like} />
            <BookmarkButton big={big} onBookmark={onBookmark} />
            <MoreButton big={big} />
        </View>
    );
};

const styles = StyleSheet.create({
    actionButtons: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default PostControls;