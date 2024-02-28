import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Post = ({ username, content, timestamp, avatar }) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: avatar }} style={styles.avatar} />

            <View style={styles.postContent}>
                <Text style={styles.username}>{username}</Text>
                <Text style={styles.content}>{content}</Text>
                <Text style={styles.timestamp}>{timestamp}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 16,
        borderBottomWidth: 1,
        borderColor: '#E0E0E0',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    postContent: {
        flex: 1,
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    content: {
        fontSize: 14,
        marginBottom: 8,
    },
    timestamp: {
        fontSize: 12,
        color: '#888',
    },
});

export default Post;
