import { type AppBskyFeedDefs } from '@atproto/api';
import { Image, View, StyleSheet, type StyleProp, type ViewStyle } from 'react-native'
import Text from '../../Text';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '../../../contexts/ThemeContext';
import Link from '../../Link';

const DefaultFeedIcon = (): JSX.Element => {
  const { theme } = useTheme();

  return (
    <View style={[styles.feedIcon, { backgroundColor: theme.colors.secondary, borderRadius: theme.spacing.sm }]}>
      <Ionicons name='rocket-outline' color={theme.colors.white} size={26} />
    </View>
  )
}

interface FeedProps {
  feed: AppBskyFeedDefs.GeneratorView;
  style?: StyleProp<ViewStyle>;
}
const Feed = ({ feed, style }: FeedProps): JSX.Element => {
  const { theme } = useTheme();

  return (
    <Link hoverUnderline={false} link={`/profile/${feed.creator.handle}/feed/${feed.did}`} style={[style, { paddingHorizontal: theme.spacing.md / 1.5, paddingVertical: theme.spacing.md, rowGap: theme.spacing.md, borderColor: theme.colors.border }]}>
      <View style={[styles.feed, { gap: theme.spacing.sm }]}>
        {(feed.avatar != null) ? <Image style={[styles.feedImage, { backgroundColor: theme.colors.secondary, borderRadius: theme.spacing.sm }]} source={{ uri: feed.avatar }} /> : <DefaultFeedIcon />}
        <View style={styles.feedInfo}>
          <Text style={theme.typography.bold}>{feed.displayName}</Text>
          <Text style={{ color: theme.colors.textGrey, marginBottom: theme.spacing.sm }}>Feed by @{feed.creator.handle}</Text>
          <Text style={{ marginBottom: theme.spacing.md / 1.5 }}>{feed.description}</Text>
        </View>
      </View>
      <Text style={{ color: theme.colors.textGrey }}>Liked by {feed.likeCount ?? '?'} user{((feed.likeCount != null) && feed.likeCount === 1) ? '' : 's'}</Text>
    </Link>
  )
}

const styles = StyleSheet.create({
  feed: {
    display: 'flex',
    flexDirection: 'row'
  },
  feedImage: {
    width: 38,
    height: 38
  },
  feedInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  feedIcon: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Feed;
