import { LiteTransformer } from '../lite-transformer'
const mapper = { 'foo.bar': 'foo_bar', 'foo.bar1': 'fooBar1' }

const tables: Array<{
  data: object
  mapper: Record<string, string>
  expected: unknown
}> = [
  {
    data: { index: 'test2' },
    mapper: {},
    expected: { index: 'test2' },
  },
  {
    data: { foo: 'test2' },
    mapper: { foo: 'fooPP' },
    expected: { fooPP: 'test2' },
  },
  {
    data: {
      foo: {
        bar: 'bar',
        bar1: 'bar1',
        bar2: 'bar2',
      },
    },
    mapper: mapper,
    expected: {
      foo_bar: 'bar',
      fooBar1: 'bar1',
    },
  },
]

describe('LiteTransformer Testing', () => {
  test.each(tables)('makeLiteBody', ({ data, mapper: _mapper, expected }) => {
    const liteTransform = new LiteTransformer(data, _mapper)
    expect(liteTransform.makeLiteBody()).toEqual(expected)
  })
})
