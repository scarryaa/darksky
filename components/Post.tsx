import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { AppBskyRichtextFacet, RichText } from '@atproto/api';
import { agent } from '../services/api';
import Text from './Text';
import Link from '../components/Link';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemeContext } from '../contexts/ThemeContext';

const Post = ({ displayName, username, content, timestamp, avatar, isRepost, repostedBy }) => {
    const { theme } = useContext(ThemeContext);

    const rt = new RichText({
        text: content,
    });

    let markdown = '';
    for (const segment of rt.segments()) {
        const link = segment.link;
        const mention = segment.mention;
        const tag = segment.tag;

        if (link && AppBskyRichtextFacet.validateMention(link).success) {
            markdown += `[${segment.text}](${segment.link?.uri}) `;
        } else if (mention && AppBskyRichtextFacet.validateMention(mention).success) {
            markdown += `[${segment.text}](https://my-bsky-app.com/user/${segment.mention?.did}) `;
        } else {
            markdown += segment.text + ' ';
        }
    }

    useEffect(() => {
        const detectFacets = async () => {
            try {
                await rt.detectFacets(agent);
            } catch (error) {
                console.error('Error detecting facets:', error);
            }
        };

        detectFacets();
    }, [content]);

    return (
        <View style={[styles.postContainer, {
            borderColor: theme.colors.border,
            paddingVertical: theme.spacing.small * 1.25,
            paddingHorizontal: theme.spacing.small * 1.5,
        }]}>
            {isRepost ? <Text style={[styles.repostTag, theme.typography['sm-bold']]}>Reposted by {repostedBy}</Text> : <></>}
            <View style={styles.container}>
                <Image source={{ uri: avatar }} style={styles.avatar} />

                <View style={styles.postContent}>
                    <Text>
                        <Link displayText={'a'} link={''}>
                            <Text style={styles.displayName}>{displayName}</Text>
                            &nbsp;
                            <Text style={{ color: theme.colors.textGrey }}>@{username}</Text>
                        </Link>
                        &nbsp;
                        <Text style={{ color: theme.colors.textGrey }}>·</Text>
                        &nbsp;
                        <Text style={[styles.timestamp, { color: theme.colors.textGrey }]}>{timestamp}</Text>
                    </Text>
                    <Text style={[styles.content, { marginBottom: theme.spacing.small, marginTop: theme.spacing.small / 8 }]}>{markdown}</Text>
                    <View style={styles.actionButtons}>
                        <Ionicons
                            backgroundColor="transparent"
                            name={'chatbubble-outline'}
                            size={16}
                            color={'grey'}
                        />
                        <Ionicons
                            backgroundColor="transparent"
                            name={'repeat-outline'}
                            size={20}
                            color={'grey'}
                        />
                        <Ionicons
                            backgroundColor="transparent"
                            name={'heart-outline'}
                            size={16}
                            color={'grey'}
                        />
                        <Ionicons
                            backgroundColor="transparent"
                            name={'ellipsis-horizontal'}
                            size={16}
                            color={'grey'}
                        />
                    </View>
                </View>
            </View>
        </View >
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
    timestamp: {
        fontSize: 12,
    },
    actionButtons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 50,
        alignItems: 'center'
    }
});

export default Post;
