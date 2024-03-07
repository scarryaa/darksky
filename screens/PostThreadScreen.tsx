import { View, StyleSheet } from "react-native";
import BasicView from "../components/BasicView";
import ViewHeader from "../components/ViewHeader";
import Text from "../components/Text";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { agent } from "../services/api";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CommonNavParams } from "../routes/types";
import { AppBskyFeedGetPostThread } from "@atproto/api";
import { makeRecordUri } from "../strings/helpers";

type Props = NativeStackScreenProps<CommonNavParams, 'PostThread'>
type ThreadViewNode = AppBskyFeedGetPostThread.OutputSchema['thread'];

const PostThreadScreen = ({ route }: Props) => {
    const { theme } = useContext(ThemeContext);
    const [posts, setPosts] = useState({} as ThreadViewNode);
    const { name, rkey } = route.params;
    const uri = makeRecordUri(name, 'app.bsky.feed.post', rkey);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await agent.app.bsky.feed.getPostThread({ uri: uri });
                console.log(response.data.thread);
                setPosts(response.data.thread);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
            <ViewHeader showBackButton={false}>
                <Text style={[theme.typography.header, styles.headerText]}>
                    Post
                </Text>
            </ViewHeader>
            <BasicView>
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