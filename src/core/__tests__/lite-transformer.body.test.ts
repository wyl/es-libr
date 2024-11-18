import { LiteTransformer } from '@eslibr/core/lite-transformer'
const testMapper = { 'foo.bar': 'foo_bar', 'foo.bar1': 'fooBar1' }

const testTables: Array<[object, unknown]> = [
  [{ index: 'test2' }, { index: 'test2' }],
  [{ delete: 'test2' }, { delete: 'test2' }],
  [{ create: 'test2' }, { create: 'test2' }],
  [{ update: 'test2' }, { update: 'test2' }],
  [{ doc: 'test2' }, { doc: 'test2' }],
  [{ foo: 'foo' }, { foo_bar: undefined, fooBar1: undefined }],
  [
    {
      foo: {
        bar: 'bar',
        bar1: 'bar1',
        bar2: 'bar2',
      },
    },
    {
      foo_bar: 'bar',
      fooBar1: 'bar1',
    },
  ],
]

const testMapper2 = undefined

const testTables2: Array<[object, unknown]> = [
  [{ name: 2 }, { name: 2 }],
  [
    { foo: { name: 'foo', bar: 'bar' }, bar: { name: 'bar', bar: 'bar' } },
    { foo: { name: 'foo', bar: 'bar' }, bar: { name: 'bar', bar: 'bar' } },
  ],
]
describe('LiteTransformer Testing', () => {
  test.each(testTables)('makeLiteBody mapper is correct', (data, expected) => {
    const liteTransform = new LiteTransformer(data, testMapper)
    expect(liteTransform.makeLiteBody()).toEqual(expected)
  })
  test.each(testTables2)(
    'makeLiteBody mapper is invalid ',
    (data, expected) => {
      const liteTransform = new LiteTransformer(data, testMapper2)
      expect(liteTransform.makeLiteBody()).toEqual(expected)
    },
  )
})
