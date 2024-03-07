import React, { useContext, useEffect, useMemo } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { AppBskyFeedDefs, AppBskyFeedPost, RichText } from '@atproto/api';
import { agent } from '../../../services/api';
import Text from '../../Text';
import Link from '../../Link';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { ago } from '../../../util/time';
import BookmarkButton from './controls/BookmarkButton';
import LikeButton from './controls/LikeButton';
import ReplyButton from './controls/ReplyButton';
import RepostButton from './controls/RepostButton';
import MoreButton from './controls/ShareButton';
import PostControls from './controls/PostControls';

type Props = {
    post: AppBskyFeedDefs.PostView;
    reason: AppBskyFeedDefs.ReasonRepost | undefined;
}

const Post = ({ post, reason }: Props) => {
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

    useEffect(() => {
        const detectFacets = async () => {
            try {
                await rt.detectFacets(agent);
            } catch (error) {
                console.error('Error detecting facets:', error);
            }
        };

        detectFacets();
    }, [record.text]);

    return (
        <Link hoverUnderline={false} link={`/profile/${post.author.did}/post/${post.uri.split('/')[4]}`}
            style={[styles.postContainer, {
                borderColor: theme.colors.border,
                paddingVertical: theme.spacing.small * 1.2,
                paddingHorizontal: theme.spacing.small * 1.5,
            }]}>
            {AppBskyFeedDefs.isReasonRepost(reason) ? <Text style={[styles.repostTag, theme.typography['sm-bold']]}>Reposted by {reason.by.displayName || reason.by.handle}</Text> : <></>}
            <View style={styles.container}>
                <Image source={{ uri: post.author.avatar }} style={styles.avatar} />

                <View style={styles.postContent}>
                    <Text>
                        <Link hoverUnderline={true} link={''}>
                            <Text style={styles.displayName}>{post.author.displayName}</Text>
                            &nbsp;
                            <Text style={{ color: theme.colors.textGrey }}>@{post.author.handle}</Text>
                        </Link>
                        &nbsp;
                        <Text style={{ color: theme.colors.textGrey }}>·</Text>
                        &nbsp;
                        <Text style={[theme.typography.sm, { color: theme.colors.textGrey }]}>{ago(post.indexedAt)}</Text>
                    </Text>
                    <Text style={[styles.content, { marginBottom: theme.spacing.medium / 1.5, marginTop: theme.spacing.small / 8 }]}>{rt.text}</Text>
                    <PostControls big={false} post={post} />
                </View>
            </View>
        </Link >
    );
};

const styles = StyleSheet.create({
    postContainer: {
        borderTopWidth: 1,
    },
    repostTag: {
        paddingLeft: 62,
        fontWeight: 'bold',
        color: '#828282'
    },
    container: {
        flexDirection: 'row',
        display: 'flex',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 12,
    },
    postContent: {
        flex: 1,
        minWidth: 500,
    },
    usernameDisplayNameContainer: {
        display: 'flex',
        maxWidth: '100%',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        marginBottom: 4,
        alignItems: 'baseline',
    },
    displayName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    content: {
        fontSize: 16,
    },
});

export default Post;
