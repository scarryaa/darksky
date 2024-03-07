import React, { useContext, useEffect, useMemo } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { AppBskyFeedDefs, AppBskyFeedPost, RichText } from '@atproto/api';
import { agent } from '../services/api';
import Text from './Text';
import Link from '../components/Link';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemeContext } from '../contexts/ThemeContext';
import { ago } from '../util/time';

type Props = {
    post: AppBskyFeedDefs.PostView;
}

const Post = ({ post }: Props) => {
    const { theme } = useContext(ThemeContext);
    const record = useMemo<AppBskyFeedPost.Record | undefined>(
        () =>
            AppBskyFeedPost.isRecord(post.record) &&
                AppBskyFeedPost.validateRecord(post.record).success
                ? post.record
                : undefined,
        [post],
    );

    console.log(record);

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
        <Link link={`/profile/${post.author.did}/post/${post.cid}`}
            style={[styles.postContainer, {
                borderColor: theme.colors.border,
                paddingVertical: theme.spacing.small * 1.2,
                paddingHorizontal: theme.spacing.small * 1.5,
            }]}>
            {/* {isRepost ? <Text style={[styles.repostTag, theme.typography['sm-bold']]}>Reposted by {repostedBy}</Text> : <></>} */}
            <View style={styles.container}>
                <Image source={{ uri: post.author.avatar }} style={styles.avatar} />

                <View style={styles.postContent}>
                    <Text>
                        <Link link={''}>
                            <Text style={styles.displayName}>{post.author.displayName}</Text>
                            &nbsp;
                            <Text style={{ color: theme.colors.textGrey }}>@{post.author.handle}</Text>
                        </Link>
                        &nbsp;
                        <Text style={{ color: theme.colors.textGrey }}>·</Text>
                        &nbsp;
                        <Text style={[theme.typography.sm, { color: theme.colors.textGrey }]}>{ago(post.indexedAt)}</Text>
                    </Text>
                    <Text style={[styles.content, { marginBottom: theme.spacing.small, marginTop: theme.spacing.small / 8 }]}>{rt.text}</Text>
                    <View style={styles.actionButtons}>
                        <View style={styles.actionButton}>
                            <Ionicons
                                backgroundColor="transparent"
                                name={'chatbubble-outline'}
                                size={16}
                                color={theme.colors.textDarkGrey}
                            />
                            <Text style={[
                                { color: theme.colors.textDarkGrey },
                                { marginLeft: theme.spacing.small },
                                theme.typography.lg
                            ]}>{post.replyCount}</Text>
                        </View>
                        <View style={styles.actionButton}>
                            <Ionicons
                                backgroundColor="transparent"
                                name={'repeat-outline'}
                                size={20}
                                color={theme.colors.textDarkGrey}
                            />
                            <Text style={[
                                { color: theme.colors.textDarkGrey },
                                { marginLeft: theme.spacing.small },
                                theme.typography.lg
                            ]}>{post.repostCount}</Text>
                        </View>
                        <View style={styles.actionButton}>
                            <Ionicons
                                backgroundColor="transparent"
                                name={'heart-outline'}
                                size={16}
                                color={theme.colors.textDarkGrey}
                            />
                            <Text style={[
                                { color: theme.colors.textDarkGrey },
                                { marginLeft: theme.spacing.small },
                                theme.typography.lg
                            ]}>{post.likeCount}</Text>
                        </View>
                        <Ionicons
                            backgroundColor="transparent"
                            name={'ellipsis-horizontal'}
                            size={16}
                            color={theme.colors.textDarkGrey}
                        />
                    </View>
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
    actionButtons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 50,
        alignItems: 'center',
    },
    actionButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    }
});

export default Post;
