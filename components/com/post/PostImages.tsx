import { type AppBskyEmbedImages } from '@atproto/api';
import { View, Image } from 'react-native';
import { useTheme } from '../../../contexts/ThemeContext';

interface PostImagesProps {
  images: AppBskyEmbedImages.ViewImage[]
}
const PostImages = ({ images }: PostImagesProps): JSX.Element => {
  const { theme } = useTheme();
  const count = images.length;

  switch (count) {
    case 2:
      return (
      <View style={{ marginBottom: theme.spacing.md }}>
        <Image source={{ uri: images[0].thumb }}
            style={{ maxWidth: '100%', maxHeight: '100%', aspectRatio: images[0].aspectRatio?.width ?? 0 / (images[0].aspectRatio?.height ?? 1), borderRadius: theme.spacing.sm }} resizeMode='contain' />
        <Image source={{ uri: images[0].thumb }}
            style={{ maxWidth: '100%', maxHeight: '100%', aspectRatio: images[0].aspectRatio?.width ?? 0 / (images[0].aspectRatio?.height ?? 1), borderRadius: theme.spacing.sm }} resizeMode='contain' />
      </View>
      )
    case 3:
      return (
      <View>

      </View>
      )
    case 4:
      return (
      <View>

      </View>
      )

    default: return <Image source={{ uri: images[0].thumb }}
        style={{ maxWidth: '100%', maxHeight: '100%', aspectRatio: (images[0].aspectRatio != null) ? images[0].aspectRatio.width / (images[0].aspectRatio.height) : 0, borderRadius: theme.spacing.sm, marginBottom: theme.spacing.md }} resizeMode='contain' />
  }
}

export default PostImages;
