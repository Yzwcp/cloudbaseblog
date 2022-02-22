export  const columns = [
    {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
        slots: { customRender: 'id' },

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
        key: 'private',
        slots: { customRender: 'private' },
        dataIndex: 'private',
    },
    {
        title: '喜欢',
        key: 'likeList',
        dataIndex: 'likeList',
        customRender:({text, record})=>{return text? text.split(',').length-1 :0},
        width:80,

    },
    {
        title: '密码(md5)',
        key: 'password',
        ellipsis:true,
        width:100,
        dataIndex: 'password',
    },
    {
        title: '创建时间',
        key: 'createdAt',
        dataIndex: 'createdAt',
    },{
        title: '更新时间',
        key: 'updatedAt',
        dataIndex: 'updatedAt',
    },
    {
        title: '操作',
        key: 'operation',
        dataIndex: 'operation',
				slots: { customRender: 'operation' },
    },
];
