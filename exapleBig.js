const exp = [
  {
    key: 'common',
    value: {
      setting1: 'Value 1',
      setting2: 200,
      setting3: true,
      setting6: {
        key: 'value',
        doge: {
          wow: '',
        },
      },
    },
    oldValue: {
      follow: false,
      setting1: 'Value 1',
      setting3: null,
      setting4: 'blah blah',
      setting5: {
        key5: 'value5',
      },
      setting6: {
        key: 'value',
        ops: 'vops',
        doge: {
          wow: 'so much',
        },
      },
    },
    nestingLevel: 1,
    status: 'MODIFIED',
    children: [
      {
        key: 'follow',
        value: false,
        oldValue: [],
        nestingLevel: 2,
        status: 'ADDED',
        children: [],
        elementType: 'Simple',
        nodeType: 'List',
      },
      {
        key: 'setting1',
        value: 'Value 1',
        oldValue: [],
        nestingLevel: 2,
        status: 'SIMILAR',
        children: [],
        elementType: 'Simple',
        nodeType: 'List',
      },
      {
        key: 'setting2',
        value: 200,
        oldValue: [],
        nestingLevel: 2,
        status: 'DELETED',
        children: [],
        elementType: 'Simple',
        nodeType: 'List',
      },
      {
        key: 'setting3',
        value: null,
        oldValue: true,
        nestingLevel: 2,
        status: 'MODIFIED',
        children: [],
        elementType: 'Simple',
        nodeType: 'List',
      },
      {
        key: 'setting4',
        value: 'blah blah',
        oldValue: [],
        nestingLevel: 2,
        status: 'ADDED',
        children: [],
        elementType: 'Simple',
        nodeType: 'List',
      },
      {
        key: 'setting5',
        value: {
          key5: 'value5',
        },
        oldValue: [],
        nestingLevel: 2,
        status: 'ADDED',
        children: [
          {
            key: 'key5',
            value: 'value5',
            oldValue: [],
            nestingLevel: 3,
            status: 'ADDED',
            children: [],
            elementType: 'Simple',
            nodeType: 'List',
          },
        ],
        elementType: 'Object',
        nodeType: 'Node',
      },
      {
        key: 'setting6',
        value: {
          key: 'value',
          doge: {
            wow: '',
          },
        },
        oldValue: {
          key: 'value',
          ops: 'vops',
          doge: {
            wow: 'so much',
          },
        },
        nestingLevel: 2,
        status: 'MODIFIED',
        children: [
          {
            key: 'doge',
            value: {
              wow: '',
            },
            oldValue: {
              wow: 'so much',
            },
            nestingLevel: 3,
            status: 'MODIFIED',
            children: [
              {
                key: 'wow',
                value: 'so much',
                oldValue: '',
                nestingLevel: 4,
                status: 'MODIFIED',
                children: [],
                elementType: 'Simple',
                nodeType: 'List',
              },
            ],
            elementType: 'Object',
            nodeType: 'Node',
          },
          {
            key: 'key',
            value: 'value',
            oldValue: [],
            nestingLevel: 3,
            status: 'SIMILAR',
            children: [],
            elementType: 'Simple',
            nodeType: 'List',
          },
          {
            key: 'ops',
            value: 'vops',
            oldValue: [],
            nestingLevel: 3,
            status: 'ADDED',
            children: [],
            elementType: 'Simple',
            nodeType: 'List',
          },
        ],
        elementType: 'Object',
        nodeType: 'Node',
      },
    ],
    elementType: 'Object',
    nodeType: 'Node',
  },
  {
    key: 'group1',
    value: {
      baz: 'bas',
      foo: 'bar',
      nest: {
        key: 'value',
      },
    },
    oldValue: {
      foo: 'bar',
      baz: 'bars',
      nest: 'str',
    },
    nestingLevel: 1,
    status: 'MODIFIED',
    children: [
      {
        key: 'baz',
        value: 'bars',
        oldValue: 'bas',
        nestingLevel: 2,
        status: 'MODIFIED',
        children: [],
        elementType: 'Simple',
        nodeType: 'List',
      },
      {
        key: 'foo',
        value: 'bar',
        oldValue: [],
        nestingLevel: 2,
        status: 'SIMILAR',
        children: [],
        elementType: 'Simple',
        nodeType: 'List',
      },
      {
        key: 'nest',
        value: {
          key: 'value',
        },
        oldValue: 'str',
        nestingLevel: 2,
        status: 'MODIFIED',
        children: [
          {
            key: 'key',
            value: 'value',
            oldValue: [],
            nestingLevel: 3,
            status: 'DELETED',
            children: [],
            elementType: 'Simple',
            nodeType: 'List',
          },
        ],
        elementType: 'Object',
        nodeType: 'Node',
      },
    ],
    elementType: 'Object',
    nodeType: 'Node',
  },
  {
    key: 'group2',
    value: {
      abc: 12345,
      deep: {
        id: 45,
      },
    },
    oldValue: [],
    nestingLevel: 1,
    status: 'DELETED',
    children: [
      {
        key: 'abc',
        value: 12345,
        oldValue: [],
        nestingLevel: 2,
        status: 'DELETED',
        children: [],
        elementType: 'Simple',
        nodeType: 'List',
      },
      {
        key: 'deep',
        value: {
          id: 45,
        },
        oldValue: [],
        nestingLevel: 2,
        status: 'DELETED',
        children: [
          {
            key: 'id',
            value: 45,
            oldValue: [],
            nestingLevel: 3,
            status: 'DELETED',
            children: [],
            elementType: 'Simple',
            nodeType: 'List',
          },
        ],
        elementType: 'Object',
        nodeType: 'Node',
      },
    ],
    elementType: 'Object',
    nodeType: 'Node',
  },
  {
    key: 'group3',
    value: {
      deep: {
        id: {
          number: 45,
        },
      },
      fee: 100500,
    },
    oldValue: [],
    nestingLevel: 1,
    status: 'ADDED',
    children: [
      {
        key: 'deep',
        value: {
          id: {
            number: 45,
          },
        },
        oldValue: [],
        nestingLevel: 2,
        status: 'ADDED',
        children: [
          {
            key: 'id',
            value: {
              number: 45,
            },
            oldValue: [],
            nestingLevel: 3,
            status: 'ADDED',
            children: [
              {
                key: 'number',
                value: 45,
                oldValue: [],
                nestingLevel: 4,
                status: 'ADDED',
                children: [],
                elementType: 'Simple',
                nodeType: 'List',
              },
            ],
            elementType: 'Object',
            nodeType: 'Node',
          },
        ],
        elementType: 'Object',
        nodeType: 'Node',
      },
      {
        key: 'fee',
        value: 100500,
        oldValue: [],
        nestingLevel: 2,
        status: 'ADDED',
        children: [],
        elementType: 'Simple',
        nodeType: 'List',
      },
    ],
    elementType: 'Object',
    nodeType: 'Node',
  },
];