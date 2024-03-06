import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Post from '../components/Post';
import { agent } from '../services/api';
import { ThemeContext } from '../contexts/ThemeContext';

const HomeScreen = () => {
    const [timeline, setTimeline] = useState([]);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        const fetchFeeds = async () => {
            try {
                const response = await agent.app.bsky.feed.getTimeline({ limit: 50 });
                setTimeline(response.data.feed);
                console.log(response.data.feed);
            } catch (error) {
                console.error('Error fetching feeds:', error);
            }
        };

        fetchFeeds();
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
            {/* @ts-ignore */}
            <ul style={styles.postList}>
                {timeline.map((post) => (
                    <li key={post.post.cid}>
                        <Post
                            repostedBy={post.reason?.by?.displayName}
                            isRepost={post.reason?.$type == "app.bsky.feed.defs#reasonRepost"}
                            displayName={post.post.author.displayName}
                            username={post.post.author.handle}
                            content={post.post.record.text}
                            timestamp={post.post.indexedAt}
                            avatar={post.post.author.avatar}
                        />
                    </li>
                ))}

            </ul>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    postList: {
        width: '100%',
        // @ts-ignore
        overflow: 'auto',
        margin: 0,
        padding: 0,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 32,
    },
});

export default HomeScreen;