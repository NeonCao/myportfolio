import { pickItemImage, safeImageUrl } from './images';

test('only https images on the wiki media host are accepted', () => {
  expect(safeImageUrl('https://media.starcitizen.tools/thumb/a/ab/Gun.png/600px-Gun.png.webp?x')).toBe(
    'https://media.starcitizen.tools/thumb/a/ab/Gun.png/600px-Gun.png.webp?x'
  );
  expect(safeImageUrl('http://media.starcitizen.tools/a.png')).toBeNull();
  expect(safeImageUrl('https://evil.example/a.png')).toBeNull();
  expect(safeImageUrl('javascript:alert(1)')).toBeNull();
  expect(safeImageUrl(undefined)).toBeNull();
});

test('the first image with a usable thumbnail wins, falling back to the original', () => {
  expect(
    pickItemImage([
      { thumbnail_url: 'https://evil.example/x.png' },
      { original_url: 'https://media.starcitizen.tools/0/0d/Rifle.png', original_width: 1920, original_height: 1080 },
    ])
  ).toEqual({ thumb: 'https://media.starcitizen.tools/0/0d/Rifle.png', width: 1920, height: 1080 });
  expect(pickItemImage(null)).toBeNull();
  expect(pickItemImage([])).toBeNull();
});
