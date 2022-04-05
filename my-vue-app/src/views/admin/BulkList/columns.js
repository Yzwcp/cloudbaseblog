export  const columns = [
    {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
        slots: { customRender: 'id' },
        ellipsis:true,

    },
    {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: '创建者',
        dataIndex: 'creator',
        key: 'creator',
    },
    
    {
        title: '原价',
        key: 'oldprice',
        dataIndex: 'oldprice',
    },
    {
        title: '价格',
        key: 'price',
        dataIndex: 'price',
    },
    {
        title: '结束时间',
        key: 'endtime',
        dataIndex: 'endtime',
        width:160
    },
    {
      title: '共需要多少人',
      key: 'groupsize',
      dataIndex: 'groupsize',
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      customRender:({text, record})=>{return text==1?'上架':'下架'}

    },
    
    {
      title: '排序',
      key: 'sort',
      dataIndex: 'sort',
    },
    {
      title: '围观人数',
      key: 'watchered',
      dataIndex: 'watchered',
    },{
      title: '成团人数',
      key: 'okpeople',
      dataIndex: 'okpeople',
    },
    {
      title: '图片',
      dataIndex: 'image',
      key: 'image',
      slots: { customRender: 'image' },
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
