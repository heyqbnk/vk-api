/**
 * @see https://vk.com/dev/objects/post_source
 */
export type TPostSource = {
  platform: 'android' | 'iphone' | 'wphone';
  url: string;
} & ({
  type: 'vk';
  data: 'profile_activity' | 'profile_photo';
} | {
  type: 'widget';
  data: 'comments' | 'like' | 'poll';
} | {
  type: 'api' | 'rss' | 'sms';
})
