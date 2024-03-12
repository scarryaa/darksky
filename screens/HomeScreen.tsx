import React, { useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Post from '../components/com/post/Post';
import { ThemeContext } from '../contexts/ThemeContext';
import BasicView from '../components/BasicView';
import { PostsContext } from '../contexts/PostContext';
import ViewHeader from '../components/ViewHeader';
import Text from '../components/com/Text';

const HomeScreen = (): JSX.Element => {
  const { theme } = useContext(ThemeContext);
  const { timeline, refreshPosts } = useContext(PostsContext);

  useEffect(() => {
    void refreshPosts();
  }, []);

  return (
        <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
          <ViewHeader showBackButton={false}>
                <Text style={theme.typography.header}>
                    Home
                </Text>
            </ViewHeader>
            <BasicView>
                {/* @ts-expect-error ignore viewstyle error */}
                <ul style={styles.postList}>
                    {timeline.map((post, index) => (
                        <li key={post.post.cid + index}>
                            <Post
                                style={{ borderTopWidth: index !== 0 ? 1 : 0 }}
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
    // @ts-expect-error web only
    overflow: 'auto'
  },
  postList: {
    width: '100%',
    // @ts-expect-error web only
    listStyle: 'none',
    margin: 0,
    padding: 0
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 32
  }
});

export default HomeScreen;
