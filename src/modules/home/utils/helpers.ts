export const getYoutubeVideoId = (url?: string) => {
  if (!url || typeof url !== 'string') return '';

  if (url.endsWith('/')) {
    url = url.substring(0, url.length - 1);
  }
  const regex = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regex);
  if (match && match[7].length === 11) {
    return match[7];
  }
  return '';
};
