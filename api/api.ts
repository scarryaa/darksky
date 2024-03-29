import { type AppBskyFeedGetTimeline } from '@atproto/api';
import { agent } from '../services/api';

export const fetchTimeline = async (): Promise<AppBskyFeedGetTimeline.Response> => {
  const response = await agent.app.bsky.feed.getTimeline({ limit: 50 });
  return response;
};
