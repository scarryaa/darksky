import React, { useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Post from '../components/com/post/Post';
import { ThemeContext } from '../contexts/ThemeContext';
import BasicView from '../components/BasicView';
import { PostsContext } from '../contexts/PostContext';

const HomeScreen = () => {
    const { theme } = useContext(ThemeContext);
    const { timeline, refreshPosts } = useContext(PostsContext);

    useEffect(() => {
        refreshPosts();
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
            <BasicView>
                {/* @ts-ignore */}
                <ul style={styles.postList}>
                    {timeline.map((post) => (
                        <li key={post.post.cid}>
                            <Post
                                style={{ borderTopWidth: 1 }}
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
