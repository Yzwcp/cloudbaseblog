export  const columns = [
    {
        name: 'id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: '封面',
        dataIndex: 'cover',
        key: 'cover',
    },
    {
        title: '标签',
        dataIndex: 'tags',
        key: 'tags',
    },
    {
        title: '是否可见',
        key: 'show',
        dataIndex: 'show',
    },{
        title: '创建时间',
        key: 'createdAt',
        dataIndex: 'createdAt',
    },{
        title: '更新时间',
        key: 'updatedAt',
        dataIndex: 'updatedAt',
    },
    {
        title: '权限',
        key: 'auth',
        dataIndex: 'auth',
    },{
        title: '喜欢',
        key: 'like',
        dataIndex: 'like',
    },
    {
        title: 'operation',
        key: 'operation',
        dataIndex: 'operation',
				slots: { customRender: 'operation' },
    },
];