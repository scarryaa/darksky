import { type AppBskyGraphDefs } from '@atproto/api';
import { Image, View, StyleSheet, type StyleProp, type ViewStyle } from 'react-native'
import Text from '../Text';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '../../../contexts/ThemeContext';
import Link from '../../Link';

const DefaultListIcon = (): JSX.Element => {
  const { theme } = useTheme();

  return (
    <View style={[styles.listIcon, { backgroundColor: theme.colors.secondary, borderRadius: theme.spacing.sm }]}>
      <Ionicons name='rocket-outline' color={theme.colors.white} size={26} />
    </View>
  )
}

interface ListProps {
  list: AppBskyGraphDefs.ListView;
  style?: StyleProp<ViewStyle>;
}
const List = ({ list, style }: ListProps): JSX.Element => {
  const { theme } = useTheme();
  const listType = list.purpose === 'app.bsky.graph.defs#curatelist' ? 'User' : 'Moderation';

  return (
    <Link hoverUnderline={false} link={`/profile/${list.creator.handle}/list/${list.uri}`} style={[style, { paddingHorizontal: theme.spacing.md / 1.5, paddingVertical: theme.spacing.md, rowGap: theme.spacing.md, borderColor: theme.colors.border }]}>
      <View style={[styles.list, { gap: theme.spacing.sm }]}>
        {(list.avatar != null) ? <Image style={[styles.listImage, { backgroundColor: theme.colors.secondary, borderRadius: theme.spacing.sm }]} source={{ uri: list.avatar }} /> : <DefaultListIcon />}
        <View style={styles.listInfo}>
          <Text style={theme.typography.bold}>{list.name}</Text>
          <Text style={{ color: theme.colors.textGrey, marginBottom: (list.description === null) ? 0 : theme.spacing.sm }}>{listType} list by @{list.creator.handle}</Text>
          <Text>{list.description}</Text>
        </View>
      </View>
    </Link>
  )
}

const styles = StyleSheet.create({
  list: {
    display: 'flex',
    flexDirection: 'row'
  },
  listImage: {
    width: 38,
    height: 38
  },
  listInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  listIcon: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default List;
