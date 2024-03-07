import { useContext, useMemo } from "react";
import { View, StyleSheet, Image } from "react-native";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { AppBskyFeedDefs, AppBskyFeedPost, RichText } from "@atproto/api";
import Text from "../../Text";
import Link from "../../Link";
import { ago, agoLong } from "../../../util/time";
import ReplyButton from "./controls/ReplyButton";
import RepostButton from "./controls/RepostButton";
import LikeButton from "./controls/LikeButton";
import MoreButton from "./controls/ShareButton";
import BookmarkButton from "./controls/BookmarkButton";

type Props = {
    post: AppBskyFeedDefs.PostView;
}

const PostDetail = ({ post }: Props) => {
    const { theme } = useContext(ThemeContext);

    const record = useMemo<AppBskyFeedPost.Record | undefined>(
        () =>
            AppBskyFeedPost.isRecord(post.record) &&
                AppBskyFeedPost.validateRecord(post.record).success
                ? post.record
                : undefined,
        [post],
    );

    const rt = useMemo(
        () =>
            record
                ? new RichText({
                    text: record.text,
                    facets: record.facets,
                })
                : undefined,
        [record],
    );

    return (
        <View style={[styles.postContainer, {
            borderColor: theme.colors.border,
            paddingVertical: theme.spacing.small * 1.5,
            paddingHorizontal: theme.spacing.small * 2
        }]}>
            <View style={styles.postInner}>
                <Image source={{ uri: post.author.avatar }} style={[styles.avatar, { marginRight: theme.spacing.small }]} />
                <View style={styles.authorInfo}>
                    <Link hoverUnderline={true} link={''}>
                        <Text style={styles.displayName}>{post.author.displayName}</Text>
                    </Link>
                    <Link hoverUnderline={true} link={''}>
                        <Text style={{ color: theme.colors.textGrey }}>@{post.author.handle}</Text>
                    </Link>
                </View>
            </View>
            {/* TODO refactor this so we dont need to do RT twice */}
            <Text style={[styles.content, { marginBottom: theme.spacing.medium, marginTop: theme.spacing.small }]}>{rt.text}</Text>
            <Text style={[{ color: theme.colors.textGrey }, theme.typography.md, { marginBottom: theme.spacing.medium }]}>
                {agoLong(post.indexedAt)}
            </Text>
            <View style={[styles.likeContainer, {
                borderTopColor: theme.colors.border,
                borderBottomColor: theme.colors.border,
                paddingVertical: theme.spacing.small,
                paddingHorizontal: theme.spacing.small,
            }]}>
                <View style={[styles.likeText, { gap: theme.spacing.small / 1.25 }, theme.typography.md]}>
                    <Text style={theme.typography["md-bold"]}>{post.likeCount}</Text> <Text style={{ color: theme.colors.textGrey }}>likes</Text>
                </View>
            </View>
            <View style={[styles.postControls, { marginTop: theme.spacing.medium, marginHorizontal: theme.spacing.small }]}>
                <ReplyButton big={true} onReply={() => { }} replyCount={post.replyCount} />
                <RepostButton big={true} onRepost={() => { }} repostCount={post.repostCount} />
                <LikeButton big={true} onLike={() => { }} likeCount={post.likeCount} />
                <BookmarkButton big={true} onBookmark={() => { }} bookmarked={false} />
                <MoreButton big={true} onMore={() => { }} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    postContainer: {
        borderBottomWidth: 1,
        display: 'flex',
        flexDirection: 'column'
    },
    postInner: {
        display: 'flex',
        flexDirection: 'row',
    },
    displayName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    content: {
        fontSize: 20,
    },
    authorInfo: {
        display: 'flex',
        flexDirection: 'column'
    },
    avatar: {
        width: 45,
        height: 45,
        borderRadius: 50,
    },
    likeContainer: {
        borderBottomWidth: 1,
        borderTopWidth: 1,
    },
    likeText: {
        display: 'flex',
        flexDirection: 'row',
    },
    postControls: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexShrink: 0,
        flex: 1,
    },
});

export default PostDetail;