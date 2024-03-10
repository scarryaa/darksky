import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Pressable, ScrollView, Animated, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import BasicView from '../components/BasicView';
import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import { type ProfileViewDetailed } from '@atproto/api/dist/client/types/app/bsky/actor/defs';
import { agent } from '../services/api';
import { AppBskyActorDefs } from '@atproto/api';
import Text from '../components/Text';
import Ionicons from '@expo/vector-icons/Ionicons';
import { type CommonNavParams } from '../routes/types';
import TabSwitcher, { type Tab } from '../components/com/profile/TabSwitcher';

type ProfileScreenProps = NativeStackScreenProps<CommonNavParams, 'PostThread'>
interface ProfileTabsProps {
  style?: StyleProp<ViewStyle>
}

const ProfileTabs = ({ style }: ProfileTabsProps): JSX.Element => {
  const tabs: Tab[] = [
    {
      title: 'Posts',
      onPress: () => {}
    },
    {
      title: 'Replies',
      onPress: () => {}
    },
    {
      title: 'Media',
      onPress: () => {}
    },
    {
      title: 'Feeds',
      onPress: () => {}
    },
    {
      title: 'Lists',
      onPress: () => {}
    }
  ]

  return (
    <TabSwitcher style={style} tabs={tabs} />
  )
}

const ProfileScreen = ({ route }: ProfileScreenProps): JSX.Element => {
  const [profile, setProfile] = useState<ProfileViewDetailed>();
  const { theme } = useTheme();
  const { name } = route.params;

  const scrollY = new Animated.Value(0);

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

    if (profile == null) {
      void getProfile();
    }
  }, [profile])

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
              <Image style={[styles.avatar, { left: theme.spacing.sm, borderColor: theme.colors.primary }]} source={{ uri: profile?.avatar }} />
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
                <View>
                <Text style={[theme.typography.header]}>{profile?.displayName}</Text>
                <View style={{ display: 'flex', flexDirection: 'row', gap: theme.spacing.sm }}>
                  {((profile?.viewer?.followedBy) != null) && <View style={[{ backgroundColor: theme.colors.primary_light, paddingHorizontal: theme.spacing.xs, borderRadius: theme.spacing.sm }]}>
                     <Text style={theme.typography.sm}>Follows you</Text>
                  </View>}
                  <Text style={{ color: theme.colors.textGrey }}>@{profile?.handle}</Text>
                </View>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', gap: theme.spacing.xs }}>
                  <Pressable style={{ alignSelf: 'center', backgroundColor: theme.colors.primary_light, paddingVertical: theme.spacing.sm, paddingHorizontal: theme.spacing.md, borderRadius: theme.spacing.md }}>
                    <Text>{((profile?.viewer?.following) != null) ? 'Unfollow' : 'Follow'}</Text>
                  </Pressable>
                  <Pressable style={{ alignSelf: 'center', backgroundColor: theme.colors.primary_light, paddingVertical: theme.spacing.sm, paddingHorizontal: theme.spacing.md, borderRadius: theme.spacing.md }}>
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
              <ProfileTabs style={[styles.tabSwitcher, { marginTop: theme.spacing.lg, zIndex: 100 }]} />
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
    top: 120,
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
  }
});

export default ProfileScreen;
