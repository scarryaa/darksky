import React, { useContext, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Image, type StyleProp, type ViewStyle } from 'react-native';
import { AppBskyFeedDefs, AppBskyFeedPost, AtUri, RichText } from '@atproto/api';
import { agent } from '../../../services/api';
import Text from '../../Text';
import Link from '../../Link';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { ago } from '../../../util/time';
import PostControls from './controls/PostControls';
import { PostContext } from '../../../contexts/PostContext';

type WithoutUnknown<T> = {
  [K in keyof T as Exclude<K, keyof Record<string, unknown>>]: T[K];
};

type ReasonRepostWithoutUnknown = WithoutUnknown<AppBskyFeedDefs.ReasonRepost>;

interface PostProps {
  post: AppBskyFeedDefs.PostView;
  reason?: ReasonRepostWithoutUnknown;
  style?: StyleProp<ViewStyle>;
}

const Post = ({ post, reason, style }: PostProps): JSX.Element => {
  const { theme } = useContext(ThemeContext);
  const { cachePost, cacheReplyAuthor, getReplyAuthorFromCache } = useContext(PostContext);

  const record = useMemo<AppBskyFeedPost.Record | undefined>(
    () =>
      AppBskyFeedPost.isRecord(post.record) &&
                AppBskyFeedPost.validateRecord(post.record).success
        ? post.record
        : undefined,
    [post]
  );

  const rt = useMemo(
    () =>
      (record != null)
        ? new RichText({
          text: record.text,
          facets: record.facets
        })
        : undefined,
    [record]
  );

  const [replyAuthorUsername, setReplyAuthorUsername] = useState<string>();
  const [replyAuthorDid] = useState<string | null>(record?.reply != null ? new AtUri(record?.reply?.parent?.uri ?? '').hostname : null);

  useEffect(() => {
    const getReplyAuthorUsername = async (): Promise<void> => {
      try {
        if (replyAuthorDid != null) {
          // try to get the info from the cache first
          const res = getReplyAuthorFromCache(replyAuthorDid);

          if (res != null) {
            setReplyAuthorUsername(res);
          } else if (replyAuthorDid != null) {
            // if not found, get the profile and cache the username
            // TODO this doesn't work. fix
            const res2 = await agent.getProfile({ actor: replyAuthorDid });
            cacheReplyAuthor(replyAuthorDid, res2.data.displayName ?? 'NAME_NOT_FOUND');
            setReplyAuthorUsername(res2.data.displayName);
          }
        }
      } catch (error: any) {
        console.log('unable to fetch profile: ', error);
      }
    }

    void getReplyAuthorUsername();
  }, [replyAuthorDid]);

  useEffect(() => {
    const detectFacets = async (): Promise<void> => {
      try {
        if (rt == null) return;
        await rt.detectFacets(agent);
      } catch (error) {
        console.error('Error detecting facets:', error);
      }
    };

    void detectFacets();
  }, [record?.text]);

  const cachePostCallback = (postId, postData): void => {
    cachePost(postId, postData);
  };

  return (
        <Link beforePressLogic={() => { cachePostCallback(post.uri, post); }}
            hoverUnderline={false}
            link={`/profile/${post.author.did}/post/${post.uri.split('/')[4]}`}
            style={[style, {
              borderColor: theme.colors.border,
              paddingVertical: theme.spacing.sm * 1.2,
              paddingHorizontal: theme.spacing.md
            }]}>
            {AppBskyFeedDefs.isReasonRepost(reason) && <Link link={`/profile/${post.author.did}`} hoverUnderline={false} style={[styles.repostTag, theme.typography['sm-bold']]}>Reposted by <Link link={`/profile/${post.author.did}`} hoverUnderline={true}>{reason.by.displayName ?? reason.by.handle}</Link></Link>}
            <View style={styles.container}>
              <Link hoverUnderline={false} link={`/profile/${post.author.did}`}>
                <Image source={{ uri: post.author.avatar }} style={styles.avatar} />
              </Link>

                <View style={styles.postContent}>
                    <Text>
                        <Link hoverUnderline={true} link={`/profile/${post.author.did}`}>
                            <Text style={styles.displayName}>{post.author.displayName === '' ? post.author.handle : post.author.displayName}</Text>
                            &nbsp;
                            <Text style={{ color: theme.colors.textGrey }}>@{post.author.handle}</Text>
                        </Link>
                        &nbsp;
                        <Text style={{ color: theme.colors.textGrey }}>·</Text>
                        &nbsp;
                        <Text style={[theme.typography.sm, { color: theme.colors.textGrey }]}>{ago(post.indexedAt)}</Text>
                    </Text>
                    {(post.author.displayName !== '') && (AppBskyFeedPost.isRecord(post.record) && ((post.record.reply?.parent.uri) != null)) &&
                        <View style={{ display: 'flex', flexDirection: 'row', gap: theme.spacing.xs, alignItems: 'center' }}>
                            <Ionicons size={14} name='arrow-undo' color={theme.colors.textGrey} />
                            <Text style={{ color: theme.colors.textGrey, marginBottom: theme.spacing.sm / 4 }}>Reply to <Link link={`/profile/${replyAuthorDid}`} hoverUnderline={true}>{replyAuthorUsername}</Link></Text>
                        </View>}
                    <Text style={[styles.content, { marginBottom: theme.spacing.md / 1.5, marginTop: theme.spacing.sm / 8 }]}>{rt?.text}</Text>
                    <PostControls big={false} post={post} />
                </View>
            </View>
        </Link >
  );
};

const styles = StyleSheet.create({
  repostTag: {
    paddingLeft: 62,
    fontWeight: 'bold',
    color: '#828282'
  },
  container: {
    flexDirection: 'row',
    display: 'flex'
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 12
  },
  postContent: {
    flex: 1,
    minWidth: 500
  },
  usernameDisplayNameContainer: {
    display: 'flex',
    maxWidth: '100%',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginBottom: 4,
    alignItems: 'baseline'
  },
  displayName: {
    fontWeight: 'bold',
    fontSize: 16
  },
  content: {
    fontSize: 16
  }
});

export default Post;
