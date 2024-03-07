import { View, StyleSheet } from "react-native";
import BookmarkButton from "./BookmarkButton";
import LikeButton from "./LikeButton";
import ReplyButton from "./ReplyButton";
import RepostButton from "./RepostButton";
import MoreButton from "./ShareButton";
import { AppBskyFeedDefs } from "@atproto/api";

type PostControlsProps = {
    big: boolean;
    post: AppBskyFeedDefs.PostView;
};

const PostControls = ({ big, post }: PostControlsProps) => {
    return (
        <View style={styles.actionButtons}>
            <ReplyButton big={big} onReply={() => { }} replyCount={post.replyCount} />
            <RepostButton big={big} onRepost={() => { }} repostCount={post.repostCount} />
            <LikeButton big={big} onLike={() => { }} likeCount={post.likeCount} />
            <BookmarkButton big={big} onBookmark={() => { }} />
            <MoreButton big={big} onMore={() => { }} />
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