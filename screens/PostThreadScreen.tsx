import { View, StyleSheet } from 'react-native';
import BasicView from '../components/BasicView';
import ViewHeader from '../components/ViewHeader';
import Text from '../components/Text';
import { useContext, useEffect, useMemo, useState } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { agent } from '../services/api';
import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import { type CommonNavParams } from '../routes/types';
import { AppBskyFeedDefs, AppBskyFeedPost } from '@atproto/api';
import { makeRecordUri } from '../strings/helpers';
import { type PostView, type ThreadViewPost } from '@atproto/api/dist/client/types/app/bsky/feed/defs';
import { PostContext } from '../contexts/PostContext';
import PostThread from '../components/com/post/PostThread';

type Props = NativeStackScreenProps<CommonNavParams, 'PostThread'>

const PostThreadScreen = ({ route }: Props): JSX.Element => {
  const { theme } = useContext(ThemeContext);
  const [posts, setPosts] = useState<ThreadViewPost>();
  const [parentPosts, setParentPosts] = useState<ThreadViewPost>();
  const { name, rkey } = route.params;
  const uri = makeRecordUri(name, 'app.bsky.feed.post', rkey);
  const { getPostFromCache, cachePost } = useContext(PostContext);
  const postData: PostView = getPostFromCache(uri);

  useEffect(() => {
    const fetchPosts = async (): Promise<void> => {
      try {
        const response = await agent.app.bsky.feed.getPostThread({ uri });
        if (AppBskyFeedDefs.isThreadViewPost(response.data.thread)) {
          setPosts(response.data.thread);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    if (postData == null) {
      void fetchPosts();
      cachePost(uri, posts);
    }
  }, []);

  const record = useMemo<AppBskyFeedPost.Record | undefined>(
    () =>
      AppBskyFeedPost.isRecord(postData.record) &&
                AppBskyFeedPost.validateRecord(postData.record).success
        ? postData.record
        : undefined,
    [postData]
  );

  // get parent post(s)
  useEffect(() => {
    const fetchRootPost = async (): Promise<void> => {
      // check if has parent
      if (((record?.reply?.root.uri) != null) && (parentPosts == null)) {
        const response = await agent.app.bsky.feed.getPostThread({ uri: record.reply.root.uri });
        if (AppBskyFeedDefs.isThreadViewPost(response.data.thread)) {
          setParentPosts(response.data.thread);
        }
      }
    }

    void fetchRootPost();
  }, [parentPosts]);

  if (postData === null) return <View style={[styles.container, { backgroundColor: theme.colors.primary }]}></View>;

  return (
        <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
            <ViewHeader showBackButton={false}>
                <Text style={[theme.typography.header, styles.headerText]}>
                    Post
                </Text>
            </ViewHeader>
            <BasicView>
                <PostThread post={postData} />
            </BasicView>
        </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    alignSelf: 'center'
  },
  container: {
    // @ts-expect-error web only
    overflow: 'auto',
    flex: 1
  }
});

export default PostThreadScreen;
