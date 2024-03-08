import { useContext, useMemo } from "react";
import { View, StyleSheet, Image, StyleProp, ViewStyle } from "react-native";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { AppBskyFeedDefs, AppBskyFeedPost, RichText } from "@atproto/api";
import Text from "../../Text";
import Link from "../../Link";
import { agoLong } from "../../../util/time";
import ReplyButton from "./controls/ReplyButton";
import RepostButton from "./controls/RepostButton";
import LikeButton from "./controls/LikeButton";
import MoreButton from "./controls/MoreButton";
import BookmarkButton from "./controls/BookmarkButton";
import PostControls from "./controls/PostControls";

type Props = {
    post: AppBskyFeedDefs.PostView;
    style?: StyleProp<ViewStyle>
}

const PostDetail = ({ post, style }: Props) => {
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
        <View style={[style, styles.postContainer, {
            borderColor: theme.colors.border,
            paddingVertical: theme.spacing.sm * 1.5,
            paddingHorizontal: theme.spacing.md
        }]}>
            <View style={styles.postInner}>
                {/* @ts-ignore */}
                <Image source={{ uri: post.author.avatar }} style={[styles.avatar, { marginRight: theme.spacing.small }]} />
                <View style={styles.authorInfo}>
                    <Link style={[{ color: theme.colors.text }]} hoverUnderline={true} link={`/profile/${post.author.did}`}>
                        <Text style={styles.displayName}>{post.author.displayName == '' ? post.author.handle : post.author.displayName}</Text>
                    </Link>
                    <Link style={[styles.authorHandle, { color: theme.colors.textGrey }]} hoverUnderline={true} link={`/profile/${post.author.did}`}>
                        <Text style={{ color: theme.colors.textGrey }}>@{post.author.handle}</Text>
                    </Link>
                </View>
            </View>
            {/* TODO refactor this so we dont need to do RT twice */}
            <Text style={[styles.content, { marginBottom: theme.spacing.md, marginTop: theme.spacing.sm }]}>{rt.text}</Text>
            <Text style={[{ color: theme.colors.textGrey }, theme.typography.md, { marginBottom: theme.spacing.md }]}>
                {agoLong(post.indexedAt)}
            </Text>
            {post.likeCount > 0 && <View style={[styles.likeContainer, {
                borderTopColor: theme.colors.border,
                borderBottomColor: theme.colors.border,
                paddingVertical: theme.spacing.sm,
                paddingHorizontal: theme.spacing.sm,
                marginBottom: theme.spacing.md,
            }]}>
                <View style={[styles.likeText, { gap: theme.spacing.sm / 1.25 }, theme.typography.md]}>
                    <Text style={theme.typography["md-bold"]}>{post.likeCount}</Text> <Text style={{ color: theme.colors.textGrey }}>like{post.likeCount > 1 ? 's' : ''}</Text>
                </View>
            </View>}
            <PostControls big={true} post={post} />
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
    authorHandle: {
        // @ts-ignore web only
        maxWidth: 'max-content'
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