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
        <View style={[styles.postContainer, { borderColor: theme.colors.border }]}>
            {isRepost ? <Text style={styles.repostTag}>Reposted by {repostedBy}</Text> : <></>}
            <View style={styles.container}>
                <Image source={{ uri: avatar }} style={styles.avatar} />

                <View style={styles.postContent}>
                    <Text>
                        <Link displayText={'a'} link={''}>
                            <Text style={styles.displayName}>{displayName}</Text>
                            &nbsp;
                            <Text style={styles.username}>@{username}</Text>
                        </Link>
                        &nbsp;
                        ·
                        &nbsp;
                        <Text style={styles.timestamp}>{timestamp}</Text>
                    </Text>
                    <Text style={styles.content}>{markdown}</Text>
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
                            size={20}
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
        </View>
    );
};

const styles = StyleSheet.create({
    postContainer: {
        borderTopWidth: 1,
        paddingVertical: 12,
        paddingHorizontal: 12,
    },
    repostTag: {
        paddingLeft: 57,
        fontWeight: 'bold',
        color: '#828282'
    },
    container: {
        flexDirection: 'row',
    },
    avatar: {
        width: 45,
        height: 45,
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
        lineHeight: 19,
        alignItems: 'baseline',
    },
    displayName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    username: {
        lineHeight: 15,
    },
    content: {
        fontSize: 16,
        marginBottom: 8,
    },
    timestamp: {
        fontSize: 12,
        color: '#888',
    },
    actionButtons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 50,
        alignContent: 'flex-end'
    }
});

export default Post;
