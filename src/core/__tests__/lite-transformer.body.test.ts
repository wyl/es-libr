import { LiteTransformer } from '@eslibr/core/lite-transformer'
import { ExtractLinkNode } from '@eslibr/lib'
const testMapper: Array<ExtractLinkNode> = [{ key: "foo", next: [{ key: "bar" }, { key: "bar1" }] }]

const testTables: Array<[object, unknown]> = [
  // [{ index: 'test2' }, { index: 'test2' }],
  // [{ delete: 'test2' }, { delete: 'test2' }],
  // [{ create: 'test2' }, { create: 'test2' }],
  // [{ update: 'test2' }, { update: 'test2' }],
  [{ foo: 'foo' }, {
    foo: {
      bar: undefined,
      bar1: undefined,
    },
  },],
  [
    {
      foo: {
        bar: 'bar',
        bar1: 'bar1',
        bar2: 'bar2',
      },
    },
    {
      foo: {
        bar: 'bar',
        bar1: 'bar1',
      },
    },
  ],
]

// const testMapper2: Array<ExtractLinkNode> | undefined = undefined

// const testTables2: Array<[object, unknown]> = [
//   [{ name: 2 }, { name: 2 }],
//   [
//     { foo: { name: 'foo', bar: 'bar' }, bar: { name: 'bar', bar: 'bar' } },
//     { foo: { name: 'foo', bar: 'bar' }, bar: { name: 'bar', bar: 'bar' } },
//   ],
// ]
describe('LiteTransformer Testing', () => {
  it.each(testTables)(
    'makeLiteBody mapper need correct ',
    (data, expected) => {
      const liteTransform = new LiteTransformer(data, testMapper)
      expect(liteTransform.makeLiteBody()).toEqual(expected)
    },
  )
  // test.each(testTables2)(
  //   'makeLiteBody mapper not need convert',
  //   (data, expected) => {
  //     const liteTransform = new LiteTransformer(data, testMapper2)
  //     expect(liteTransform.makeLiteBody()).toEqual(expected)
  //   },
  // )
})
