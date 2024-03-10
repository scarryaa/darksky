import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Pressable, ScrollView, Animated, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import BasicView from '../components/BasicView';
import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import { type ProfileViewDetailed } from '@atproto/api/dist/client/types/app/bsky/actor/defs';
import { agent } from '../services/api';
import { AppBskyActorDefs, AppBskyFeedDefs, AppBskyGraphDefs } from '@atproto/api';
import Text from '../components/Text';
import Ionicons from '@expo/vector-icons/Ionicons';
import { type CommonNavParams } from '../routes/types';
import TabSwitcher, { type Tab } from '../components/com/profile/TabSwitcher';
import Tooltip from '../components/com/Tooltip';

type ProfileScreenProps = NativeStackScreenProps<CommonNavParams, 'PostThread'>
interface ProfileTabsProps {
  style?: StyleProp<ViewStyle>
  defaultTab?: string;
  profile: AppBskyActorDefs.ProfileViewDetailed | undefined;
  feeds: AppBskyFeedDefs.GeneratorView[] | null | undefined;
  lists: AppBskyGraphDefs.ListView[] | null | undefined;
}

const ProfileTabs = ({ style, profile, feeds, lists }: ProfileTabsProps): JSX.Element => {
  const isUserProfile = profile?.did === agent.session?.did;

  const tabs: Array<null | Tab> = [
    {
      key: 'posts',
      title: 'Posts',
      onPress: () => {}
    },
    {
      key: 'replies',
      title: 'Replies',
      onPress: () => {}
    },
    {
      key: 'media',
      title: 'Media',
      onPress: () => {}
    },
    isUserProfile
      ? {
          key: 'likes',
          title: 'Likes',
          onPress: () => {}
        }
      : null,
    ((feeds?.length) != null)
      ? {
          key: 'feeds',
          title: 'Feeds',
          onPress: () => {}
        }
      : null,
    (lists?.length != null)
      ? {
          key: 'lists',
          title: 'Lists',
          onPress: () => {}
        }
      : null
  ].filter(Boolean);

  return (
    <TabSwitcher defaultTabKey='posts' style={style} tabs={tabs} />
  )
}

const ProfileScreen = ({ route }: ProfileScreenProps): JSX.Element => {
  const [profile, setProfile] = useState<ProfileViewDetailed>();
  const [feeds, setFeeds] = useState<AppBskyFeedDefs.GeneratorView[]>();
  const [lists, setLists] = useState<AppBskyGraphDefs.ListView[]>();
  const { theme } = useTheme();
  const { name } = route.params;
  const isUserProfile = name === agent.session?.did;

  const scrollY = new Animated.Value(0);

  // if theme is dark or dim and we are following: primary_highlight, else white
  // if theme is light and we are following: primary_highlight, else black
  const followingButtonBGColor = (): string => {
    if (theme.theme === 'dark' || theme.theme === 'dim') {
      if ((profile?.viewer?.following) != null) return theme.colors.primary_highlight;
      else return theme.colors.white;
    } else {
      if ((profile?.viewer?.following) != null) return theme.colors.primary_highlight;
      else return theme.colors.black;
    }
  }
  // if theme is dark or dim and we are following: black, else white
  // if theme is light and we are following: primary_highlight, else black
  const followingButtonTextColor = (): string => {
    if (theme.theme === 'dark' || theme.theme === 'dim') {
      if ((profile?.viewer?.following) != null) return theme.colors.white;
      else return theme.colors.black;
    } else {
      if ((profile?.viewer?.following) != null) return theme.colors.black;
      else return theme.colors.white;
    }
  }

  const headerOpacity = scrollY.interpolate({
    inputRange: [150, 150],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  });

  useEffect(() => {
    const getProfile = async (): Promise<void> => {
      const profile = await agent.getProfile({ actor: name });

      if (AppBskyActorDefs.validateProfileView(profile.data).success) {
        setProfile(profile.data);
      }
    }

    const getFeeds = async (): Promise<void> => {
      const feeds = await agent.app.bsky.feed.getActorFeeds({ actor: name });

      if (AppBskyFeedDefs.validateGeneratorView(feeds.data.feeds[0]).success) {
        setFeeds(feeds.data.feeds);
      }
    }

    const getLists = async (): Promise<void> => {
      const lists = await agent.api.app.bsky.graph.getLists({ actor: name });

      if (AppBskyGraphDefs.validateListView(lists.data.lists[0]).success) {
        setLists(lists.data.lists);
      }
    }

    void getLists();
    void getProfile();
    void getFeeds();
  }, [name])

  return (
        <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
           <ScrollView
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
        >
           <BasicView>
              {/* @ts-expect-error ignore style issue */}
              <Image style={[styles.banner, { backgroundColor: theme.colors.secondary }]} source={{ uri: profile?.banner }} />
              {/* @ts-expect-error ignore style issue */}
              <Image style={[styles.avatar, { left: theme.spacing.sm, borderColor: theme.colors.primary, backgroundColor: theme.colors.secondary }]} source={{ uri: profile?.avatar }} />
              <Tooltip text="Show similar follows" textStyle={theme.typography.xxs} onPress={() => { console.log('hi'); }} tooltipStyle={{ width: 121 }} style={styles.showSimilarFollows} triggerStyle={[{ borderWidth: 1, backgroundColor: theme.colors.primary_highlight, paddingVertical: theme.spacing.xs, paddingHorizontal: theme.spacing.xs, borderRadius: 50, borderColor: theme.colors.primary }]}>
                      <Ionicons name="person-add-outline" size={18} color={theme.colors.text}/>
              </Tooltip>
              <Animated.View style={[styles.profileInfo, { paddingHorizontal: theme.spacing.sm },
                {
                  transform: [{
                    translateY: scrollY.interpolate({
                      inputRange: [200, 200],
                      outputRange: [0, 0],
                      extrapolate: 'clamp'
                    })
                  }]
                }]}>
                <View style={{ width: 325, paddingRight: theme.spacing.sm }}>
                <Text style={[theme.typography.header, { height: 30 }]} numberOfLines={1} ellipsizeMode="tail">
                  {profile?.displayName === '' ? `@${profile?.handle}` : profile?.displayName}
                </Text>
                <View style={{ display: 'flex', flexDirection: 'row', gap: theme.spacing.sm }}>
                  {((profile?.viewer?.followedBy) != null) && <View style={[{ backgroundColor: theme.colors.primary_highlight, paddingHorizontal: theme.spacing.xs, borderRadius: theme.spacing.xs }]}>
                     <Text style={theme.typography.sm}>Follows you</Text>
                  </View>}
                  <Text style={{ color: theme.colors.textGrey }} numberOfLines={1} ellipsizeMode="tail">@{profile?.handle}</Text>
                </View>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', gap: theme.spacing.xs }}>
                  {isUserProfile
                    ? <Pressable style={{
                      alignSelf: 'center',
                      backgroundColor: theme.colors.primary_highlight,
                      paddingVertical: theme.spacing.sm,
                      paddingHorizontal: theme.spacing.md,
                      borderRadius: theme.spacing.md
                    }}>
                    <Text style={[
                      {
                        color: theme.colors.text
                      },
                      theme.typography.bold
                    ]}>{'Edit Profile'}</Text>
                  </Pressable>
                    : <Pressable style={{
                      alignSelf: 'center',
                      backgroundColor: followingButtonBGColor(),
                      paddingVertical: theme.spacing.sm,
                      paddingHorizontal: theme.spacing.md,
                      borderRadius: theme.spacing.md
                    }}>
                    <Text style={[
                      {
                        color: followingButtonTextColor()
                      },
                      theme.typography.bold
                    ]}>{((profile?.viewer?.following) != null) ? 'Following' : 'Follow'}</Text>
                  </Pressable>
                  }
                  <Pressable style={{ alignSelf: 'center', backgroundColor: theme.colors.primary_highlight, paddingVertical: theme.spacing.sm, paddingHorizontal: theme.spacing.md, borderRadius: theme.spacing.md }}>
                    <Ionicons name="ellipsis-horizontal" size={18} color={theme.colors.text}/>
                  </Pressable>
                </View>
              </Animated.View>
              <Animated.View style={[styles.stickyHeader, { opacity: headerOpacity, backgroundColor: theme.colors.primary }, {
                transform: [{
                  translateY: scrollY.interpolate({
                    inputRange: [150, 150],
                    outputRange: [-600, 0],
                    extrapolate: 'clamp'
                  })
                }]
              }]}>
              <Pressable style={{ width: 20 }}>
                <Ionicons name={'chevron-back'} size={20} color={theme.colors.text} />
              </Pressable>
              </Animated.View>
              <View style={[styles.otherInfo]}>
                <View style={{ display: 'flex', flexDirection: 'row', gap: theme.spacing.sm, marginBottom: theme.spacing.xs }}>
                  <Text style={{ color: theme.colors.textGrey }}><Text style={{ color: theme.colors.text, fontWeight: 'bold' }}>{profile?.followersCount}</Text> followers</Text>
                  <Text style={{ color: theme.colors.textGrey }}><Text style={{ color: theme.colors.text, fontWeight: 'bold' }}>{profile?.followsCount}</Text> following</Text>
                  <Text style={{ color: theme.colors.textGrey }}><Text style={{ color: theme.colors.text, fontWeight: 'bold' }}>{profile?.postsCount}</Text> posts</Text>
                </View>
                <View>
                  <Text>{profile?.description}</Text>
                </View>
              </View>
              <ProfileTabs lists={lists} feeds={feeds} profile={profile} defaultTab={'posts'} style={[styles.tabSwitcher, { marginTop: theme.spacing.lg, zIndex: 100 }]} />
              {/* @ts-expect-error ignore style issue */}
              <View style={{ height: '100vh' }}></View>
            </BasicView>
            </ScrollView>
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // @ts-expect-error web only
    overflow: 'auto',
    flex: 1
  },
  banner: {
    height: 150
  },
  avatar: {
    height: 85,
    width: 85,
    borderRadius: 50,
    position: 'absolute',
    top: 115,
    borderWidth: 2,
    zIndex: 1
  },
  profileInfo: {
    // @ts-expect-error ignore style issue
    position: 'sticky',
    top: 0,
    left: 0,
    right: 0,
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 90,
    zIndex: 100
  },
  otherInfo: {
    marginLeft: 12.5,
    marginTop: 10
  },
  tabSwitcher: {
    // @ts-expect-error ignore style issue
    position: 'sticky',
    top: 62,
    left: 0,
    right: 0
  },
  stickyHeader: {
    justifyContent: 'center',
    // @ts-expect-error ignore style issue
    position: 'sticky',
    top: 0,
    left: 0,
    right: 0,
    marginTop: -60,
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    zIndex: 99
  },
  showSimilarFollows: {
    position: 'absolute',
    top: 170,
    left: 65,
    zIndex: 2
  }
});

export default ProfileScreen;
