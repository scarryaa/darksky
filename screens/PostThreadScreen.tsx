import { View, StyleSheet } from "react-native";
import BasicView from "../components/BasicView";
import ViewHeader from "../components/ViewHeader";
import Text from "../components/Text";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { agent } from "../services/api";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CommonNavParams } from "../routes/types";
import { AppBskyFeedDefs, AppBskyFeedGetPostThread } from "@atproto/api";
import { makeRecordUri } from "../strings/helpers";
import PostDetail from "../components/com/post/PostDetail";
import { PostView, ThreadViewPost } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import { PostContext } from "../contexts/PostContext";

type Props = NativeStackScreenProps<CommonNavParams, 'PostThread'>
type ThreadViewNode = AppBskyFeedGetPostThread.OutputSchema['thread'];

const PostThreadScreen = ({ route }: Props) => {
    const { theme } = useContext(ThemeContext);
    const [posts, setPosts] = useState<ThreadViewPost>();
    const { name, rkey } = route.params;
    const uri = makeRecordUri(name, 'app.bsky.feed.post', rkey);
    const { getPostFromCache, cachePost } = useContext(PostContext);
    const postData = getPostFromCache(uri);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await agent.app.bsky.feed.getPostThread({ uri: uri });
                if (AppBskyFeedDefs.isThreadViewPost(response.data.thread)) {
                    setPosts(response.data.thread);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        if (!postData) {
            fetchPosts();
            cachePost(uri, posts);
        }
    }, []);

    if (!postData) return <View style={[styles.container, { backgroundColor: theme.colors.primary }]}></View>;

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
            <ViewHeader showBackButton={false}>
                <Text style={[theme.typography.header, styles.headerText]}>
                    Post
                </Text>
            </ViewHeader>
            <BasicView>
                <PostDetail
                    post={postData}
                />
            </BasicView>
        </View>
    );
};

const styles = StyleSheet.create({
    headerText: {
        alignSelf: 'center',
    },
    container: {
        // @ts-ignore
        overflow: 'auto',
        flex: 1,
    },
});

export default PostThreadScreen;