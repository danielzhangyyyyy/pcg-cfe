// list页面表头
const tableTitle_langEn = [
    {
        fixed: 'left',
    },
    {
        title: 'item',
        dataIndex: 'item',
        align: 'left',
        width: '100%',
        sorter: true
    },
   /*  {
        title: 'productGroup',
        dataIndex: 'productGroup',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'action',
        dataIndex: 'action',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'status',
        dataIndex: 'status',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'sysCreatedDate',
        dataIndex: 'sysCreatedDate',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'sysCreatedBy',
        dataIndex: 'sysCreatedBy',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'sysLastModifiedDate',
        dataIndex: 'sysLastModifiedDate',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'sysLastModifiedBy',
        dataIndex: 'sysLastModifiedBy',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'uploadId',
        dataIndex: 'uploadId',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'changeAction',
        dataIndex: 'changeAction',
        align: 'left',
        width: 300,
        sorter: true
    }, */
]

//edit页面
const editAndDetail_langEn = [
    {
        label: 'productGroup',
        decorator: 'productGroup',
        required: true,
        message: 'Please input productGroup'
    },
    {
        label: 'item',
        decorator: 'item',
        required: true,
        message: 'Please input item'
    },
    {
        label: 'action',
        decorator: 'action',
        required: true,
        message: 'Please input action'
    },
    {
        label: 'status',
        decorator: 'status',
        required: true,
        message: 'Please input status'
    },
    {
        label: 'sysCreatedDate',
        decorator: 'sysCreatedDate',
        required: true,
        message: 'Please input sysCreatedDate'
    },
    {
        label: 'sysCreatedBy',
        decorator: 'sysCreatedBy',
        required: true,
        message: 'Please input sysCreatedBy'
    },
    {
        label: 'sysLastModifiedDate',
        decorator: 'sysLastModifiedDate',
        required: true,
        message: 'Please input sysLastModifiedDate'
    },
    {
        label: 'sysLastModifiedBy',
        decorator: 'sysLastModifiedBy',
        required: true,
        message: 'Please input sysLastModifiedBy'
    },
    {
        label: 'uploadId',
        decorator: 'uploadId',
        required: true,
        message: 'Please input uploadId'
    },
    {
        label: 'changeAction',
        decorator: 'changeAction',
        required: true,
        message: 'Please input changeAction'
    },
]


export default {
    tableTitle_langEn,
    editAndDetail_langEn
}