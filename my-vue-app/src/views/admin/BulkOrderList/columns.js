export  const columns = [
    {
        title: '订单id',
        dataIndex: 'id',
        key: 'id',
        slots: { customRender: 'id' },
        ellipsis:true,

    }, 
    {
        title: '创建者的openid',
        dataIndex: 'openid',
        key: 'openid',
    },
    
    {
        title: '朋友的头像',
        key: 'helperavatars',
        dataIndex: 'helperavatars',
    },
    {
        title: '朋友的openid',
        key: 'helperopenids',
        dataIndex: 'helperopenids',
    },
    {
        title: '创建时间',
        key: 'createdAt',
        dataIndex: 'createdAt',
        width:180

    },{
        title: '更新时间',
        key: 'updatedAt',
        dataIndex: 'updatedAt',
        width:180

    },
    {
        title: '操作',
        key: 'operation',
        dataIndex: 'operation',
				slots: { customRender: 'operation' },
    },
];
