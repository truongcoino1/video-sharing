import { getYoutubeVideoId } from '../utils';

test('getYoutubeVideoId should work correctly', () => {
  expect(getYoutubeVideoId).toBeInstanceOf(Function);

  expect(getYoutubeVideoId()).toBe('');
  expect(getYoutubeVideoId(undefined)).toBe('');
  expect(getYoutubeVideoId('')).toBe('');

  expect(getYoutubeVideoId('http://youtu.be/')).toBe('');
  expect(getYoutubeVideoId('youtube awesome')).toBe('');
  expect(getYoutubeVideoId('youtube/jNQXAC9IVRw')).toBe('');
  expect(getYoutubeVideoId('http://youtube/jNQXAC9IVRw')).toBe('');
  expect(getYoutubeVideoId('www.youtube.com/jNQXAC9IVRw/')).toBe('');
  expect(getYoutubeVideoId('http://www.youtube.com/watch?v=-jNQXAC9IVRw')).toBe(
    ''
  );

  expect(getYoutubeVideoId('http://youtu.be/jNQXAC9IVRw')).toBe('jNQXAC9IVRw');
  expect(getYoutubeVideoId('https://youtu.be/jNQXAC9IVRw/')).toBe(
    'jNQXAC9IVRw'
  );
  expect(getYoutubeVideoId('youtu.be/jNQXAC9IVRw')).toBe('jNQXAC9IVRw');
  expect(getYoutubeVideoId('youtube.com/watch?v=jNQXAC9IVRw')).toBe(
    'jNQXAC9IVRw'
  );
  expect(getYoutubeVideoId('https://www.youtube.com/watch?v=jNQXAC9IVRw')).toBe(
    'jNQXAC9IVRw'
  );
  expect(getYoutubeVideoId('http://www.youtube.com/watch?v=jNQXAC9IVRw')).toBe(
    'jNQXAC9IVRw'
  );
  expect(
    getYoutubeVideoId(
      'http://www.youtube.com/v/jNQXAC9IVRw?version=3&autohide=1'
    )
  ).toBe('jNQXAC9IVRw');
});