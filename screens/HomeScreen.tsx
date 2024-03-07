import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Post from '../components/com/post/Post';
import { agent } from '../services/api';
import { ThemeContext } from '../contexts/ThemeContext';
import BasicView from '../components/BasicView';

const HomeScreen = () => {
    const [timeline, setTimeline] = useState([]);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        const fetchFeeds = async () => {
            try {
                const response = await agent.app.bsky.feed.getTimeline({ limit: 50 });
                setTimeline(response.data.feed);
            } catch (error) {
                console.error('Error fetching feeds: ', error);
            }
        };

        fetchFeeds();
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
            <BasicView>
                {/* @ts-ignore */}
                <ul style={styles.postList}>
                    {timeline.map((post) => (
                        <li key={post.post.cid}>
                            <Post
                                post={post.post}
                                reason={post.reason}
                            />
                        </li>
                    ))}

                </ul>
            </BasicView>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // @ts-ignore
        overflow: 'auto',
    },
    postList: {
        width: '100%',
        // @ts-ignore
        listStyle: 'none',
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
