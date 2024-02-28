import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Post from '../components/Post';
import { agent } from '../services/api';

const HomeScreen = ({ navigation }) => {
    const [feeds, setFeeds] = useState([]);

    useEffect(() => {
        const fetchFeeds = async () => {
            try {
                const response = await agent.app.bsky.unspecced.getPopularFeedGenerators({
                    limit: 10,
                });
                setFeeds(response.data.feeds);
            } catch (error) {
                console.error('Error fetching feeds:', error);
            }
        };

        fetchFeeds();
    }, []);

    return (
        <View style={styles.container}>
            <ul>
                {feeds.map((feed) => (
                    <li key={feed.displayName}>{feed.displayName}</li>
                ))}
            </ul>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
