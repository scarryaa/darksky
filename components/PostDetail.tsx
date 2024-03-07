import { useContext } from "react";
import { View, StyleSheet, Image } from "react-native";
import { ThemeContext } from "../contexts/ThemeContext";

const PostDetail = ({ displayName, username, content, timestamp, avatar, isRepost, repostedBy, replyCount, repostCount, likeCount, id }) => {
    const { theme } = useContext(ThemeContext);

    return (
        <View style={[styles.postContainer, { borderColor: theme.colors.border }]}>
            <Image source={{ uri: avatar }} style={styles.avatar} />
        </View>
    );
};

const styles = StyleSheet.create({
    postContainer: {
        borderBottomWidth: 1,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 50,
    },
});

export default PostDetail;